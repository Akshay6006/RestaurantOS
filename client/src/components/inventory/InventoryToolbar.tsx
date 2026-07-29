"use client";

import { Plus, Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
  onAdd: () => void;
}

export default function InventoryToolbar({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  onAdd,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">

      <div className="flex flex-col lg:flex-row gap-4 justify-between">

        <div className="flex flex-1 gap-4">

          <div className="relative flex-1">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inventory..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

        </div>

        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>

    </div>
  );
}