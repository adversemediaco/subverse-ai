"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mic, Globe, Captions, Download, Hash, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { FEATURES } from "@/lib/constants";

/**
 * Features Section
 * Each feature has its own animated icon and glass card.
 * Staggered entrance with hover micro-interactions.
 */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mic,
  Globe,
  Captions,
  Download,
  Hash,
  Search,
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative section-padding">
      <div className="container-wide">
        <SectionHeading
          badge="Features"
          title="Everything You Need, Nothing You Don't"
          titleGradient="Everything You Need"
          subtitle="A complete AI toolkit for video content creation. From transcription to translation to SEO — all powered by cutting-edge AI models."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <GlassCard padding="lg" className="h-full group relative overflow-hidden">
                  {/* Gradient glow on hover */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl bg-gradient-to-br ${feature.gradient}`}
                  />

                  {/* Icon */}
                  <div className="relative">
                    <motion.div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${feature.gradient} bg-opacity-10`}
                      style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
                      }}
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      {Icon && (
                        <Icon className="w-6 h-6 text-blue-glow group-hover:text-purple-glow transition-colors" />
                      )}
                    </motion.div>
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-semibold text-white mb-2 relative">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed relative">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
