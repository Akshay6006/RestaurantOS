import prisma from "../prisma/prisma.js";

// Get all leave requests
export const getLeaves = async (req, res) => {
  try {
    const leaves = await prisma.leave.findMany({
      include: {
        staff: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(leaves);
  } catch (error) {
    console.error("Get Leaves Error:", error);

    res.status(500).json({
      message: "Failed to fetch leave requests.",
    });
  }
};

// Apply leave
export const createLeave = async (req, res) => {
  try {
    const {
      staffId,
      leaveType,
      startDate,
      endDate,
      reason,
    } = req.body;

    const leave = await prisma.leave.create({
      data: {
        staffId,
        leaveType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
      },
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error("Create Leave Error:", error);

    res.status(500).json({
      message: "Failed to apply leave.",
    });
  }
};

// Update leave status
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await prisma.leave.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    res.status(200).json(leave);
  } catch (error) {
    console.error("Update Leave Error:", error);

    res.status(500).json({
      message: "Failed to update leave.",
    });
  }
};

// Delete leave request
export const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.leave.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Leave deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Leave Error:", error);

    res.status(500).json({
      message: "Failed to delete leave.",
    });
  }
};