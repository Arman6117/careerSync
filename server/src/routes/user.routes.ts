import express from "express";
import { authenticateUserMiddleware } from "../middleware/auth.middleware";

const userRoutes = express.Router();

userRoutes.get("/getUser", authenticateUserMiddleware, (req, res) => {
    res.status(200).json({
      success: true,
      message: "User authorized",
      // This comes from the middleware
    })});

export default userRoutes;
