import { notFound } from "next/navigation";
import { Card, Badge } from "@/app/components/ui";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

const systems: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  results: string;
  github: string;
  architecture: string;
}> = {
  "hazoom-os": {
    title: "HAZOOM OS",
    subtitle: "Digital Consciousness",
    description: "A full operating system as a digital consciousness — 4 Pascal kernel modules (49K lines), JS window manager, 50+ apps, AI neural bridge, persistent encrypted filesystem. 9 years of work.",
    tech: ["Pascal", "JavaScript", "Python", "OpenRouter"],
    results: "49K lines Pascal, 50+ apps, neural bridge, encrypted filesystem",
    github: "https://github.com/hazem-soussi-HA/hazoom-os",
    architecture: "graph TB\n    Kernel[Pascal Kernel 49K LOC] --> OS[OS Desktop JS]\n    OS --> Apps[50+ Applications]\n    OS --> AI[Neural Bridge]\n    AI --> Router[OpenRouter API]\n    OS --> FS[Encrypted Filesystem]\n    FS --> XOR[XOR Persistent Storage]",
  },
  "omega-deploy": {
    title: "Omega Deploy",
    subtitle: "Infrastructure",
    description: "Zero-downtime deployment platform with automatic rollback and health checks.",
    tech: ["Next.js", "Docker", "Kubernetes", "Terraform"],
    results: "99.99% uptime, 50% faster deployments",
    github: "https://github.com/hazem-soussi-HA/omega-deploy",
    architecture: "graph TB\n    Client[Client] --> API[Next.js API]\n    API --> DB[(PostgreSQL)]\n    API --> Deploy[Deploy Service]\n    Deploy --> K8s[Kubernetes Cluster]\n    K8s --> Monitor[Grafana/Prometheus]\n    Deploy --> Rollback[Auto Rollback]",
  },
  "codepilot": {
    title: "CodePilot",
    subtitle: "AI Tooling",
    description: "AI-powered code review assistant using Ollama/Phi3 for real-time suggestions and security scanning.",
    tech: ["FastAPI", "Ollama", "React", "WebSocket"],
    results: "40% fewer bugs in production",
    github: "https://github.com/hazem-soussi-HA/codepilot",
    architecture: "graph TB\n    User[Developer] --> FE[React UI]\n    FE --> WS[WebSocket Server]\n    WS --> AI[Ollama Phi3]\n    AI --> Analysis[Code Analysis]\n    Analysis --> Report[Review Report]",
  },
  "infragraph": {
    title: "InfraGraph",
    subtitle: "Monitoring",
    description: "Infrastructure monitoring dashboard with real-time metrics, alerting, and automated remediation.",
    tech: ["Terraform", "Grafana", "Prometheus", "Go"],
    results: "Reduced incidents by 60%",
    github: "https://github.com/hazem-soussi-HA/infragraph",
    architecture: "graph TB\n    Infra[Infrastructure] --> Prom[Prometheus]\n    Prom --> Graf[Grafana Dashboard]\n    Prom --> Alert[AlertManager]\n    Alert --> Remedy[Auto Remedy]",
  },
  "mcp-server-suite": {
    title: "MCP Server Suite",
    subtitle: "AI Protocol",
    description: "Model Context Protocol server exposing calculator, text processor, weather, and filesystem tools.",
    tech: ["FastAPI", "MCP", "Python"],
    results: "6 tools, 10k+ API calls/day",
    github: "https://github.com/hazem-soussi-HA/mcp-server-suite",
    architecture: "graph TB\n    Client --> MCP[MCP Server]\n    MCP --> Calc[Calculator]\n    MCP --> Text[Text Processor]\n    MCP --> Weather[Weather]\n    MCP --> FS[Filesystem]",
  },
  "ai-copilot": {
    title: "AI Copilot",
    subtitle: "AI Interface",
    description: "Chat interface with streaming responses, RAG integration, and multi-model support via OpenRouter.",
    tech: ["FastAPI", "OpenRouter", "WebSocket", "Redis"],
    results: "Real-time streaming, multi-model",
    github: "https://github.com/hazem-soussi-HA/ai-copilot",
    architecture: "graph TB\n    User --> WS[WebSocket]\n    WS --> AI[OpenRouter/LLM]\n    AI --> RAG[RAG Pipeline]\n    AI --> Stream[Streaming Response]\n    RAG --> Cache[Redis Cache]",
  },
};

export default function SystemSlugPage({ params }: Props) {
  const system = systems[params.slug];
  if (!system) notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/systems" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground mb-8">
        &larr; Back to Systems
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">{system.title}</h1>
          <p className="text-sm text-muted font-medium tracking-wide uppercase">{system.subtitle}</p>
        </div>
        <a
          href={system.github}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors border border-border rounded-md px-3 py-1.5"
        >
          <Github className="h-4 w-4" /> View on GitHub
        </a>
      </div>

      <p className="text-muted mb-8">{system.description}</p>

      <Card className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Architecture</h2>
        <pre className="text-sm text-accent overflow-x-auto font-mono bg-background rounded-md p-4">
          {system.architecture}
        </pre>
      </Card>

      <Card className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {system.tech.map((t) => (
            <Badge key={t} variant="default">{t}</Badge>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Results</h2>
        <p className="text-neon-green font-medium">{system.results}</p>
      </Card>

      <a
        href={system.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-6 py-3 text-accent hover:bg-accent/20 transition-colors font-medium"
      >
        <Github className="h-5 w-5" />
        Open Repository <ExternalLink className="h-4 w-4 ml-1" />
      </a>
    </div>
  );
}
