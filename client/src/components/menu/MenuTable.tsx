"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Menu } from "@/types/menu";

interface MenuTableProps {
  menus: Menu[];
  loading: boolean;
  onEdit: (menu: Menu) => void;
  onDelete: (menu: Menu) => void;
}

export default function MenuTable({
  menus,
  loading,
  onEdit,
  onDelete,
}: MenuTableProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />

        <p className="mt-5 text-slate-400">
          Loading menu...
        </p>
      </div>
    );
  }

  if (menus.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Dishes Found
        </h2>

        <p className="mt-3 text-slate-400">
          Click{" "}
          <span className="font-semibold text-emerald-400">
            Add Dish
          </span>{" "}
          to create your first menu item.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="bg-slate-950">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Dish
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Price
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {menus.map((menu) => (
            <tr
              key={menu.id}
              className="border-t border-slate-800 hover:bg-slate-800/40 transition"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800 overflow-hidden">
                    {menu.image ? (
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">🍽️</span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {menu.name}
                    </h3>

                    <p className="line-clamp-1 text-sm text-slate-400">
                      {menu.description}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-slate-300">
                {menu.category}
              </td>

              <td className="px-6 py-4 font-semibold text-emerald-400">
                ${menu.price}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    menu.available
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {menu.available
                    ? "Available"
                    : "Unavailable"}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(menu)}
                    className="rounded-lg bg-blue-500/20 p-2 text-blue-400 transition hover:bg-blue-500/30"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(menu)}
                    className="rounded-lg bg-red-500/20 p-2 text-red-400 transition hover:bg-red-500/30"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}