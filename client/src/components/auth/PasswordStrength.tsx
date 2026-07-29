"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

interface Props {
  password: string;
}

export default function PasswordStrength({
  password,
}: Props) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  const getColor = () => {
    if (score <= 2) return "bg-red-500";
    if (score <= 4) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const getLabel = () => {
    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";
    return "Strong";
  };

  const getIcon = () => {
    if (score <= 2)
      return <ShieldAlert className="h-5 w-5 text-red-400" />;

    if (score <= 4)
      return <ShieldCheck className="h-5 w-5 text-yellow-400" />;

    return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
  };

  return (
    <div className="mt-3 space-y-4">

      {/* Strength Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">

          {getIcon()}

          <span className="text-sm font-medium text-slate-300">
            Password Strength
          </span>

        </div>

        <span
          className={`text-sm font-semibold ${
            score <= 2
              ? "text-red-400"
              : score <= 4
              ? "text-yellow-400"
              : "text-emerald-400"
          }`}
        >
          {getLabel()}
        </span>
      </div>

      {/* Progress */}
      <div className="h-2 overflow-hidden rounded-full bg-slate-700">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${(score / 5) * 100}%`,
          }}
          transition={{
            duration: 0.35,
          }}
          className={`h-full ${getColor()}`}
        />

      </div>

      {/* Checklist */}
      <div className="grid gap-2 text-sm">

        <Requirement
          label="Minimum 8 characters"
          ok={checks.length}
        />

        <Requirement
          label="One uppercase letter"
          ok={checks.uppercase}
        />

        <Requirement
          label="One lowercase letter"
          ok={checks.lowercase}
        />

        <Requirement
          label="One number"
          ok={checks.number}
        />

        <Requirement
          label="One special character"
          ok={checks.special}
        />

      </div>
    </div>
  );
}

function Requirement({
  label,
  ok,
}: {
  label: string;
  ok: boolean;
}) {
  return (
    <div className="flex items-center gap-2">

      <div
        className={`h-2.5 w-2.5 rounded-full ${
          ok
            ? "bg-emerald-400"
            : "bg-slate-600"
        }`}
      />

      <span
        className={
          ok
            ? "text-emerald-300"
            : "text-slate-400"
        }
      >
        {label}
      </span>

    </div>
  );
}