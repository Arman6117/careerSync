import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateUserMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  try {
    const token = req.headers.cookie?.split(";")
      .find(cookie => cookie.trim().startsWith("accessToken="))
      ?.split("=")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "No token provided"
      });
      return;
    }

    const secret = process.env.JWT_SECRET || "fallbackAccessTokenSecret";
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token!" 
    });
  }
};