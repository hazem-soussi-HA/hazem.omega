import { Card } from "@/app/components/ui";
import { Shield, Github, Terminal, Mail } from "lucide-react";

export function FooterLinks() {
  return (
    <Card className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-6">
        <div>
          <h4 className="font-semibold mb-3 text-accent">Ecosystem</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="/systems" className="hover:text-foreground transition-colors">Systems</a></li>
            <li><a href="/saas" className="hover:text-foreground transition-colors">SaaS Tools</a></li>
            <li><a href="/academy" className="hover:text-foreground transition-colors">Academy</a></li>
            <li><a href="/services" className="hover:text-foreground transition-colors">Services</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-accent">Resources</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="https://github.com/hazem-soussi-HA" className="hover:text-foreground transition-colors">GitHub</a></li>
            <li><a href="/api/projects" className="hover:text-foreground transition-colors">API Docs</a></li>
            <li><a href="/admin" className="hover:text-foreground transition-colors">Admin</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-accent">Connect</h4>
          <div className="space-y-2 text-sm text-muted">
            <a href="mailto:contact@hazem.dev" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Mail className="h-3 w-3" /> contact@hazem.dev
            </a>
            <a href="https://github.com/hazem-soussi-HA" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Github className="h-3 w-3" /> github.com/hazem-soussi-HA
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-accent">Status</h4>
          <div className="flex items-center gap-2 text-sm text-muted">
            <div className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </Card>
  );
}
