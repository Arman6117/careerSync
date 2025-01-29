import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User from "../models/user";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Email already exists please login!",
      });
      return;
    }

    const newUser = new User({ name, email, password });
    const accessToken = generateAccessToken(newUser._id as unknown as string);
    const refreshToken = generateRefreshToken(newUser._id as unknown as string);

    newUser.refreshTokens?.push({
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //* 7 Days
    });
    //TODO:Send email verification token and verify email
    await newUser.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error: any) {
    console.error("Error during registration:", error);

    if (error.code === 11000) {
      res.status(409).json({
        success: false,
        message: "A user with this email already exists. Please login.",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      res
        .status(400)
        .json({ success: false, message: "Please provide credentials" });
      return;
    }
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      res.status(404).json({ success: false, message: "User does not exists" });
      return;
    }
    const isMatch = await bcryptjs.compare(password, existingUser.password);

    if (!isMatch) {
      res.status(400).json({ success: false, message: "Invalid password" });
      return;
    }

    const accessToken = generateAccessToken(
      existingUser._id as unknown as string
    );

    const refreshToken = generateRefreshToken(
      existingUser._id as unknown as string
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      success: true,
      message: "Successfully logged in",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "UserNotFoundError",
      });
    }

    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
       user:'armanp384@gmail.com',
       pass:'Arman384!!!'
      }
    })
    const mailOptions = {
      from: 'armanp384@gmail.com',
      to: 'vanixgaming634@yahoo.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {}
};
