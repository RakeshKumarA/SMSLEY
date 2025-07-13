"use client";
import { useAuthStore } from "@/lib/store/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RequireRole({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const role = useAuthStore((s) => s.role);
  const router = useRouter();

  useEffect(() => {
    if (role && !allowedRoles.includes(role)) {
      router.replace("/unauthorized");
    }
  }, [role]);

  if (!role) return null; // or a loader

  return <>{allowedRoles.includes(role) ? children : null}</>;
}
