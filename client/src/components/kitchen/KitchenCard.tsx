"use client";

import { Clock, ChefHat } from "lucide-react";

import { Order } from "@/types/order";
import { updateOrderStatus } from "@/services/order";

interface Props {
  order: Order;
  refresh: () => void;
}

export default function KitchenCard({
  order,
  refresh,
}: Props) {
  const nextStatus = () => {
    switch (order.status) {
      case "PENDING":
        return "PREPARING";

      case "PREPARING":
        return "READY";

      case "READY":
        return "SERVED";

      default:
        return null;
    }
  };

  const buttonText = () => {
    switch (order.status) {
      case "PENDING":
        return "Start Cooking";

      case "PREPARING":
        return "Mark Ready";

      case "READY":
        return "Serve Order";

      default:
        return "";
    }
  };

  const handleNext = async () => {
    const status = nextStatus();

    if (!status) return;

    try {
      await updateOrderStatus(order.id, status);
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 shadow-sm transition hover:border-emerald-500">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-bold text-white">
            {order.customerName}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Table #{order.tableNumber}
          </p>

        </div>

        <ChefHat className="text-emerald-400" size={24} />

      </div>

      <div className="mt-5">

        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Order Items
        </h4>

        <div className="space-y-2">

          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2"
            >
              <span className="text-white">
                {item.menu.name}
              </span>

              <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-emerald-400">
                × {item.quantity}
              </span>
            </div>
          ))}

        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">

        <div>

          <p className="text-xs text-slate-500">
            Total
          </p>

          <h3 className="text-xl font-bold text-emerald-400">
            ${order.totalAmount.toFixed(2)}
          </h3>

        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock size={16} />
          {new Date(order.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

      </div>

      {nextStatus() && (
        <button
          onClick={handleNext}
          className="mt-5 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          {buttonText()}
        </button>
      )}

    </div>
  );
}