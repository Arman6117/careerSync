import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
       res
        .status(409)
        .json({ message: "Email already exists please login!" });
    } else{

      
      const newUser = new User({ name, email, password });
      const accessToken = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET || "fallbackAccessTokenSecret",
      { expiresIn: "1h" }
    );
    
    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.REFRESH_TOKEN_SECRET || "fallbackRefreshTokenSecret",
      
      { expiresIn: "7d" }
    );
    
    newUser.refreshTokens?.push({
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //* 7 Days
    });
    
    await newUser.save();
    
    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  }
  } catch (error:any) {
    console.error("Error during registration:", error);

    if (error.code === 11000) {
      res.status(409).json({
        message: "A user with this email already exists. Please login.",
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};
