"use client";

import { Order } from "@/types/order";
import { ChefHat } from "lucide-react";

interface Props {
  orders: Order[];
  loading: boolean;
  onStatus: (order: Order) => void;
}

export default function OrdersTable({
  orders,
  loading,
  onStatus,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <p className="mt-5 text-slate-400">Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center">
        <ChefHat
          size={55}
          className="mx-auto text-emerald-500"
        />

        <h2 className="mt-4 text-2xl font-bold text-white">
          No Orders Yet
        </h2>

        <p className="mt-2 text-slate-400">
          Click <b>Create Order</b> to place your first
          order.
        </p>
      </div>
    );
  }

  const badge = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";

      case "PREPARING":
        return "bg-blue-500/20 text-blue-400";

      case "READY":
        return "bg-green-500/20 text-green-400";

      case "SERVED":
        return "bg-purple-500/20 text-purple-400";

      default:
        return "bg-red-500/20 text-red-400";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <table className="w-full">

        <thead className="bg-slate-950">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Customer
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Table
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Items
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Total
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order.id}
              className="border-t border-slate-800 hover:bg-slate-800/40"
            >

              <td className="px-6 py-5">

                <h3 className="font-semibold text-white">
                  {order.customerName}
                </h3>

              </td>

              <td className="px-6 py-5 text-slate-300">
                #{order.tableNumber}
              </td>

              <td className="px-6 py-5 text-slate-300">
                {order.items.length}
              </td>

             <td className="text-emerald-400 font-bold">
  ₹{Number(order.totalAmount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</td>

              <td className="px-6 py-5">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

              </td>

              <td className="px-6 py-5 text-center">

                <button
                  onClick={() => onStatus(order)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Update Status
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}