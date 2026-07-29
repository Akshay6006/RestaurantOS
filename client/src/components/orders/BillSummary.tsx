"use client";

interface Props {
  subtotal: number;
  gst: number;
  setGst: (value: number) => void;

  discount: number;
  setDiscount: (value: number) => void;
}

export default function BillSummary({
  subtotal,
  gst,
  setGst,
  discount,
  setDiscount,
}: Props) {
  const grandTotal = subtotal + gst - discount;

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Bill Summary
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Subtotal</span>

          <span className="text-lg font-semibold text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              GST
            </label>

            <input
              type="number"
              min={0}
              step="0.01"
              value={gst}
              onChange={(e) =>
                setGst(Number(e.target.value))
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Discount
            </label>

            <input
              type="number"
              min={0}
              step="0.01"
              value={discount}
              onChange={(e) =>
                setDiscount(Number(e.target.value))
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
            />
          </div>

        </div>

        <div className="my-4 border-t border-slate-700" />

        <div className="flex items-center justify-between">

          <span className="text-xl font-semibold text-white">
            Grand Total
          </span>

          <span className="text-3xl font-bold text-emerald-400">
            ${grandTotal.toFixed(2)}
          </span>

        </div>

      </div>
    </div>
  );
}