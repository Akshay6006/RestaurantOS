"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface TopSellingItem {
  id: string;
  name: string;
  sold: number;
  revenue: number;
}

interface TopSellingProps {
  data: TopSellingItem[];
}

export default function TopSelling({
  data,
}: TopSellingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <Flame className="text-orange-400" size={30} />

        <div>
          <h2 className="text-2xl font-bold text-white">
            Top Selling Dishes
          </h2>

          <p className="text-sm text-slate-400">
            Best performing menu items today
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-left">

              <th className="pb-4 text-slate-400">
                Dish
              </th>

              <th className="pb-4 text-center text-slate-400">
                Sold
              </th>

              <th className="pb-4 text-right text-slate-400">
                Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((dish, index) => (
              <tr
                key={dish.id}
                className="border-b border-slate-800 hover:bg-slate-800/40 transition"
              >
                <td className="py-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                      #{index + 1}
                    </div>

                    <span className="font-medium text-white">
                      {dish.name}
                    </span>

                  </div>

                </td>

                <td className="text-center text-white font-semibold">
                  {dish.sold}
                </td>

                <td className="text-right font-bold text-emerald-400">
  {dish.sold} Plates
</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </motion.div>
  );
}