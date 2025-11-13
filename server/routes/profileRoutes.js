// routes/profileRoutes.js
import express from "express";
import userAuth from "../middleware/userAuth.js";
import { updateAIProfile } from "../controllers/authController.js";

const profileRouter = express.Router();

// Update AI profile
profileRouter.put("/me", userAuth, updateAIProfile);

export default profileRouter;