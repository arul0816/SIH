// routes/chatRoutes.js
import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  listConversations,
  getConversation,
  createAISession,
  sendMessage,
  renameConversation,
  deleteConversation,
  getSessionAnalytics
} from "../controllers/chatController.js";

const chatRouter = express.Router();

// Conversation management
chatRouter.get("/conversations", userAuth, listConversations);
chatRouter.get("/conversations/:id", userAuth, getConversation);
chatRouter.delete("/conversations/:id", userAuth, deleteConversation);
chatRouter.patch("/conversations/:id/rename", userAuth, renameConversation);

// AI Session management
chatRouter.post("/ai-session", userAuth, createAISession);
chatRouter.post("/conversations/:id/message", userAuth, sendMessage);

// Analytics
chatRouter.get("/analytics", userAuth, getSessionAnalytics);

export default chatRouter;