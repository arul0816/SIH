import { getQuestionsByStage } from "../services/questionsService.js";

export const listQuestions = async (req, res) => {
  try {
    const stage = String(req.query.stage || "").toLowerCase();
    const questions = getQuestionsByStage(stage);
    return res.status(200).json({ success: true, questions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



