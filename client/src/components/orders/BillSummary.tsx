"use client";

interface Props {
  subtotal: number;
  discount: number;
  setDiscount: (value: number) => void;
}

export default function BillSummary({
  subtotal,
  discount,
  setDiscount,
}: Props) {
  const discountAmount = (subtotal * discount) / 100;

  const amountAfterDiscount = subtotal - discountAmount;

  const gst = amountAfterDiscount * 0.09;

  const grandTotal = amountAfterDiscount + gst;

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Bill Summary
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between">
          <span className="text-slate-400">
            Subtotal
          </span>

          <span className="text-lg font-semibold text-white">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Discount (%)
          </label>

          <input
            type="number"
            min={0}
            max={100}
            value={discount}
            onChange={(e) =>
              setDiscount(Number(e.target.value))
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
          />

        </div>

        <div className="flex items-center justify-between">

          <span className="text-slate-400">
            Discount Amount
          </span>

          <span className="font-semibold text-red-400">
            - ₹{discountAmount.toFixed(2)}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-slate-400">
            GST (9%)
          </span>

          <span className="font-semibold text-yellow-400">
            + ₹{gst.toFixed(2)}
          </span>

        </div>

        <div className="border-t border-slate-700 pt-5">

          <div className="flex items-center justify-between">

            <span className="text-2xl font-bold text-white">
              Grand Total
            </span>

            <span className="text-3xl font-bold text-emerald-400">
              ₹{grandTotal.toFixed(2)}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}