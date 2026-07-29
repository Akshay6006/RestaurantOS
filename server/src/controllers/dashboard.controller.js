import prisma from "../prisma/prisma.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();

    const revenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    const pendingOrders = await prisma.order.count({
      where: { status: "PENDING" },
    });

    const preparingOrders = await prisma.order.count({
      where: { status: "PREPARING" },
    });

    const readyOrders = await prisma.order.count({
      where: { status: "READY" },
    });

    const servedOrders = await prisma.order.count({
      where: { status: "SERVED" },
    });

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
    });

    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - i);

      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const result = await prisma.order.aggregate({
        where: {
          createdAt: {
            gte: start,
            lt: end,
          },
        },
        _sum: {
          totalAmount: true,
        },
      });

      last7Days.push({
        day: start.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        revenue: result._sum.totalAmount || 0,
      });
    }

    res.json({
      totalOrders,
      totalRevenue: revenue._sum.totalAmount || 0,

      pendingOrders,
      preparingOrders,
      readyOrders,
      servedOrders,

      totalCustomers: totalOrders,
      averageRating: 0,

      revenueChart: last7Days,

      orderTypes: [],

      topSelling: [],

      kitchenQueue: [],

      recentFeedback: [],

      recentOrders,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};