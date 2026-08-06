"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Inventory } from "@/types/inventory";

interface Props {
  inventory: Inventory[];
  loading: boolean;
  onEdit: (item: Inventory) => void;
  onDelete: (item: Inventory) => void;
}

export default function InventoryTable({
  inventory,
  loading,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center text-slate-400">
        Loading inventory...
      </div>
    );
  }

  if (inventory.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center text-slate-400">
        No inventory items found.
      </div>
    );
  }

  const getStatus = (item: Inventory) => {
    if (item.quantity === 0) {
      return {
        label: "Out of Stock",
        color: "bg-red-500/20 text-red-400",
      };
    }

    if (item.quantity <= item.lowStockThreshold) {
      return {
        label: "Low Stock",
        color: "bg-yellow-500/20 text-yellow-400",
      };
    }

    return {
      label: "In Stock",
      color: "bg-emerald-500/20 text-emerald-400",
    };
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="border-b border-slate-800">
            <tr className="text-left text-sm font-semibold text-slate-400">
              <th className="pb-4 w-[320px]">Product</th>
              <th className="pb-4 text-center w-[120px]">Actions</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Qty</th>
              <th className="pb-4">Unit</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Supplier</th>
              <th className="pb-4">Warehouse</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => {
              const status = getStatus(item);

              return (
                <tr
                  key={item.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="py-5 pr-6">
                    <p className="font-semibold text-white break-words">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Stock ID: {item.id.slice(0, 8)}
                    </p>
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-700"
                        title="Edit"
                      >
                        <Pencil size={16} className="text-white" />
                      </button>

                      <button
                        onClick={() => onDelete(item)}
                        className="rounded-lg bg-red-600 p-2 transition hover:bg-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-white" />
                      </button>
                    </div>
                  </td>

                  <td className="text-white">
                    {item.category}
                  </td>

                  <td className="font-semibold text-white">
                    {item.quantity}
                  </td>

                  <td className="text-white">
                    {item.unit}
                  </td>

                  <td className="font-semibold text-emerald-400 whitespace-nowrap">
                    ₹{Number(item.purchasePrice).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="text-white">
                    {item.supplier || "-"}
                  </td>

                  <td className="text-white">
                    {item.warehouse || "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}