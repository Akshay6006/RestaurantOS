"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Revenue",
    value: "$24,500",
    change: "+18%",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "1,284",
    change: "+12%",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "864",
    change: "+8%",
    icon: Users,
  },
  {
    title: "Inventory Items",
    value: "215",
    change: "-3%",
    icon: Package,
  },
];

export default function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">{item.title}</p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h2>
              </div>

              <div className="rounded-xl bg-emerald-500/20 p-4">
                <Icon className="text-emerald-400" size={24} />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-emerald-400">
              <ArrowUpRight size={18} />
              <span>{item.change} this month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}