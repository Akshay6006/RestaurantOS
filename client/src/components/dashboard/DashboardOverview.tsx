"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  DollarSign,
  Clock3,
  CheckCircle,
} from "lucide-react";

import { getDashboardStats } from "@/services/dashboard";

interface DashboardData {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  preparingOrders: number;
  readyOrders: number;
  servedOrders: number;
  recentOrders: any[];
}

export default function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await getDashboardStats();

      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-2xl bg-slate-900"
          />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const cards = [
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: ShoppingBag,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Revenue",
      value: `$${Number(data.totalRevenue).toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Pending Orders",
      value: data.pendingOrders,
      icon: Clock3,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Served Orders",
      value: data.servedOrders,
      icon: CheckCircle,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-xl p-4 ${card.bg}`}
              >
                <Icon
                  className={card.color}
                  size={30}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}