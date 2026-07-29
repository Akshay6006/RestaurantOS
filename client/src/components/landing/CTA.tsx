"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28 bg-black">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">

        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-zinc-900 to-violet-500/10 p-16 text-center backdrop-blur-xl">

          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/20">
            <Sparkles className="text-cyan-400" size={38} />
          </div>

          <h2 className="text-5xl font-bold text-white">
            Ready to Modernize
            <span className="block text-cyan-400">
              Your Restaurant?
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Manage orders, inventory, invoices and AI automation
            from one beautiful dashboard built for modern restaurants.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/login"
              className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              Launch Dashboard
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-white/10 px-8 py-4 text-white transition hover:bg-white/10"
            >
              Login
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}