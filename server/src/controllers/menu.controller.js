import prisma from "../prisma/prisma.js";

// Create Menu
export const createMenu = async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const menu = await prisma.menu.create({
      data: {
        name,
        description,
        price: Number(price),
        category,
        image,
        available,
      },
    });

    res.status(201).json({
      success: true,
      message: "Menu created successfully",
      menu,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Menus
export const getMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      menus,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Single Menu
export const getMenuById = async (req, res) => {
  try {
    const menu = await prisma.menu.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Menu
export const updateMenu = async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;

    const menu = await prisma.menu.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        description,
        price: Number(price),
        category,
        image,
        available,
      },
    });

    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      menu,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Menu
export const deleteMenu = async (req, res) => {
  try {
    await prisma.menu.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};