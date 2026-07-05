"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Animated dot-grid background with gentle fade animation.
 * Creates a subtle technical/futuristic atmosphere.
 */

interface GridBackgroundProps {
  className?: string;
  variant?: "lines" | "dots" | "cross";
}

export function GridBackground({ className, variant = "lines" }: GridBackgroundProps) {
  if (variant === "dots") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div
          className="absolute inset-0 opacity-[0.15] animate-grid-fade"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Fade at edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
    );
  }

  if (variant === "cross") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-background" />
      </div>
    );
  }

  // Default: lines
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="absolute inset-0 grid-pattern opacity-50 animate-grid-fade" />
      {/* Radial fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#04040B_70%)]" />
    </div>
  );
}

export default GridBackground;
