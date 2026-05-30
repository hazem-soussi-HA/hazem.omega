import type { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6", className)}>
      {children}
    </div>
  );
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function Button({ children, onClick, variant = 'default', size = 'default', className, disabled }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-accent text-background hover:bg-accent-hover",
    outline: "border border-border bg-transparent hover:bg-card",
    ghost: "hover:bg-card",
    destructive: "bg-destructive text-white hover:bg-destructive/90",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: "bg-accent/20 text-accent",
    secondary: "bg-muted text-foreground",
    success: "bg-neon-green/20 text-neon-green",
    warning: "bg-yellow-500/20 text-yellow-500",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant])}>
      {children}
    </span>
  );
}

interface AvatarProps {
  src?: string;
  name: string;
}

export function Avatar({ src, name }: AvatarProps) {
  return (
    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
      {src ? (
        <img className="aspect-square h-full w-full object-cover" src={src} alt={name} />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-accent/20 text-accent font-medium">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
