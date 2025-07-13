"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/useAuth";

export default function AppInitializer() {
  const setRole = useAuthStore((state) => state.setRole);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();

      // Step 1: Get authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("❌ Failed to get auth user:", userError?.message);
        return;
      }

      console.log("✅ Authenticated user:", user.email);

      // Step 2: Try fetching user profile
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", user.id);

      if (profileError) {
        console.error("❌ Error fetching profile:", profileError.message);
        return;
      }

      let role = profiles?.[0]?.role;

      // Step 3: Insert profile if it doesn’t exist
      if (!role) {
        const username =
          user.user_metadata?.username || user.user_metadata?.display_name;

        if (!username) {
          console.warn("⚠️ No username found. Profile not created.");
          return;
        }

        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          username,
          role: "user",
        });

        if (insertError) {
          console.error("❌ Failed to create profile:", insertError.message);
          return;
        }

        console.log("✅ Profile created for", user.email);
        role = "user"; // default role
      }

      // Step 4: Store role in global store
      setRole(role?.toLowerCase() ?? "user");
      console.log("✅ Role set in store:", role);
    };

    init();
  }, [setRole]);

  return null;
}
