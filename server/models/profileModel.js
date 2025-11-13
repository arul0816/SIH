import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      unique: true,
    },
    phone: { type: String, default: "" },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other", ""], default: "" },
    location: { type: String, default: "" },
    education: [
      {
        level: { type: String, default: "" },
        institution: { type: String, default: "" },
        startYear: { type: Number },
        endYear: { type: Number },
        score: { type: String, default: "" },
      },
    ],
    interests: { type: [String], default: [] },
    careerGoals: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const profileModel =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default profileModel;

