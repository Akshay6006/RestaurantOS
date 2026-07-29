"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createMenu } from "@/services/menu";

interface Props {
  open: boolean;
  onClose: () => void;
  refreshMenus: () => void;
}

export default function AddDishModal({
  open,
  onClose,
  refreshMenus,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Indian",
    price: "",
    image: "",
    available: true,
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createMenu({
        ...form,
        price: Number(form.price),
      });

      refreshMenus();

      setForm({
        name: "",
        description: "",
        category: "Indian",
        price: "",
        image: "",
        available: true,
      });

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create menu item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Add New Dish
          </h2>

          <button onClick={onClose}>
            <X className="text-slate-400 hover:text-white" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Dish Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
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
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
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
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Dish"}
          </button>
        </div>
      </div>
    </div>
  );
}