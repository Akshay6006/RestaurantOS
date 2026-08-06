"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";

interface Props {
  open: boolean;
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteInventoryDialog({
  open,
  itemName,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
              <AlertTriangle
                size={24}
                className="text-red-400"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Delete Product
              </h2>

              <p className="text-sm text-slate-400">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-slate-300 leading-7">
            Are you sure you want to permanently delete
          </p>

          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">

            <p className="font-semibold text-red-300">
              {itemName}
            </p>

          </div>

          <div className="mt-8 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-5 py-3 text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={onConfirm}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              <Trash2 size={18} />

              {loading ? "Deleting..." : "Delete Product"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}