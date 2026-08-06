"use client";

import { useEffect, useState } from "react";
import { generateDashboardReport } from "@/services/dashboard";
import {
  IndianRupee,
  ShoppingCart,
  Users,
  Star,
  UserCheck,
  UserMinus,
  CalendarClock,
} from "lucide-react";
import RestaurantAI from "@/components/dashboard/RestaurantAI";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import OrdersChart from "@/components/dashboard/OrdersChart";
import TopSelling from "@/components/dashboard/TopSelling";
import KitchenQueue from "@/components/dashboard/KitchenQueue";
import RecentOrders from "@/components/dashboard/RecentOrders";
import RecentFeedback from "@/components/dashboard/RecentFeedback";
// import DashboardAIInsights from "@/components/dashboard/DashboardAIInsights";

import { getDashboardStats } from "@/services/dashboard";

const initialDashboard = {
  totalRevenue: 0,
  totalOrders: 0,
  totalCustomers: 0,
  averageRating: 0,

  totalEmployees: 0,
  presentToday: 0,
  absentToday: 0,
  leaveToday: 0,
  pendingLeaveRequests: 0,

  pendingOrders: 0,
  preparingOrders: 0,
  readyOrders: 0,
  servedOrders: 0,

  revenueChart: [],
  orderTypes: [] as {
  name: string;
  value: number;
}[],
topSelling: [] as any[],
kitchenQueue: [] as any[],
recentOrders: [] as any[],
recentFeedback: [] as any[],

  aiInsights: {
    revenue: 0,
    expenses: 0,
    profit: 0,
    profitMargin: 0,
    averageOrderValue: 0,
  } as {
    revenue: number;
    expenses: number;
    profit: number;
    profitMargin: number;
    averageOrderValue: number;
  },

  inventoryInsights: {
    healthyStock: 0,
    lowStock: [],
    outOfStock: [],
    purchaseRecommendations: [],
  } as {
    healthyStock: number;
    lowStock: any[];
    outOfStock: any[];
    purchaseRecommendations: any[];
  },

  recommendations: [] as {
    type: string;
    title: string;
    message: string;
  }[],

  dailySummary: {
  revenue: 0,
  expenses: 0,
  profit: 0,
  totalOrders: 0,
  bestSeller: "",
  lowStock: 0,
  outOfStock: 0,
  healthScore: 0,
},
};

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const generateReport = async () => {
    try {
      const blob = await generateDashboardReport();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Restaurant_Report.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate report");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDashboardStats();

      setDashboard({
        ...initialDashboard,
        ...data,
      });
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="rounded-xl border border-red-700 bg-red-900/30 p-6 text-center">
          <h2 className="text-xl font-bold text-red-400">
            Dashboard Error
          </h2>

          <p className="mt-3 text-slate-300">{error}</p>

          <button
            onClick={fetchDashboard}
            className="mt-5 rounded-lg bg-emerald-600 px-5 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-6 lg:p-8">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Restaurant Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Welcome back 👋 Here's today's restaurant performance.
          </p>
        </div>

        <button
  onClick={generateReport}
  className="w-full md:w-auto rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
>
  Generate Report
</button>
      </div>

      <div className="mb-8 grid gap-6 grid-cols-1
sm:grid-cols-2
xl:grid-cols-4">
        <StatCard
  title="Revenue"
  value={`₹${Number(dashboard.totalRevenue).toLocaleString("en-IN")}`}
  icon={IndianRupee}
  color="bg-emerald-600"
  change=""
/>

        <StatCard
          title="Orders"
          value={dashboard.totalOrders}
          icon={ShoppingCart}
          color="bg-blue-600"
          change=""
        />

        <StatCard
          title="Customers"
          value={dashboard.totalCustomers}
          icon={Users}
          color="bg-purple-600"
          change=""
        />

        <StatCard
          title="Rating"
          value={Number(dashboard.averageRating).toFixed(1)}
          icon={Star}
          color="bg-yellow-500"
          change=""
        />
      </div>
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <StatCard
    title="Employees"
    value={dashboard.totalEmployees}
    icon={Users}
    color="bg-indigo-600"
    change=""
  />

  <StatCard
    title="Present Today"
    value={dashboard.presentToday}
    icon={UserCheck}
    color="bg-green-600"
    change=""
  />

  <StatCard
    title="Absent Today"
    value={dashboard.absentToday}
    icon={UserMinus}
    color="bg-red-600"
    change=""
  />

  <StatCard
    title="Pending Leaves"
    value={dashboard.pendingLeaveRequests}
    icon={CalendarClock}
    color="bg-yellow-500"
    change=""
  />

</div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <RevenueChart data={dashboard.revenueChart} />
        <OrdersChart data={dashboard.orderTypes} />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <TopSelling data={dashboard.topSelling} />
        <KitchenQueue data={dashboard.kitchenQueue} />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <RecentOrders data={dashboard.recentOrders} />
        <RecentFeedback data={dashboard.recentFeedback} />
      </div>

      <RestaurantAI
  inventory={dashboard.inventoryInsights}
  recommendations={dashboard.recommendations}
  summary={dashboard.dailySummary}
/>
    </main>
  );
}
