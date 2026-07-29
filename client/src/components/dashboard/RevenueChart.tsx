"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

const revenueData = [
  { day: "Mon", revenue: 420 },
  { day: "Tue", revenue: 610 },
  { day: "Wed", revenue: 520 },
  { day: "Thu", revenue: 890 },
  { day: "Fri", revenue: 1100 },
  { day: "Sat", revenue: 1650 },
  { day: "Sun", revenue: 1320 },
];

export default function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl"
    >
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Revenue Overview
          </h2>

          <p className="text-sm text-slate-400">
            Last 7 Days Revenue
          </p>
        </div>

        <div className="rounded-xl bg-emerald-500/20 px-4 py-2">
          <span className="font-semibold text-emerald-400">
            +18%
          </span>
        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={revenueData}>

            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#10b981"
                  stopOpacity={0.8}
                />

                <stop
                  offset="100%"
                  stopColor="#10b981"
                  stopOpacity={0}
                />

              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#334155"
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}