import express from "express";
import { registerUser } from "../controllers/auth.controller";

const authRoutes = express.Router();
authRoutes.post("/register", registerUser);
authRoutes.post('/login', (()=> {}))


export default authRoutes;
