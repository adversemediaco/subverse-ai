"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite scrolling marquee component with gradient fade edges.
 * Used for trusted-by logos and testimonial cards.
 */

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

const speedStyles = {
  slow: "40s",
  normal: "30s",
  fast: "20s",
};

export function Marquee({
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        // Gradient fade edges
        "[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max gap-8",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: speedStyles[speed],
        }}
      >
        {/* Duplicate content for seamless loop */}
        {children}
        {children}
      </div>
    </div>
  );
}

export default Marquee;
