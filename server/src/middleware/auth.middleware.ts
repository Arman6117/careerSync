import { Request, Response, NextFunction } from "express";
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
  function parseCookie(name: string) {
    return req.headers.cookie
      ?.split(";")
      .find((cookie) => cookie.trim().startsWith(`${name}=`))
      ?.split("=")[1];
  }
  try {
    const token = parseCookie("accessToken");
    const refreshToken = parseCookie("refreshToken");

    if (!token) {
      res.status(401).json({
        success: false,
        message: "NoTokenError",
      });
      return;
    }

    const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || "fallbackAccessTokenSecret";
    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET || "fallbackRefreshTokenSecret";

    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err?.name === "TokenExpiredError") {
       
        if (!refreshToken) {
          res.status(401).json({
            success: false,
            message: "SessionExpiredError",
          });
          return;
        }

        jwt.verify(
          refreshToken,
          refreshTokenSecret,
          (refreshErr, decodedRefreshToken) => {
            if (refreshErr) {
              res.status(401).json({
                success: false,
                message: "SessionExpiredError",
              });
              return;
            }
            if (!decodedRefreshToken) {
              res.status(401).json({
                success: false,
                message: "NoTokenError",
              });
              return;
            }
            const id = (decodedRefreshToken as JwtPayload).id;
            const { newAccessToken, newRefreshToken } = refreshAccessToken(id);
            res.cookie("accessToken", newAccessToken, {
              httpOnly: true,
              sameSite: "strict",
              maxAge: 15 * 60 * 1000,
              secure: process.env.NODE_ENV === "production",
            });
            res.cookie("refreshToken", newRefreshToken, {
              httpOnly: true,
              sameSite: "strict",
              maxAge: 7 * 24 * 60 * 60 * 1000,
              secure: process.env.NODE_ENV === "production",
            });
            req.user = decoded as jwt.JwtPayload;
            next();
          }
        );
      } else {
        req.user = decoded as jwt.JwtPayload;
        next();
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "InvalidTokenError",
    });
  }
};
