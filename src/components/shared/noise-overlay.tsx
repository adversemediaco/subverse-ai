"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Film grain / noise texture overlay.
 * Adds subtle texture that makes the design feel premium and organic.
 */

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
}

export function NoiseOverlay({ opacity = 0.03, className }: NoiseOverlayProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none z-[1]", className)}
      style={{ opacity }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  );
}

export default NoiseOverlay;
