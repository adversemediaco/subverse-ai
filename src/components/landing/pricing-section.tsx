"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRICING_PLANS } from "@/lib/constants";

/**
 * Pricing Section
 * Floating cards with center card glow effect.
 * Popular badge pulses. Animated hover buttons.
 */

export function PricingSection() {
  return (
    <section id="pricing" className="relative section-padding">
      <div className="container-wide">
        <SectionHeading
          badge="Simple Pricing"
          title="Start Free, Scale as You Grow"
          titleGradient="Scale as You Grow"
          subtitle="No hidden fees. No long-term contracts. Upgrade or downgrade anytime."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <Badge variant="gradient" size="sm" pulse>
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div
                className={`relative rounded-2xl p-6 lg:p-8 border transition-all duration-300 h-full flex flex-col ${
                  plan.popular
                    ? "bg-gradient-to-b from-purple/[0.08] to-surface border-purple/30 pricing-popular shadow-glass-lg"
                    : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] shadow-glass"
                }`}
              >
                {/* Top highlight for popular */}
                {plan.popular && (
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-glow/60 to-transparent" />
                )}

                {/* Plan name */}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="text-sm text-text-muted mt-1">{plan.description}</p>

                {/* Price */}
                <div className="mt-5 mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl lg:text-5xl font-bold text-white">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-sm text-text-muted mb-1.5">/{plan.period}</span>
                    )}
                  </div>
                  {plan.price === 0 && (
                    <span className="text-sm text-text-muted">{plan.period}</span>
                  )}
                </div>

                {/* CTA */}
                <Button
                  variant={plan.popular ? "gradient" : "secondary"}
                  size="lg"
                  fullWidth
                  magnetic
                  glow={plan.popular}
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  {plan.cta}
                </Button>

                {/* Divider */}
                <div className="my-6 h-px bg-[rgba(255,255,255,0.06)]" />

                {/* Features list */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <li key={limitation} className="flex items-start gap-3 opacity-50">
                      <div className="w-5 h-5 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs text-text-muted">—</span>
                      </div>
                      <span className="text-sm text-text-muted line-through">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
