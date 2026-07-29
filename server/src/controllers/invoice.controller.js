import fs from "fs";
import prisma from "../prisma/prisma.js";

import { extractInvoiceItems } from "../services/gemini.service.js";

export const uploadInvoice = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No invoice uploaded.",
      });
    }

    return res.json({
      success: true,
      message: "Invoice uploaded successfully.",
      imageUrl: `/uploads/${req.file.filename}`,
      fileName: req.file.filename,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const extractInvoice = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Invoice is required.",
      });
    }

    const fileBuffer = fs.readFileSync(req.file.path);

    const base64Data = fileBuffer.toString("base64");

    const result = await extractInvoiceItems(
      base64Data,
      req.file.mimetype
    );

    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const items = JSON.parse(cleaned);

    return res.json({
      success: true,
      items,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveInvoiceItems = async (req, res) => {
  try {
    const { items } = req.body;

    for (const item of items) {
      await prisma.inventory.create({
        data: {
          name: item.name,
          category: item.category,
          quantity: Number(item.quantity),
          unit: item.unit,
          purchasePrice: Number(item.purchasePrice),
          supplier: item.supplier || "",
          warehouse: item.warehouse || "",
          lowStockThreshold: 10,
        },
      });
    }

    return res.json({
      success: true,
      message: "Inventory saved successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};