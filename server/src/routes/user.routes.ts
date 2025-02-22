import express from "express";
import { authenticateUserMiddleware } from "../middleware/auth.middleware";
import { updatePreferences } from "../controllers/user.controller";

const userRoutes = express.Router();
userRoutes.post("/preferences", authenticateUserMiddleware, updatePreferences)


export default userRoutes;
