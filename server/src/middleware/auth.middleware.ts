import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.cookie?.split(" ")[0].split("=")[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      });
      return;
    }
    const secret =
      process.env.ACCESS_TOKEN_SECRET || "fallbackAccessTokenSecret";
    const decoded = jwt.verify(token, secret);
    res.status(200).json("User authorized");
    next(); //
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token!" });
  }
};
