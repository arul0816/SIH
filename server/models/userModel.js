// models/userModel.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    verifyOtp: {
      type: String,
      default: "",
    },
    verifyOtpExpireAt: {
      type: Number,
      default: 0,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    resetOtp: {
      type: String,
      default: "",
    },
    resetOtpExpireAt: {
      type: Number,
      default: 0,
    },
    // Fixed AI Profile structure
    aiProfile: {
      educationLevel: {
        type: String,
        enum: ["", "after10th", "after12th", "graduate", "postgraduate"], // Added empty string as valid
        default: ""
      },
      location: {
        state: { type: String, default: "Jammu & Kashmir" },
        district: { type: String, default: "" },
        city: { type: String, default: "" }
      },
      preferences: {
        theme: { 
          type: String, 
          enum: ["light", "dark"], 
          default: "light" 
        },
        language: { 
          type: String, 
          enum: ["English", "Hindi", "Urdu"], 
          default: "English" 
        }
      }
    }
  },
  { timestamps: true }
);

// ✅ Password hash before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;