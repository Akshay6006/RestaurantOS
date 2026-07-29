"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import {
  BarChart3,
  ChefHat,
  DollarSign,
  Sparkles,
} from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-10">

      {/* Background Blur */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-[140px]" />
      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* Floating Glow */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute left-20 top-28 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
        }}
        className="absolute right-20 bottom-28 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl"
      />

      {/* Main Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="grid w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur-xl lg:grid-cols-2"
      >
        {/* Left */}
        <div className="flex flex-col justify-center p-12">

          <Logo />

          <h2 className="mt-12 text-4xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-3 text-slate-400">
            {subtitle}
          </p>

          <div className="mt-10">
            {children}
          </div>
        </div>

        {/* Right */}
        <div className="hidden bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 p-10 lg:flex">

          <div className="flex w-full flex-col justify-between">

            <div>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                AI Powered Dashboard
              </span>

              <h2 className="mt-8 text-5xl font-bold leading-tight text-white">
                Manage your restaurant smarter.
              </h2>

              <p className="mt-6 text-lg text-white/80">
                Orders, Inventory, Staff,
                Expenses and AI Insights —
                all in one platform.
              </p>

            </div>

            {/* Dashboard Preview */}

            <div className="space-y-4">

              <PreviewCard
                icon={<DollarSign />}
                title="Today's Revenue"
                value="$4,825"
              />

              <PreviewCard
                icon={<ChefHat />}
                title="Orders Today"
                value="148"
              />

              <PreviewCard
                icon={<BarChart3 />}
                title="Inventory Health"
                value="94%"
              />

              <PreviewCard
                icon={<Sparkles />}
                title="AI Recommendation"
                value="Reduce Tomato Waste"
              />

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

function PreviewCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="flex items-center justify-between rounded-2xl bg-white/15 p-5 backdrop-blur"
    >
      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-white/20 p-3 text-white">
          {icon}
        </div>

        <div>

          <p className="text-sm text-white/70">
            {title}
          </p>

          <h3 className="text-xl font-bold text-white">
            {value}
          </h3>

        </div>

      </div>

    </motion.div>
  );
}