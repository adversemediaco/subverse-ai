"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, Facebook, Mail, FileText, Video, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";

/**
 * AI Repurpose Section
 * Shows how one video transforms into multiple content formats.
 * Animated cards fan out from a central video source.
 */

const REPURPOSE_ITEMS = [
  {
    platform: "Instagram Caption",
    icon: Instagram,
    color: "#E1306C",
    content: "Just dropped a new episode 🎙️ We dive deep into how AI is changing content creation...",
    hashtags: "#AI #ContentCreator #Podcast",
  },
  {
    platform: "LinkedIn Post",
    icon: Linkedin,
    color: "#0A66C2",
    content: "3 key takeaways from our latest podcast on AI-driven content: 1. Automation doesn't mean losing authenticity...",
    hashtags: "#AI #Marketing #ContentStrategy",
  },
  {
    platform: "Twitter Thread",
    icon: Twitter,
    color: "#1DA1F2",
    content: "🧵 Thread: How we 10x'd our content output using AI\n\n1/ Upload one video\n2/ Get captions in 100+ languages\n3/ Auto-generate social posts...",
    hashtags: "#AITools #ContentMarketing",
  },
  {
    platform: "Blog Article",
    icon: FileText,
    color: "#10B981",
    content: "The Complete Guide to AI Video Repurposing: How to Create 50+ Pieces of Content From a Single Video...",
    hashtags: "2,500 words • SEO optimized",
  },
  {
    platform: "Newsletter",
    icon: Mail,
    color: "#8B5CF6",
    content: "This week's highlight: We explored the future of content creation with AI. Here's what you need to know...",
    hashtags: "Email ready • Formatted",
  },
  {
    platform: "Short Clips",
    icon: Video,
    color: "#F59E0B",
    content: "3 viral-worthy clips extracted automatically with optimal start/end points and captions burned in...",
    hashtags: "9:16 ratio • 15-60s",
  },
];

export function RepurposeSection() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-wide">
        <SectionHeading
          badge="AI Repurpose Engine"
          title="One Video, Infinite Content"
          titleGradient="Infinite Content"
          subtitle="Your single video automatically becomes dozens of platform-optimized content pieces. Blog posts, social captions, threads, newsletters — all generated instantly."
        />

        {/* Source indicator */}
        <motion.div
          className="flex justify-center mt-12 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-full glass border border-purple/20">
            <Video className="w-5 h-5 text-purple-glow" />
            <span className="text-sm font-medium text-white">podcast_ep42.mp4</span>
            <ArrowRight className="w-4 h-4 text-text-muted" />
            <span className="text-sm text-purple-glow font-semibold">6 outputs</span>
          </div>
        </motion.div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {REPURPOSE_ITEMS.map((item, index) => (
            <motion.div
              key={item.platform}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <GlassCard padding="md" className="h-full group">
                {/* Platform header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <span className="text-sm font-semibold text-white">{item.platform}</span>
                </div>

                {/* Content preview */}
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 mb-3">
                  {item.content}
                </p>

                {/* Tags/meta */}
                <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="text-2xs text-text-muted">{item.hashtags}</span>
                  <span className="text-2xs text-purple-glow opacity-0 group-hover:opacity-100 transition-opacity">
                    Copy →
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RepurposeSection;
