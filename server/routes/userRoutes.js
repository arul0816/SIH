import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';
import { getUserProfile } from '../controllers/authController.js';

const userRouter = express.Router();

// Get user data (basic info, requires auth middleware)
userRouter.get('/data', userAuth, getUserData);

// Get full profile (with name + email) ✅ protected by userAuth
userRouter.get("/profile", userAuth, getUserProfile);

export default userRouter;
