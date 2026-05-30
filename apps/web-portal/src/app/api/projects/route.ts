import { NextResponse } from "next/server";

const projects = [
  {
    id: "1",
    slug: "omega-deploy",
    title: "Omega Deploy",
    description: "Zero-downtime deployment platform",
    tech: ["Next.js", "Docker", "Kubernetes"],
    result: "99.99% uptime",
  },
  {
    id: "2",
    slug: "codepilot",
    title: "CodePilot",
    description: "AI-powered code review assistant",
    tech: ["FastAPI", "Ollama", "React"],
    result: "40% fewer bugs",
  },
  {
    id: "3",
    slug: "infragraph",
    title: "InfraGraph",
    description: "Infrastructure monitoring dashboard",
    tech: ["Terraform", "Grafana", "Go"],
    result: "60% fewer incidents",
  },
  {
    id: "4",
    slug: "saas-mcp",
    title: "MCP Server Suite",
    description: "Model Context Protocol server tools",
    tech: ["FastAPI", "MCP", "Python"],
    result: "10k+ API calls/day",
  },
  {
    id: "5",
    slug: "ai-copilot",
    title: "AI Copilot App",
    description: "Chat interface with streaming responses",
    tech: ["FastAPI", "OpenRouter", "WebSocket"],
    result: "Real-time streaming",
  },
  {
    id: "6",
    slug: "devops-academy",
    title: "DevOps Academy",
    description: "Interactive learning platform",
    tech: ["Next.js", "Supabase", "Stripe"],
    result: "500+ students",
  },
];

export async function GET() {
  return NextResponse.json({ projects });
}
