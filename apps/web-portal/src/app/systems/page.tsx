import { Card, Badge } from "@/app/components/ui";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

const systems = [
  {
    slug: "hazoom-os",
    title: "HAZOOM OS",
    subtitle: "Digital Consciousness",
    description: "A full operating system as a digital consciousness — 4 Pascal kernel modules (49K lines), JS window manager, 50+ apps, AI neural bridge, persistent encrypted filesystem. 9 years of work.",
    tech: ["Pascal", "JavaScript", "Python", "OpenRouter"],
    url: "https://github.com/hazem-soussi-HA/hazoom-os",
    image: "/project-hazoom.png",
  },
  {
    slug: "omega-deploy",
    title: "Omega Deploy",
    subtitle: "Infrastructure",
    description: "Zero-downtime deployment platform with automatic rollback and health checks. Built for teams that ship fast.",
    tech: ["Next.js", "Docker", "Kubernetes", "Terraform"],
    url: "https://github.com/hazem-soussi-HA/omega-deploy",
    image: "/project-omega.png",
  },
  {
    slug: "codepilot",
    title: "CodePilot",
    subtitle: "AI Tooling",
    description: "AI-powered code review assistant using Ollama/Phi3 for real-time suggestions and security scanning.",
    tech: ["FastAPI", "Ollama", "React", "WebSocket"],
    url: "https://github.com/hazem-soussi-HA/codepilot",
    image: "/project-codepilot.png",
  },
  {
    slug: "infragraph",
    title: "InfraGraph",
    subtitle: "Monitoring",
    description: "Infrastructure monitoring dashboard with real-time metrics, alerting, and automated remediation.",
    tech: ["Terraform", "Grafana", "Prometheus", "Go"],
    url: "https://github.com/hazem-soussi-HA/infragraph",
    image: "/project-infragraph.png",
  },
  {
    slug: "mcp-server-suite",
    title: "MCP Server Suite",
    subtitle: "AI Protocol",
    description: "Model Context Protocol server exposing calculator, text processor, weather, and filesystem tools.",
    tech: ["FastAPI", "MCP", "Python"],
    url: "https://github.com/hazem-soussi-HA/mcp-server-suite",
    image: "/project-mcp.png",
  },
  {
    slug: "ai-copilot",
    title: "AI Copilot",
    subtitle: "AI Interface",
    description: "Chat interface with streaming responses, RAG integration, and multi-model support via OpenRouter.",
    tech: ["FastAPI", "OpenRouter", "WebSocket", "Redis"],
    url: "https://github.com/hazem-soussi-HA/ai-copilot",
    image: "/project-copilot.png",
  },
];

export default function SystemsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Systems</h1>
        <p className="text-muted">
          Living systems and interconnected architectures — each one a world of its own.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((sys) => (
          <a
            key={sys.slug}
            href={sys.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="h-full hover:border-accent/50 transition-all cursor-pointer group hover:shadow-lg hover:shadow-accent/5">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-neon-purple/20 rounded-md mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-accent/30 group-hover:text-accent/50 transition-colors">
                  {sys.title.charAt(0)}
                </span>
              </div>
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {sys.title}
                </h3>
                <ExternalLink className="h-4 w-4 text-muted group-hover:text-accent transition-colors shrink-0 mt-1" />
              </div>
              <p className="text-xs text-muted mb-2 font-medium tracking-wide uppercase">
                {sys.subtitle}
              </p>
              <p className="text-sm text-muted mb-3 line-clamp-2">{sys.description}</p>
              <div className="flex flex-wrap gap-1">
                {sys.tech.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
