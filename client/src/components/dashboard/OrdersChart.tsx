"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface OrderType {
  name: string;
  value: number;
}

interface OrdersChartProps {
  data: OrderType[];
}

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
];

export default function OrdersChart({
  data,
}: OrdersChartProps) {
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
            Order Types
          </h2>

          <p className="text-sm text-slate-400">
            Distribution of today's orders
          </p>
        </div>

        <div className="rounded-xl bg-blue-500/20 px-4 py-2">
          <span className="font-semibold text-blue-400">
            100 Orders
          </span>
        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>
    </motion.div>
  );
}