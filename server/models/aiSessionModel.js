// models/aiSessionModel.js
import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  questionText: { type: String, required: true },
  userAnswer: { type: String, required: true },
  answerType: { type: String, enum: ["mcq", "text", "rating"], required: true },
  score: { type: Number, default: 0 },
  category: { type: String, required: true }, // aptitude, interest, personality
  timestamp: { type: Date, default: Date.now }
});

const careerScoreSchema = new mongoose.Schema({
  careerField: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  factors: [{
    factor: String,
    contribution: Number
  }]
});

const aiSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  stage: {
    type: String,
    enum: ["welcome", "basic_info", "aptitude", "interest", "personality", "recommendations", "completed"],
    default: "welcome"
  },
  educationLevel: {
    type: String,
    enum: ["after10th", "after12th"],
    required: true
  },
  currentQuestionIndex: {
    type: Number,
    default: 0
  },
  responses: [responseSchema],
  careerScores: [careerScoreSchema],
  recommendations: [{
    stream: String,
    courses: [String],
    colleges: [String],
    reasoning: String,
    confidence: Number
  }],
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comments: String,
    helpful: Boolean
  }
}, { timestamps: true });

const aiSessionModel = mongoose.models.AISession || mongoose.model("AISession", aiSessionSchema);
export default aiSessionModel;