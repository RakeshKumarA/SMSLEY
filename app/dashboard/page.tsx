"use client";

import { useAuthStore } from "@/lib/store/useAuth";
import Dashboard from "@/components/Dashboard";
import AdminPanel from "@/components/AdminPanel";

export default function DashboardPage() {
  const role = useAuthStore((state) => state.role);

  if (!role) {
    return <p className="text-gray-500">Loading user role...</p>;
  }

  return (
    <main className="p-6 space-y-6">
      <Dashboard />
      {role === "admin" && <AdminPanel />}
    </main>
  );
}
