"use client";

import { motion } from "framer-motion";
import { ReceiptText } from "lucide-react";

const orders = [
  {
    id: "INV-240701",
    customer: "Rahul Sharma",
    table: "Table 2",
    amount: 580,
    payment: "Paid",
    status: "Completed",
  },
  {
    id: "INV-240702",
    customer: "Priya Singh",
    table: "Table 6",
    amount: 920,
    payment: "Paid",
    status: "Preparing",
  },
  {
    id: "INV-240703",
    customer: "Amit Kumar",
    table: "Take Away",
    amount: 430,
    payment: "Pending",
    status: "Cooking",
  },
  {
    id: "INV-240704",
    customer: "Neha Patel",
    table: "Table 4",
    amount: 1180,
    payment: "Paid",
    status: "Ready",
  },
  {
    id: "INV-240705",
    customer: "Rohit Verma",
    table: "Delivery",
    amount: 760,
    payment: "Pending",
    status: "Pending",
  },
];

const paymentColor = (payment: string) => {
  return payment === "Paid"
    ? "bg-emerald-500/20 text-emerald-400"
    : "bg-red-500/20 text-red-400";
};

const statusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-500/20 text-emerald-400";

    case "Preparing":
      return "bg-blue-500/20 text-blue-400";

    case "Cooking":
      return "bg-orange-500/20 text-orange-400";

    case "Ready":
      return "bg-purple-500/20 text-purple-400";

    default:
      return "bg-red-500/20 text-red-400";
  }
};

export default function RecentOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <ReceiptText className="text-emerald-400" size={28} />

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Orders
          </h2>

          <p className="text-sm text-slate-400">
            Latest customer orders
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="pb-4 text-slate-400">Invoice</th>
              <th className="pb-4 text-slate-400">Customer</th>
              <th className="pb-4 text-slate-400">Table</th>
              <th className="pb-4 text-right text-slate-400">Amount</th>
              <th className="pb-4 text-center text-slate-400">Payment</th>
              <th className="pb-4 text-center text-slate-400">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-800 hover:bg-slate-800/40 transition"
              >
                <td className="py-4 font-medium text-white">
                  {order.id}
                </td>

                <td className="text-slate-300">
                  {order.customer}
                </td>

                <td className="text-slate-300">
                  {order.table}
                </td>

                <td className="text-right font-semibold text-emerald-400">
                  ${order.amount}
                </td>

                <td className="text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentColor(
                      order.payment
                    )}`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td className="text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </motion.div>
  );
}