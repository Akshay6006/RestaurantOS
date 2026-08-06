"use client";

import { Wallet, TrendingDown } from "lucide-react";

interface Props {
  data: any;
}

export default function AIExpenseInsights({
  data,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-red-500/20 p-3">

            <Wallet
              size={24}
              className="text-red-400"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Expense Insights
            </h2>

            <p className="text-sm text-slate-400">
              AI Expense Analysis
            </p>

          </div>

        </div>

        <TrendingDown className="text-red-400" />

      </div>

      <div className="space-y-5">

        <Insight
  title="Total Expenses"
  value={`₹${Number(data?.expenses ?? 0).toLocaleString("en-IN")}`}
  color="text-red-400"
/>

<Insight
  title="Revenue"
  value={`₹${Number(data?.revenue ?? 0).toLocaleString("en-IN")}`}
  color="text-blue-400"
/>

<Insight
  title="Expense Ratio"
  value={
    data?.revenue
      ? `${Math.round((data.expenses / data.revenue) * 100)}%`
      : "0%"
  }
  color="text-yellow-400"
/>

<Insight
  title="Restaurant Health"
  value={`${data?.healthScore ?? 0}%`}
  color="text-emerald-400"
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