"use client";

import Link from "next/link";
import { Button } from "./ui";
import { useAppStore } from "@/lib/store";
import { Github, Terminal, BookOpen, Wrench, Shield, Menu, X, Boxes } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/systems", label: "Systems" },
  { href: "/saas", label: "SaaS Tools" },
  { href: "/academy", label: "Academy" },
  { href: "/services", label: "Services" },
];

export function Header() {
  const { isAuthenticated } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Terminal className="h-6 w-6 text-accent" />
          <span className="text-glow-cyan text-accent">hazem</span>
          <span className="text-muted">.omega</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link href="/admin">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          ) : (
            <Button size="sm">Sign In</Button>
          )}
          <a
            href="https://github.com/hazem-soussi-HA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>

        <button
          className="md:hidden text-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="flex flex-col p-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="text-sm text-muted hover:text-foreground py-2">
              Admin
            </Link>
            <Button size="sm" className="mt-2">
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
