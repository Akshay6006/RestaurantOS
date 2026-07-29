"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import GuestRoute from "@/components/auth/GuestRoute";

export default function RegisterPage() {
  return (
    <GuestRoute>
      <AuthLayout
        title="Create Your Account"
        subtitle="Join RestaurantOS and start managing your restaurant smarter with AI."
      >
        <RegisterForm />
      </AuthLayout>
    </GuestRoute>
  );
}