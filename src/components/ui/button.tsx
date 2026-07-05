"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

/**
 * Premium button component with multiple variants, sizes, and micro-interactions.
 * Features magnetic hover, glow effects, and ripple animations.
 */

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "glass" | "gradient";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  magnetic?: boolean;
  glow?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-blue-electric to-purple text-white shadow-lg hover:shadow-glow-blue hover:scale-[1.02] active:scale-[0.98]",
  secondary:
    "bg-surface-2 text-text-primary border border-border hover:border-border-bright hover:bg-[rgba(255,255,255,0.06)] active:scale-[0.98]",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-[rgba(255,255,255,0.04)] active:scale-[0.98]",
  outline:
    "bg-transparent border border-border text-text-primary hover:border-purple/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] active:scale-[0.98]",
  danger:
    "bg-error/10 text-error border border-error/20 hover:bg-error/20 hover:border-error/40 active:scale-[0.98]",
  glass:
    "glass text-text-primary hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] active:scale-[0.98]",
  gradient:
    "bg-gradient-to-r from-purple via-blue to-cyan text-white shadow-lg hover:shadow-glow-purple hover:scale-[1.02] active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
  xl: "h-14 px-8 text-lg gap-3 rounded-2xl",
  icon: "h-10 w-10 rounded-xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      loading = false,
      icon,
      iconRight,
      magnetic = false,
      glow = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const [magneticOffset, setMagneticOffset] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
      setMagneticOffset({ x, y });
    };

    const handleMouseLeave = () => {
      setMagneticOffset({ x: 0, y: 0 });
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center font-medium",
          "transition-all duration-200 ease-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:opacity-50 disabled:pointer-events-none",
          // Ripple and glow
          "btn-ripple",
          glow && "btn-glow",
          // Variant and size
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        animate={{
          x: magneticOffset.x,
          y: magneticOffset.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        disabled={disabled || loading}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {/* Shimmer overlay for gradient buttons */}
        {(variant === "primary" || variant === "gradient") && (
          <span className="absolute inset-0 rounded-inherit overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </span>
        )}

        {/* Loading spinner */}
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Icon left */}
        {!loading && icon && <span className="shrink-0">{icon}</span>}

        {/* Children */}
        <span className={cn(loading && "opacity-0")}>{children}</span>

        {/* Icon right */}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
