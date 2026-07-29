"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { updateMenu } from "@/services/menu";
import { Menu } from "@/types/menu";

interface Props {
  open: boolean;
  menu: Menu | null;
  onClose: () => void;
  refreshMenus: () => void;
}

export default function EditDishModal({
  open,
  menu,
  onClose,
  refreshMenus,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    available: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (menu) {
      setForm({
        name: menu.name,
        description: menu.description,
        category: menu.category,
        price: String(menu.price),
        image: menu.image || "",
        available: menu.available,
      });
    }
  }, [menu]);

  if (!open || !menu) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateMenu(menu.id, {
        ...form,
        price: Number(form.price),
      });

      refreshMenus();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update dish.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Edit Dish
          </h2>

          <button onClick={onClose}>
            <X className="text-slate-400 hover:text-white" />
          </button>
        </div>

        <div className="space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Dish Name"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          >
            <option>Indian</option>
            <option>Chinese</option>
            <option>Italian</option>
            <option>Fast Food</option>
            <option>Dessert</option>
            <option>Beverage</option>
          </select>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          />

          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
            Available
          </label>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Dish"}
          </button>

        </div>

      </div>
    </div>
  );
}