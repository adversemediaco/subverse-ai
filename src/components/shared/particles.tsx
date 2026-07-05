"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Floating particles background effect.
 * Pure CSS particles for performance — no canvas/JS overhead.
 * Each particle has randomized size, position, animation duration, and delay.
 */

interface ParticlesProps {
  count?: number;
  className?: string;
}

export function Particles({ count = 40, className }: ParticlesProps) {
  // Generate particles with deterministic random values (using index-based seed)
  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 1 + (i % 3) * 1.5,
      x: ((i * 37) % 100),
      y: ((i * 53) % 100),
      duration: 15 + (i % 10) * 3,
      delay: (i % 8) * -2,
      opacity: 0.1 + (i % 5) * 0.08,
    }));
  }, [count]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white animate-float"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Larger glowing orbs */}
      <div
        className="absolute w-2 h-2 rounded-full bg-blue-glow/30 animate-float blur-sm"
        style={{ left: "20%", top: "30%", animationDuration: "12s" }}
      />
      <div
        className="absolute w-3 h-3 rounded-full bg-purple-glow/20 animate-float-slow blur-sm"
        style={{ left: "70%", top: "60%", animationDuration: "18s" }}
      />
      <div
        className="absolute w-2 h-2 rounded-full bg-cyan/25 animate-float blur-sm"
        style={{ left: "85%", top: "20%", animationDuration: "14s", animationDelay: "-3s" }}
      />
    </div>
  );
}

export default Particles;
