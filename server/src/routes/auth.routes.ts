import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller";

const authRoutes = express.Router();
authRoutes.post("/register", registerUser);
authRoutes.post('/login', loginUser)
authRoutes.post('/logout', logoutUser)



export default authRoutes;
