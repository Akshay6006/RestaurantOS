import prisma from "../prisma/prisma.js";
import PDFDocument from "pdfkit";
export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();

    const totalEmployees = await prisma.staff.count();

const totalLeaveRequests = await prisma.leave.count();

const pendingLeaveRequests = await prisma.leave.count({
  where: {
    status: "Pending",
  },
});

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const presentToday = await prisma.attendance.count({
  where: {
    status: "Present",
    date: {
      gte: today,
      lt: tomorrow,
    },
  },
});

const absentToday = await prisma.attendance.count({
  where: {
    status: "Absent",
    date: {
      gte: today,
      lt: tomorrow,
    },
  },
});

const leaveToday = await prisma.attendance.count({
  where: {
    status: "Leave",
    date: {
      gte: today,
      lt: tomorrow,
    },
  },
});

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


    const recentFeedback = await prisma.feedback.findMany({
  where: {
    rating: {
      gte: 3,
    },
  },

  orderBy: {
    createdAt: "desc",
  },

  take: 5,
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

    console.log("Revenue:", revenue);
console.log("Total Revenue:", revenue._sum.totalAmount);


const dineInOrders = await prisma.order.count({
  where: {
    orderType: "DINE_IN",
  },
});

const takeawayOrders = await prisma.order.count({
  where: {
    orderType: "TAKEAWAY",
  },
});

const deliveryOrders = await prisma.order.count({
  where: {
    orderType: "DELIVERY",
  },
});

const orderTypes = [
  {
    name: "Dine In",
    value: dineInOrders,
  },
  {
    name: "Takeaway",
    value: takeawayOrders,
  },
  {
    name: "Delivery",
    value: deliveryOrders,
  },
];

const topSelling = await prisma.orderItem.groupBy({
  by: ["menuId"],

  _sum: {
    quantity: true,
    price: true,
  },

  orderBy: {
    _sum: {
      quantity: "desc",
    },
  },

  take: 5,
});

const topSellingData = [];

for (const item of topSelling) {
  const menu = await prisma.menu.findUnique({
    where: {
      id: item.menuId,
    },
  });

  topSellingData.push({
    id: menu?.id,
    name: menu?.name || "Unknown Dish",
    sold: item._sum.quantity || 0,
    revenue:
      (item._sum.price || 0) *
      (item._sum.quantity || 0),
  });
}

const kitchenQueue = await prisma.order.findMany({
  where: {
    status: {
      in: ["PENDING", "PREPARING", "READY"],
    },
  },

  include: {
    items: {
      include: {
        menu: true,
      },
    },
  },

  orderBy: {
    createdAt: "asc",
  },

  take: 10,
});

const totalExpenses = await prisma.expense.aggregate({
  _sum: {
    amount: true,
  },
});

// ===============================
// Inventory Intelligence
// ===============================

const inventory = await prisma.inventory.findMany();

const lowStockItems = inventory.filter(
  (item) =>
    item.quantity > 0 &&
    item.quantity <= item.lowStockThreshold
);

const outOfStockItems = inventory.filter(
  (item) => item.quantity <= 0
);

const healthyStockItems = inventory.filter(
  (item) =>
    item.quantity > item.lowStockThreshold
);

const purchaseRecommendations = lowStockItems.map((item) => ({
  item: item.name,
  currentStock: item.quantity,
  recommendedQuantity: Math.ceil(item.lowStockThreshold * 3),
  unit: item.unit,
}));


const totalRevenueValue = revenue._sum.totalAmount || 0;
const totalExpenseValue = totalExpenses._sum.amount || 0;

const profit = totalRevenueValue - totalExpenseValue;

const profitMargin =
  totalRevenueValue > 0
    ? ((profit / totalRevenueValue) * 100).toFixed(1)
    : 0;

const averageOrderValue =
  totalOrders > 0
    ? (totalRevenueValue / totalOrders).toFixed(2)
    : 0;

let healthScore = 100;

if (profitMargin < 30) healthScore -= 20;

healthScore -= lowStockItems.length * 5;

healthScore -= outOfStockItems.length * 10;

healthScore -= pendingOrders * 2;

if (healthScore < 0) healthScore = 0;

const aiRecommendations = [];

if (totalRevenueValue > totalExpenseValue) {
  aiRecommendations.push({
    type: "success",
    title: "Business Health",
    message: "Revenue is higher than expenses. Restaurant is operating profitably.",
  });
} else {
  aiRecommendations.push({
    type: "danger",
    title: "Business Health",
    message: "Expenses are exceeding revenue. Review operational costs.",
  });
}

lowStockItems.forEach((item) => {
  aiRecommendations.push({
    type: "warning",
    title: "Low Stock",
    message: `${item.name} is running low (${item.quantity} ${item.unit}).`,
  });
});

outOfStockItems.forEach((item) => {
  aiRecommendations.push({
    type: "danger",
    title: "Out Of Stock",
    message: `${item.name} is completely out of stock.`,
  });
});

if (topSellingData.length) {
  aiRecommendations.push({
    type: "success",
    title: "Best Seller",
    message: `${topSellingData[0].name} is today's best-selling dish (${topSellingData[0].sold} sold).`,
  });
}

if (pendingOrders >= 5) {
  aiRecommendations.push({
    type: "warning",
    title: "Kitchen Load",
    message: `${pendingOrders} orders are waiting to be prepared.`,
  });
}

if (totalExpenseValue > totalRevenueValue * 0.6) {
  aiRecommendations.push({
    type: "danger",
    title: "Expense Alert",
    message: "Expenses are above 60% of revenue.",
  });
}
// Profit margin insight
if (Number(profitMargin) >= 40) {
  aiRecommendations.push({
    type: "success",
    title: "Excellent Profit Margin",
    message: `Current profit margin is ${profitMargin}%, which is very healthy.`,
  });
}

// High average order value
if (Number(averageOrderValue) > 500) {
  aiRecommendations.push({
    type: "success",
    title: "High Customer Spend",
    message: `Average order value is ₹${averageOrderValue}. Customers are spending well.`,
  });
}

// Employee attendance
if (absentToday > 0) {
  aiRecommendations.push({
    type: "warning",
    title: "Staff Attendance",
    message: `${absentToday} employee(s) are absent today. Plan shifts accordingly.`,
  });
}

// Pending leave requests
if (pendingLeaveRequests > 0) {
  aiRecommendations.push({
    type: "info",
    title: "Pending Leave Requests",
    message: `${pendingLeaveRequests} leave request(s) require approval.`,
  });
}

// Best seller
if (topSellingData.length > 0) {
  aiRecommendations.push({
    type: "success",
    title: "Today's Best Seller",
    message: `${topSellingData[0].name} sold ${topSellingData[0].sold} times today.`,
  });
}
const dailySummary = {
  revenue: totalRevenueValue,
  expenses: totalExpenseValue,
  profit,
  totalOrders,
  bestSeller:
    topSellingData.length > 0
      ? topSellingData[0].name
      : "N/A",

  lowStock: lowStockItems.length,

  outOfStock: outOfStockItems.length,

  healthScore,
};


    res.json({
      totalEmployees,

presentToday,

absentToday,

leaveToday,

totalLeaveRequests,

pendingLeaveRequests,
      totalOrders,
      totalRevenue: revenue._sum.totalAmount || 0,

      pendingOrders,
      preparingOrders,
      readyOrders,
      servedOrders,

      totalCustomers: totalOrders,
      averageRating: 0,

      revenueChart: last7Days,

      orderTypes,

topSelling: topSellingData,

kitchenQueue,

aiInsights: {
  revenue: totalRevenueValue,
  expenses: totalExpenseValue,
  profit,
  profitMargin,
  averageOrderValue,
},

inventoryInsights: {
  healthyStock: healthyStockItems.length,
  lowStock: lowStockItems,
  outOfStock: outOfStockItems,
  purchaseRecommendations,
},

recommendations: aiRecommendations,

dailySummary,

recentFeedback,

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
export const generateDashboardReport = async (req, res) => {
  try {
    // Fetch dashboard data
    const totalOrders = await prisma.order.count();

    const revenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    const totalEmployees = await prisma.staff.count();

    const averageRating = await prisma.feedback.aggregate({
      _avg: {
        rating: true,
      },
    });

    // Create PDF
    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
    });

    // Tell browser this is a PDF
    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Restaurant_Report.pdf"
    );

    doc.pipe(res);

    // Title
    doc
      .fontSize(24)
      .text("RestaurantOS Report", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(12)
      .text(`Generated: ${new Date().toLocaleString()}`);

    doc.moveDown();

    doc.fontSize(18).text("Business Summary");

    doc.moveDown();

    doc.fontSize(13);

    doc.text(
      `Revenue : ₹${Number(
        revenue._sum.totalAmount || 0
      ).toLocaleString("en-IN")}`
    );

    doc.text(`Orders : ${totalOrders}`);

    doc.text(`Employees : ${totalEmployees}`);

    doc.text(
      `Average Rating : ${Number(
        averageRating._avg.rating || 0
      ).toFixed(1)} ⭐`
    );

    doc.moveDown();

    doc.fontSize(18).text("Generated by RestaurantOS");

    doc.end();
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};