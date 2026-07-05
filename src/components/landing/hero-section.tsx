"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { Particles } from "@/components/shared/particles";
import { FloatingOrbs } from "@/components/shared/floating-orbs";
import { GridBackground } from "@/components/shared/grid-background";

/**
 * Hero Section — The WOW-factor entry point.
 * Features:
 * - Floating 3D video player with glow + reflection
 * - Live subtitles that animate word-by-word like Netflix
 * - Language switching with morphing animation
 * - Orbiting language pills around the video
 * - Live AI processing panel
 * - Multiple layered background effects
 */

// Subtitle data cycling through languages
const SUBTITLES = [
  { lang: "English", text: "Turn any video into content for every platform", color: "#60A5FA" },
  { lang: "Hindi", text: "किसी भी वीडियो को हर प्लेटफॉर्म के लिए कंटेंट में बदलें", color: "#A78BFA" },
  { lang: "Hinglish", text: "Kisi bhi video ko har platform ke liye content mein badlo", color: "#22D3EE" },
  { lang: "Japanese", text: "あらゆる動画をすべてのプラットフォーム向けコンテンツに変換", color: "#F0ABFC" },
  { lang: "Spanish", text: "Convierte cualquier video en contenido para cada plataforma", color: "#34D399" },
  { lang: "Arabic", text: "حوّل أي فيديو إلى محتوى لكل منصة", color: "#FBBF24" },
];

// Language pills that orbit around the video
const LANGUAGE_PILLS = [
  { code: "EN", color: "#3B82F6" },
  { code: "HI", color: "#8B5CF6" },
  { code: "HINGLISH", color: "#06B6D4" },
  { code: "FR", color: "#EC4899" },
  { code: "JP", color: "#F59E0B" },
  { code: "ES", color: "#10B981" },
];

// AI Process steps
const AI_STEPS = [
  { label: "Speech Recognition", progress: 100, status: "complete" },
  { label: "Subtitle Generation", progress: 85, status: "active" },
  { label: "Translation", progress: 60, status: "active" },
  { label: "SEO Generation", progress: 30, status: "pending" },
  { label: "Export Ready", progress: 0, status: "pending" },
];

export function HeroSection() {
  const [currentSubtitle, setCurrentSubtitle] = React.useState(0);

  // Cycle through subtitles every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % SUBTITLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* === BACKGROUND LAYERS === */}
      <GridBackground variant="dots" />
      <AuroraBackground intensity="strong" />
      <FloatingOrbs />
      <Particles count={30} />

      {/* Hero gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(139,92,246,0.2)_0%,rgba(59,130,246,0.1)_40%,transparent_70%)]" />

      {/* === CONTENT === */}
      <div className="relative z-10 container-wide w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Badge variant="gradient" size="lg" pulse>
                <Zap className="w-3 h-3" />
                AI-Powered Video Intelligence
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Turn Any Video Into{" "}
              <span className="text-gradient">Content</span> For{" "}
              <span className="text-gradient-cyan">Every Platform</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Upload once. Get AI subtitles, translations in 100+ languages,
              captions, blog posts, hashtags, and SEO-optimized content — automatically.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button
                variant="gradient"
                size="xl"
                magnetic
                glow
                icon={<Sparkles className="w-5 h-5" />}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Start Free — No CC Required
              </Button>
              <Button
                variant="glass"
                size="xl"
                icon={<Play className="w-4 h-4" />}
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex items-center gap-8 mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Stat value="10M+" label="Videos Processed" />
              <Stat value="100+" label="Languages" />
              <Stat value="99.2%" label="Accuracy" />
            </motion.div>
          </div>

          {/* Right: 3D Video Player + AI Panel */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Floating Language Pills (orbit around video) */}
            <div className="absolute inset-0 hidden lg:block">
              {LANGUAGE_PILLS.map((pill, i) => (
                <div
                  key={pill.code}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-${i + 1}`}
                >
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-lg border border-[rgba(255,255,255,0.1)] shadow-lg"
                    style={{
                      background: `${pill.color}15`,
                      borderColor: `${pill.color}40`,
                      color: pill.color,
                    }}
                  >
                    {pill.code}
                  </div>
                </div>
              ))}
            </div>

            {/* 3D Video Player */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <VideoPlayer currentSubtitle={currentSubtitle} />

              {/* AI Process Panel — Floating right side */}
              <motion.div
                className="absolute -right-4 lg:-right-32 top-8 hidden md:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <AIProcessPanel />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === SUB-COMPONENTS ===

function VideoPlayer({ currentSubtitle }: { currentSubtitle: number }) {
  return (
    <div className="relative animate-float" style={{ animationDuration: "6s" }}>
      {/* Glow behind the player */}
      <div className="absolute -inset-8 rounded-3xl bg-[radial-gradient(ellipse,rgba(139,92,246,0.2)_0%,rgba(59,130,246,0.1)_40%,transparent_70%)] blur-xl" />

      {/* Video frame */}
      <div className="relative w-[320px] sm:w-[400px] lg:w-[460px] aspect-video rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-glass-lg backdrop-blur-sm">
        {/* Simulated video content (gradient placeholder) */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-2 to-background">
          {/* Fake video frame with waveform */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-end gap-1 h-16">
              {Array.from({ length: 24 }, (_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-blue to-purple rounded-full waveform-bar"
                  style={{
                    height: `${20 + Math.sin(i * 0.5) * 40}%`,
                    "--duration": `${0.8 + (i % 5) * 0.2}s`,
                    "--delay": `${i * 0.05}s`,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/40 to-transparent flex items-center px-3 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>

          {/* Timeline bar at bottom */}
          <div className="absolute bottom-8 left-4 right-4 h-1 rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue to-purple"
              animate={{ width: ["30%", "70%"] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            />
          </div>
        </div>

        {/* Glass border highlight */}
        <div className="absolute inset-0 rounded-2xl border border-[rgba(255,255,255,0.06)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Subtitle display below video */}
      <div className="mt-4 min-h-[60px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSubtitle}
            className="text-center"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <span
              className="text-2xs uppercase tracking-widest font-semibold mb-1 block"
              style={{ color: SUBTITLES[currentSubtitle].color }}
            >
              {SUBTITLES[currentSubtitle].lang}
            </span>
            <p className="text-sm sm:text-base font-medium text-white/90 max-w-[360px]">
              {SUBTITLES[currentSubtitle].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reflection below */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-gradient-to-b from-purple/10 to-transparent blur-xl rounded-full" />
    </div>
  );
}

function AIProcessPanel() {
  return (
    <div className="w-56 rounded-2xl glass-card p-4 space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          AI Processing
        </span>
      </div>

      {AI_STEPS.map((step, i) => (
        <div key={step.label} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-2xs text-text-secondary">{step.label}</span>
            {step.status === "complete" && (
              <span className="text-2xs text-green-400">✓</span>
            )}
          </div>
          <div className="w-full h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  step.status === "complete"
                    ? "linear-gradient(90deg, #10B981, #34D399)"
                    : "linear-gradient(90deg, #3B82F6, #8B5CF6)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${step.progress}%` }}
              transition={{ duration: 1.5, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-lg sm:text-xl font-bold text-white">{value}</span>
      <span className="text-xs text-text-muted">{label}</span>
    </div>
  );
}

export default HeroSection;
