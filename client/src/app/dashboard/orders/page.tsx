import ProtectedRoute from "@/components/auth/ProtectedRoute";
import OrdersManagement from "@/components/orders/OrdersManagement";

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersManagement />
    </ProtectedRoute>
  );
}