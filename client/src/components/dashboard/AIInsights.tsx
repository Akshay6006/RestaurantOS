"use client";

import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Clock3,
  Star,
  Lightbulb,
} from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    value: "+18%",
    description: "Revenue increased compared to yesterday.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Star,
    title: "Best Seller",
    value: "Chicken Biryani",
    description: "126 plates sold today.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Clock3,
    title: "Peak Hours",
    value: "7 PM - 9 PM",
    description: "Highest customer traffic.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Lightbulb,
    title: "Recommendation",
    value: "Increase Butter Naan Stock",
    description: "Inventory may run out tonight.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export default function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl"
    >
      <div className="mb-8 flex items-center gap-3">
        <Brain className="text-violet-400" size={32} />

        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Business Insights
          </h2>

          <p className="text-sm text-slate-400">
            Smart analytics generated from restaurant activity
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5 transition hover:border-violet-500"
            >
              <div className="flex items-start gap-4">

                <div
                  className={`rounded-xl p-3 ${item.bg}`}
                >
                  <Icon
                    className={item.color}
                    size={24}
                  />
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p
                    className={`mt-2 text-lg font-bold ${item.color}`}
                  >
                    {item.value}
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.description}
                  </p>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}