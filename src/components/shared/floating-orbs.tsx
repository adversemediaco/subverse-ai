"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Large blurred floating light orbs for ambient depth.
 * Creates the atmospheric lighting effect seen on premium sites.
 */

interface FloatingOrbsProps {
  className?: string;
}

export function FloatingOrbs({ className }: FloatingOrbsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Blue orb - top left area */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-float-slow"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          top: "-10%",
          left: "-5%",
          filter: "blur(60px)",
          animationDuration: "20s",
        }}
      />

      {/* Purple orb - center right */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          top: "20%",
          right: "-10%",
          filter: "blur(80px)",
          animationDuration: "25s",
          animationDelay: "-5s",
        }}
      />

      {/* Cyan orb - bottom center */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-float-slow"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          bottom: "5%",
          left: "30%",
          filter: "blur(50px)",
          animationDuration: "18s",
          animationDelay: "-8s",
        }}
      />

      {/* Small pink accent orb */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full animate-float-fast"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "10%",
          filter: "blur(40px)",
          animationDuration: "12s",
          animationDelay: "-3s",
        }}
      />
    </div>
  );
}

export default FloatingOrbs;
