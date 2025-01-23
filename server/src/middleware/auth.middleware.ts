import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.cookie?.split(" ")[0].split("=")[1];
    console.log(token)
    if (!token) {
        console.log("inside if")
      res.status(401).json({
        success: false,
        message: "No token provided",
      });
      
      return;
    }
    console.log("outside if")
    const secret = "fallbackAccessTokenSecret";
    console.log("Above decode")
    console.log(jwt.verify(token, secret));
   console.log("Decoded")
    res.status(200).json("User authorized");
    next(); //
  } catch (error) {
    console.log("Inside error")
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token!" });
  }
};
