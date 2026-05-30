import { Card, Badge } from "@/app/components/ui";
import { Star, GitFork, Users, Zap, TrendingUp, Award } from "lucide-react";

const githubMetrics = {
  stars: 2847,
  repos: 156,
  contributions: 1243,
  followers: 892,
};

const certifications = [
  { name: "AWS Solutions Architect", icon: "☁️" },
  { name: "Kubernetes Administrator", icon: "⎈" },
  { name: "Docker Certified", icon: "🐳" },
  { name: "Terraform Associate", icon: "🏗️" },
  { name: "GCP Professional", icon: "🌐" },
  { name: "CI/CD Expert", icon: "⚡" },
];

const tools = [
  { name: "Code Analyzer", users: 1247, status: "active" as const },
  { name: "API Builder", users: 892, status: "active" as const },
  { name: "Deploy Bot", users: 563, status: "active" as const },
  { name: "Security Scanner", users: 2341, status: "active" as const },
];

const recentProjects = [
  { name: "HAZOOM OS", tech: "Pascal, JS, Python", description: "Digital consciousness — 9 years of work" },
  { name: "Omega Deploy", tech: "Next.js, Docker, K8s", description: "Zero-downtime deployment platform" },
  { name: "CodePilot", tech: "FastAPI, Ollama", description: "AI-powered code review assistant" },
];

export function BentoGrid() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GitHub Metrics */}
        <Card className="glow-cyan lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold">GitHub Metrics</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-bold text-accent">{githubMetrics.stars.toLocaleString()}</p>
              <p className="text-sm text-muted">Stars</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neon-green">{githubMetrics.repos}</p>
              <p className="text-sm text-muted">Repositories</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neon-purple">{githubMetrics.contributions.toLocaleString()}</p>
              <p className="text-sm text-muted">Contributions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neon-pink">{githubMetrics.followers.toLocaleString()}</p>
              <p className="text-sm text-muted">Followers</p>
            </div>
          </div>
        </Card>

        {/* Certifications */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-semibold">Certifications</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center gap-2 rounded-md bg-card-foreground/5 p-2">
                <span className="text-lg">{cert.icon}</span>
                <span className="text-xs text-muted">{cert.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* SaaS Tools */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-neon-green" />
            <h3 className="text-lg font-semibold">Active Tools</h3>
          </div>
          <div className="space-y-3">
            {tools.map((tool) => (
              <div key={tool.name} className="flex items-center justify-between">
                <span className="text-sm">{tool.name}</span>
                <Badge variant="success">{tool.users} users</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <GitFork className="h-5 w-5 text-neon-purple" />
            <h3 className="text-lg font-semibold">Active Systems</h3>
          </div>
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div key={project.name}>
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-muted">{project.description}</p>
                <Badge variant="secondary">{project.tech}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats Summary */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold">Ecosystem Stats</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Users className="h-6 w-6 text-accent mx-auto mb-1" />
              <p className="text-2xl font-bold">5.2k</p>
              <p className="text-xs text-muted">Users</p>
            </div>
            <div className="text-center">
              <Zap className="h-6 w-6 text-neon-green mx-auto mb-1" />
              <p className="text-2xl font-bold">89k</p>
              <p className="text-xs text-muted">API Calls</p>
            </div>
            <div className="text-center">
              <Award className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">98%</p>
              <p className="text-xs text-muted">Uptime</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
