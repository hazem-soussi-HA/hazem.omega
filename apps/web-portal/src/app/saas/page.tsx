"use client";

import { useState } from "react";
import { Card, Badge, Button, Tabs } from "@/app/components/ui";
import { useAppStore, UserRole } from "@/lib/store";
import {
  Zap, Shield, Cloud, Terminal, Cpu, GitBranch,
  Check, X, ArrowRight, Crown, Sparkles, Users, Server,
  Bot, Code, BarChart3, Lock, Globe, Rocket
} from "lucide-react";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════
//  PRICING TIERS — real, logical, affordable
// ═══════════════════════════════════════════════════════════════
interface Tier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  icon: React.ElementType;
  popular?: boolean;
  cta: string;
  ctaVariant: "default" | "outline";
  features: { text: string; included: boolean; detail?: string }[];
  limits: Record<string, string>;
}

const tiers: Tier[] = [
  {
    id: "free",
    name: "Starter",
    price: "$0",
    priceNote: "forever",
    description: "Explore the platform. Free MCP tools, limited AI chat, community access.",
    icon: Zap,
    cta: "Get Started Free",
    ctaVariant: "outline",
    features: [
      { text: "MCP Calculator & Text Tools", included: true, detail: "100 calls/day" },
      { text: "Dev Weather API", included: true, detail: "50 calls/day" },
      { text: "AI Chat (basic)", included: true, detail: "Phi-3 mini, 20 msgs/day" },
      { text: "Public API Access", included: true, detail: "Read-only" },
      { text: "Community Discord", included: true },
      { text: "CodePilot — AI Review", included: false, detail: "Pro+" },
      { text: "AI Copilot — Multi-model", included: false, detail: "Pro+" },
      { text: "Deployment Pipeline", included: false, detail: "Team+" },
      { text: "Infrastructure Monitoring", included: false, detail: "Team+" },
      { text: "Priority Support", included: false, detail: "Enterprise" },
    ],
    limits: { "API calls": "200/day", "AI messages": "20/day", "Team seats": "1", "Projects": "1" },
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    priceNote: "/month",
    description: "Full developer toolkit. AI Copilot with top models, CodePilot, no limits on MCP tools.",
    icon: Cpu,
    popular: true,
    cta: "Start Pro Trial",
    ctaVariant: "default",
    features: [
      { text: "MCP Calculator & Text Tools", included: true, detail: "Unlimited" },
      { text: "Dev Weather API", included: true, detail: "Unlimited" },
      { text: "AI Chat (multi-model)", included: true, detail: "GPT-4o, Claude, 500 msgs/day" },
      { text: "Public API Access", included: true, detail: "Read + Write" },
      { text: "Community Discord", included: true },
      { text: "CodePilot — AI Review", included: true, detail: "50 reviews/day" },
      { text: "AI Copilot — Streaming", included: true, detail: "All OpenRouter models" },
      { text: "Deployment Pipeline", included: false, detail: "Team+" },
      { text: "Infrastructure Monitoring", included: false, detail: "Team+" },
      { text: "Priority Support", included: false, detail: "Enterprise" },
    ],
    limits: { "API calls": "10,000/day", "AI messages": "500/day", "Team seats": "1", "Projects": "5" },
  },
  {
    id: "team",
    name: "Team",
    price: "$49",
    priceNote: "/month",
    description: "Everything in Pro, plus deployment pipelines, monitoring, and team collaboration.",
    icon: Users,
    cta: "Start Team Trial",
    ctaVariant: "outline",
    features: [
      { text: "MCP Calculator & Text Tools", included: true, detail: "Unlimited" },
      { text: "Dev Weather API", included: true, detail: "Unlimited" },
      { text: "AI Chat (multi-model)", included: true, detail: "GPT-4o, Claude, 2000 msgs/day" },
      { text: "Public API Access", included: true, detail: "Full access" },
      { text: "Community Discord", included: true },
      { text: "CodePilot — AI Review", included: true, detail: "Unlimited" },
      { text: "AI Copilot — Streaming", included: true, detail: "All models + custom" },
      { text: "Deployment Pipeline", included: true, detail: "5 environments" },
      { text: "Infrastructure Monitoring", included: true, detail: "3 dashboards" },
      { text: "Priority Support", included: false, detail: "Enterprise" },
    ],
    limits: { "API calls": "50,000/day", "AI messages": "2,000/day", "Team seats": "5", "Projects": "20" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    priceNote: "contact us",
    description: "Self-hosted or cloud. Unlimited everything. SLA. Dedicated support. Custom integrations.",
    icon: Server,
    cta: "Contact Sales",
    ctaVariant: "outline",
    features: [
      { text: "MCP Calculator & Text Tools", included: true, detail: "Unlimited" },
      { text: "Dev Weather API", included: true, detail: "Unlimited" },
      { text: "AI Chat (unlimited)", included: true, detail: "All models, no cap" },
      { text: "Public API Access", included: true, detail: "White-label" },
      { text: "Dedicated Channel", included: true },
      { text: "CodePilot — AI Review", included: true, detail: "Unlimited + custom rules" },
      { text: "AI Copilot — Custom Models", included: true, detail: "Fine-tuned models" },
      { text: "Deployment Pipeline", included: true, detail: "Unlimited" },
      { text: "Infrastructure Monitoring", included: true, detail: "Unlimited" },
      { text: "Priority Support", included: true, detail: "1-hour response SLA" },
    ],
    limits: { "API calls": "Unlimited", "AI messages": "Unlimited", "Team seats": "Unlimited", "Projects": "Unlimited" },
  },
];

// ═══════════════════════════════════════════════════════════════
//  PRODUCTS / TOOLS
// ═══════════════════════════════════════════════════════════════
const products = [
  {
    id: "mcp-tools",
    name: "MCP Tools",
    tagline: "AI-powered micro-tools via Model Context Protocol",
    description: "Calculator, text processor, weather, filesystem — accessible via API or MCP client. Free tier available.",
    icon: Terminal,
    tier: "starter",
    status: "live",
    features: ["Math expressions", "Unit conversions", "Text analysis", "Weather data", "Filesystem access"],
    api: "POST /api/tools/calculator",
  },
  {
    id: "ai-copilot",
    name: "AI Copilot",
    tagline: "Chat with the best models. Streaming. RAG-ready.",
    description: "Multi-model chat interface. GPT-4o, Claude, Llama — streaming responses via WebSocket. RAG integration ready.",
    icon: Bot,
    tier: "pro",
    status: "live",
    features: ["Streaming WebSocket", "Multi-model (OpenRouter)", "RAG pipeline", "Conversation history", "Code highlighting"],
    api: "WS /api/copilot/ws",
  },
  {
    id: "codepilot",
    name: "CodePilot",
    tagline: "AI code review on every commit",
    description: "Automated code review using Ollama/Phi-3. Security scanning, style checks, suggestions in real-time.",
    icon: Code,
    tier: "pro",
    status: "beta",
    features: ["Security scanning", "Style enforcement", "Real-time suggestions", "GitHub PR integration", "Multi-language"],
    api: "POST /api/codepilot/review",
  },
  {
    id: "omega-deploy",
    name: "Omega Deploy",
    tagline: "Deploy anywhere. Zero downtime. Auto-rollback.",
    description: "Deployment pipeline with health checks, automatic rollback, multi-environment support. Kubernetes-ready.",
    icon: Rocket,
    tier: "team",
    status: "beta",
    features: ["Zero-downtime deploys", "Auto-rollback", "Health checks", "Multi-env (staging/prod)", "K8s support"],
    api: "POST /api/deploy/trigger",
  },
  {
    id: "infragraph",
    name: "InfraGraph",
    tagline: "Monitor everything. Alert automatically.",
    description: "Infrastructure monitoring with Prometheus + Grafana. Real-time dashboards, automated alerting, incident response.",
    icon: BarChart3,
    tier: "team",
    status: "beta",
    features: ["Real-time metrics", "Auto-alerting", "Incident response", "Custom dashboards", "Prometheus + Grafana"],
    api: "GET /api/metrics/*",
  },
  {
    id: "security-scanner",
    name: "Security Scanner",
    tagline: "Find vulnerabilities before your users do",
    description: "Automated vulnerability scanning for dependencies, code patterns, and configurations. CI/CD integration.",
    icon: Shield,
    tier: "pro",
    status: "coming-soon",
    features: ["Dependency scanning", "Code pattern analysis", "Config auditing", "CI/CD integration", "CVE database"],
    api: "POST /api/security/scan",
  },
];

const statusColors: Record<string, "success" | "warning" | "secondary"> = {
  live: "success",
  beta: "warning",
  "coming-soon": "secondary",
};

const tierColors: Record<string, "default" | "success" | "warning" | "destructive"> = {
  starter: "success",
  pro: "default",
  team: "warning",
  enterprise: "destructive",
};

export default function SaaSPage() {
  const userRole = useAppStore((s) => s.userRole);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [activeTab, setActiveTab] = useState<"pricing" | "products">("pricing");

  const currentTier: "free" | "pro" | "team" | "enterprise" =
    userRole === "owner" || userRole === "admin" ? "enterprise" :
    userRole === "premium" ? "pro" : "free";

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Software as a Service</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Omega Platform</h1>
        <p className="text-muted max-w-2xl mx-auto">
          AI-powered developer tools, deployment pipelines, and infrastructure monitoring.
          Start free, scale as you grow.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Badge variant={currentTier === "free" ? "success" : currentTier === "pro" ? "default" : "destructive"}>
            Current: {currentTier === "free" ? "Starter" : currentTier === "pro" ? "Pro" : "Enterprise"}
          </Badge>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="max-w-xs mx-auto mb-10">
        <Tabs
          tabs={[
            { label: "Pricing", value: "pricing" },
            { label: "Products", value: "products" },
          ]}
          active={activeTab}
          onChange={(v) => setActiveTab(v as "pricing" | "products")}
        />
      </div>

      {/* ═══ PRICING TAB ═══ */}
      {activeTab === "pricing" && (
        <>
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className={`text-sm ${billing === "monthly" ? "text-foreground font-medium" : "text-muted"}`}>Monthly</span>
            <button
              onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
              className={`relative w-12 h-6 rounded-full transition-colors ${billing === "yearly" ? "bg-accent" : "bg-border"}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-background transition-transform ${billing === "yearly" ? "translate-x-6" : "translate-x-0.5"}`} />
            </button>
            <span className={`text-sm ${billing === "yearly" ? "text-foreground font-medium" : "text-muted"}`}>
              Yearly <Badge variant="success" className="ml-1 text-[10px]">-20%</Badge>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const isCurrentPlan = tier.id === currentTier;
              const displayPrice = billing === "yearly" && tier.id !== "free" && tier.id !== "enterprise"
                ? `$${Math.round(parseInt(tier.price.replace("$", "")) * 0.8)}`
                : tier.price;

              return (
                <Card
                  key={tier.id}
                  className={`relative flex flex-col ${tier.popular ? "border-accent/50 shadow-lg shadow-accent/10" : ""} ${isCurrentPlan ? "ring-2 ring-accent" : ""}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="default" className="text-[10px] px-2 py-0.5">MOST POPULAR</Badge>
                    </div>
                  )}
                  {isCurrentPlan && (
                    <div className="absolute -top-3 right-3">
                      <Badge variant="success" className="text-[10px] px-2 py-0.5">CURRENT</Badge>
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="font-semibold">{tier.name}</h3>
                    </div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-bold">{displayPrice}</span>
                      <span className="text-sm text-muted">{tier.priceNote}</span>
                    </div>
                    <p className="text-xs text-muted">{tier.description}</p>
                  </div>

                  <div className="space-y-2 mb-4 flex-1">
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        {f.included ? (
                          <Check className="h-3.5 w-3.5 text-neon-green shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-muted/40 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <span className={`text-xs ${f.included ? "text-foreground" : "text-muted/50"}`}>{f.text}</span>
                          {f.detail && (
                            <span className="text-[10px] text-muted ml-1">({f.detail})</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border mb-4">
                    <div className="grid grid-cols-2 gap-1">
                      {Object.entries(tier.limits).map(([key, val]) => (
                        <div key={key} className="text-center">
                          <p className="text-xs font-medium text-accent">{val}</p>
                          <p className="text-[10px] text-muted">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant={tier.popular ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? "Current Plan" : tier.cta}
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Feature Comparison Table */}
          <Card className="mb-16 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Feature Comparison</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-muted font-medium">Feature</th>
                  <th className="text-center py-2 px-2 text-muted font-medium">Starter</th>
                  <th className="text-center py-2 px-2 text-muted font-medium">Pro</th>
                  <th className="text-center py-2 px-2 text-muted font-medium">Team</th>
                  <th className="text-center py-2 px-2 text-muted font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["MCP Tools", "100/day", "Unlimited", "Unlimited", "Unlimited"],
                  ["AI Chat", "20 msgs/day", "500 msgs/day", "2000 msgs/day", "Unlimited"],
                  ["Models", "Phi-3 mini", "GPT-4o, Claude", "All + custom", "All + fine-tuned"],
                  ["Code Reviews", "—", "50/day", "Unlimited", "Unlimited + custom"],
                  ["Deployments", "—", "—", "5 envs", "Unlimited"],
                  ["Monitoring", "—", "—", "3 dashboards", "Unlimited"],
                  ["Team Seats", "1", "1", "5", "Unlimited"],
                  ["API Access", "Read", "Read + Write", "Full", "White-label"],
                  ["Support", "Community", "Email", "Priority", "1hr SLA"],
                ].map(([feature, ...vals], i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 pr-4 font-medium">{feature}</td>
                    {vals.map((val, j) => (
                      <td key={j} className="text-center py-2 px-2 text-muted">
                        {val === "—" ? <span className="text-muted/30">—</span> : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Can I switch plans anytime?", a: "Yes. Upgrade or downgrade instantly. We prorate the difference." },
                { q: "What happens when I hit my API limit?", a: "Requests are throttled, not blocked. You'll get a notification with the option to upgrade." },
                { q: "Is there a free trial for Pro and Team?", a: "Yes — 14 days, no credit card required. Full access to all features." },
                { q: "Can I self-host the Enterprise plan?", a: "Absolutely. We provide Docker images, Helm charts, and dedicated migration support." },
                { q: "Do you offer refunds?", a: "30-day money-back guarantee on all paid plans. No questions asked." },
              ].map((faq, i) => (
                <Card key={i}>
                  <h3 className="font-medium text-sm mb-1">{faq.q}</h3>
                  <p className="text-xs text-muted">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══ PRODUCTS TAB ═══ */}
      {activeTab === "products" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Card key={product.id} className="flex flex-col hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <p className="text-[10px] text-muted">{product.tagline}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant={statusColors[product.status]} className="text-[10px]">
                      {product.status === "live" ? "LIVE" : product.status === "beta" ? "BETA" : "SOON"}
                    </Badge>
                    <Badge variant={tierColors[product.tier]} className="text-[10px]">
                      {product.tier === "starter" ? "FREE" : product.tier.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-muted mb-3 flex-1">{product.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {product.features.map((f) => (
                    <Badge key={f} variant="secondary" className="text-[10px]">{f}</Badge>
                  ))}
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <code className="text-[10px] text-accent font-mono">{product.api}</code>
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    Docs <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* CTA */}
      <section className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto glow-cyan">
          <h2 className="text-xl font-bold mb-2">Ready to build with Omega?</h2>
          <p className="text-muted text-sm mb-4">
            Start free. No credit card. Upgrade when you need more.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={() => setActiveTab("pricing")}>
              <Sparkles className="mr-2 h-4 w-4" />
              View Pricing
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/services">
                Enterprise Inquiry <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
