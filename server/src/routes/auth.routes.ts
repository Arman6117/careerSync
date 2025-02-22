import express from "express";
import { sendForgotPasswordEmail, loginUser, logoutUser, registerUser, resetUserPassword, verifyUserEmail, resendVerificationEmail } from "../controllers/auth.controller";

const authRoutes = express.Router();
authRoutes.post("/register", registerUser);
authRoutes.post('/login', loginUser)
authRoutes.post('/logout', logoutUser)
authRoutes.post('/forgot-password', sendForgotPasswordEmail)
authRoutes.post('/reset-password', resetUserPassword)
authRoutes.post('/verify-email', verifyUserEmail)
authRoutes.post('/resend-verification-email', resendVerificationEmail)


export default authRoutes;
