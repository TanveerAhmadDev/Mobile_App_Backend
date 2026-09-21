import userModel from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new apiError(
      401,
      "UserName, Email and Password is Required to create an account",
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUserName = userName.trim();

  const userChecking = await userModel.findOne({
    $or: [{ email: normalizedEmail }, { userName: normalizedUserName }],
  });

  if (userChecking) {
    throw new apiError(400, "Email or username is already in use.");
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    userName: normalizedUserName,
    email: normalizedEmail,
    password: hashpassword,
  });

  const userWithoutPassword = user.toObject();

  delete userWithoutPassword.password;

  return res.status(201).json(
    new apiResponse(201, "User register successfully.", {
      user: userWithoutPassword,
    }),
  );
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "Email and Password is Required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const userChecking = await userModel.findOne({ email: normalizedEmail });

  if (!userChecking) {
    throw new apiError(401, "User not Found Invalid Email");
  }

  const passwordChecking = await bcrypt.compare(
    password,
    userChecking.password,
  );

  if (!passwordChecking) {
    throw new apiError(401, "Password incorrect");
  }

  const userId = userChecking._id;

  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  res.status(200).json(new apiResponse(200, "Login successfully"));
});

export const logout = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new apiError(401, "You are not logged in yet");
  }

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json(new apiResponse(200, "Logout successfully"));
});
