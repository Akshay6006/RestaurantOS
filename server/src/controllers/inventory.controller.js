import prisma from "../prisma/prisma.js";

// ==========================
// Create Inventory
// ==========================
export const createInventory = async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      unit,
      purchasePrice,
      supplier,
      warehouse,
      lowStockThreshold,
    } = req.body;

    if (
      !name ||
      !category ||
      quantity === undefined ||
      !unit ||
      purchasePrice === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const inventory = await prisma.inventory.create({
      data: {
        name,
        category,
        quantity: Number(quantity),
        unit,
        purchasePrice: Number(purchasePrice),
        supplier,
        warehouse,
        lowStockThreshold: Number(lowStockThreshold || 10),
      },
    });

    res.status(201).json({
      success: true,
      message: "Inventory item created successfully",
      inventory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Get Inventory
// ==========================
export const getInventory = async (req, res) => {
  try {
    const inventory = await prisma.inventory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      inventory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Get Single Item
// ==========================
export const getInventoryById = async (req, res) => {
  try {
    const inventory = await prisma.inventory.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    res.status(200).json({
      success: true,
      inventory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Update Inventory
// ==========================
export const updateInventory = async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      unit,
      purchasePrice,
      supplier,
      warehouse,
      lowStockThreshold,
    } = req.body;

    const inventory = await prisma.inventory.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        category,
        quantity: Number(quantity),
        unit,
        purchasePrice: Number(purchasePrice),
        supplier,
        warehouse,
        lowStockThreshold: Number(lowStockThreshold),
      },
    });

    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      inventory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Delete Inventory
// ==========================
export const deleteInventory = async (req, res) => {
  try {
    await prisma.inventory.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Stock In
// ==========================
export const stockIn = async (req, res) => {
  try {
    const { quantity } = req.body;

    const item = await prisma.inventory.findUnique({
      where: {
        id: req.params.id,
      },
    });

    const inventory = await prisma.inventory.update({
      where: {
        id: req.params.id,
      },
      data: {
        quantity: item.quantity + Number(quantity),
      },
    });

    res.status(200).json({
      success: true,
      message: "Stock added successfully",
      inventory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Stock Out
// ==========================
export const stockOut = async (req, res) => {
  try {
    const { quantity } = req.body;

    const item = await prisma.inventory.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (item.quantity < Number(quantity)) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const inventory = await prisma.inventory.update({
      where: {
        id: req.params.id,
      },
      data: {
        quantity: item.quantity - Number(quantity),
      },
    });

    res.status(200).json({
      success: true,
      message: "Stock removed successfully",
      inventory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};