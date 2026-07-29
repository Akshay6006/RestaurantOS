"use client";

import { ChefHat } from "lucide-react";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 shadow-xl shadow-emerald-500/30">
        <ChefHat className="h-8 w-8 text-white" />
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          RestaurantOS
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          AI Powered Restaurant Management
        </p>
      </div>
    </motion.div>
  );
}