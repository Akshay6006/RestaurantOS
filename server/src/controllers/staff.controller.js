import prisma from "../prisma/prisma.js";

// Get all staff
export const getStaff = async (req, res) => {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(staff);
  } catch (error) {
    console.error("Get Staff Error:", error);
    res.status(500).json({
      message: "Failed to fetch staff.",
    });
  }
};

// Create staff
export const createStaff = async (req, res) => {
  try {
    const {
      fullName,
      photo,
      gender,
      dateOfBirth,
      phone,
      email,
      address,
      role,
      department,
      employmentType,
      shift,
      salary,
      joiningDate,
      emergencyContactName,
      emergencyRelationship,
      emergencyPhone,
    } = req.body;

    const employeeId = `EMP-${Date.now()}`;

    const staff = await prisma.staff.create({
      data: {
        employeeId,
        fullName,
        photo,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phone,
        email,
        address,
        role,
        department,
        employmentType,
        shift,
        salary: Number(salary),
        joiningDate: new Date(joiningDate),
        emergencyContactName,
        emergencyRelationship,
        emergencyPhone,
      },
    });

    res.status(201).json(staff);
  } catch (error) {
    console.error("Create Staff Error:", error);
    res.status(500).json({
      message: "Failed to create employee.",
    });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.staff.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Staff Error:", error);

    res.status(500).json({
      message: "Failed to delete employee.",
    });
  }
};
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      fullName,
      photo,
      gender,
      dateOfBirth,
      phone,
      email,
      address,
      role,
      department,
      employmentType,
      shift,
      salary,
      joiningDate,
      emergencyContactName,
      emergencyRelationship,
      emergencyPhone,
    } = req.body;

    const employee = await prisma.staff.update({
      where: { id },
      data: {
        fullName,
        photo,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phone,
        email,
        address,
        role,
        department,
        employmentType,
        shift,
        salary: Number(salary),
        joiningDate: new Date(joiningDate),
        emergencyContactName,
        emergencyRelationship,
        emergencyPhone,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    console.error("Update Staff Error:", error);

    res.status(500).json({
      message: "Failed to update employee.",
    });
  }
};