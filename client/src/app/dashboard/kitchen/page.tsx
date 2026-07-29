import ProtectedRoute from "@/components/auth/ProtectedRoute";
import KitchenBoard from "@/components/kitchen/KitchenBoard";

export default function KitchenPage() {
  return (
    <ProtectedRoute>
      <KitchenBoard />
    </ProtectedRoute>
  );
}