"use client";

import {
  BrainCircuit,
  Package,
  ShoppingCart,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Invoice Processing",
    description:
      "Upload supplier invoices and let Gemini AI automatically extract products, quantities, prices and update inventory.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description:
      "Monitor stock levels, receive low-stock alerts and manage purchases with real-time inventory tracking.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: ShoppingCart,
    title: "Order Management",
    description:
      "Manage customer orders, update order status and monitor restaurant operations from a single dashboard.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description:
      "Track revenue, inventory value, orders and restaurant performance with beautiful real-time analytics.",
    color: "from-orange-500 to-amber-500",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-black py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Powerful Features
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Everything Your Restaurant Needs
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            RestaurantOS combines AI, automation and analytics
            into one modern platform built for restaurants.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-500 hover:-translate-y-3 hover:border-white/20 hover:bg-white/10"
              >
                <div
                  className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color}`}
                >
                  <Icon className="text-white" size={30} />
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-5 leading-8 text-gray-400">
                  {feature.description}
                </p>

                <button className="mt-8 flex items-center gap-2 font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn More
                  <ArrowRight size={18} />
                </button>

                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-r ${feature.color} opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20`}
                />
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}