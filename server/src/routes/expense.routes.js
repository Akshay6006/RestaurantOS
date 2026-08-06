import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  getExpenses,
  createExpense,
  extractExpenseReceipt,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.get("/", getExpenses);

router.post("/", createExpense);

// AI Receipt Extraction
router.post(
  "/extract-ai",
  upload.single("receipt"),
  extractExpenseReceipt
);

export default router;