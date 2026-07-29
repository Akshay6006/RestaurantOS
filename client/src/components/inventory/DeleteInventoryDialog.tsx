"use client";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        <div className="p-6">

          <h2 className="text-xl font-bold text-gray-900">
            Delete Inventory
          </h2>

          <p className="mt-3 text-gray-600">
            Are you sure you want to delete
            <span className="font-semibold"> "{itemName}" </span>?
          </p>

          <p className="mt-2 text-sm text-red-500">
            This action cannot be undone.
          </p>

          <div className="mt-6 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="rounded-lg border px-5 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={onConfirm}
              className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}