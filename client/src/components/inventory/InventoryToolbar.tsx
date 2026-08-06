"use client";

import { Plus, Search, Sparkles } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
  onAdd: () => void;
  onAIImport: () => void;
}

export default function InventoryToolbar({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  onAdd,
  onAIImport,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Side */}

        <div className="flex flex-1 flex-col gap-4 md:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inventory..."
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                py-3
                pl-11
                pr-4
                text-white
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-emerald-500
              "
            />

          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-emerald-500
            "
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

        {/* Right Side */}

        <div className="flex flex-wrap gap-3">

          <button
            onClick={onAIImport}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-purple-700
              bg-purple-600/20
              px-5
              py-3
              font-semibold
              text-purple-300
              transition
              hover:bg-purple-600/30
            "
          >
            <Sparkles size={18} />

            AI Import Invoice
          </button>

          <button
            onClick={onAdd}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-emerald-600
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-emerald-700
            "
          >
            <Plus size={18} />

            Add Product
          </button>

        </div>

      </div>

    </div>
  );
}