import express from "express";

import {
  getLeaves,
  createLeave,
  updateLeaveStatus,
  deleteLeave,
} from "../controllers/leave.controller.js";

const router = express.Router();

router.get("/", getLeaves);

router.post("/", createLeave);

router.put("/:id", updateLeaveStatus);

router.delete("/:id", deleteLeave);

export default router;