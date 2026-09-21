import requestModel from "../models/request.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createRequest = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const { title, description } = req.body;

  if (!title || !description) {
    throw new apiError(400, "Tilte and Description is required");
  }

  const normalizedTitle = title.trim();
  const normalizedDescription = description.trim();

  const checkingRequest = await requestModel.findOne({
    title: normalizedTitle,
  });

  if (checkingRequest) {
    throw new apiError(403, "You already Created this request once");
  }

  const request = await requestModel.create({
    userId,
    title: normalizedTitle,
    description: normalizedDescription,
  });

  return res
    .status(200)
    .json(new apiResponse(200, "Request created successfully", request));
});

export const updateRequest = asyncHandler(async (req, res, next) => {
  const { requestId } = req.params;
  const { status, title, description } = req.body;
  const userId = req.userId;

  const request = await requestModel.findOne({
    _id: requestId,
    userId: userId,
  });

  if (!request) {
    throw new apiError(403, "Request not found");
  }

  let hasChanges = false;

  if (title !== undefined) {
    const normalizedTitle = title.trim();

    if (request.title !== normalizedTitle) {
      request.title = normalizedTitle;
      hasChanges = true;
    }
  }

  if (description !== undefined) {
    const normalizedDescription = description.trim();

    if (request.description !== normalizedDescription) {
      request.description = normalizedDescription;
      hasChanges = true;
    }
  }

  if (status !== undefined && request.status !== status) {
    request.status = status;
    hasChanges = true;
  }

  if (!hasChanges) {
    return res.status(200).json({
      success: true,
      message: "No changes were made",
      data: request,
    });
  }

  await request.save();

  return res
    .status(200)
    .json(new apiResponse(200, "Request updated successfully", request));
});

export const getRequest = asyncHandler(async (req, res, next) => {
  const { requestId } = req.params;

  const request = await requestModel.findOne({ _id: requestId });

  if (!request) {
    throw new apiError(403, "Request Not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Request fetch successfully", request));
});

export const getRequests = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const requests = await requestModel.find({ userId });

  if (!requests) {
    throw new apiError(403, "You have no requests");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Requests fetch successfully", requests));
});

export const deleteRequest = asyncHandler(async (req, res, next) => {
  const { requestId } = req.params;
  const userId = req.userId;

  const request = await requestModel.findOneAndDelete({
    $or: [
      {
        userId,
        _id: requestId,
      },
    ],
  });

  if (!request) {
    throw new apiError(403, "Request not founded");
  }

  return res.status(200).json(new apiResponse(200, "Request Deleted"));
});
