import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ASSETS } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { BACKENDURL } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const inputRefs = useRef([]);

  // ✅ Step 1: Send reset OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BACKENDURL}/api/auth/send-reset-otp`, { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) setIsEmailSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Step 2: Reset password with OTP verification
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((input) => input.value).join("");

    if (otp.length !== 6) {
      toast.error("Enter complete 6-digit OTP");
      return;
    }

    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    try {
      const { data } = await axios.post(`${BACKENDURL}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate("/login"); // redirect to login after success
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  // ✅ OTP input helpers
  const handleInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    paste.split("").forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    if (paste.length === 6) inputRefs.current[5].focus();
  };

return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
      
      {/* Step 1: Enter Email */}
      {!isEmailSent && (
        <form
          onSubmit={handleEmailSubmit}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset password</h1>
          <p className="text-center mb-6 text-indigo-300">Enter your registered email address</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] hover:bg-indigo hover:-translate-y-1 transition">
            <img src={ASSETS.mail_icon} alt="" className="w-5 h-5" />
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent outline-none text-white w-full "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 hover:bg-indigo hover:-translate-y-1 transition">
            Submit
          </button>
        </form>
      )}

      {/* Step 2: Enter OTP and New Password */}
      {isEmailSent && (
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
          <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email and your new password</p>
          
          {/* OTP Input */}
          <div className="mb-6">
            <p className="text-white text-sm mb-2">Enter OTP:</p>
            <div className="flex justify-between mb-4" onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    required
                  />
                ))}
            </div>
          </div>

          {/* New Password Input */}
          <div className="mb-6">
            <p className="text-white text-sm mb-2">New Password:</p>
            <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] hover:bg-indigo hover:-translate-y-1 transition">
              <img src={ASSETS.lock_icon} alt="" className="w-5 h-5" />
              <input
                type="password"
                placeholder="Enter new password"
                className="bg-transparent outline-none text-white w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full hover:bg-indigo hover:-translate-y-1 transition">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};


export default ResetPassword;
