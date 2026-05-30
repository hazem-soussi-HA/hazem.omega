"use client";

import { Card, Badge } from "@/app/components/ui";
import { useAppStore } from "@/lib/store";
import { BarChart3, Users, FileText, Settings, Shield, TrendingUp, Lock, AlertTriangle, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const user = useAppStore((s) => s.user);
  const userRole = useAppStore((s) => s.userRole);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  // Not authenticated at all
  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Lock className="h-12 w-12 text-muted mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
        <p className="text-muted mb-6">Sign in to access the admin dashboard</p>
        <div className="max-w-sm mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Authenticated but not admin
  if (userRole !== "admin" && userRole !== "owner") {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Shield className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted mb-2">You are signed in as <span className="text-foreground font-medium">{user.email}</span></p>
        <p className="text-muted mb-6">
          Your role: <Badge variant="secondary">{userRole}</Badge> — Admin access required
        </p>
        <div className="max-w-sm mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Admin or Owner — show dashboard
  const isOwner = userRole === "owner";

  const stats = [
    { label: "Total Users", value: "—", icon: Users, trend: "live", color: "text-accent" },
    { label: "Active Subscriptions", value: "—", icon: TrendingUp, trend: "live", color: "text-neon-green" },
    { label: "Systems", value: "6", icon: FileText, trend: "active", color: "text-neon-purple" },
    { label: "GitHub Repos", value: "7", icon: Activity, trend: "synced", color: "text-neon-pink" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-muted">
            {isOwner ? "Owner" : "Admin"} control panel — <span className="text-accent">{user.email}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isOwner ? "default" : "success"}>
            {isOwner ? "OWNER" : "ADMIN"}
          </Badge>
        </div>
      </div>

      {/* Security notice */}
      <Card className="mb-8 border-yellow-500/30 bg-yellow-500/5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-500 mb-1">Security Notice</h3>
            <p className="text-sm text-muted">
              Admin access is restricted to whitelisted identities only (US + NOUS).
              All actions are logged. Unauthorized access attempts are blocked and recorded.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:border-accent/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-5 w-5 ${stat.color}`} />
                <Badge variant="success" className="text-[10px]">{stat.trend}</Badge>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" /> Content Management
          </h3>
          <div className="space-y-2">
            {[
              { name: "Systems", count: "6", href: "/systems" },
              { name: "Courses", count: "—", href: "/academy" },
              { name: "SaaS Tools", count: "6", href: "/saas" },
              { name: "Blog Posts", count: "—", href: "#" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between rounded-md border border-border p-3 hover:border-accent/30 transition-colors"
              >
                <span className="text-sm font-medium">{item.name}</span>
                <Badge variant="secondary">{item.count}</Badge>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-accent" /> Quick Actions
          </h3>
          <div className="space-y-2">
            <a href="https://github.com/hazem-soussi-HA/hazem.omega" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-md border border-border p-3 hover:border-accent/30 transition-colors">
              <span className="text-sm">View on GitHub</span>
              <Badge variant="default">Repository</Badge>
            </a>
            <Link href="/systems" className="flex items-center justify-between rounded-md border border-border p-3 hover:border-accent/30 transition-colors">
              <span className="text-sm">Manage Systems</span>
              <Badge variant="secondary">6 items</Badge>
            </Link>
            <Link href="/services" className="flex items-center justify-between rounded-md border border-border p-3 hover:border-accent/30 transition-colors">
              <span className="text-sm">Client Services</span>
              <Badge variant="warning">View</Badge>
            </Link>
            {isOwner && (
              <div className="flex items-center justify-between rounded-md border border-yellow-500/30 bg-yellow-500/5 p-3">
                <span className="text-sm text-yellow-500">Owner Controls</span>
                <Badge variant="warning">OWNER ONLY</Badge>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* GitHub Repos Status */}
      <Card className="mt-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent" /> System Repositories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "hazem.omega", url: "https://github.com/hazem-soussi-HA/hazem.omega", status: "main" },
            { name: "hazoom-os", url: "https://github.com/hazem-soussi-HA/hazoom-os", status: "existing" },
            { name: "omega-deploy", url: "https://github.com/hazem-soussi-HA/omega-deploy", status: "active" },
            { name: "codepilot", url: "https://github.com/hazem-soussi-HA/codepilot", status: "active" },
            { name: "infragraph", url: "https://github.com/hazem-soussi-HA/infragraph", status: "active" },
            { name: "mcp-server-suite", url: "https://github.com/hazem-soussi-HA/mcp-server-suite", status: "active" },
            { name: "ai-copilot", url: "https://github.com/hazem-soussi-HA/ai-copilot", status: "active" },
          ].map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-md border border-border p-3 hover:border-accent/30 transition-colors"
            >
              <span className="text-sm font-mono">{repo.name}</span>
              <Badge variant="success" className="text-[10px]">{repo.status}</Badge>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
