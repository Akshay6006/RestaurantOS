import prisma from "../prisma/prisma.js";
import { generateRestaurantInsights } from "../services/gemini.service.js";

export const getAIInsights = async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();

    const revenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    const expenses = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
    });

    const inventory = await prisma.inventory.findMany();

    const staff = await prisma.staff.count();

    const attendance = await prisma.attendance.count({
      where: {
        status: "Present",
      },
    });

    const lowStock = inventory.filter(
      (i) => i.quantity <= i.lowStockThreshold
    ).length;

    const healthScore =
      100 -
      lowStock * 2 -
      Math.max(
        0,
        Number(expenses._sum.amount || 0) / 10000
      );

    res.json({
  healthScore: aiData.healthScore,

  revenue: revenue._sum.totalAmount || 0,

  expenses: expenses._sum.amount || 0,

  totalOrders,

  totalStaff: staff,

  attendance,

  lowStock,

  summary: aiData.summary,

  strengths: aiData.strengths,

  risks: aiData.risks,

  recommendation: aiData.recommendation,
});
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load AI Insights.",
    });
  }
};