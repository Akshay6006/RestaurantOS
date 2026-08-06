"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Star, ArrowRight } from "lucide-react";

interface Feedback {
  id: string;
  customerName: string;
  customerPhone: string;
  rating: number;
  message: string;
  createdAt: string;
}

interface Props {
  data: Feedback[];
}

export default function RecentFeedback({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl"
    >
      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <MessageSquare
            size={28}
            className="text-yellow-400"
          />

          <div>

            <h2 className="text-2xl font-bold text-white">
              Recent Feedback
            </h2>

            <p className="text-sm text-slate-400">
              Latest customer reviews
            </p>

          </div>

        </div>

        <Link
          href="/dashboard/feedback"
          className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          View All

          <ArrowRight size={18} />

        </Link>

      </div>

      {data.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-700 py-10 text-center text-slate-400">

          No feedback available.

        </div>

      ) : (

        <div className="space-y-5">

          {data.map((feedback) => (

            <div
              key={feedback.id}
              className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5 transition hover:border-yellow-500"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-white">
                    {feedback.customerName}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {feedback.message}
                  </p>

                </div>

                <span className="text-xs text-slate-500">
                  {new Date(
                    feedback.createdAt
                  ).toLocaleDateString("en-IN")}
                </span>

              </div>

              <div className="mt-4 flex items-center gap-1">

                {[1, 2, 3, 4, 5].map((star) => (

                  <Star
                    key={star}
                    size={18}
                    className={
                      star <= feedback.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-600"
                    }
                  />

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </motion.div>
  );
}