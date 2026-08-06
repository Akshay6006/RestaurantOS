import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js";;
import feedbackRoutes from "./routes/feedback.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/expenses", expenseRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RestaurantOS Backend Running 🚀",
  });
});

export default app;