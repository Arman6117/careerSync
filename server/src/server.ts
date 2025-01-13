import express, { Application, Request, Response } from "express";
import authRoutes from './routes/auth.routes'
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./utils/db";
const app: Application = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

connectDB()


app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }))
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
