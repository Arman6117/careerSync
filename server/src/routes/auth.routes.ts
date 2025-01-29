import express from "express";
import { forgotPassword, loginUser, logoutUser, registerUser } from "../controllers/auth.controller";

const authRoutes = express.Router();
authRoutes.post("/register", registerUser);
authRoutes.post('/login', loginUser)
authRoutes.post('/logout', logoutUser)
authRoutes.post('/forgot-password', forgotPassword)



export default authRoutes;
