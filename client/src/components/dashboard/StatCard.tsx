"use client";

import { LucideIcon, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  change,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>

          {change && (
            <div className="mt-3 flex items-center gap-2 text-emerald-400">
              <TrendingUp size={18} />
              <span className="text-sm">{change}</span>
            </div>
          )}
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon className="text-white" size={30} />
        </div>

      </div>
    </motion.div>
  );
}