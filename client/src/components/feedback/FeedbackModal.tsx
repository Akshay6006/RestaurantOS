"use client";

import { useState } from "react";
import { Star, X, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  customerName: string;
  customerPhone: string;
  orderId: string;
  onSubmit: (data: {
    customerName: string;
    customerPhone: string;
    rating: number;
    message: string;
    // image?: File | null;
    orderId: string;
  }) => Promise<void>;
  onClose: () => void;
}

export default function FeedbackModal({
  open,
  customerName,
  customerPhone,
  orderId,
  onSubmit,
  onClose,
}: Props) {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await onSubmit({
    customerName,
    customerPhone,
    rating,
    message,
    orderId,
});

      setSubmitted(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-3xl bg-slate-950 p-8 text-center">

          <CheckCircle2
            size={70}
            className="mx-auto text-emerald-400"
          />

          <h2 className="mt-5 text-3xl font-bold text-white">
            Thank You ❤️
          </h2>

          <p className="mt-3 text-slate-400">
            Your feedback helps us improve.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-3xl bg-slate-950 p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Rate Your Experience
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 p-2"
          >
            <X className="text-white" />
          </button>

        </div>

        <div className="mb-6 flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
            >
              <Star
                size={38}
                className={
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-500"
                }
              />
            </button>
          ))}
        </div>

        <div className="space-y-5">

          <input
            value={customerName}
            disabled
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
          />

          <input
            value={customerPhone}
            disabled
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
          />

          <textarea
            rows={5}
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Tell us about your experience..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="block w-full text-slate-300"
          />

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full rounded-xl bg-emerald-600 py-4 text-lg font-bold text-white hover:bg-emerald-700"
          >
            {loading
              ? "Submitting..."
              : "Submit Feedback"}
          </button>

        </div>

      </div>

    </div>
  );
}