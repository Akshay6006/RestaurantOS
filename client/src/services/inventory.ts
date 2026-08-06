import API from "./api";
import { Inventory } from "@/types/inventory";

// =======================
// Get All Inventory
// =======================
export const getInventory = async () => {
  const { data } = await API.get("/inventory");
  return data.inventory;
};

// =======================
// Get Single Item
// =======================
export const getInventoryById = async (id: string) => {
  const { data } = await API.get(`/inventory/${id}`);
  return data.inventory;
};

// =======================
// Create Inventory
// =======================
export const createInventory = async (
  inventory: Omit<Inventory, "id" | "createdAt" | "updatedAt">
) => {
  const { data } = await API.post("/inventory", inventory);
  return data.inventory;
};

// =======================
// Update Inventory
// =======================
export const updateInventory = async (
  id: string,
  inventory: Partial<Inventory>
) => {
  const { data } = await API.put(`/inventory/${id}`, inventory);
  return data.inventory;
};

// =======================
// Delete Inventory
// =======================
export const deleteInventory = async (id: string) => {
  const { data } = await API.delete(`/inventory/${id}`);
  return data;
};

// =======================
// Stock In
// =======================
export const stockIn = async (
  id: string,
  quantity: number
) => {
  const { data } = await API.patch(
    `/inventory/${id}/stock-in`,
    {
      quantity,
    }
  );

  return data.inventory;
};

// =======================
// Stock Out
// =======================
export const stockOut = async (
  id: string,
  quantity: number
) => {
  const { data } = await API.patch(
    `/inventory/${id}/stock-out`,
    {
      quantity,
    }
  );

  return data.inventory;
};

// =======================
// AI Invoice Extraction
// =======================

export const extractInventoryInvoice = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await API.post(
    "/inventory/extract-invoice",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};