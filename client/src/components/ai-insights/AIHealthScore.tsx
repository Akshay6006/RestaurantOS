"use client";

import { Brain, TrendingUp, DollarSign, Package, Users } from "lucide-react";

interface Props {
  data: any;
}

export default function AIHealthScore({
  data,
}: Props) {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-purple-600/20 p-4">

          <Brain
            size={40}
            className="text-purple-400"
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            AI Insights
          </h1>

          <p className="mt-2 text-slate-400">
            Restaurant Intelligence Dashboard
          </p>

        </div>

      </div>

      {/* Top Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
          title="Health Score"
          value={`${data?.healthScore ?? 0}%`}
          icon={<Brain />}
          color="text-emerald-400"
        />

        <Card
          title="Revenue"
          value={`₹${Number(data?.revenue ?? 0).toLocaleString("en-IN")}`}
          icon={<DollarSign />}
          color="text-blue-400"
        />

        <Card
          title="Low Stock"
          value={`${data?.lowStock ?? 0}`}
          icon={<Package />}
          color="text-yellow-400"
        />

        <Card
          title="Attendance"
          value={
  data
    ? `${data.attendance}/${data.totalStaff}`
    : "0/0"
}
          icon={<Users />}
          color="text-purple-400"
        />

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-5 flex items-center justify-between">

        <p className="text-slate-400">
          {title}
        </p>

        <div className="text-slate-500">
          {icon}
        </div>

      </div>

      <h2 className={`text-4xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}