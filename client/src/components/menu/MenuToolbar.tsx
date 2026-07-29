"use client";

import { Search, Plus } from "lucide-react";

interface MenuToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  onAddDish: () => void;
}

const categories = [
  "All",
  "Indian",
  "Chinese",
  "Italian",
  "Fast Food",
  "Dessert",
  "Beverage",
];

export default function MenuToolbar({
  search,
  setSearch,
  category,
  setCategory,
  onAddDish,
}: MenuToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div>
          <h1 className="text-3xl font-bold text-white">
            Menu Management
          </h1>

          <p className="mt-1 text-slate-400">
            Manage your restaurant dishes and categories.
          </p>
        </div>

        {/* Right */}

        <button
          onClick={onAddDish}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
        >
          <Plus size={20} />
          Add Dish
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row">
        {/* Search */}

        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-white outline-none transition focus:border-emerald-500"
          />
        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}