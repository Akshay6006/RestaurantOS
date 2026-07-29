"use client";

import { useRef, useState, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-[#0b1120]/90 px-8 backdrop-blur-md">
      {/* Search */}
      <div className="relative w-96">
        <Search
          className="absolute left-4 top-3 text-slate-500"
          size={18}
        />

        <input
          placeholder="Search..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none transition focus:border-emerald-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <button className="rounded-full p-2 transition hover:bg-slate-800">
          <Bell className="text-slate-300" />
        </button>

        <div
          className="relative"
          ref={menuRef}
        >
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-slate-800"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-lg font-bold text-white">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="text-left">
              <p className="font-medium text-white">
                {user?.name || "User"}
              </p>

              <p className="text-sm capitalize text-slate-400">
                {user?.role?.replace("_", " ").toLowerCase() ||
                  "Owner"}
              </p>
            </div>

            <ChevronDown
              size={18}
              className={`text-slate-400 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
              <div className="border-b border-slate-700 p-5">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-2xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {user?.name}
                </h3>

                <p className="text-sm text-slate-400">
                  {user?.email}
                </p>

                <span className="mt-3 inline-flex rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-400">
                  {user?.role?.replace("_", " ")}
                </span>
              </div>

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 px-5 py-4 text-red-400 transition hover:bg-slate-800"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}