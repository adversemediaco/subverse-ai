"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Animated tabs component with sliding indicator.
 */

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 p-1 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "text-white"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)]"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default Tabs;
