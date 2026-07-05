"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Badge component with gradient, glass, and outlined variants.
 * Used for labels, status indicators, and feature tags.
 */

type BadgeVariant = "default" | "gradient" | "glass" | "outline" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  pulse?: boolean;
  className?: string;
  animated?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[rgba(255,255,255,0.06)] text-text-secondary border-[rgba(255,255,255,0.08)]",
  gradient:
    "bg-gradient-to-r from-purple/20 to-blue/20 text-purple-glow border-purple/30",
  glass:
    "bg-[rgba(255,255,255,0.04)] backdrop-blur-lg text-text-primary border-[rgba(255,255,255,0.1)]",
  outline: "bg-transparent text-text-secondary border-[rgba(255,255,255,0.15)]",
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  error: "bg-error/10 text-error border-error/30",
  info: "bg-info/10 text-info border-info/30",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-2xs",
  md: "px-3 py-1 text-xs",
  lg: "px-4 py-1.5 text-sm",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  pulse = false,
  className,
  animated = false,
}: BadgeProps) {
  const Component = animated ? motion.span : "span";
  const animatedProps = animated
    ? {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      }
    : {};

  return (
    <Component
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold tracking-wide uppercase rounded-full border",
        "select-none whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...animatedProps}
    >
      {/* Pulse indicator dot */}
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-50" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}

      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </Component>
  );
}

export default Badge;
