import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  uploadInvoice,
  extractInvoice,
  saveInvoiceItems,
} from "../controllers/invoice.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("invoice"),
  uploadInvoice
);

router.post(
  "/extract",
  protect,
  upload.single("invoice"),
  extractInvoice
);

router.post(
  "/save",
  protect,
  saveInvoiceItems
);

export default router;