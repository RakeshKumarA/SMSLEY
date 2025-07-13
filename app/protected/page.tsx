// app/protected/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/useAuth";
import Dashboard from "@/components/Dashboard";
import AdminPanel from "@/components/AdminPanel";

export default function ProtectedPage() {
  const role = useAuthStore((state) => state.role);
  const router = useRouter();

  useEffect(() => {
    // If no role yet (not logged in or still loading), check session
    const token = localStorage.getItem("sb-access-token"); // or just rely on role state
    if (!role && !token) {
      router.push("/auth/login");
    }
  }, [role, router]);

  if (!role) return <p className="text-gray-500">Loading...</p>;

  return (
    <main className="p-6 space-y-6">
      <Dashboard />
      {role === "admin" && <AdminPanel />}
    </main>
  );
}
