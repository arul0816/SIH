// routes/authRoutes.js
import express from 'express';
import { 
  getUserProfile, 
  isAuthenticated, 
  login, 
  logout, 
  register, 
  resetPassword, 
  sendResetOtp, 
  sendVerifyOtp, 
  verifyEmail,
  updateAIProfile
} from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

// Public routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

// Protected routes
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.get('/profile', userAuth, getUserProfile);
authRouter.put('/ai-profile', userAuth, updateAIProfile);

export default authRouter;