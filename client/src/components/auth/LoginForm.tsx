"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    let valid = true;

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      login(
        res.data.token,
        res.data.user
      );

      router.push("/dashboard");
    } catch (err: any) {
      alert(
        err.response?.data?.message ??
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleLogin}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Email
        </label>

        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 focus-within:border-emerald-500">
          <div className="px-4">
            <Mail className="h-5 w-5 text-slate-500" />
          </div>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="flex-1 bg-transparent py-3 pr-4 text-white outline-none"
          />
        </div>

        {errors.email && (
          <p className="mt-1 text-sm text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <PasswordInput
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter password"
      />
            <div className="flex items-center justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-emerald-400 transition hover:text-emerald-300 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Login"}
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-700" />
        <span className="text-xs uppercase tracking-wider text-slate-500">
          OR
        </span>
        <div className="h-px flex-1 bg-slate-700" />
      </div>

      <p className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-emerald-400 transition hover:text-emerald-300 hover:underline"
        >
          Create Account
        </Link>
      </p>
    </motion.form>
  );
}