import express from "express";

import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
} from "../controllers/order.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/", protect, getOrders);

router.get("/:id", protect, getOrderById);

// ✅ ADD THIS ROUTE
router.patch("/:id/status", protect, updateOrderStatus);

router.patch("/:id/payment", protect, updatePaymentStatus);

router.delete("/:id", protect, deleteOrder);

export default router;