import fs from "fs";
import prisma from "../prisma/prisma.js";
import { extractReceiptData } from "../services/gemini.service.js";

// ================= GET EXPENSES =================

export const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        expenseDate: "desc",
      },
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses.",
    });
  }
};

// ================= CREATE EXPENSE =================

export const createExpense = async (req, res) => {
  try {
    const {
      title,
      category,
      amount,
      paymentMethod,
      vendor,
      expenseDate,
      notes,
      billImage,
    } = req.body;

    const expense = await prisma.expense.create({
      data: {
        title,
        category,
        amount: Number(amount),
        paymentMethod,
        vendor,
        expenseDate: new Date(expenseDate),
        notes,
        billImage,
      },
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create expense.",
    });
  }
};

// ================= AI RECEIPT EXTRACTION =================

export const extractExpenseReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Receipt is required.",
      });
    }

    const fileBuffer = fs.readFileSync(req.file.path);

    const base64Data = fileBuffer.toString("base64");

  const result = await extractReceiptData(
  base64Data,
  req.file.mimetype
);
    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(cleaned);

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
  console.error("========== EXPENSE AI ERROR ==========");
  console.error(error);
  console.error("Message:", error.message);
  console.error("Stack:", error.stack);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};