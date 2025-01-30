import express from "express";
import { sendForgotPasswordEmail, loginUser, logoutUser, registerUser } from "../controllers/auth.controller";

const authRoutes = express.Router();
authRoutes.post("/register", registerUser);
authRoutes.post('/login', loginUser)
authRoutes.post('/logout', logoutUser)
authRoutes.post('/forgot-password', sendForgotPasswordEmail)



export default authRoutes;
