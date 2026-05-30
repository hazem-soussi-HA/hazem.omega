import { cn } from "@/lib/utils";
import React from "react";

/* ------------------------------------------------------------------ */
/*  Button                                                             */
/* ------------------------------------------------------------------ */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-accent text-background hover:bg-accent-hover": variant === "default",
          "border border-border bg-transparent hover:bg-card hover:text-foreground":
            variant === "outline",
          "hover:bg-card hover:text-foreground": variant === "ghost",
          "bg-destructive text-white hover:bg-destructive/90": variant === "destructive",
        },
        { "h-8 px-3 text-xs": size === "sm", "h-10 px-4 text-sm": size === "md", "h-12 px-6 text-base": size === "lg" },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-card p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Badge                                                              */
/* ------------------------------------------------------------------ */
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-accent/20 text-accent": variant === "default",
          "bg-card-foreground/10 text-muted": variant === "secondary",
          "bg-neon-green/20 text-neon-green": variant === "success",
          "bg-yellow-500/20 text-yellow-500": variant === "warning",
          "bg-destructive/20 text-destructive": variant === "destructive",
        },
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Input                                                              */
/* ------------------------------------------------------------------ */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm",
        "text-foreground placeholder:text-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  Separator                                                          */
export function Separator({ className, orientation = "horizontal", ...props }: { className?: string; orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Tabs                                                               */
interface TabsProps {
  tabs: { label: string; value: string }[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex gap-1 rounded-lg border border-border p-1 bg-card", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            active === tab.value
              ? "bg-accent text-background"
              : "text-muted hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
