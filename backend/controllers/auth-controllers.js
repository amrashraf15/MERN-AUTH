import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";

export async function signupUser(req, res) {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function verifyEmail(req, res) {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error in verifyEmail", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Password is incorrect" });
    }
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong during login" });
  }
}

export async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
}

export async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    console.log(`Generated reset link: ${resetLink}`); // Debug log
    if (!process.env.CLIENT_URL) {
      throw new Error("CLIENT_URL is not defined");
    }
    await sendPasswordResetEmail(user.email, resetLink);
    res.status(200).json({ success: true, message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: "Missing token" });
    }
    if (!password || typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await sendResetSuccessEmail(user.email);
    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function checkAuth(req, res) {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.error("Error in checkAuth:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}