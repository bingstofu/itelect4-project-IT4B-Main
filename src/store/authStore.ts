import { create } from "zustand";

interface AuthState {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  login: (newToken: string) => set({ token: newToken }),
  logout: () => set({ token: null }),
}));