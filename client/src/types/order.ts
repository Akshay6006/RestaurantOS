export interface OrderItem {
  id: string;
  quantity: number;
  price: number;

  menu: {
    id: string;
    name: string;
    category: string;
    image?: string;
  };
}

export interface Order {
  id: string;
  customerName: string;
  tableNumber: number;
  totalAmount: number;

  status:
    | "PENDING"
    | "PREPARING"
    | "READY"
    | "SERVED"
    | "CANCELLED";

  items: OrderItem[];

  createdAt: string;
}