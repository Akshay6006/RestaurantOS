"use client";

import { useEffect, useMemo, useState } from "react";

import {
  createInventory,
  deleteInventory,
  getInventory,
  updateInventory,
} from "@/services/inventory";

import { Inventory, InventoryFormData } from "@/types/inventory";

import InventoryToolbar from "./InventoryToolbar";
import InventoryTable from "./InventoryTable";
import AddInventoryModal from "./AddInventoryModal";
import EditInventoryModal from "./EditInventoryModal";
import DeleteInventoryDialog from "./DeleteInventoryDialog";
import AIImportInventoryDialog from "./AIImportInventoryDialog";

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAIImport, setShowAIImport] = useState(false);

  const [selectedItem, setSelectedItem] =
    useState<Inventory | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] =
    useState<Inventory | null>(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);

      const data = await getInventory();

      setInventory(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [inventory, search, category]);

  const categories = [
    "All",
    ...new Set(
      inventory.map((item) => item.category)
    ),
  ];

  const handleCreate = async (
    data: InventoryFormData
  ) => {
    await createInventory(data);

    setShowAdd(false);

    fetchInventory();
  };

  const handleUpdate = async (
    data: InventoryFormData
  ) => {
    if (!selectedItem) return;

    await updateInventory(
      selectedItem.id,
      data
    );

    setShowEdit(false);

    setSelectedItem(null);

    fetchInventory();
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;

    await deleteInventory(deleteItem.id);

    setDeleteOpen(false);

    setDeleteItem(null);

    fetchInventory();
  };

  const totalProducts = inventory.length;

  const lowStock = inventory.filter(
    (item) =>
      item.quantity > 0 &&
      item.quantity <=
        item.lowStockThreshold
  ).length;

  const outOfStock = inventory.filter(
    (item) => item.quantity === 0
  ).length;

  const totalValue = inventory.reduce(
    (sum, item) =>
      sum +
      item.purchasePrice * item.quantity,
    0
  );

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Products
          </p>

          <h2 className="text-3xl font-bold">
            {totalProducts}
          </h2>
        </div>

        <div className="rounded-xl bg-yellow-50 p-6 shadow">
          <p className="text-sm text-gray-500">
            Low Stock
          </p>

          <h2 className="text-3xl font-bold text-yellow-600">
            {lowStock}
          </h2>
        </div>

        <div className="rounded-xl bg-red-50 p-6 shadow">
          <p className="text-sm text-gray-500">
            Out of Stock
          </p>

          <h2 className="text-3xl font-bold text-red-600">
            {outOfStock}
          </h2>
        </div>

        <div className="rounded-xl bg-green-50 p-6 shadow">
          <p className="text-sm text-gray-500">
            Inventory Value
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            ₹{totalValue.toFixed(2)}
          </h2>
        </div>

      </div>

      <InventoryToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        onAdd={() => setShowAdd(true)}
        onAIImport={() =>
          setShowAIImport(true)
        }
      />

      <InventoryTable
        loading={loading}
        inventory={filteredInventory}
        onEdit={(item) => {
          setSelectedItem(item);

          setShowEdit(true);
        }}
        onDelete={(item) => {
          setDeleteItem(item);

          setDeleteOpen(true);
        }}
      />

      <AddInventoryModal
        open={showAdd}
        onClose={() =>
          setShowAdd(false)
        }
        onSubmit={handleCreate}
      />

      {selectedItem && (
        <EditInventoryModal
          open={showEdit}
          item={selectedItem}
          onClose={() => {
            setShowEdit(false);

            setSelectedItem(null);
          }}
          onSubmit={handleUpdate}
        />
      )}

      <DeleteInventoryDialog
        open={deleteOpen}
        itemName={deleteItem?.name || ""}
        onClose={() => {
          setDeleteOpen(false);

          setDeleteItem(null);
        }}
        onConfirm={confirmDelete}
      />

      <AIImportInventoryDialog
        open={showAIImport}
        onClose={() =>
          setShowAIImport(false)
        }
        onSuccess={fetchInventory}
      />

    </div>
  );
}