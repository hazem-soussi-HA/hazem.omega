"use client";

import { Card, Badge, Button } from "@/app/components/ui";
import { useAppStore } from "@/lib/store";
import { Calculator, FileText, Cloud, Shield, Zap, Lock, Crown, Check } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    id: "calculator",
    name: "Smart Calculator",
    description: "MCP-powered calculations with support for complex expressions and unit conversions.",
    icon: Calculator,
    free: true,
    premium: true,
    category: "Productivity",
  },
  {
    id: "text-processor",
    name: "Text Processor",
    description: "AI-enhanced text analysis, summarization, and formatting tool.",
    icon: FileText,
    free: true,
    premium: true,
    category: "Productivity",
  },
  {
    id: "weather",
    name: "Dev Weather",
    description: "Weather data for planning outdoor deployments and team events.",
    icon: Cloud,
    free: true,
    premium: false,
    category: "Utility",
  },
  {
    id: "security-scanner",
    name: "Security Scanner",
    description: "Vulnerability scanning and compliance checking for your codebase.",
    icon: Shield,
    free: false,
    premium: true,
    category: "Security",
  },
  {
    id: "api-builder",
    name: "API Builder",
    description: "Visual API design and automatic code generation for REST endpoints.",
    icon: Zap,
    free: false,
    premium: true,
    category: "Development",
  },
  {
    id: "document-vault",
    name: "Document Vault",
    description: "Encrypted document storage and secure sharing with clients.",
    icon: Lock,
    free: false,
    premium: true,
    category: "Security",
  },
];

export default function SaaSPage() {
  const userRole = useAppStore((s) => s.userRole);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2">SaaS Tools</h1>
        <p className="text-muted mb-4">Micro-tools for developers and teams</p>
        <Badge variant={userRole === 'premium' ? 'success' : 'warning'}>
          {userRole === 'premium' ? 'Premium' : 'Free'} Plan
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isLocked = !tool.free && userRole !== 'premium';
          return (
            <Card key={tool.id} className={isLocked ? "opacity-60" : ""}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">{tool.name}</h3>
                  <Badge variant="secondary">{tool.category}</Badge>
                </div>
              </div>
              <p className="text-sm text-muted mb-4">{tool.description}</p>
              {isLocked ? (
                <Button variant="outline" size="sm" disabled>
                  <Crown className="mr-2 h-4 w-4" />
                  Premium Only
                </Button>
              ) : (
                <Button variant="outline" size="sm">
                  <Check className="mr-2 h-4 w-4" />
                  Open Tool
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="text-center glow-cyan">
        <h2 className="text-xl font-bold mb-2">Upgrade to Premium</h2>
        <p className="text-muted mb-4">€9/month — unlock all tools and features</p>
        <Button size="lg">
          <Link href="/services">Subscribe Now</Link>
        </Button>
      </Card>
    </div>
  );
}
