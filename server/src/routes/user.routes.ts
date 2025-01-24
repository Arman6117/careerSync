import express from "express";
import { authenticateUserMiddleware } from "../middleware/auth.middleware";

const userRoutes = express.Router();

userRoutes.get("/getUser", authenticateUserMiddleware, (req, res) => {
   const user = (req as any).user
    res.status(200).json({
      success: true,
      message: "User authorized",
      // This comes from the middleware
      user
    })});

export default userRoutes;
