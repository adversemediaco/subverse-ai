"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { TRUSTED_BY } from "@/lib/constants";

/**
 * Trusted By section with infinite scrolling company logos.
 * Gradient fade edges for seamless infinite loop effect.
 */

export function TrustedBySection() {
  return (
    <section className="relative py-16 border-y border-[rgba(255,255,255,0.04)]">
      {/* Section label */}
      <motion.p
        className="text-center text-xs uppercase tracking-[0.2em] text-text-muted mb-8 font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Trusted by 10,000+ creators and teams worldwide
      </motion.p>

      {/* Marquee logos */}
      <Marquee speed="slow" pauseOnHover>
        {TRUSTED_BY.map((company) => (
          <div
            key={company}
            className="flex items-center justify-center px-8 py-3"
          >
            <span className="text-xl sm:text-2xl font-bold text-text-muted/40 hover:text-text-muted/70 transition-colors duration-300 whitespace-nowrap select-none">
              {company}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

export default TrustedBySection;
