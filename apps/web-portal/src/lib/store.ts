import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  userRole: string;
  setAuth: (user: User | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  user: null,
  userRole: "free",
  setAuth: (user) =>
    set({
      isAuthenticated: !!user,
      user,
      userRole: user?.role || "free",
    }),
}));
