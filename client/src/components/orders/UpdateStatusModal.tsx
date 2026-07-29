"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Order } from "@/types/order";
import { updateOrderStatus } from "@/services/order";

interface Props {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  refreshOrders: () => void;
}

export default function UpdateStatusModal({
  open,
  order,
  onClose,
  refreshOrders,
}: Props) {
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  if (!open || !order) return null;

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateOrderStatus(order.id, status);

      await refreshOrders();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Update Order Status
          </h2>

          <button onClick={onClose}>
            <X className="text-slate-400 hover:text-white" />
          </button>

        </div>

        <div className="space-y-5">

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          >
            <option value="PENDING">Pending</option>
            <option value="PREPARING">Preparing</option>
            <option value="READY">Ready</option>
            <option value="SERVED">Served</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Status"}
          </button>

        </div>

      </div>

    </div>
  );
}