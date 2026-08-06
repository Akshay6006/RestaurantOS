import prisma from "../prisma/prisma.js";

// Get today's attendance
export const getAttendance = async (req, res) => {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        staff: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(attendance);
  } catch (error) {
    console.error("Get Attendance Error:", error);

    res.status(500).json({
      message: "Failed to fetch attendance.",
    });
  }
};

// Mark attendance
export const createAttendance = async (req, res) => {
  try {
    const {
      staffId,
      date,
      status,
      checkIn,
      checkOut,
      remarks,
    } = req.body;

    const alreadyMarked = await prisma.attendance.findFirst({
  where: {
    staffId,
    date: new Date(date),
  },
});

if (alreadyMarked) {
  return res.status(400).json({
    message: "Attendance already marked for today.",
  });
}

    const attendance = await prisma.attendance.create({
      data: {
        staffId,
        date: new Date(date),
        status,
        checkIn,
        checkOut,
        remarks,
      },
    });

    res.status(201).json(attendance);
  } catch (error) {
    console.error("Create Attendance Error:", error);

    res.status(500).json({
      message: "Failed to mark attendance.",
    });
  }
};