"use client";

import { useEffect, useState } from "react";
import DashboardAIInsights from "@/components/dashboard/DashboardAIInsights";
import { getDashboardStats } from "@/services/dashboard";

export default function AIInsightsPage() {
  const [data, setData] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0,
    profitMargin: 0,
    averageOrderValue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const dashboard = await getDashboardStats();

      setData(dashboard.aiInsights);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Loading AI Insights...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <DashboardAIInsights data={data} />
    </main>
  );
}