"use client";

import { Sparkles, Brain } from "lucide-react";

interface Props {
  data: any;
}

export default function AIRecommendation({
  data,
}: Props) {
      return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-purple-600/20 p-3">

          <Brain
            size={26}
            className="text-purple-400"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Today's AI Recommendation
          </h2>

          <p className="text-slate-400">
            Generated from your restaurant data
          </p>

        </div>

      </div>

      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-6">

        <div className="mb-4 flex items-center gap-2">

          <Sparkles
            size={20}
            className="text-purple-400"
          />

          <span className="font-semibold text-purple-300">
            AI Summary
          </span>

        </div>

        <p className="leading-8 text-slate-300">

          {data?.recommendation ??
             "No AI recommendation available."}

        </p>

      </div>

    </div>
  );
}