"use client";

import { motion } from "framer-motion";
import {
  Brain,
  IndianRupee,
  Wallet,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";

interface Props {
  data: {
    revenue: number;
    expenses: number;
    profit: number;
    profitMargin: number;
    averageOrderValue: number;
  };
}

export default function DashboardAIInsights({ data }: Props) {
  const insights = [
    {
      title: "Revenue",
      value: `₹${Number(data.revenue).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Expenses",
      value: `₹${Number(data.expenses).toLocaleString("en-IN")}`,
      icon: Wallet,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Profit",
      value: `₹${Number(data.profit).toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Average Order",
      value: `₹${Number(data.averageOrderValue).toLocaleString("en-IN")}`,
      icon: ShoppingBag,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
    >
      <div className="mb-8 flex items-center gap-3">
        <Brain className="text-violet-400" size={30} />

        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Business Insights
          </h2>

          <p className="text-slate-400">
            Live Business Analytics
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
            >
              <div className="flex items-center gap-4">
                <div className={`${item.bg} rounded-xl p-3`}>
                  <Icon
                    className={item.color}
                    size={26}
                  />
                </div>

                <div>
                  <p className="text-slate-400">
                    {item.title}
                  </p>

                  <h2 className={`text-2xl font-bold ${item.color}`}>
                    {item.value}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}