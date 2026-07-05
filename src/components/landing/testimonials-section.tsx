"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { TESTIMONIALS } from "@/lib/constants";

/**
 * Testimonials Section
 * 3D glass cards in an infinite marquee.
 * Verified creator badges, star ratings.
 */

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative section-padding overflow-hidden">
      <div className="container-wide">
        <SectionHeading
          badge="Testimonials"
          title="Loved by 10,000+ Creators"
          titleGradient="10,000+ Creators"
          subtitle="From individual YouTubers to enterprise agencies — see why creators choose SubVerse AI."
        />
      </div>

      {/* Marquee testimonial cards */}
      <div className="mt-12 space-y-6">
        {/* First row */}
        <Marquee speed="slow" pauseOnHover>
          {TESTIMONIALS.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </Marquee>

        {/* Second row (reversed) */}
        <Marquee speed="slow" direction="right" pauseOnHover>
          {TESTIMONIALS.slice(3, 6).map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="w-[380px] shrink-0 mx-3">
      <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl hover:border-[rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-1 shadow-glass">
        {/* Top highlight */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

        {/* Stars */}
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: testimonial.rating }, (_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>

        {/* Content */}
        <p className="text-sm text-text-secondary leading-relaxed mb-5">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.06)]">
          {/* Avatar placeholder */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple/20 to-blue/20 flex items-center justify-center text-sm font-bold text-white">
            {testimonial.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white">{testimonial.name}</span>
              <BadgeCheck className="w-4 h-4 text-blue-glow" />
            </div>
            <div className="flex items-center gap-2 text-2xs text-text-muted">
              <span>{testimonial.role}</span>
              <span>•</span>
              <span>{testimonial.followers}</span>
            </div>
          </div>
          <div className="text-2xs text-text-muted px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.04)]">
            {testimonial.platform}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
