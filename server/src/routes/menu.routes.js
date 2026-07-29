import express from "express";
import {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../controllers/menu.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createMenu);

router.get("/", protect, getMenus);

router.get("/:id", protect, getMenuById);

router.put("/:id", protect, updateMenu);

router.delete("/:id", protect, deleteMenu);

export default router;