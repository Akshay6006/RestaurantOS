"use client";

import { useEffect, useState } from "react";

import { Order } from "@/types/order";
import { getOrders } from "@/services/order";

import KitchenColumn from "./KitchenColumn";

export default function KitchenBoard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getOrders();

      setOrders(res.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const pending = orders.filter(
    (o) => o.status === "PENDING"
  );

  const preparing = orders.filter(
    (o) => o.status === "PREPARING"
  );

  const ready = orders.filter(
    (o) => o.status === "READY"
  );

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Kitchen Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Live order tracking for chefs
        </p>

      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">
          Loading kitchen orders...
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">

          <KitchenColumn
            title="Pending"
            status="PENDING"
            orders={pending}
            refresh={fetchOrders}
          />

          <KitchenColumn
            title="Preparing"
            status="PREPARING"
            orders={preparing}
            refresh={fetchOrders}
          />

          <KitchenColumn
            title="Ready"
            status="READY"
            orders={ready}
            refresh={fetchOrders}
          />

        </div>
      )}

    </div>
  );
}