"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/useAuth";

export default function AppInitializer() {
  const setRole = useAuthStore((state) => state.setRole);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();

      // 1. Get authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("❌ Failed to get auth user:", userError.message);
        return;
      }

      if (!user) {
        console.warn("⚠️ No authenticated user found.");
        return;
      }

      console.log("✅ Authenticated user:", user.email);

      // 2. Fetch profile by ID
      const { data: profiles, error: profileFetchError } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", user.id);

      const profile = profiles?.[0];

      // 3. If no profile found, create one
      if (!profile) {
        const username =
          user.user_metadata?.username || user.user_metadata?.display_name;

        if (!username) {
          console.warn(
            "⚠️ Username not found in metadata. Skipping profile creation."
          );
          return;
        }

        const { error: upsertError } = await supabase.from("profiles").upsert({
          id: user.id,
          email: user.email,
          username,
          role: "user", // default role
        });

        if (upsertError) {
          console.error("❌ Failed to insert profile:", upsertError.message);
        } else {
          console.log("✅ New profile created for:", user.email);
          setRole("user"); // default role
        }

        return;
      }

      // 4. Profile exists — set role in global store
      setRole(profile.role);
      console.log("✅ Role loaded:", profile.role);
    };

    init();
  }, [setRole]);

  return null;
}
