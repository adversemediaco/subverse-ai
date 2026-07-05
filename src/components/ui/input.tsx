"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Premium input component with glass styling, focus ring, and icon support.
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, iconRight, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-11 rounded-xl px-4 text-sm",
              "bg-[rgba(255,255,255,0.04)] backdrop-blur-sm",
              "border border-[rgba(255,255,255,0.08)]",
              "text-text-primary placeholder:text-text-muted",
              "transition-all duration-200",
              "focus:outline-none focus:border-purple/50 focus:ring-2 focus:ring-purple/20 focus:bg-[rgba(255,255,255,0.06)]",
              "hover:border-[rgba(255,255,255,0.14)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              icon && "pl-10",
              iconRight && "pr-10",
              error && "border-error/50 focus:border-error focus:ring-error/20",
              className
            )}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {iconRight}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
