import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticateRequest extends Request {
  user?: jwt.JwtPayload | string;
}
export const authenticateUserMiddleware = (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.cookie
      ?.split(";")
      .find((cookie) => cookie.trim().startsWith("accessToken="))
      ?.split("=")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      });
      return;
    }

    const secret = process.env.JWT_SECRET || "fallbackAccessTokenSecret";
    const decode = jwt.verify(token, secret);
    req.user = decode as jwt.JwtPayload;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token!",
    });
  }
};
