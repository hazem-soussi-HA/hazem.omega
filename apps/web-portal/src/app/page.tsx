import { BentoGrid } from "@/app/components/bento-grid";
import { Button } from "@/app/components/ui";
import Link from "next/link";
import { Terminal, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent mb-6">
          <Sparkles className="h-4 w-4" />
          <span>Full-Stack Architect & DevOps Engineer</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-accent text-glow-cyan">Hazem</span>{" "}
          <span className="text-foreground">Soussi</span>
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8">
          Building the future of digital ecosystems — systems, SaaS tools,
          academy, and AI-powered collaboration.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg">
            <Link href="/systems">
              View Systems <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/saas">
              <Terminal className="mr-2 h-4 w-4" />
              Explore Tools
            </Link>
          </Button>
        </div>
      </section>

      {/* Bento Grid */}
      <BentoGrid />

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto rounded-xl border border-border bg-card p-8 glow-cyan">
          <h2 className="text-2xl font-bold mb-4">Ready to build something amazing?</h2>
          <p className="text-muted mb-6">
            Let&apos;s collaborate on your next project. From cloud infrastructure
            to full-stack applications.
          </p>
          <Button size="lg">
            <Link href="/services">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
