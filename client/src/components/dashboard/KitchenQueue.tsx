"use client";

import { motion } from "framer-motion";
import { ChefHat, Clock } from "lucide-react";

const kitchenOrders = [
  {
    id: "#ORD-1001",
    table: "Table 2",
    customer: "Rahul Sharma",
    status: "Preparing",
    time: "8 min",
  },
  {
    id: "#ORD-1002",
    table: "Table 5",
    customer: "Priya Singh",
    status: "Cooking",
    time: "5 min",
  },
  {
    id: "#ORD-1003",
    table: "Take Away",
    customer: "Amit Kumar",
    status: "Ready",
    time: "12 min",
  },
  {
    id: "#ORD-1004",
    table: "Table 8",
    customer: "Neha Patel",
    status: "Pending",
    time: "2 min",
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Ready":
      return "bg-emerald-500/20 text-emerald-400";

    case "Preparing":
      return "bg-blue-500/20 text-blue-400";

    case "Cooking":
      return "bg-orange-500/20 text-orange-400";

    default:
      return "bg-red-500/20 text-red-400";
  }
};

export default function KitchenQueue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl"
    >
      <div className="mb-6 flex items-center gap-3">

        <ChefHat className="text-orange-400" size={30} />

        <div>
          <h2 className="text-2xl font-bold text-white">
            Kitchen Queue
          </h2>

          <p className="text-sm text-slate-400">
            Live kitchen order status
          </p>
        </div>

      </div>

      <div className="space-y-4">

        {kitchenOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-slate-800 bg-slate-800/40 p-4 transition hover:border-emerald-500"
          >
            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-white">
                  {order.table}
                </h3>

                <p className="text-sm text-slate-400">
                  {order.customer}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {order.id}
                </p>

              </div>

              <div className="text-right">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

                <div className="mt-2 flex items-center justify-end gap-1 text-slate-400">
                  <Clock size={15} />
                  <span className="text-sm">{order.time}</span>
                </div>

              </div>

            </div>
          </div>
        ))}

      </div>
    </motion.div>
  );
}