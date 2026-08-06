"use client";

import { useEffect, useState } from "react";
import { X, Pencil } from "lucide-react";
import { Inventory, InventoryFormData } from "@/types/inventory";

interface Props {
  open: boolean;
  item: Inventory;
  onClose: () => void;
  onSubmit: (data: InventoryFormData) => void | Promise<void>;
}

export default function EditInventoryModal({
  open,
  item,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<InventoryFormData>({
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    purchasePrice: 0,
    supplier: "",
    warehouse: "",
    lowStockThreshold: 10,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unit: item.unit,
        purchasePrice: item.purchasePrice,
        supplier: item.supplier || "",
        warehouse: item.warehouse || "",
        lowStockThreshold: item.lowStockThreshold,
      });
    }
  }, [item]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quantity" ||
        name === "purchasePrice" ||
        name === "lowStockThreshold"
          ? Number(value)
          : value,
    }));
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-emerald-500";

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSaving(true);

    try {
      await onSubmit(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5">

      <div className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-800 p-6">

          <div className="flex items-center gap-3">

            <Pencil className="text-blue-400" />

            <div>

              <h2 className="text-3xl font-bold text-white">
                Edit Product
              </h2>

              <p className="mt-1 text-slate-400">
                Update inventory product information.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-6"
        >

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Product Name
              </label>

              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <input
                required
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Quantity
              </label>

              <input
                required
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Unit
              </label>

              <input
                required
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Purchase Price
              </label>

              <input
                required
                type="number"
                name="purchasePrice"
                value={form.purchasePrice}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Low Stock Alert
              </label>

              <input
                required
                type="number"
                name="lowStockThreshold"
                value={form.lowStockThreshold}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Supplier
              </label>

              <input
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Warehouse
              </label>

              <input
                name="warehouse"
                value={form.warehouse}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

          </div>

          <div className="flex justify-end gap-4 border-t border-slate-800 pt-6">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-6 py-3 text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}