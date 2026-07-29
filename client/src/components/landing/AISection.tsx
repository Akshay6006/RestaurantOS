"use client";

import {
  BrainCircuit,
  FileSpreadsheet,
  ArrowRight,
  Package,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: FileSpreadsheet,
    title: "Upload Invoice",
    description:
      "Upload supplier invoices in PDF or image format.",
  },
  {
    icon: BrainCircuit,
    title: "Gemini AI Analysis",
    description:
      "Gemini AI extracts products, quantities and purchase prices automatically.",
  },
  {
    icon: Package,
    title: "Inventory Updated",
    description:
      "Review extracted items and save them directly into your inventory.",
  },
];

export default function AISection() {
  return (
    <section
      id="ai"
      className="relative overflow-hidden bg-black py-28"
    >
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* Left Side */}

        <div>

          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400">
            AI Powered Automation
          </span>

          <h2 className="mt-6 text-5xl font-bold leading-tight text-white">
            Turn Supplier
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
              Invoices into Inventory
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-400">
            RestaurantOS eliminates manual data entry by using Gemini AI
            to understand supplier invoices and automatically prepare
            inventory records for your approval.
          </p>

          <div className="mt-10 space-y-5">

            {[
              "Supports PDF & Images",
              "AI extracts products automatically",
              "Edit before saving",
              "Direct inventory integration",
              "Reduces manual errors",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="text-green-400" size={22} />

                <span className="text-gray-300">
                  {item}
                </span>
              </div>
            ))}

          </div>

        </div>

        {/* Right Side */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <div className="space-y-8">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="flex items-start gap-5"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                    <Icon size={28} />
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center gap-3">

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-400">
                        {index + 1}
                      </span>

                      <h3 className="text-xl font-semibold text-white">
                        {step.title}
                      </h3>

                    </div>

                    <p className="mt-3 leading-7 text-gray-400">
                      {step.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

          <div className="my-10 border-t border-dashed border-white/10" />

          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

            <div className="flex items-center justify-between">

              <div>

                <h4 className="text-lg font-semibold text-green-400">
                  AI Processing Complete
                </h4>

                <p className="mt-2 text-sm text-gray-300">
                  12 products detected with 98% confidence.
                </p>

              </div>

              <ArrowRight className="text-green-400" />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}