"use client";

import { Trash2, X } from "lucide-react";
import { deleteMenu } from "@/services/menu";
import { Menu } from "@/types/menu";
import { useState } from "react";

interface Props {
  open: boolean;
  menu: Menu | null;
  onClose: () => void;
  refreshMenus: () => void;
}

export default function DeleteDialog({
  open,
  menu,
  onClose,
  refreshMenus,
}: Props) {
  const [loading, setLoading] = useState(false);

  if (!open || !menu) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteMenu(menu.id);

      await refreshMenus();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to delete menu item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6 shadow-2xl">

        <div className="mb-5 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-500/20 p-3">
              <Trash2 className="text-red-500" size={22} />
            </div>

            <h2 className="text-xl font-bold text-white">
              Delete Dish
            </h2>
          </div>

          <button onClick={onClose}>
            <X className="text-slate-400 hover:text-white" />
          </button>

        </div>

        <p className="text-slate-300 leading-7">
          Are you sure you want to delete
          <span className="font-semibold text-red-400">
            {" "}
            {menu.name}
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-slate-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2 text-white hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}