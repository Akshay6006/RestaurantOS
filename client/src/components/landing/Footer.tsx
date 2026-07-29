"use client";

import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 py-12 md:flex-row">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
            <ChefHat />
          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              RestaurantOS
            </h2>

            <p className="text-sm text-gray-400">
              AI Powered Restaurant Management
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-8 text-sm text-gray-400">

          <a href="#features" className="hover:text-white">
            Features
          </a>

          <a href="#dashboard" className="hover:text-white">
            Dashboard
          </a>

          <a href="#ai" className="hover:text-white">
            AI
          </a>

          <a href="#tech" className="hover:text-white">
            Tech Stack
          </a>

          <Link href="/login" className="hover:text-white">
            Login
          </Link>

        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RestaurantOS • Built with Next.js,
        Prisma, PostgreSQL & Gemini AI.
      </div>

    </footer>
  );
}