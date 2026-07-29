"use client";

import {
  ArrowUpRight,
  IndianRupee,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  BrainCircuit,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="relative overflow-hidden bg-zinc-950 py-28"
    >
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[150px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            Live Dashboard
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Manage Everything
            <span className="block text-cyan-400">
              From One Dashboard
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Monitor orders, inventory, AI invoice processing,
            revenue and restaurant performance in real time.
          </p>

        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0f172a] shadow-2xl">

          {/* Mac Toolbar */}

          <div className="flex items-center gap-3 border-b border-white/10 bg-zinc-900 px-6 py-4">

            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />

            <div className="ml-6 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-gray-300">
              RestaurantOS Dashboard
            </div>

          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-4">

            <StatCard
              title="Revenue"
              value="₹1,42,580"
              icon={<IndianRupee size={22} />}
              color="bg-green-500/15 text-green-400"
            />

            <StatCard
              title="Orders"
              value="286"
              icon={<ShoppingBag size={22} />}
              color="bg-blue-500/15 text-blue-400"
            />

            <StatCard
              title="Inventory"
              value="412"
              icon={<Package size={22} />}
              color="bg-orange-500/15 text-orange-400"
            />

            <StatCard
              title="Customers"
              value="189"
              icon={<Users size={22} />}
              color="bg-violet-500/15 text-violet-400"
            />

          </div>

          <div className="grid gap-8 px-8 pb-8 lg:grid-cols-3">

            {/* Revenue Chart */}

            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 lg:col-span-2">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-semibold text-white">
                    Revenue Overview
                  </h3>

                  <p className="text-gray-400">
                    Last 7 Days
                  </p>

                </div>

                <TrendingUp className="text-green-400" />

              </div>

              <div className="flex h-60 items-end justify-between gap-3">

                {[35, 55, 40, 75, 68, 90, 80].map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center gap-3"
                  >
                    <div
                      style={{ height: `${height}%` }}
                      className="w-full rounded-t-xl bg-gradient-to-t from-cyan-500 to-blue-400"
                    />

                    <span className="text-xs text-gray-500">
                      {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][index]}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            {/* AI Insights */}

            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">

              <div className="mb-6 flex items-center gap-3">

                <BrainCircuit className="text-cyan-400" />

                <h3 className="text-xl font-semibold text-white">
                  AI Insights
                </h3>

              </div>

              <div className="space-y-4">

                <Insight
                  title="Inventory Updated"
                  desc="Supplier invoice processed successfully."
                />

                <Insight
                  title="Low Stock Alert"
                  desc="Tomatoes are running low."
                />

                <Insight
                  title="Top Seller"
                  desc="Chicken Biryani generated highest revenue."
                />

                <Insight
                  title="Growth"
                  desc="Revenue increased 18% this week."
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function StatCard({
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
    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h3>

        </div>

        <div className={`rounded-2xl p-4 ${color}`}>
          {icon}
        </div>

      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-green-400">

        <ArrowUpRight size={16} />

        12% increase

      </div>

    </div>
  );
}

function Insight({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl bg-zinc-800 p-4">

      <h4 className="font-semibold text-white">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        {desc}
      </p>

    </div>
  );
}