"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, FileVideo, AudioWaveform, Brain, Captions, Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";

/**
 * Interactive Demo Section
 * Shows a simulated upload → process → output workflow animation.
 * Mimics drag-and-drop with animated steps.
 */

const DEMO_STEPS = [
  {
    icon: Upload,
    label: "Upload Video",
    description: "Drag & drop or browse files",
    progress: 100,
    status: "complete" as const,
  },
  {
    icon: AudioWaveform,
    label: "Audio Extraction",
    description: "Isolating speech patterns",
    progress: 100,
    status: "complete" as const,
  },
  {
    icon: Brain,
    label: "AI Transcription",
    description: "Whisper large-v3 processing",
    progress: 78,
    status: "active" as const,
  },
  {
    icon: Captions,
    label: "Subtitle Generation",
    description: "Creating timed captions",
    progress: 45,
    status: "pending" as const,
  },
  {
    icon: Download,
    label: "Export Ready",
    description: "SRT, VTT, burned video",
    progress: 0,
    status: "pending" as const,
  },
];

export function DemoSection() {
  return (
    <section id="demo" className="relative section-padding">
      <div className="container-wide">
        <SectionHeading
          badge="Interactive Demo"
          title="See the Magic Happen"
          titleGradient="Magic"
          subtitle="Upload any video and watch as our AI processes speech, generates subtitles, translates, and creates content in real-time."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Upload/Drop Zone */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard padding="lg" className="relative group">
              {/* Drop zone */}
              <div className="border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-xl p-12 flex flex-col items-center gap-4 group-hover:border-purple/30 transition-colors">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-purple/10 flex items-center justify-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FileVideo className="w-8 h-8 text-purple-glow" />
                </motion.div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white">Drop your video here</p>
                  <p className="text-xs text-text-muted mt-1">MP4, MOV, AVI • Up to 5GB</p>
                </div>
              </div>

              {/* Simulated uploaded file */}
              <div className="mt-4 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center shrink-0">
                  <FileVideo className="w-5 h-5 text-blue-glow" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">podcast_episode_42.mp4</p>
                  <p className="text-2xs text-text-muted">1.2 GB • 24:36 duration</p>
                </div>
                <span className="text-2xs text-green-400 font-medium">Uploaded</span>
              </div>

              {/* Waveform visualization */}
              <div className="mt-6 flex items-end gap-0.5 h-12 px-2">
                {Array.from({ length: 48 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-gradient-to-t from-blue/60 to-purple/60"
                    animate={{
                      height: [`${15 + Math.random() * 30}%`, `${30 + Math.random() * 60}%`, `${15 + Math.random() * 30}%`],
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      delay: i * 0.03,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Right: Processing Steps */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {DEMO_STEPS.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <GlassCard
                  padding="sm"
                  hover={false}
                  tilt={false}
                  className={
                    step.status === "active"
                      ? "border-purple/30 bg-purple/[0.03]"
                      : ""
                  }
                >
                  <div className="flex items-center gap-4 p-2">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        step.status === "complete"
                          ? "bg-green-500/10"
                          : step.status === "active"
                          ? "bg-purple/10"
                          : "bg-[rgba(255,255,255,0.04)]"
                      }`}
                    >
                      <step.icon
                        className={`w-5 h-5 ${
                          step.status === "complete"
                            ? "text-green-400"
                            : step.status === "active"
                            ? "text-purple-glow"
                            : "text-text-muted"
                        }`}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{step.label}</span>
                        {step.status === "complete" && (
                          <span className="text-2xs text-green-400 font-medium">Done</span>
                        )}
                        {step.status === "active" && (
                          <span className="text-2xs text-purple-glow font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-glow animate-pulse" />
                            Processing
                          </span>
                        )}
                      </div>
                      <p className="text-2xs text-text-muted">{step.description}</p>
                      {step.progress > 0 && (
                        <div className="mt-2">
                          <Progress
                            value={step.progress}
                            size="sm"
                            gradient={step.status === "complete" ? "green" : "blue-purple"}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DemoSection;
