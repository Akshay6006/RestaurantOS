"use client";

interface Props {
  customerName: string;
  setCustomerName: (value: string) => void;

  customerPhone: string;
  setCustomerPhone: (value: string) => void;

  tableNumber: number;
  setTableNumber: (value: number) => void;

  orderType: string;
  setOrderType: (value: string) => void;

  waiterName: string;
  setWaiterName: (value: string) => void;
}

export default function CustomerDetails({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  tableNumber,
  setTableNumber,
  orderType,
  setOrderType,
  waiterName,
  setWaiterName,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-bold text-white">
        Customer Details
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Customer Name
          </label>

          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Mobile Number
          </label>

          <input
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="9876543210"
            maxLength={10}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Table Number
          </label>

          <input
            type="number"
            min={1}
            value={tableNumber}
            onChange={(e) => setTableNumber(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Order Type
          </label>

          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          >
            <option value="DINE_IN">🍽️ Dine In</option>
            <option value="TAKEAWAY">🥡 Takeaway</option>
            <option value="DELIVERY">🛵 Delivery</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-400">
            Waiter Name (Optional)
          </label>

          <input
            value={waiterName}
            onChange={(e) => setWaiterName(e.target.value)}
            placeholder="Rahul"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}