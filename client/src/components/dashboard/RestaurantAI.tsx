"use client";

import {
  Brain,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ShoppingCart,
} from "lucide-react";

interface Props {
  inventory: {
    healthyStock: number;
    lowStock: any[];
    outOfStock: any[];
    purchaseRecommendations: any[];
  };

  recommendations: {
    type: string;
    title: string;
    message: string;
  }[];

  summary: {
    revenue: number;
    expenses: number;
    profit: number;
    totalOrders: number;
    bestSeller: string;
    lowStock: number;
    outOfStock: number;
    healthScore: number;
  };
}

export default function RestaurantAI({
  inventory,
  recommendations,
  summary,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Daily Summary */}

      <div className="rounded-3xl bg-gradient-to-r from-violet-700 to-indigo-700 p-8">

        <div className="flex items-center gap-3">

          <Brain size={34} className="text-white" />

          <h2 className="text-3xl font-bold text-white">
            AI Daily Summary
          </h2>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
            

          <Summary title="Revenue" value={`₹${summary.revenue.toLocaleString("en-IN")}`} />

          <Summary title="Expenses" value={`₹${summary.expenses.toLocaleString("en-IN")}`} />

          <Summary title="Profit" value={`₹${summary.profit.toLocaleString("en-IN")}`} />

          <Summary title="Orders" value={summary.totalOrders} />

              <Summary
  title="Health Score"
  value={`${summary.healthScore}%`}
/>

        </div>

      </div>

      {/* Inventory */}

      <div className="grid gap-6 lg:grid-cols-3">

        <Card
          icon={<CheckCircle className="text-emerald-400" />}
          title="Healthy Stock"
          value={inventory.healthyStock}
        />

        <Card
          icon={<AlertTriangle className="text-yellow-400" />}
          title="Low Stock"
          value={inventory.lowStock.length}
        />

        <Card
          icon={<XCircle className="text-red-400" />}
          title="Out Of Stock"
          value={inventory.outOfStock.length}
        />

      </div>

      {/* Purchase */}

      <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800">

        <h2 className="mb-5 text-2xl font-bold text-white">
          Purchase Recommendations
        </h2>

        <div className="space-y-4">

          {inventory.purchaseRecommendations.map((item: any) => (

            <div
              key={item.item}
              className="rounded-xl bg-slate-950 p-4 border border-slate-800"
            >

              <div className="flex justify-between">

                <h3 className="font-semibold text-white">
                  {item.item}
                </h3>

                <ShoppingCart className="text-emerald-400" />

              </div>

              <p className="mt-2 text-slate-400">

                Current Stock :
                {" "}
                {item.currentStock}
                {" "}
                {item.unit}

              </p>

              <p className="text-emerald-400 font-semibold">

                Purchase :
                {" "}
                {item.recommendedQuantity}
                {" "}
                {item.unit}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* AI Recommendations */}

      <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800">

        <h2 className="mb-5 text-2xl font-bold text-white">
          AI Recommendations
        </h2>

        <div className="space-y-4">
{
          recommendations.map((item, index) => {

  const color =
    item.type === "success"
      ? "border-emerald-500 bg-emerald-500/10"
      : item.type === "warning"
      ? "border-yellow-500 bg-yellow-500/10"
      : item.type === "danger"
      ? "border-red-500 bg-red-500/10"
      : "border-blue-500 bg-blue-500/10";

  return (
    <div
      key={index}
      className={`rounded-2xl border p-5 ${color}`}
    >
      <h3 className="font-bold text-white">
        {item.title}
      </h3>

      <p className="mt-2 text-slate-300">
        {item.message}
      </p>
    </div>
  );

})
}
        </div>

      </div>

    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: any) {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

      <div className="flex justify-between">

        <div>

          <p className="text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {value}
          </h2>

        </div>

        {icon}

      </div>

    </div>
  );
}

function Summary({
  title,
  value,
}: any) {
  return (
    <div className="rounded-2xl bg-white/10 p-5">

      <p className="text-white/70">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">
        {value}
      </h2>

    </div>
  );
}