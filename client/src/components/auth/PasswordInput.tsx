"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({
  label,
  name,
  value,
  placeholder,
  error,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-slate-300">
        {label}
      </label>

      <div
        className={`flex items-center rounded-xl border bg-slate-900 transition-all duration-300
        ${
          error
            ? "border-red-500"
            : "border-slate-700 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20"
        }`}
      >
        <div className="px-4">
          <Lock className="h-5 w-5 text-slate-500" />
        </div>

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-3 pr-2 text-white outline-none placeholder:text-slate-500"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="px-4 text-slate-400 hover:text-white transition"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}