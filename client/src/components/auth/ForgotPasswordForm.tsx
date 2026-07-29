"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      alert(
        "Password reset link sent to your email."
      );
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Unable to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Email Address
        </label>

        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 focus-within:border-emerald-500">
          <div className="px-4">
            <Mail className="h-5 w-5 text-slate-500" />
          </div>

          <input
            type="email"
            required
            placeholder="example@email.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="flex-1 bg-transparent py-3 pr-4 text-white outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50"
      >
        {loading
          ? "Sending..."
          : "Send Reset Link"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Remember your password?{" "}
        <Link
          href="/login"
          className="text-emerald-400 hover:underline"
        >
          Login
        </Link>
      </p>
    </motion.form>
  );
}