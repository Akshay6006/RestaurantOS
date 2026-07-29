"use client";

import { Plus, Save, Trash2 } from "lucide-react";
import { ExtractedInvoiceItem } from "@/types/invoice";

interface Props {
  items: ExtractedInvoiceItem[];
  setItems: React.Dispatch<
    React.SetStateAction<ExtractedInvoiceItem[]>
  >;
  onSave: () => void;
  saving?: boolean;
}

export default function ExtractedItemsTable({
  items,
  setItems,
  onSave,
  saving = false,
}: Props) {
  if (items.length === 0) return null;

  const updateItem = (
    index: number,
    field: keyof ExtractedInvoiceItem,
    value: any
  ) => {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]:
        field === "quantity" ||
        field === "purchasePrice" ||
        field === "confidence"
          ? Number(value)
          : value,
    };

    setItems(updated);
  };

  const removeItem = (index: number) => {
    const updated = [...items];

    updated.splice(index, 1);

    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        name: "",
        category: "",
        quantity: 1,
        unit: "pcs",
        purchasePrice: 0,
        supplier: "",
        warehouse: "",
        confidence: 100,
      },
    ]);
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-6">

        <div>

          <h2 className="text-2xl font-bold">
            AI Extracted Items
          </h2>

          <p className="mt-1 text-gray-500">
            Review and edit before saving.
          </p>

        </div>

        <button
          onClick={addItem}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Item
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-4 py-3 text-left">
                Product
              </th>

              <th className="px-4 py-3 text-left">
                Category
              </th>

              <th className="px-4 py-3 text-left">
                Qty
              </th>

              <th className="px-4 py-3 text-left">
                Unit
              </th>

              <th className="px-4 py-3 text-left">
                Price
              </th>

              <th className="px-4 py-3 text-left">
                Confidence
              </th>

              <th className="px-4 py-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {items.map((item, index) => (

              <tr
                key={index}
                className="border-t"
              >

                <td className="p-3">

                  <input
                    value={item.name}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-3 py-2"
                  />

                </td>

                <td className="p-3">

                  <input
                    value={item.category}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "category",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-3 py-2"
                  />

                </td>

                <td className="p-3">

                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                    className="w-24 rounded-lg border px-3 py-2"
                  />

                </td>

                <td className="p-3">

                  <input
                    value={item.unit}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "unit",
                        e.target.value
                      )
                    }
                    className="w-24 rounded-lg border px-3 py-2"
                  />

                </td>

                <td className="p-3">

                  <input
                    type="number"
                    value={item.purchasePrice}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "purchasePrice",
                        e.target.value
                      )
                    }
                    className="w-28 rounded-lg border px-3 py-2"
                  />

                </td>

                <td className="p-3">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      (item.confidence ?? 0) >= 90
                        ? "bg-green-100 text-green-700"
                        : (item.confidence ?? 0) >= 70
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.confidence ?? 100}%
                  </span>

                </td>

                <td className="p-3 text-center">

                  <button
                    onClick={() =>
                      removeItem(index)
                    }
                    className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                  >
                    <Trash2 size={16} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="flex justify-end border-t p-6">

        <button
          disabled={saving}
          onClick={onSave}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          <Save size={18} />

          {saving
            ? "Saving..."
            : "Save to Inventory"}

        </button>

      </div>

    </div>
  );
}