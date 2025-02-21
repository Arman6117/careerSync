import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../models/user";
import {
  generateAccessToken,
  generateEmailVerificationToken,
  generateRefreshToken,
  generateResetPasswordToken,
} from "../utils/tokens";
import { sendResetPasswordEmail, sendVerificationEmail } from "../utils/mail";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);

    if (existingUser) {
      res.status(409).json({
        message: "Email already exists please login!",
        success: false,
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
    const emailVerificationToken = generateEmailVerificationToken(
      newUser._id as unknown as string
    );
    const { data, error } = await sendVerificationEmail(
      email,
      emailVerificationToken
    );

    if (error) {
      res.status(500).json({ success: false, message: error });
      return;
    }
    newUser.emailVerificationToken.push({
      token: emailVerificationToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    console.log("New user from registering: ", newUser);
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
      message: "Email sent for verification",
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
    const isEmailVerified = existingUser.isVerified;
    if (!isEmailVerified) {
      res
        .status(403)
        .json({ success: false, message: "Please verify your email to login" });
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

export const sendForgotPasswordEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const token = generateResetPasswordToken(user._id as unknown as string);
    const { data, error } = await sendResetPasswordEmail(email, token);
    if (error) {
      res.status(500).json({ success: false, message: error });
      return;
    }

    user.resetPasswordToken.push({
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    await user.save();

    res.status(200).json({
      success: true,
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetUserPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  if (!token) {
    res.status(400).json({ success: false, message: "Token is missing" });
    return;
  }

  try {
    const secret = Buffer.from(
      process.env.RESET_PASSWORD_TOKEN_SECRET ||
        "fallbackResetPasswordTokenSecret",
      "base64"
    );

    const decodedUriToken = decodeURIComponent(token);

    jwt.verify(
      decodedUriToken.trim(),
      process.env.RESET_PASSWORD_TOKEN_SECRET ||
        "fallbackResetPasswordTokenSecret",
      async (resetError, resetDecode) => {
        if (resetError?.name === "TokenExpiredError") {
          res.status(401).json({ success: false, message: "Link expired" });
          return;
        }
        if (!resetDecode) {
          res.status(401).json({ success: false, message: "NoTokenError" });
          return;
        }

        const user = await User.findById((resetDecode as JwtPayload).id);
        if (!user) {
          res.status(404).json({ success: false, message: "User not found" });
          return;
        }

        user.set("resetPasswordToken", []);
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        await user.updateOne({ password: hashedPassword });
        await user.save();
      }
    );

    res
      .status(201)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
export const resendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) {
      res.status(400).json({ message: "Email is missing", success: false });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({
        message: "User does not exits please sign up",
        success: false,
      });
      return;
    }

    const token = generateEmailVerificationToken(
      existingUser._id as unknown as string
    );

    const { data, error } = await sendVerificationEmail(email, token);
    if (error) {
      res.status(500).json({ message: error.message, success: false });
      return;
    }
    existingUser.emailVerificationToken.push({
      token: token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    await existingUser.save();

    res.status(200).json({
      success: true,
      message: " Verification email sent successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};
export const verifyUserEmail = async (req: Request, res: Response) => {
  console.log("Triggered");
  const { token } = req.body;
  try {
    if (!token) {
      res.status(400).json({ success: false, message: "Token is missing" });
      return;
    }
    const decodedUriToken = decodeURIComponent(token);

    jwt.verify(
      decodedUriToken.trim(),
      process.env.EMAIL_VERIFICATION_TOKEN_SECRET ||
        "fallbackEmailVerificationTokenSecret",
      async (error, decode) => {
        if (error?.name === "TokenExpiredError") {
          res.status(401).json({ success: false, message: "Token Expired" });
        }
        if (!decode) {
          res.status(401).json({ success: false, message: "Invalid Token" });
        }

        const user = await User.findById((decode as JwtPayload).id);
        if (!user) {
          res.status(404).json({ success: false, message: "User not found" });
          return;
        }

        user.set("emailVerificationToken", []);
        user.set("isVerified", true);
        console.log("user from email verification: ", user);

        await user.save();
      }
    );
    res.status(200).json({ success: true, message: "Email verified" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
