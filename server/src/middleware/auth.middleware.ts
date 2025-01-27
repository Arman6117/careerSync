import e, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { refreshAccessToken } from "../utils/tokens";

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

    const refreshToken = req.headers.cookie
      ?.split(";")
      .find((cookie) => cookie.trim().startsWith("refreshToken="))?.split("=")[1];
      

     
    if (!token) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      });
      return;
    }


    const secret = process.env.JWT_SECRET || "fallbackAccessTokenSecret";
    jwt.verify(token, secret, (err, decoded) => {
      if (err?.name === "TokenExpiredError") {
        if(!refreshToken) {
          res.status(401).json({
            success: false,
            message: "Session expired please log in!",
          });
          return;
        }
        refreshAccessToken(refreshToken)
      } else {
        req.user = decoded as jwt.JwtPayload;
        next();
      }
    });
    res.status(401).json({
      success: false,
      message: "Invalid or expired token!",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token!",
    });
  }
};
