import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
  getDashboardStats,
  generateDashboardReport,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);

// Generate PDF Report
router.get("/report", protect, generateDashboardReport);

export default router;