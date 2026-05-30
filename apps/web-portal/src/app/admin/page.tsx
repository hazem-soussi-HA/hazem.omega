"use client";

import { Card, Badge } from "@/app/components/ui";
import { useAppStore } from "@/lib/store";
import { BarChart3, Users, FileText, Settings, Shield, TrendingUp } from "lucide-react";

export default function AdminPage() {
  const userRole = useAppStore((s) => s.userRole);

  if (userRole !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Shield className="h-12 w-12 text-muted mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted">Admin access required</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Users", value: "5,247", icon: Users, trend: "+12%" },
    { label: "Active Subscriptions", value: "892", icon: TrendingUp, trend: "+8%" },
    { label: "Projects", value: "156", icon: FileText, trend: "+3" },
    { label: "API Calls Today", value: "89,234", icon: BarChart3, trend: "+23%" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted">Content management and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="flex items-center justify-between mb-2">
                <Icon className="h-5 w-5 text-accent" />
                <Badge variant="success">{stat.trend}</Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-accent" /> Content Management
          </h3>
          <div className="space-y-2">
            {["Projects", "Courses", "Blog Posts", "Certificates"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-md border border-border p-3">
                <span className="text-sm">{item}</span>
                <Badge variant="secondary">{Math.floor(Math.random() * 50 + 10)}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" /> Recent Activity
          </h3>
          <div className="space-y-2">
            {[
              "New user registration: user@example.com",
              "Premium subscription activated",
              "Course progress updated: AI for Developers",
              "Support ticket resolved: TKT-002",
            ].map((activity, i) => (
              <div key={i} className="text-sm text-muted p-2 rounded bg-card-foreground/5">
                {activity}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
