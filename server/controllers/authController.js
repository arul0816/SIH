// controllers/authController.js (FULL WORKING VERSION)
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

// USER REGISTRATION - WORKING VERSION
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Missing Details' });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Create user - let pre-save middleware handle hashing
    const user = new userModel({ 
      name, 
      email, 
      password
    });
    
    await user.save();

    // Generate token
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Try to send welcome email (don't fail if email fails)
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Welcome to EduAdvisor!',
        html: `<h2>Welcome ${name}!</h2><p>Your account has been created successfully.</p>`
      };
      await transporter.sendMail(mailOptions);
      console.log('✅ Welcome email sent to:', email);
    } catch (emailError) {
      console.log('📧 Email sending failed (but registration succeeded):', emailError.message);
    }

    console.log('✅ User registered successfully:', email);
    return res.json({ success: true });

  } catch (error) {
    console.error('Registration error:', error);
    res.json({ success: false, message: error.message });
  }
};

// USER LOGIN - WORKING VERSION
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'Invalid email' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid password' });
    }
    
    // Generate token
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    console.log('✅ User logged in successfully:', email);
    return res.json({ success: true });

  } catch (error) {
    console.error('Login error:', error);
    return res.json({ success: false, message: error.message });
  }
};

// LOGOUT - WORKING VERSION
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.error('Logout error:', error);
    return res.json({ success: false, message: error.message });
  }
};

// CHECK AUTHENTICATION - WORKING VERSION
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// GET USER PROFILE - WORKING VERSION
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await userModel.findById(userId).select("name email isAccountVerified aiProfile");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, userData: user });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEND VERIFICATION OTP - WORKING VERSION
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Update user with OTP
    await userModel.findByIdAndUpdate(userId, {
      verifyOtp: otp,
      verifyOtpExpireAt: Date.now() + 24 * 60 * 60 * 1000
    });

    // Try to send email
    try {
      const mailOption = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Account Verification OTP - EduAdvisor',
        html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
      };

      await transporter.sendMail(mailOption);
      console.log('✅ Verification OTP sent to:', user.email);
      res.json({ success: true, message: 'Verification OTP Sent on Email' });
    } catch (emailError) {
      console.log('📧 Email sending failed:', emailError.message);
      // For development, return success anyway and show OTP in console
      console.log('🔑 VERIFICATION OTP (for development):', otp);
      res.json({ success: true, message: `Verification OTP: ${otp} (Check console for development)` });
    }

  } catch (error) {
    console.error('Send OTP error:', error);
    res.json({ success: false, message: error.message });
  }
};

// VERIFY EMAIL - WORKING VERSION
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.userId;

  if (!userId || !otp) {
    return res.json({ success: false, message: 'Missing Details' });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' });
    }

    // Update user as verified
    await userModel.findByIdAndUpdate(userId, {
      isAccountVerified: true,
      verifyOtp: '',
      verifyOtpExpireAt: 0
    });

    return res.json({ success: true, message: 'Email verified successfully' });

  } catch (error) {
    console.error('Verify email error:', error);
    return res.json({ success: false, message: error.message });
  }
};

// SEND RESET OTP - WORKING VERSION
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: 'Email is required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Update user with reset OTP
    await userModel.findByIdAndUpdate(user._id, {
      resetOtp: otp,
      resetOtpExpireAt: Date.now() + 15 * 60 * 1000
    });

    // Try to send email
    try {
      const mailOption = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Password Reset OTP - EduAdvisor',
        html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
      };

      await transporter.sendMail(mailOption);
      console.log('✅ Reset OTP sent to:', user.email);
      return res.json({ success: true, message: 'OTP sent to your email' });
    } catch (emailError) {
      console.log('📧 Email sending failed:', emailError.message);
      // For development, return success anyway and show OTP in console
      console.log('🔑 RESET OTP (for development):', otp);
      return res.json({ success: true, message: `Reset OTP: ${otp} (Check console for development)` });
    }

  } catch (error) {
    console.error('Send reset OTP error:', error);
    return res.json({ success: false, message: error.message });
  }
};

// RESET PASSWORD - WORKING VERSION
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: 'Email, OTP, and new password are required' });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user password
    await userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetOtp: '',
      resetOtpExpireAt: 0
    });

    return res.json({ success: true, message: 'Password has been reset successfully' });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.json({ success: false, message: error.message });
  }
};

// UPDATE AI PROFILE - WORKING VERSION
export const updateAIProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { educationLevel, location, preferences } = req.body;

    const updateData = {};
    if (educationLevel) updateData['aiProfile.educationLevel'] = educationLevel;
    if (location) {
      if (location.state) updateData['aiProfile.location.state'] = location.state;
      if (location.district) updateData['aiProfile.location.district'] = location.district;
      if (location.city) updateData['aiProfile.location.city'] = location.city;
    }
    if (preferences) {
      if (preferences.theme) updateData['aiProfile.preferences.theme'] = preferences.theme;
      if (preferences.language) updateData['aiProfile.preferences.language'] = preferences.language;
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select("name email isAccountVerified aiProfile");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, userData: user });
  } catch (error) {
    console.error('Update AI profile error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};