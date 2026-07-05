"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Globe, Check, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/**
 * Translation Panel — Select languages and monitor translation progress.
 */

const LANGUAGES = [
  { code: "hi", name: "Hindi", flag: "🇮🇳", status: "complete", progress: 100 },
  { code: "hinglish", name: "Hinglish", flag: "🇮🇳", status: "complete", progress: 100 },
  { code: "es", name: "Spanish", flag: "🇪🇸", status: "processing", progress: 72 },
  { code: "fr", name: "French", flag: "🇫🇷", status: "processing", progress: 45 },
  { code: "ja", name: "Japanese", flag: "🇯🇵", status: "queued", progress: 0 },
  { code: "ko", name: "Korean", flag: "🇰🇷", status: "queued", progress: 0 },
  { code: "de", name: "German", flag: "🇩🇪", status: "queued", progress: 0 },
  { code: "ar", name: "Arabic", flag: "🇸🇦", status: "queued", progress: 0 },
  { code: "pt", name: "Portuguese", flag: "🇧🇷", status: "queued", progress: 0 },
  { code: "zh", name: "Chinese", flag: "🇨🇳", status: "queued", progress: 0 },
];

export default function TranslationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Translation Panel</h1>
          <p className="text-sm text-text-secondary">product_demo_final.mp4 • Source: English</p>
        </div>
        <Button variant="gradient" size="sm" icon={<Globe className="w-4 h-4" />}>
          Add Languages
        </Button>
      </div>

      {/* Source preview */}
      <GlassCard padding="md" tilt={false} hover={false}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-lg">🇺🇸</span>
          <div>
            <p className="text-sm font-semibold text-white">English (Source)</p>
            <p className="text-2xs text-text-muted">Original transcription • 6 segments</p>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
          <p className="text-sm text-text-secondary italic">
            &quot;Welcome to our product demo. Today we&apos;re going to show you how SubVerse AI transforms your video content workflow.&quot;
          </p>
        </div>
      </GlassCard>

      {/* Translation grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LANGUAGES.map((lang, i) => (
          <motion.div
            key={lang.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard padding="md" tilt={false} hover={false} className="relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{lang.name}</p>
                    <p className="text-2xs text-text-muted">{lang.code.toUpperCase()}</p>
                  </div>
                </div>
                <StatusBadge status={lang.status} />
              </div>

              {lang.status !== "queued" && (
                <Progress
                  value={lang.progress}
                  size="sm"
                  gradient={lang.status === "complete" ? "green" : "blue-purple"}
                />
              )}

              {lang.status === "complete" && (
                <div className="mt-3 p-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                  <p className="text-xs text-text-muted italic truncate">
                    {lang.code === "hi" && "हमारे प्रोडक्ट डेमो में आपका स्वागत है..."}
                    {lang.code === "hinglish" && "Hamare product demo mein aapka swagat hai..."}
                  </p>
                </div>
              )}

              {lang.status === "complete" && (
                <div className="flex gap-2 mt-3">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Preview</Button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "complete") {
    return (
      <span className="flex items-center gap-1 text-2xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
        <Check className="w-3 h-3" /> Done
      </span>
    );
  }
  if (status === "processing") {
    return (
      <span className="flex items-center gap-1 text-2xs font-medium text-purple-glow bg-purple/10 px-2 py-0.5 rounded-full">
        <Loader2 className="w-3 h-3 animate-spin" /> Processing
      </span>
    );
  }
  return (
    <span className="text-2xs font-medium text-text-muted bg-[rgba(255,255,255,0.04)] px-2 py-0.5 rounded-full">
      Queued
    </span>
  );
}
