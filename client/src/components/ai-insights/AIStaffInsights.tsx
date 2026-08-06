"use client";

import {
  Users,
  UserCheck,
} from "lucide-react";

interface Props {
  data: any;
}

export default function AIStaffInsights({
  data,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-500/20 p-3">

            <Users
              size={24}
              className="text-blue-400"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Staff Insights
            </h2>

            <p className="text-sm text-slate-400">
              AI Staff Analysis
            </p>

          </div>

        </div>

        <UserCheck className="text-blue-400" />

      </div>

      <div className="space-y-5">

        <Insight
  title="Total Staff"
  value={`${data?.totalStaff ?? 0}`}
  color="text-blue-400"
/>

<Insight
  title="Present Today"
  value={`${data?.attendance ?? 0}`}
  color="text-emerald-400"
/>

<Insight
  title="Attendance Rate"
  value={
    data?.totalStaff
      ? `${Math.round(
          (data.attendance / data.totalStaff) * 100
        )}%`
      : "0%"
  }
  color="text-purple-400"
/>

<Insight
  title="Performance"
  value={
    data?.attendance === data?.totalStaff
      ? "Excellent"
      : "Good"
  }
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