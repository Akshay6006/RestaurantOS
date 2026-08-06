"use client";

import { useEffect, useState } from "react";
import { createExpense } from "@/services/expense";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;

  initialData?: {
    title?: string;
    category?: string;
    amount?: number;
    paymentMethod?: string;
    vendor?: string;
    expenseDate?: string;
    notes?: string;
  };
}

export default function AddExpenseDialog({
  open,
  onClose,
  onSuccess,
  initialData,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    paymentMethod: "",
    vendor: "",
    expenseDate: "",
    notes: "",
  });

  useEffect(() => {
  if (!initialData) return;

  setForm({
    title: initialData.title || "",
    category: initialData.category || "",
    amount: initialData.amount?.toString() || "",
    paymentMethod: initialData.paymentMethod || "",
    vendor: initialData.vendor || "",
    expenseDate: initialData.expenseDate || "",
    notes: initialData.notes || "",
  });
}, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.category ||
      !form.amount ||
      !form.paymentMethod ||
      !form.expenseDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createExpense({
        title: form.title,
        category: form.category,
        amount: Number(form.amount),
        paymentMethod: form.paymentMethod,
        vendor: form.vendor,
        expenseDate: form.expenseDate,
        notes: form.notes,
      });

      setForm({
        title: "",
        category: "",
        amount: "",
        paymentMethod: "",
        vendor: "",
        expenseDate: "",
        notes: "",
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="max-w-2xl border-slate-700 bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <input
            className="rounded-lg bg-slate-800 p-3 outline-none"
            placeholder="Expense Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <select
            className="rounded-lg bg-slate-800 p-3 outline-none"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option>Inventory</option>
            <option>Rent</option>
            <option>Utilities</option>
            <option>Salary</option>
            <option>Transport</option>
            <option>Maintenance</option>
            <option>Marketing</option>
            <option>Miscellaneous</option>
          </select>

          <input
            type="number"
            className="rounded-lg bg-slate-800 p-3 outline-none"
            placeholder="Amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />

          <select
            className="rounded-lg bg-slate-800 p-3 outline-none"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Payment Method</option>
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Bank Transfer</option>
          </select>

          <input
            className="rounded-lg bg-slate-800 p-3 outline-none"
            placeholder="Vendor (Optional)"
            name="vendor"
            value={form.vendor}
            onChange={handleChange}
          />

          <input
            type="date"
            className="rounded-lg bg-slate-800 p-3 outline-none"
            name="expenseDate"
            value={form.expenseDate}
            onChange={handleChange}
          />

          <textarea
            rows={4}
            className="rounded-lg bg-slate-800 p-3 outline-none"
            placeholder="Notes (Optional)"
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-emerald-600 py-3 font-semibold transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Expense"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}