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
      <div className="bg-white rounded-xl border shadow-sm p-10 text-center text-gray-500">
        Loading inventory...
      </div>
    );
  }

  if (inventory.length === 0) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-10 text-center text-gray-500">
        No inventory items found.
      </div>
    );
  }

  const getStatus = (item: Inventory) => {
    if (item.quantity === 0) {
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-700",
      };
    }

    if (item.quantity <= item.lowStockThreshold) {
      return {
        label: "Low Stock",
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "In Stock",
      color: "bg-green-100 text-green-700",
    };
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-50">
            <tr className="border-b">

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Quantity
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Unit
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Supplier
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Warehouse
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => {
              const status = getStatus(item);

              return (
                <tr
                  key={item.id}
                  className="border-b last:border-0 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {item.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {item.category}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {item.quantity}
                  </td>

                  <td className="px-6 py-4">
                    {item.unit}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    ₹{item.purchasePrice.toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    {item.supplier || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {item.warehouse || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">

                      <button
                        onClick={() => onEdit(item)}
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(item)}
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
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