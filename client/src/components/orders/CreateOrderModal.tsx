"use client";

import { useEffect, useMemo, useState } from "react";

import CustomerDetails from "./CustomerDetails";
import OrderItems from "./OrderItems";
import BillSummary from "./BillSummary";
import PaymentSection from "./PaymentSection";

import { getMenus } from "@/services/menu";
import { createOrder } from "@/services/order";
import ReceiptModal from "./ReceiptModal";
import FeedbackModal from "../feedback/FeedbackModal";

import { createFeedback } from "@/services/feedback";

interface Menu {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface SelectedItem {
  menuId: string;
  quantity: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  refreshOrders: () => void;
}

export default function CreateOrderModal({
  open,
  onClose,
  refreshOrders,
}: Props) {
  const [loading, setLoading] = useState(false);

  // Customer

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableNumber, setTableNumber] = useState(1);

  const [orderType, setOrderType] = useState("DINE_IN");
  const [waiterName, setWaiterName] = useState("");

  // Payment

  const [paymentMethod, setPaymentMethod] =
    useState("CASH");

  const [paymentStatus, setPaymentStatus] =
    useState("PAID");

  // Billing

  const [gst, setGst] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [createdOrder, setCreatedOrder] = useState<any>(null);

const [showReceipt, setShowReceipt] = useState(false);

const [showFeedback, setShowFeedback] = useState(false);

  // Menu

  const [menus, setMenus] = useState<Menu[]>([]);

  const [items, setItems] = useState<SelectedItem[]>([
    {
      menuId: "",
      quantity: 1,
    },
  ]);

  useEffect(() => {
    if (open) {
      fetchMenus();
    }
  }, [open]);

  const fetchMenus = async () => {
    try {
      const res = await getMenus();
      setMenus(res.menus || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        menuId: "",
        quantity: 1,
      },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;

    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof SelectedItem,
    value: string | number
  ) => {
    const copy = [...items];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    setItems(copy);
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const menu = menus.find(
        (m) => m.id === item.menuId
      );

      if (!menu) return sum;

      return sum + menu.price * item.quantity;
    }, 0);
  }, [items, menus]);

  const grandTotal = subtotal + gst - discount;

  const resetForm = () => {
    setCustomerName("");
    setCustomerPhone("");
    setTableNumber(1);

    setOrderType("DINE_IN");
    setWaiterName("");

    setPaymentMethod("CASH");
    setPaymentStatus("PAID");

    setGst(0);
    setDiscount(0);

    setItems([
      {
        menuId: "",
        quantity: 1,
      },
    ]);
  };

  const handleSubmit = async () => {
    if (!customerName.trim())
      return alert("Customer name required");

    if (!customerPhone.trim())
      return alert("Customer phone required");

    const validItems = items.filter(
      (i) => i.menuId
    );

    if (!validItems.length)
      return alert("Select at least one dish");

    try {
      setLoading(true);

      const response = await createOrder({
        customerName,
        customerPhone,
        tableNumber,
        orderType,
        waiterName,
        paymentMethod,
        paymentStatus,
        gst,
        discount,
        items: validItems,
      });

      setCreatedOrder(response.order);

      setShowReceipt(true);

      refreshOrders();

      return;
      
    } catch (err) {
      console.error(err);
      alert("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">

      <div className="mx-auto my-10 w-full max-w-7xl rounded-3xl bg-slate-950 p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Restaurant POS
            </h1>

            <p className="text-slate-400">
              Create a new customer order
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
          >
            Close
          </button>

        </div>

        <div className="grid gap-8">

          <CustomerDetails
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            tableNumber={tableNumber}
            setTableNumber={setTableNumber}
            orderType={orderType}
            setOrderType={setOrderType}
            waiterName={waiterName}
            setWaiterName={setWaiterName}
          />

          <OrderItems
            menus={menus}
            items={items}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />

          <BillSummary
  subtotal={subtotal}
  discount={discount}
  setDiscount={setDiscount}
/>

          <PaymentSection
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            total={grandTotal}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-600 py-4 text-lg font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading
              ? "Creating Order..."
              : "Complete Payment & Create Order"}
          </button>

        </div>

      </div>

    </div>

    <ReceiptModal
  open={showReceipt}
  order={createdOrder}
  onClose={() => {
    setShowReceipt(false);
    resetForm();
    onClose();
  }}
  onContinue={() => {
    setShowReceipt(false);
    setShowFeedback(true);
  }}
/>

<FeedbackModal
  open={showFeedback}
  customerName={customerName}
  customerPhone={customerPhone}
  orderId={createdOrder?.id || ""}
  onClose={() => {
    setShowFeedback(false);
    resetForm();
    onClose();
  }}
  onSubmit={async (data) => {
  try {
    console.log("Submitting Feedback:", data);

    const response = await createFeedback(data);

    console.log("Feedback Response:", response);

    alert("Feedback submitted successfully!");

    setShowFeedback(false);
    resetForm();
    refreshOrders();
    onClose();
  } catch (error: any) {
    console.error("Feedback Error:", error);

    alert(
      error.response?.data?.message ||
      error.message ||
      "Feedback submission failed."
    );
  }
}}
/>
</>
  );
}