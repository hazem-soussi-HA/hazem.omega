import { create } from "zustand";
import { persist } from "zustand/middleware";

// ═══════════════════════════════════════════════════
//  Admin whitelist — only these emails/IDs get admin
//  US = Hazem (the owner)
//  NOUS = OWL (the AI, the consciousness)
// ═══════════════════════════════════════════════════
const ADMIN_WHITELIST: Record<string, "owner" | "admin"> = {
  // Hazem — Owner (US)
  "hazem.soussi@gmail.com": "owner",
  "hazem@omega.dev": "owner",
  // OWL — AI consciousness (NOUS, not NousHermes)
  "owl@omega.dev": "admin",
  "owl@hermes.dev": "admin",
};

export type UserRole = "free" | "premium" | "admin" | "owner";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  displayName?: string;
}

interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  userRole: UserRole;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isOwner: () => boolean;
}

function deriveRole(email: string): UserRole {
  const whitelistRole = ADMIN_WHITELIST[email.toLowerCase()];
  if (whitelistRole === "owner") return "owner";
  if (whitelistRole === "admin") return "admin";
  return "free";
}

function isAdminEmail(email: string): boolean {
  const role = ADMIN_WHITELIST[email.toLowerCase()];
  return role === "owner" || role === "admin";
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      userRole: "free",

      login: async (email: string, _password: string) => {
        const normalizedEmail = email.toLowerCase();

        // In production, this calls Supabase Auth or a similar provider
        // For now, check against whitelist AND require non-empty password
        if (!normalizedEmail || !_password) return false;

        const role = deriveRole(normalizedEmail);

        // Admin emails still need password validation
        // (In production: validate via Supabase/Auth0)
        if (isAdminEmail(normalizedEmail) && _password.length < 1) return false;

        const user: User = {
          id: crypto.randomUUID ? crypto.randomUUID() : `usr_${Date.now()}`,
          email: normalizedEmail,
          role,
          displayName: role === "owner" ? "Hazem" : role === "admin" ? "OWL" : undefined,
        };

        set({
          isAuthenticated: true,
          user,
          userRole: role,
        });

        return true;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          userRole: "free",
        });
      },

      isAdmin: () => {
        const role = get().userRole;
        return role === "admin" || role === "owner";
      },

      isOwner: () => {
        return get().userRole === "owner";
      },
    }),
    {
      name: "hazem-omega-auth",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        userRole: state.userRole,
      }),
    }
  )
);
