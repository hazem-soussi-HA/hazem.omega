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

export interface Subscription {
  plan: "starter" | "pro" | "team" | "enterprise";
  status: "active" | "trialing" | "past_due" | "canceled" | "none";
  expiresAt?: string;
  apiCallsUsed: number;
  aiMessagesUsed: number;
}

interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  userRole: UserRole;
  subscription: Subscription;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setPlan: (plan: Subscription["plan"]) => void;
  isAdmin: () => boolean;
  isOwner: () => boolean;
  hasProAccess: () => boolean;
  hasTeamAccess: () => boolean;
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

const DEFAULT_SUBSCRIPTION: Subscription = {
  plan: "starter",
  status: "none",
  apiCallsUsed: 0,
  aiMessagesUsed: 0,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      userRole: "free",
      subscription: DEFAULT_SUBSCRIPTION,

      login: async (email: string, _password: string) => {
        const normalizedEmail = email.toLowerCase();

        if (!normalizedEmail || !_password) return false;

        const role = deriveRole(normalizedEmail);

        if (isAdminEmail(normalizedEmail) && _password.length < 1) return false;

        const plan = role === "owner" ? "enterprise" as const
          : role === "admin" ? "team" as const
          : "starter" as const;

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
          subscription: {
            ...DEFAULT_SUBSCRIPTION,
            plan,
            status: "active",
          },
        });

        return true;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          userRole: "free",
          subscription: DEFAULT_SUBSCRIPTION,
        });
      },

      setPlan: (plan) => {
        set((state) => ({
          subscription: {
            ...state.subscription,
            plan,
            status: "active",
          },
          userRole: plan === "team" ? "premium" : state.userRole,
        }));
      },

      isAdmin: () => {
        const role = get().userRole;
        return role === "admin" || role === "owner";
      },

      isOwner: () => {
        return get().userRole === "owner";
      },

      hasProAccess: () => {
        const { userRole, subscription } = get();
        if (userRole === "owner" || userRole === "admin") return true;
        return subscription.plan === "pro" || subscription.plan === "team" || subscription.plan === "enterprise";
      },

      hasTeamAccess: () => {
        const { subscription } = get();
        return subscription.plan === "team" || subscription.plan === "enterprise";
      },
    }),
    {
      name: "hazem-omega-auth",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        userRole: state.userRole,
        subscription: state.subscription,
      }),
    }
  )
);
