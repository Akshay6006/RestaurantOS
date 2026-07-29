"use client";

import { AlertTriangle } from "lucide-react";

const items = [
  { name: "Tomatoes", stock: "2 kg", color: "text-red-400" },
  { name: "Cheese", stock: "5 kg", color: "text-yellow-400" },
  { name: "Onions", stock: "1 kg", color: "text-red-400" },
  { name: "Butter", stock: "3 Packs", color: "text-yellow-400" },
];

export default function InventoryAlert() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="text-red-400" />

        <h2 className="text-xl font-semibold text-white">
          Inventory Alerts
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex justify-between rounded-xl bg-slate-800 p-4"
          >
            <span className="text-slate-300">{item.name}</span>

            <span className={item.color}>{item.stock}</span>
          </div>
        ))}
      </div>
    </div>
  );
}