"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";

/**
 * Premium glass-morphism card with 3D tilt, spotlight effect, and depth.
 * Responds to mouse movement for interactive 3D parallax.
 */

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  /** Enable 3D tilt on hover */
  tilt?: boolean;
  /** Enable spotlight/glow follow effect */
  spotlight?: boolean;
  /** Glow color (tailwind color class or CSS color) */
  glowColor?: string;
  /** Border glow animation */
  borderGlow?: boolean;
  /** Card padding variant */
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  /** Hover lift amount */
  hover?: boolean;
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

export function GlassCard({
  children,
  className,
  tilt = true,
  spotlight = true,
  glowColor = "rgba(139,92,246,0.15)",
  borderGlow = false,
  padding = "md",
  hover = true,
  ...props
}: GlassCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Spring-smoothed rotation for fluid 3D tilt
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      ${glowColor},
      transparent 80%
    )
  `;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);

    if (tilt) {
      const tiltX = ((y - centerY) / centerY) * -4;
      const tiltY = ((x - centerX) / centerX) * 4;
      rotateX.set(tiltX);
      rotateY.set(tiltY);
    }
  }

  function handleMouseLeave() {
    if (tilt) {
      rotateX.set(0);
      rotateY.set(0);
    }
  }

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.02)]",
        "backdrop-blur-xl",
        "border border-[rgba(255,255,255,0.08)]",
        "shadow-glass",
        "transition-all duration-300",
        hover && "hover:border-[rgba(255,255,255,0.14)] hover:shadow-glass-lg",
        borderGlow && "glow-border",
        paddingStyles[padding],
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        // Bind motion values directly so tilt updates live with the mouse.
        // Framer Motion reactively tracks MotionValues passed via style.
        ...(tilt ? { rotateX: springRotateX, rotateY: springRotateY } : {}),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      {...props}
    >
      {/* Spotlight overlay */}
      {spotlight && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: spotlightBackground }}
        />
      )}

      {/* Top border highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default GlassCard;
