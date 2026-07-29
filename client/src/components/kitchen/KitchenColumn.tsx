"use client";

import { Order } from "@/types/order";
import KitchenCard from "./KitchenCard";

interface Props {
  title: string;
  status: string;
  orders: Order[];
  refresh: () => void;
}

export default function KitchenColumn({
  title,
  status,
  orders,
  refresh,
}: Props) {
  const headerColor = () => {
    switch (status) {
      case "PENDING":
        return "border-yellow-500 text-yellow-400";

      case "PREPARING":
        return "border-blue-500 text-blue-400";

      case "READY":
        return "border-green-500 text-green-400";

      default:
        return "border-slate-700 text-white";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900">

      <div
        className={`flex items-center justify-between border-b px-5 py-4 ${headerColor()}`}
      >
        <h2 className="text-lg font-bold">{title}</h2>

        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-white">
          {orders.length}
        </span>
      </div>

      <div className="space-y-4 p-4">

        {orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-slate-500">
            No orders
          </div>
        ) : (
          orders.map((order) => (
            <KitchenCard
              key={order.id}
              order={order}
              refresh={refresh}
            />
          ))
        )}

      </div>

    </div>
  );
}