"use client";

import { useState } from "react";
import { Card, Badge, Button, Tabs, Input } from "@/app/components/ui";
import {
  Send, CheckCircle, FileText, Download, Upload,
  Rocket, Shield, BarChart3, Bot, Terminal, ArrowRight,
  Clock, Zap, Users, Globe, Mail
} from "lucide-react";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════
//  PRODUCTIZED SERVICES — not hourly consulting
// ═══════════════════════════════════════════════════════════════
interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  deliverables: string[];
  timeline: string;
  type: "self-serve" | "guided" | "managed";
  cta: string;
}

const services: Service[] = [
  {
    id: "ai-setup",
    name: "AI Copilot Setup",
    tagline: "Get AI-powered development running in your team",
    description: "Deploy the Omega AI Copilot with your choice of models. Configure RAG with your codebase. Team onboarding included.",
    icon: Bot,
    deliverables: [
      "AI Copilot deployed (cloud or self-hosted)",
      "RAG pipeline connected to your repository",
      "Team training session (1 hour)",
      "Model configuration (GPT-4o, Claude, Ollama)",
      "API keys and access management",
    ],
    timeline: "2-3 days",
    type: "guided",
    cta: "Book Setup",
  },
  {
    id: "deployment-pipeline",
    name: "Deployment Pipeline",
    tagline: "Zero-downtime deployments from day one",
    description: "Set up Omega Deploy with your infrastructure. Multi-environment, auto-rollback, health checks. Works with any cloud.",
    icon: Rocket,
    deliverables: [
      "CI/CD pipeline configured",
      "Staging + production environments",
      "Automatic rollback on failure",
      "Health check endpoints",
      "Slack/Discord notifications",
    ],
    timeline: "1-2 days",
    type: "guided",
    cta: "Book Setup",
  },
  {
    id: "monitoring",
    name: "Infrastructure Monitoring",
    tagline: "See everything. Before it breaks.",
    description: "Deploy InfraGraph with Prometheus + Grafana. Real-time dashboards, auto-alerting, incident response workflows.",
    icon: BarChart3,
    deliverables: [
      "Prometheus + Grafana deployed",
      "Custom dashboards for your stack",
      "Alert rules and thresholds",
      "Incident response runbook",
      "Team onboarding",
    ],
    timeline: "2-3 days",
    type: "guided",
    cta: "Book Setup",
  },
  {
    id: "security-audit",
    name: "Security Scan + Hardening",
    tagline: "Find vulnerabilities. Fix them. Automate prevention.",
    description: "Full security audit of your codebase, dependencies, and infrastructure. Remediation plan + automated scanning in CI/CD.",
    icon: Shield,
    deliverables: [
      "Full vulnerability report",
      "Dependency audit (CVE database)",
      "Code pattern analysis",
      "Infrastructure hardening checklist",
      "CI/CD security scanning integration",
    ],
    timeline: "3-5 days",
    type: "guided",
    cta: "Book Audit",
  },
  {
    id: "self-hosted",
    name: "Self-Hosted Platform",
    tagline: "Run Omega entirely on your infrastructure",
    description: "Full platform deployment on your servers. Docker Compose or Helm charts. Dedicated migration support. SLA included.",
    icon: Globe,
    deliverables: [
      "Full platform on your infrastructure",
      "Docker Compose or Helm deployment",
      "Database migration",
      "Custom domain + SSL",
      "30-day support included",
    ],
    timeline: "5-7 days",
    type: "managed",
    cta: "Get Quote",
  },
  {
    id: "api-access",
    name: "API Access",
    tagline: "Build on top of Omega's tools",
    description: "API keys for MCP tools, AI Copilot, code review. Documentation, SDK examples, and support included.",
    icon: Terminal,
    deliverables: [
      "API key with rate limits chosen by you",
      "Full API documentation",
      "SDK examples (Python, JS, Go)",
      "Webhook support",
      "Usage dashboard",
    ],
    timeline: "Instant",
    type: "self-serve",
    cta: "Get API Key",
  },
];

const typeColors: Record<string, "success" | "default" | "warning"> = {
  "self-serve": "success",
  guided: "default",
  managed: "warning",
};

const typeLabels: Record<string, string> = {
  "self-serve": "Self-Serve",
  guided: "Guided Setup",
  managed: "Fully Managed",
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<"services" | "contact">("services");
  const [contactForm, setContactForm] = useState({ name: "", email: "", company: "", message: "", service: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ name: "", email: "", company: "", message: "", service: "" });
    }, 4000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Services</h1>
        <p className="text-muted max-w-xl mx-auto">
          Productized services — clear scope, clear timeline, clear deliverables.
          No open-ended hourly billing. You know exactly what you get.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-xs mx-auto mb-10">
        <Tabs
          tabs={[
            { label: "Services", value: "services" },
            { label: "Contact", value: "contact" },
          ]}
          active={activeTab}
          onChange={(v) => setActiveTab(v as "services" | "contact")}
        />
      </div>

      {/* ═══ SERVICES TAB ═══ */}
      {activeTab === "services" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="flex flex-col hover:border-accent/30 transition-colors">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 shrink-0">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-xs text-muted">{service.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-muted mb-4 flex-1">{service.description}</p>

                {/* Deliverables */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-accent mb-2 uppercase tracking-wider">Deliverables</h4>
                  <ul className="space-y-1">
                    {service.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="h-3 w-3 text-neon-green shrink-0 mt-0.5" />
                        <span className="text-xs text-muted">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 mb-4 pt-3 border-t border-border">
                  <Badge variant={typeColors[service.type]} className="text-[10px]">
                    {typeLabels[service.type]}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <Clock className="h-3 w-3" />
                    {service.timeline}
                  </div>
                  {service.type === "self-serve" && (
                    <Badge variant="success" className="text-[10px] ml-auto">
                      <Zap className="h-2.5 w-2.5 mr-0.5" /> Instant
                    </Badge>
                  )}
                </div>

                <Button
                  variant={service.type === "managed" ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setContactForm((prev) => ({ ...prev, service: service.name }));
                    setActiveTab("contact");
                  }}
                >
                  {service.cta}
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      {/* ═══ CONTACT TAB ═══ */}
      {activeTab === "contact" && (
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <Card className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-neon-green mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Message Sent</h2>
              <p className="text-muted text-sm">We'll get back to you within 24 hours.</p>
            </Card>
          ) : (
            <Card>
              <h2 className="text-lg font-semibold mb-1">Get in Touch</h2>
              <p className="text-xs text-muted mb-6">
                Tell us what you need. We'll reply with a proposal — scope, timeline, and fixed price.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {contactForm.service && (
                  <div className="flex items-center gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2">
                    <Zap className="h-3.5 w-3.5 text-accent" />
                    <span className="text-sm font-medium">{contactForm.service}</span>
                    <button
                      type="button"
                      onClick={() => setContactForm((prev) => ({ ...prev, service: "" }))}
                      className="ml-auto text-muted text-xs hover:text-foreground"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted mb-1 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted mb-1 block">Email</label>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted mb-1 block">Company (optional)</label>
                  <Input
                    placeholder="Your company"
                    value={contactForm.company}
                    onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs text-muted mb-1 block">What do you need?</label>
                  <textarea
                    placeholder="Describe your project, team size, infrastructure, and goals..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={5}
                    className="flex w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Inquiry
                </Button>

                <p className="text-[10px] text-muted text-center">
                  No commitment. No spam. We reply within 24 hours with a fixed-scope proposal.
                </p>
              </form>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-center gap-4 text-xs text-muted">
                  <a href="mailto:contact@hazem.dev" className="flex items-center gap-1 hover:text-accent transition-colors">
                    <Mail className="h-3 w-3" /> contact@hazem.dev
                  </a>
                  <a href="https://github.com/hazem-soussi-HA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    GitHub
                  </a>
                </div>
              </div>
            </Card>
          )}

          {/* SLA Notice */}
          <Card className="mt-6 border-accent/20">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm mb-1">Service Guarantee</h3>
                <ul className="space-y-1 text-xs text-muted">
                  <li className="flex items-center gap-1"><CheckCircle className="h-2.5 w-2.5 text-neon-green" /> Fixed scope, fixed price — no surprises</li>
                  <li className="flex items-center gap-1"><CheckCircle className="h-2.5 w-2.5 text-neon-green" /> Clear deliverables listed for each service</li>
                  <li className="flex items-center gap-1"><CheckCircle className="h-2.5 w-2.5 text-neon-green" /> Response within 24 hours</li>
                  <li className="flex items-center gap-1"><CheckCircle className="h-2.5 w-2.5 text-neon-green" /> 30-day post-delivery support included</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Back to SaaS CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted mb-3">Want to try the tools first?</p>
        <Button variant="outline" size="sm">
          <Link href="/saas">
            Explore SaaS Plans <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
