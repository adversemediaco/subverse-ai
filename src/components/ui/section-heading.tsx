"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "./badge";

/**
 * Consistent section heading component used across all landing page sections.
 * Includes badge, title with gradient text, and subtitle.
 */

interface SectionHeadingProps {
  badge?: string;
  title: string;
  titleGradient?: string; // The part of the title that should be gradient
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  titleGradient,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  // If titleGradient is provided, split the title to render gradient part
  const renderTitle = () => {
    if (!titleGradient) {
      return <span>{title}</span>;
    }

    const parts = title.split(titleGradient);
    return (
      <>
        {parts[0]}
        <span className="text-gradient">{titleGradient}</span>
        {parts[1] || ""}
      </>
    );
  };

  return (
    <motion.div
      className={cn("flex flex-col gap-4 max-w-3xl", alignStyles[align], className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {badge && (
        <Badge variant="gradient" size="md" animated>
          {badge}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
        {renderTitle()}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
