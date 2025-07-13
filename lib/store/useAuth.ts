import { create } from "zustand";

type AuthState = {
  role: string | null;
  setRole: (role: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
