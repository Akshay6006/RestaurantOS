"use client";

import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  ChefHat,
  Package,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pt-32 pb-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Left */}

        <div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
            <Sparkles size={16} />
            AI Powered Restaurant Management
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-7xl">
            Manage Your
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Restaurant
            </span>
            Smarter with AI
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
            RestaurantOS helps restaurants manage inventory,
            orders, invoices, analytics and AI-powered
            automation from one modern dashboard.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/login"
              className="flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-105"
            >
              Launch Dashboard
              <ArrowRight size={18} />
            </Link>

            <a
              href="#features"
              className="rounded-2xl border border-white/10 px-6 py-4 font-medium text-white transition hover:border-white hover:bg-white/10"
            >
              Explore Features
            </a>

          </div>

          <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">

            <div>
              <h2 className="text-3xl font-bold text-white">
                99%
              </h2>

              <p className="text-gray-400">
                AI Accuracy
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                24/7
              </h2>

              <p className="text-gray-400">
                Monitoring
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                ₹15L+
              </h2>

              <p className="text-gray-400">
                Inventory Managed
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                AI
              </h2>

              <p className="text-gray-400">
                Invoice OCR
              </p>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="relative">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">

            <div className="mb-8 flex items-center gap-3">

              <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400">
                <ChefHat size={22} />
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  Restaurant Dashboard
                </h3>

                <p className="text-sm text-gray-400">
                  Live Business Overview
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div className="rounded-2xl bg-zinc-900 p-5">

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-gray-400">
                    Today's Revenue
                  </span>

                  <TrendingUp className="text-green-400" />

                </div>

                <h2 className="text-4xl font-bold text-white">
                  ₹42,580
                </h2>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-zinc-900 p-5">

                  <Package className="mb-4 text-cyan-400" />

                  <h3 className="text-2xl font-bold text-white">
                    214
                  </h3>

                  <p className="text-gray-400">
                    Inventory Items
                  </p>

                </div>

                <div className="rounded-2xl bg-zinc-900 p-5">

                  <BrainCircuit className="mb-4 text-violet-400" />

                  <h3 className="text-2xl font-bold text-white">
                    97%
                  </h3>

                  <p className="text-gray-400">
                    AI Confidence
                  </p>

                </div>

              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

                <h4 className="font-semibold text-green-400">
                  AI Insight
                </h4>

                <p className="mt-2 text-sm text-gray-300">
                  Inventory updated automatically from
                  supplier invoices using Gemini AI.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}