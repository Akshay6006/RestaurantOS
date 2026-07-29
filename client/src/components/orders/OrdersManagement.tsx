"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { getOrders } from "@/services/order";

import OrdersToolbar from "./OrdersToolbar";
import OrdersTable from "./OrdersTable";
import CreateOrderModal from "./CreateOrderModal";
import UpdateStatusModal from "./UpdateStatusModal";

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getOrders();

      setOrders(res.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      order.customerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order.tableNumber
        .toString()
        .includes(search);

    const statusMatch =
      status === "ALL" || order.status === status;

    return searchMatch && statusMatch;
  });

  const pending = orders.filter(
    (o) => o.status === "PENDING"
  ).length;

  const preparing = orders.filter(
    (o) => o.status === "PREPARING"
  ).length;

  const ready = orders.filter(
    (o) => o.status === "READY"
  ).length;

  const served = orders.filter(
    (o) => o.status === "SERVED"
  ).length;

  return (
    <div className="space-y-6">

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-slate-400">Pending</p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-400">
            {pending}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-slate-400">Preparing</p>

          <h2 className="mt-2 text-3xl font-bold text-blue-400">
            {preparing}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-slate-400">Ready</p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {ready}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-slate-400">Served</p>

          <h2 className="mt-2 text-3xl font-bold text-purple-400">
            {served}
          </h2>
        </div>

      </div>

      <OrdersToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onCreate={() => setOpenCreateModal(true)}
      />

      <OrdersTable
        orders={filteredOrders}
        loading={loading}
        onStatus={(order) => {
          setSelectedOrder(order);
          setOpenStatusModal(true);
        }}
      />

      <CreateOrderModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        refreshOrders={fetchOrders}
      />

      <UpdateStatusModal
        open={openStatusModal}
        order={selectedOrder}
        onClose={() => {
          setOpenStatusModal(false);
          setSelectedOrder(null);
        }}
        refreshOrders={fetchOrders}
      />

    </div>
  );
}