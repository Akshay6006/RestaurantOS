"use client";

import { useEffect, useState } from "react";
import { Search, Star, MessageSquare } from "lucide-react";

import { getFeedbacks, deleteFeedback } from "@/services/feedback";
import FeedbackCard from "./FeedbackCard";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("ALL");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);

      const res = await getFeedbacks();

      setFeedbacks(res.feedbacks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this feedback?")) return;

    try {
      await deleteFeedback(id);

      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete feedback.");
    }
  };

  const filtered = feedbacks.filter((item) => {
    const matchesSearch =
      item.customerName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.customerPhone
        ?.includes(search);

    const matchesRating =
      ratingFilter === "ALL"
        ? true
        : item.rating === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  const average =
    feedbacks.length === 0
      ? 0
      : (
          feedbacks.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / feedbacks.length
        ).toFixed(1);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Customer Feedback
          </h1>

          <p className="mt-2 text-slate-400">
            Reviews received from customers.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

          <p className="text-slate-400">
            Total Reviews
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {feedbacks.length}
          </h2>

        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

          <p className="text-slate-400">
            Average Rating
          </p>

          <h2 className="mt-2 flex items-center gap-2 text-4xl font-bold text-yellow-400">

            <Star
              className="fill-yellow-400"
              size={32}
            />

            {average}

          </h2>

        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

          <p className="text-slate-400">
            Feedback Messages
          </p>

          <h2 className="mt-2 flex items-center gap-2 text-4xl font-bold text-emerald-400">

            <MessageSquare size={30} />

            {feedbacks.length}

          </h2>

        </div>

      </div>

      {/* Search + Filter */}

      <div className="flex flex-col gap-4 md:flex-row">

        <div className="relative flex-1">

          <Search
            className="absolute left-4 top-3 text-slate-500"
            size={20}
          />

          <input
            placeholder="Search customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white"
          />

        </div>

        <select
          value={ratingFilter}
          onChange={(e) =>
            setRatingFilter(e.target.value)
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-5 text-white"
        >
          <option value="ALL">All Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

      </div>

      {/* Cards */}

      {loading ? (

        <div className="py-20 text-center text-slate-400">
          Loading feedback...
        </div>

      ) : filtered.length === 0 ? (

        <div className="rounded-2xl border border-slate-700 bg-slate-900 py-16 text-center text-slate-400">

          No feedback found.

        </div>

      ) : (

        <div className="grid gap-6">

          {filtered.map((item) => (

            <FeedbackCard
              key={item.id}
              feedback={item}
              onDelete={() =>
                handleDelete(item.id)
              }
            />

          ))}

        </div>

      )}

    </div>
  );
}