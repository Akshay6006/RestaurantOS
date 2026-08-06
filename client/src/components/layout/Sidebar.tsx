"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  Boxes,
  Wallet,
  Users,
  BrainCircuit,
  MessageSquare,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Menu",
    icon: UtensilsCrossed,
    href: "/dashboard/menu",
  },
  {
    title: "Orders",
    icon: ClipboardList,
    href: "/dashboard/orders",
  },
  {
    title: "Inventory",
    icon: Boxes,
    href: "/dashboard/inventory",
  },
  {
    title: "Expenses",
    icon: Wallet,
    href: "/dashboard/expenses",
  },
  {
    title: "Staff",
    icon: Users,
    href: "/dashboard/staff",
  },
  {
  title: "Feedback",
  icon: MessageSquare,
  href: "/dashboard/feedback",
},
  {
    title: "AI Insights",
    icon: BrainCircuit,
    href: "/dashboard/ai-insights",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-[#0f172a] border-r border-slate-800 flex-col z-50">
      <div className="px-8 py-8 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          Restaurant<span className="text-emerald-400">OS</span>
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          AI Restaurant Management
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300"
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-white font-medium">
            RestaurantOS v1.0
          </p>

          <p className="text-slate-400 text-sm mt-1">
            Built with ❤️ 
          </p>
        </div>
      </div>
    </aside>
  );
}