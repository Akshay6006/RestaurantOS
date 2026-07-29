"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";

const feedbacks = [
  {
    id: 1,
    customer: "Rahul Sharma",
    rating: 5,
    comment: "Amazing food and very quick service. Will definitely visit again!",
    date: "2 mins ago",
  },
  {
    id: 2,
    customer: "Priya Singh",
    rating: 4,
    comment: "Loved the ambience. Food quality was excellent.",
    date: "15 mins ago",
  },
  {
    id: 3,
    customer: "Amit Kumar",
    rating: 5,
    comment: "Best biryani in town. Highly recommended!",
    date: "35 mins ago",
  },
  {
    id: 4,
    customer: "Neha Patel",
    rating: 3,
    comment: "Service was a little slow but food tasted great.",
    date: "1 hour ago",
  },
];

export default function RecentFeedback() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <MessageSquare size={28} className="text-yellow-400" />

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Feedback
          </h2>

          <p className="text-sm text-slate-400">
            Latest customer reviews
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5 transition hover:border-yellow-500"
          >
            <div className="flex items-center justify-between">

              <div>
                <h3 className="font-semibold text-white">
                  {feedback.customer}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {feedback.comment}
                </p>
              </div>

              <span className="text-xs text-slate-500">
                {feedback.date}
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
    </motion.div>
  );
}