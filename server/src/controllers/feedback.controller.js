import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ==============================
// Create Feedback
// ==============================
export const createFeedback = async (req, res) => {
  try {
    const {
      orderId,
      customerName,
      customerPhone,
      rating,
      message,
      image,
    } = req.body;

    if (!orderId || !rating || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const existing = await prisma.feedback.findUnique({
      where: {
        orderId,
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Feedback already submitted.",
      });
    }

    const feedback = await prisma.feedback.create({
      data: {
        orderId,
        customerName,
        customerPhone,
        rating: Number(rating),
        message,
        image,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit feedback.",
    });
  }
};

// ==============================
// Get All Feedback
// ==============================
export const getFeedbacks = async (req, res) => {
  try {
    const dashboard = req.query.dashboard === "true";

    const feedbacks = await prisma.feedback.findMany({
      where: dashboard
        ? {
            rating: {
              gte: 3,
            },
          }
        : {},
      include: {
        order: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: dashboard ? 5 : undefined,
    });

    return res.json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch feedback.",
    });
  }
};

// ==============================
// Delete Feedback
// ==============================
export const deleteFeedback = async (req, res) => {
  try {
    await prisma.feedback.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.json({
      success: true,
      message: "Feedback deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete feedback.",
    });
  }
};