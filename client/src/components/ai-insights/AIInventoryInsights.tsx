"use client";

import { Package, AlertTriangle } from "lucide-react";

interface Props {
  data: any;
}

export default function AIInventoryInsights({
  data,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-yellow-500/20 p-3">

            <Package
              size={24}
              className="text-yellow-400"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Inventory Insights
            </h2>

            <p className="text-sm text-slate-400">
              AI Inventory Analysis
            </p>

          </div>

        </div>

        <AlertTriangle className="text-yellow-400" />

      </div>

      <div className="space-y-5">

        <Insight
  title="Low Stock Items"
  value={`${data?.lowStock ?? 0}`}
  color="text-red-400"
/>

<Insight
  title="Inventory Status"
  value={
    data?.lowStock > 0
      ? "Needs Restock"
      : "Healthy"
  }
  color={
    data?.lowStock > 0
      ? "text-yellow-400"
      : "text-emerald-400"
  }
/>

<Insight
  title="Health Score"
  value={`${data?.healthScore ?? 0}%`}
  color="text-blue-400"
/>

<Insight
  title="Recommendation"
  value={
    data?.lowStock > 0
      ? "Restock Soon"
      : "All Good"
  }
  color="text-purple-400"
/>

      </div>

    </div>
  );
}

function Insight({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">

      <span className="text-slate-400">
        {title}
      </span>

      <span className={`font-bold ${color}`}>
        {value}
      </span>

    </div>
  );
}