"use client";

import { Star, Trash2, Phone, CalendarDays } from "lucide-react";

interface Props {
  feedback: any;
  onDelete: () => void;
}

export default function FeedbackCard({
  feedback,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition-all hover:border-emerald-500 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-semibold text-white">
            {feedback.customerName}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-slate-400">

            <Phone size={16} />

            <span>
              {feedback.customerPhone || "N/A"}
            </span>

          </div>

        </div>

        <button
          onClick={onDelete}
          className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <Trash2 size={18} />
        </button>

      </div>

      <div className="mt-5 flex items-center gap-1">

        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={22}
            className={
              star <= feedback.rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-600"
            }
          />
        ))}

      </div>

      <p className="mt-5 rounded-xl bg-slate-950 p-4 leading-7 text-slate-300">
        {feedback.message}
      </p>

      {feedback.image && (
        <img
          src={feedback.image}
          alt="Feedback"
          className="mt-5 h-56 w-full rounded-xl object-cover"
        />
      )}

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

        <CalendarDays size={16} />

        {new Date(feedback.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })}

      </div>

    </div>
  );
}