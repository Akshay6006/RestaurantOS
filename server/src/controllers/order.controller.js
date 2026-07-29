import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Generate Invoice Number
const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900);

  return `INV-${timestamp}-${random}`;
};

// ==============================
// Create Order
// ==============================
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      tableNumber,
      items,
    } = req.body;

    if (
      !customerName ||
      !tableNumber ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menu = await prisma.menu.findUnique({
        where: {
          id: item.menuId,
        },
      });

      if (!menu) {
        return res.status(404).json({
          success: false,
          message: "Menu item not found",
        });
      }

      totalAmount += Number(menu.price) * Number(item.quantity);

      orderItems.push({
        menuId: menu.id,
        quantity: Number(item.quantity),
        price: Number(menu.price),
      });
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        tableNumber: Number(tableNumber),
        totalAmount,

        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// ==============================
// Get Orders
// ==============================
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
  include: {
    items: {
      include: {
        menu: true,
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
});

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// ==============================
// Get Single Order
// ==============================
export const getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: req.params.id,
      },

      include: {
        items: {
          include: {
            menu: true,
          },
        },
        // feedback: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};

// ==============================
// Update Order Status
// ==============================
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await prisma.order.update({
      where: {
        id: req.params.id,
      },

      data: {
        status,
      },
    });

    return res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

// ==============================
// Update Payment
// ==============================
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const order = await prisma.order.update({
      where: {
        id: req.params.id,
      },

      data: {
        paymentStatus,
      },
    });

    return res.json({
      success: true,
      message: "Payment updated",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update payment",
    });
  }
};

// ==============================
// Delete Order
// ==============================
export const deleteOrder = async (req, res) => {
  try {
    await prisma.order.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
};