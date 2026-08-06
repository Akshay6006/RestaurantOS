import express from "express";

import {
  createInventory,
  getInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
  stockIn,
  stockOut,
  extractInventoryInvoice,
} from "../controllers/inventory.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(
  "/extract-invoice",
  protect,
  upload.single("file"),
  extractInventoryInvoice
);

// CRUD
router.post("/", protect, createInventory);

router.get("/", protect, getInventory);

router.get("/:id", protect, getInventoryById);

router.put("/:id", protect, updateInventory);

router.delete("/:id", protect, deleteInventory);

// Stock
router.patch("/:id/stock-in", protect, stockIn);

router.patch("/:id/stock-out", protect, stockOut);

export default router;