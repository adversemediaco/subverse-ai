"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Animated progress bar with gradient fill and shimmer effect.
 */

interface ProgressProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  gradient?: "blue-purple" | "cyan-blue" | "green" | "orange";
  animated?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const gradientStyles = {
  "blue-purple": "from-blue to-purple",
  "cyan-blue": "from-cyan to-blue",
  green: "from-emerald-400 to-green-500",
  orange: "from-amber-400 to-orange-500",
};

export function Progress({
  value,
  label,
  showValue = false,
  size = "md",
  gradient = "blue-purple",
  animated = true,
  className,
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-xs text-text-secondary font-medium">{label}</span>}
          {showValue && <span className="text-xs text-text-muted font-mono">{clampedValue}%</span>}
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full overflow-hidden bg-[rgba(255,255,255,0.06)]",
          sizeStyles[size]
        )}
      >
        <motion.div
          className={cn(
            "h-full rounded-full bg-gradient-to-r relative overflow-hidden",
            gradientStyles[gradient]
          )}
          initial={animated ? { width: 0 } : undefined}
          animate={{ width: `${clampedValue}%` }}
          transition={
            animated
              ? { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
              : { duration: 0.3 }
          }
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
}

export default Progress;
