"use client";

import { useEffect } from "react";
import { CheckCircle2, Printer, Download, X } from "lucide-react";

interface OrderItem {
  menu: {
    name: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  tableNumber: number;
  paymentMethod: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

interface Props {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onContinue: () => void;
}

export default function ReceiptModal({
  open,
  order,
  onClose,
  onContinue,
}: Props) {
  if (!open || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [open]);

  return (
<div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/70 backdrop-blur-sm">
  <div className="min-h-screen flex justify-center py-10 px-6">
    <div className="w-full max-w-2xl rounded-3xl bg-slate-950 p-8">

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-400" size={36} />
            <div>
              <h2 className="text-2xl font-bold text-white">
                Payment Successful
              </h2>
              <p className="text-slate-400">
                Digital Receipt
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 p-2 hover:bg-red-700"
          >
            <X className="text-white" />
          </button>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

          <div className="mb-5 text-center">
            <h1 className="text-3xl font-bold text-emerald-400">
              RestaurantOS
            </h1>

            <p className="text-slate-400">
              Digital Receipt
            </p>
          </div>

          <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-2">

            <div>
              <strong>Invoice</strong>
              <br />
              {order.invoiceNumber}
            </div>

            <div>
              <strong>Date</strong>
              <br />
              {new Date(order.createdAt).toLocaleString()}
            </div>

            <div>
              <strong>Customer</strong>
              <br />
              {order.customerName}
            </div>

            <div>
              <strong>Phone</strong>
              <br />
              {order.customerPhone}
            </div>

            <div>
              <strong>Table</strong>
              <br />
              {order.tableNumber}
            </div>

            <div>
              <strong>Payment</strong>
              <br />
              {order.paymentMethod}
            </div>

          </div>

          <div className="my-6 border-t border-slate-700" />

          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="py-2">Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b border-slate-800">
                  <td className="py-3">{item.menu.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 border-t border-slate-700 pt-5 space-y-3">

  <div className="flex justify-between text-slate-300">
    <span>Subtotal</span>
    <span>
      ₹{order.totalAmount.toFixed(2)}
    </span>
  </div>

  <div className="flex justify-between text-slate-300">
    <span>Discount</span>
    <span>
      Included
    </span>
  </div>

  <div className="flex justify-between text-slate-300">
    <span>GST</span>
    <span>
      Included
    </span>
  </div>

  <div className="flex justify-between border-t border-slate-700 pt-4">

    <span className="text-xl font-bold text-white">
      Grand Total
    </span>

    <span className="text-3xl font-bold text-emerald-400">
      ₹{order.totalAmount.toFixed(2)}
    </span>

  </div>

</div>

        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-4">

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 text-white hover:bg-slate-700"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            <Download size={18} />
            Download PDF
          </button>

          <button
            onClick={onContinue}
            className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Continue to Feedback
          </button>

        </div>

      </div>
    </div>
    </div>
  );
}