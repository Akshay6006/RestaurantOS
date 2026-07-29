"use client";

import Link from "next/link";
import { ChefHat, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black shadow-lg">
            <ChefHat size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              RestaurantOS
            </h1>

            <p className="text-xs text-gray-400">
              AI Powered Restaurant Management
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 text-sm text-gray-300 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#ai" className="transition hover:text-white">
            AI Invoice
          </a>

          <a href="#dashboard" className="transition hover:text-white">
            Dashboard
          </a>

          <a href="#tech" className="transition hover:text-white">
            Tech Stack
          </a>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-white/10 px-5 py-2 text-sm text-white transition hover:border-white hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black transition hover:scale-105"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="rounded-xl border border-white/10 px-5 py-2 text-sm text-white transition hover:border-white hover:bg-white/10"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black transition hover:scale-105"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}