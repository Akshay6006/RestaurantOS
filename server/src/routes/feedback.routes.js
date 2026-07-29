import express from "express";

import {
  createFeedback,
  getFeedbacks,
  deleteFeedback,
} from "../controllers/feedback.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create Feedback
router.post("/", protect, createFeedback);

// Get All Feedback
router.get("/", protect, getFeedbacks);

// Delete Feedback
router.delete("/:id", protect, deleteFeedback);

export default router;