import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getAIInsights } from "../controllers/ai.controller.js";

const router = express.Router();

router.get("/", protect, getAIInsights);

export default router;