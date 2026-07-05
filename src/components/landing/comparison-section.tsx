"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { COMPARISON } from "@/lib/constants";

/**
 * Comparison Section
 * Animated table comparing SubVerse AI vs competitors.
 * Green checkmarks for SubVerse, mixed for others.
 */

export function ComparisonSection() {
  return (
    <section className="relative section-padding">
      <div className="container-wide">
        <SectionHeading
          badge="Why SubVerse"
          title="The Clear Choice for Creators"
          titleGradient="Clear Choice"
          subtitle="See how SubVerse AI stacks up against alternatives. We offer more features at better quality, for less."
        />

        <motion.div
          className="mt-12 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="min-w-[700px] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-5 bg-[rgba(255,255,255,0.03)]">
              <div className="p-4 text-sm font-medium text-text-muted">Feature</div>
              {COMPARISON.competitors.map((comp, i) => (
                <div
                  key={comp.name}
                  className={`p-4 text-sm font-semibold text-center ${
                    i === 0 ? "text-purple-glow bg-purple/[0.05]" : "text-text-secondary"
                  }`}
                >
                  {comp.name}
                  {i === 0 && (
                    <div className="text-2xs text-purple-glow/70 font-normal mt-0.5">
                      ★ Recommended
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Feature rows */}
            {COMPARISON.features.map((feature, rowIndex) => (
              <motion.div
                key={feature}
                className="grid grid-cols-5 border-t border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: rowIndex * 0.04 }}
              >
                <div className="p-4 text-sm text-text-secondary">{feature}</div>
                {COMPARISON.competitors.map((comp, colIndex) => (
                  <div
                    key={`${comp.name}-${feature}`}
                    className={`p-4 flex items-center justify-center ${
                      colIndex === 0 ? "bg-purple/[0.03]" : ""
                    }`}
                  >
                    {comp.values[rowIndex] ? (
                      <motion.div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          colIndex === 0
                            ? "bg-green-500/20 text-green-400"
                            : "bg-green-500/10 text-green-400/60"
                        }`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: rowIndex * 0.04 + colIndex * 0.1,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </motion.div>
                    ) : (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.04)] text-text-muted">
                        <X className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ComparisonSection;
