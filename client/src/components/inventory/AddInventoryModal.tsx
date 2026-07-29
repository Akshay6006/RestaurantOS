"use client";

import { useEffect, useState } from "react";
import { InventoryFormData } from "@/types/inventory";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: InventoryFormData) => void | Promise<void>;
}

const initialState: InventoryFormData = {
  name: "",
  category: "",
  quantity: 0,
  unit: "",
  purchasePrice: 0,
  supplier: "",
  warehouse: "",
  lowStockThreshold: 10,
};

export default function AddInventoryModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initialState);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-bold">
            Add Inventory Item
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Product Name
              </label>

              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Category
              </label>

              <input
                required
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Quantity
              </label>

              <input
                required
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Unit
              </label>

              <input
                required
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="Kg, Litre, Piece..."
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Purchase Price
              </label>

              <input
                required
                type="number"
                name="purchasePrice"
                value={form.purchasePrice}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Supplier
              </label>

              <input
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Warehouse
              </label>

              <input
                name="warehouse"
                value={form.warehouse}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Low Stock Threshold
              </label>

              <input
                required
                type="number"
                name="lowStockThreshold"
                value={form.lowStockThreshold}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2.5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Add Item"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}