import express from 'express';
import {
  startCareerTest,
  submitAnswer,
  calculateResults,
  getUserSessions,
  createChatSession,
  sendMessage,
  getChatHistory,
  getAllChatSessions
} from '../controllers/aiController.js';
import userAuth from '../middleware/userAuth.js';

const aiRouter = express.Router();

// Career Test Routes
aiRouter.post('/career-test/start', userAuth, startCareerTest);
aiRouter.post('/career-test/answer', userAuth, submitAnswer);
aiRouter.post('/career-test/results', userAuth, calculateResults);
aiRouter.get('/career-test/sessions', userAuth, getUserSessions);

// Chat Routes
aiRouter.post('/chat/create', userAuth, createChatSession);
aiRouter.post('/chat/message', userAuth, sendMessage);
aiRouter.get('/chat/history/:sessionId', userAuth, getChatHistory);
aiRouter.get('/chat/sessions', userAuth, getAllChatSessions);
aiRouter.delete('/chat/session/:sessionId', userAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.userId;

    await chatModel.findOneAndUpdate(
      { sessionId, user: userId },
      { isActive: false }
    );

    res.json({ success: true, message: 'Chat session deleted' });
  } catch (error) {
    console.error('Delete session error:', error);
    res.json({ success: false, message: error.message });
  }
});

export default aiRouter;