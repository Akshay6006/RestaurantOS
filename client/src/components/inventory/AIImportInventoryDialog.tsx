"use client";

import { useRef, useState } from "react";
import { Sparkles, Upload, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  extractInventoryInvoice,
  createInventory,
} from "@/services/inventory";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AIImportInventoryDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const fileInput = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<any[]>([]);

  const handleChooseFile = () => {
    fileInput.current?.click();
  };

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const response = await extractInventoryInvoice(file);

      setItems(response.items || []);
    } catch (err: any) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to extract invoice."
      );
    } finally {
      setLoading(false);

      e.target.value = "";
    }
  };

  const handleSaveAll = async () => {
  try {
    setLoading(true);

    for (const item of items) {
      await createInventory({
        name: item.name,
        category: item.category,
        quantity: Number(item.quantity),
        unit: item.unit,
        purchasePrice: Number(item.purchasePrice),
        supplier: "AI Imported",
        warehouse: "Main Warehouse",
        lowStockThreshold: 10,
      });
    }

    alert(`${items.length} items imported successfully.`);

    setItems([]);

    onSuccess();

    onClose();
  } catch (err) {
    console.error(err);
    alert("Failed to import inventory.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-7xl w-[95vw] border border-slate-800 bg-slate-900 text-white">

        <DialogHeader>

          <DialogTitle className="flex items-center gap-2">

            <Sparkles className="text-purple-400" />

            AI Inventory Import

          </DialogTitle>

        </DialogHeader>

        <input
          ref={fileInput}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={handleUpload}
        />

        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/40 py-16 text-center">

            <Button
              onClick={handleChooseFile}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                  Reading Invoice...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />

                  Upload Invoice
                </>
              )}
            </Button>

          </div>
        ) : (
          <div className="space-y-5">

  <div className="flex items-center justify-between">

    <div>

      <h3 className="text-xl font-semibold">
        AI Extracted Products
      </h3>

      <p className="text-sm text-muted-foreground">
        Review the extracted items before importing.
      </p>

    </div>

    <Button
      variant="outline"
      onClick={handleChooseFile}
    >
      Upload Another
    </Button>

  </div>

  
<div className="max-h-[500px] overflow-auto rounded-2xl border border-slate-800 bg-slate-950">
    <table className="w-full">

      <thead className="sticky top-0 bg-slate-900">

        <tr>

          <th className="p-4 text-left text-sm font-semibold text-slate-300">
            Product
          </th>

          <th className="p-4 text-left text-sm font-semibold text-slate-300">
            Category
          </th>

          <th className="p-4 text-left text-sm font-semibold text-slate-300">
            Qty
          </th>

          <th className="p-4 text-left text-sm font-semibold text-slate-300">
            Unit
          </th>

          <th className="p-4 text-left text-sm font-semibold text-slate-300">
            Price
          </th>

          <th className="p-4 text-left text-sm font-semibold text-slate-300">
            Confidence
          </th>

        </tr>

      </thead>

      <tbody>

        {items.map((item, index) => (

          <tr
            key={index}
            className="border-t border-slate-800 hover:bg-slate-800/40 transition"
          >

            <td className="p-3">

              <input
                className="w-56 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
                value={item.name}
                onChange={(e) => {
                  const copy = [...items];

                  copy[index].name = e.target.value;

                  setItems(copy);
                }}
              />

            </td>

            <td className="p-3">

              <input
                className="w-40 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
                value={item.category}
                onChange={(e) => {
                  const copy = [...items];

                  copy[index].category = e.target.value;

                  setItems(copy);
                }}
              />

            </td>

            <td className="p-3">

              <input
                type="number"
                className="w-24 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
                value={item.quantity}
                onChange={(e) => {
                  const copy = [...items];

                  copy[index].quantity =
                    Number(e.target.value);

                  setItems(copy);
                }}
              />

            </td>

            <td className="p-3">

              <input
                className="w-20 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
                value={item.unit}
                onChange={(e) => {
                  const copy = [...items];

                  copy[index].unit =
                    e.target.value;

                  setItems(copy);
                }}
              />

            </td>

            <td className="p-3">

              <input
                type="number"
                className="w-28 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
                value={item.purchasePrice}
                onChange={(e) => {
                  const copy = [...items];

                  copy[index].purchasePrice =
                    Number(e.target.value);

                  setItems(copy);
                }}
              />

            </td>

            <td className="p-3">

              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400">
                {item.confidence}%
              </span>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  <div className="flex items-center justify-between border-t border-slate-800 pt-6">

    <Button
      variant="outline"
      onClick={onClose}
    >
      Cancel
    </Button>

    <Button
  onClick={handleSaveAll}
  disabled={loading}
>
  {loading ? "Importing..." : "Save All"}
</Button>

  </div>

</div>
        )}

      </DialogContent>
    </Dialog>
  );
}