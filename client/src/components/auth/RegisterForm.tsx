"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "OWNER",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (form.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
      valid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/auth/register", {
  name: form.name,
  email: form.email,
  password: form.password,
  role: form.role,
});

      router.push("/login");
    } catch (err: any) {
      alert(
        err.response?.data?.message ??
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleRegister}
      className="space-y-5"
    >
      {/* Name */}

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Full Name
        </label>

        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 focus-within:border-emerald-500">
          <div className="px-4">
            <User className="h-5 w-5 text-slate-500" />
          </div>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Akshay Kumar"
            className="flex-1 bg-transparent py-3 pr-4 text-white outline-none"
          />
        </div>

        {errors.name && (
          <p className="mt-1 text-sm text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}

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

      <PasswordStrength password={form.password} />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Confirm password"
      />

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Role
        </label>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
        >
          <option value="OWNER">Owner</option>
          <option value="MANAGER">Manager</option>
          <option value="CHEF">Chef</option>
          <option value="WAITER">Waiter</option>
          <option value="CASHIER">Cashier</option>
          <option value="STORE_MANAGER">
            Store Manager
          </option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50"
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <span
          onClick={() => router.push("/login")}
          className="cursor-pointer text-emerald-400 hover:underline"
        >
          Login
        </span>
      </p>
    </motion.form>
  );
}