import express from "express";
import {
  createRequest,
  deleteRequest,
  getRequest,
  getRequests,
  updateRequest,
} from "../controllers/request.controllers.js";
import verfiyUser from "../middlewares/verfiyUser.js";

const router = express.Router();

router.post("/", verfiyUser, createRequest);
router.patch("/:requestId", verfiyUser, updateRequest);
router.get("/:requestId", verfiyUser, getRequest);
router.get("/", verfiyUser, getRequests);
router.delete("/:requestId", verfiyUser, deleteRequest);

export default router;
