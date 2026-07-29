"use client";

import GuestRoute from "@/components/auth/GuestRoute";
import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <GuestRoute>
      <AuthLayout
        title="Forgot Password?"
        subtitle="Enter your email and we'll send you a password reset link."
      >
        <ForgotPasswordForm />
      </AuthLayout>
    </GuestRoute>
  );
}