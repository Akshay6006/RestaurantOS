"use client";

import { useEffect, useState } from "react";

export default function AttendanceManagement() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Attendance Management
        </h1>

        <p className="mt-2 text-slate-400">
          Track daily attendance of your employees.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card title="Present" value="0" color="text-green-400" />
        <Card title="Absent" value="0" color="text-red-400" />
        <Card title="Leave" value="0" color="text-yellow-400" />
        <Card title="Half Day" value="0" color="text-blue-400" />
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
        {loading ? (
          <div className="text-center text-white">
            Loading...
          </div>
        ) : (
          <div className="text-center text-slate-400">
            Attendance records will appear here.
          </div>
        )}
      </div>
    </main>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-slate-400">{title}</p>

      <h2 className={`mt-3 text-3xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}