"use client";

import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserName(user.name || "User");
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Good Morning, {userName} 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your restaurant smarter with AI insights.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-3">
        <p className="text-sm text-slate-400">Today</p>
        <p className="font-semibold text-white">{today}</p>
      </div>
    </div>
  );
}