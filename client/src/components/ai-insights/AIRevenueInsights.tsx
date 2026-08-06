"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";

interface Props {
  data: any;
}

export default function AIRevenueInsights({
  data,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-emerald-500/20 p-3">

            <TrendingUp
              size={24}
              className="text-emerald-400"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Revenue Insights
            </h2>

            <p className="text-sm text-slate-400">
              AI Revenue Analysis
            </p>

          </div>

        </div>

        <ArrowUpRight className="text-emerald-400" />

      </div>

      <div className="space-y-5">

       <Insight
  title="Total Revenue"
  value={`₹${Number(data?.revenue ?? 0).toLocaleString("en-IN")}`}
  color="text-emerald-400"
/>

<Insight
  title="Total Orders"
  value={`${data?.totalOrders ?? 0}`}
  color="text-blue-400"
/>

<Insight
  title="Average Order Value"
  value={
    data?.totalOrders
      ? `₹${Math.round(data.revenue / data.totalOrders)}`
      : "₹0"
  }
  color="text-purple-400"
/>

<Insight
  title="Restaurant Health"
  value={`${data?.healthScore ?? 0}%`}
  color="text-yellow-400"
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