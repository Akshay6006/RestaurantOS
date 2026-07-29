"use client";

import { Plus, Trash2 } from "lucide-react";

interface Menu {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface SelectedItem {
  menuId: string;
  quantity: number;
}

interface Props {
  menus: Menu[];
  items: SelectedItem[];
  addItem: () => void;
  removeItem: (index: number) => void;
  updateItem: (
    index: number,
    field: keyof SelectedItem,
    value: string | number
  ) => void;
}

export default function OrderItems({
  menus,
  items,
  addItem,
  removeItem,
  updateItem,
}: Props) {
  const getPrice = (menuId: string) => {
    return menus.find((m) => m.id === menuId)?.price || 0;
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Order Items
        </h2>

        <button
          onClick={addItem}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
        >
          <Plus size={18} />
          Add Dish
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => {
          const price = getPrice(item.menuId);
          const total = price * item.quantity;

          return (
            <div
              key={index}
              className="grid gap-4 rounded-xl border border-slate-700 bg-slate-950 p-4 lg:grid-cols-12"
            >
              {/* Dish */}
              <div className="lg:col-span-6">
                <label className="mb-2 block text-sm text-slate-400">
                  Dish
                </label>

                <select
                  value={item.menuId}
                  onChange={(e) =>
                    updateItem(index, "menuId", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-500"
                >
                  <option value="">Select Dish</option>

                  {menus.map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {menu.name} (${menu.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm text-slate-400">
                  Qty
                </label>

                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-center text-white outline-none focus:border-emerald-500"
                />
              </div>

              {/* Price */}
              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm text-slate-400">
                  Price
                </label>

                <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-center font-semibold text-emerald-400">
                  ${price.toFixed(2)}
                </div>
              </div>

              {/* Total */}
              <div className="lg:col-span-1">
                <label className="mb-2 block text-sm text-slate-400">
                  Total
                </label>

                <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-center font-bold text-white">
                  ${total.toFixed(2)}
                </div>
              </div>

              {/* Delete */}
              <div className="flex items-end lg:col-span-1">
                <button
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  className="w-full rounded-xl bg-red-600 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 className="mx-auto" size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}