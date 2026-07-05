"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Animated Aurora/Northern Lights background effect.
 * Uses CSS gradients with animated position shifts for a mesmerizing effect.
 * GPU-accelerated with will-change for 60fps.
 */

interface AuroraBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

export function AuroraBackground({ className, intensity = "medium" }: AuroraBackgroundProps) {
  const opacityMap = {
    subtle: "opacity-30",
    medium: "opacity-50",
    strong: "opacity-70",
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Primary aurora */}
      <div
        className={cn(
          "absolute -top-1/2 -left-1/4 w-[150%] h-[150%]",
          opacityMap[intensity],
          "animate-aurora"
        )}
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.15) 30%, transparent 70%)",
          backgroundSize: "200% 200%",
          willChange: "transform",
          animation: "aurora 15s ease infinite",
        }}
      />

      {/* Secondary aurora — offset timing */}
      <div
        className={cn(
          "absolute -bottom-1/4 -right-1/4 w-[120%] h-[120%]",
          opacityMap[intensity],
        )}
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 60% 60%, rgba(6,182,212,0.2) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)",
          backgroundSize: "200% 200%",
          willChange: "transform",
          animation: "aurora 20s ease infinite reverse",
        }}
      />

      {/* Tertiary subtle wash */}
      <div
        className="absolute top-1/4 left-1/3 w-[60%] h-[60%] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(236,72,153,0.15) 0%, transparent 70%)",
          animation: "aurora 25s ease infinite",
          animationDelay: "-5s",
        }}
      />
    </div>
  );
}

export default AuroraBackground;
