"use client";

import { CreditCard, Smartphone, Wallet } from "lucide-react";

interface Props {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;

  paymentStatus: string;
  setPaymentStatus: (value: string) => void;

  total: number;
}

export default function PaymentSection({
  paymentMethod,
  setPaymentMethod,
  paymentStatus,
  setPaymentStatus,
  total,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Payment
      </h2>

      {/* Payment Method */}

      <div className="mb-6">

        <label className="mb-2 block text-sm text-slate-400">
          Payment Method
        </label>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
        >
          <option value="CASH">💵 Cash</option>
          <option value="UPI_QR">📱 UPI QR</option>
          <option value="UPI_ID">🆔 UPI ID</option>
          <option value="CARD">💳 Card</option>
        </select>

      </div>

      {/* Cash */}

      {paymentMethod === "CASH" && (

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">

          <div className="mb-3 flex items-center gap-3">

            <Wallet className="text-emerald-400" />

            <h3 className="font-semibold text-white">
              Cash Payment
            </h3>

          </div>

          <p className="text-sm text-slate-400">
            Collect payment from customer.
          </p>

          <p className="mt-4 text-2xl font-bold text-emerald-400">
            ₹{total.toLocaleString("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
          </p>

        </div>

      )}

      {/* UPI QR */}

      {paymentMethod === "UPI_QR" && (

        <div className="rounded-xl border border-slate-700 bg-slate-950 p-6">

          <div className="flex flex-col items-center">

            <div className="flex h-52 w-52 items-center justify-center rounded-xl border-2 border-dashed border-slate-600 bg-slate-900">

              <span className="text-center text-slate-500">
                QR CODE
                <br />
                (Replace with generated QR)
              </span>

            </div>

            <p className="mt-4 text-lg font-semibold text-white">
              restaurant@upi
            </p>

           <p className="mt-2 text-3xl font-bold text-emerald-400">
  ₹{total.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</p>

          </div>

        </div>

      )}

      {/* UPI ID */}

      {paymentMethod === "UPI_ID" && (

        <div className="rounded-xl border border-slate-700 bg-slate-950 p-6">

          <div className="mb-3 flex items-center gap-3">

            <Smartphone className="text-emerald-400" />

            <h3 className="font-semibold text-white">
              Pay using UPI
            </h3>

          </div>

          <div className="rounded-xl bg-slate-800 p-4 text-center">

            <p className="text-slate-400">
              Restaurant UPI ID
            </p>

            <p className="mt-2 text-xl font-bold text-white">
              restaurant@upi
            </p>

          </div>

          <p className="mt-5 text-center text-3xl font-bold text-emerald-400">
  ₹{total.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</p>

        </div>

      )}

      {/* Card */}

      {paymentMethod === "CARD" && (

        <div className="space-y-4">

          <div className="flex items-center gap-3">

            <CreditCard className="text-emerald-400" />

            <h3 className="font-semibold text-white">
              Card Payment
            </h3>

          </div>

          <input
            placeholder="Card Holder Name"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
          />

          <input
            placeholder="Card Number"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
          />

          <div className="grid gap-4 md:grid-cols-2">

            <input
              placeholder="MM / YY"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />

            <input
              placeholder="CVV"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />

          </div>

        </div>

      )}

      {/* Payment Status */}

      <div className="mt-6">

        <label className="mb-2 block text-sm text-slate-400">
          Payment Status
        </label>

        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
        >
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="FAILED">Failed</option>
        </select>

      </div>

    </div>
  );
}