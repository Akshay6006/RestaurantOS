"use client";

import GuestRoute from "@/components/auth/GuestRoute";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <GuestRoute>
      <AuthLayout
        title="Welcome Back 👋"
        subtitle="Sign in to continue managing your restaurant."
      >
        <LoginForm />
      </AuthLayout>
    </GuestRoute>
  );
}