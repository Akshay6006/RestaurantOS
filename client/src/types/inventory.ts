export interface Inventory {
  id: string;

  name: string;

  category: string;

  quantity: number;

  unit: string;

  purchasePrice: number;

  supplier?: string;

  warehouse?: string;

  lowStockThreshold: number;

  createdAt: string;

  updatedAt: string;
}

export interface InventoryFormData {
  name: string;

  category: string;

  quantity: number;

  unit: string;

  purchasePrice: number;

  supplier: string;

  warehouse: string;

  lowStockThreshold: number;
}