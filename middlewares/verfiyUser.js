import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

import jwt from "jsonwebtoken";

const verfiyUser = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new apiError(401, "Login Fisrt to access this");
  }

  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken) {
    throw new apiError(401, "Token is expires");
  }

  req.userId = decodedToken.userId;

  next();
});

export default verfiyUser;
