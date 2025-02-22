import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../models/user";

interface AuthenticateRequest extends Request {
  user?: jwt.JwtPayload | string;
}

export const updatePreferences = async (
  req: AuthenticateRequest,
  res: Response
) => {
  const { id: userId } = req.user as JwtPayload;

  if (userId) {
    res.status(401).json({ message: "Unauthorized", success: false });
    return;
  }
  const preferences = req.body;

  try {
    const existingUser = await User.findById({ userId });
    if (!existingUser) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    existingUser.preferences = {
      ...existingUser.preferences!,
      ...preferences,
    };

    await existingUser.save();

    res.status(200).json({ message: "Preferences Updated", success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
