"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AudioWaveform, Brain, Captions, Globe, Sparkles, Download,
  Check, Loader2, Cpu, FileVideo
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/shared/aurora-background";

/**
 * Processing Screen — Live AI pipeline visualization.
 * Shows real-time progress through each processing stage with
 * animated waveforms, neural network visuals, and step tracking.
 */

interface PipelineStep {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const PIPELINE: PipelineStep[] = [
  { id: "extract", label: "Audio Extraction", description: "Isolating audio track from video", icon: AudioWaveform, color: "#3B82F6" },
  { id: "transcribe", label: "AI Transcription", description: "Whisper large-v3 speech recognition", icon: Brain, color: "#8B5CF6" },
  { id: "diarize", label: "Speaker Detection", description: "Identifying and labeling speakers", icon: Cpu, color: "#06B6D4" },
  { id: "subtitle", label: "Subtitle Generation", description: "Creating frame-accurate captions", icon: Captions, color: "#EC4899" },
  { id: "translate", label: "Translation", description: "Neural translation to 10 languages", icon: Globe, color: "#10B981" },
  { id: "content", label: "AI Content", description: "Generating social posts & SEO", icon: Sparkles, color: "#F59E0B" },
  { id: "export", label: "Finalizing Export", description: "Packaging your files", icon: Download, color: "#A78BFA" },
];

export default function ProcessingPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [stepProgress, setStepProgress] = React.useState(0);
  const [complete, setComplete] = React.useState(false);

  // Simulate pipeline progression
  React.useEffect(() => {
    if (complete) return;

    const interval = setInterval(() => {
      setStepProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((step) => {
            if (step >= PIPELINE.length - 1) {
              setComplete(true);
              return step;
            }
            return step + 1;
          });
          return 0;
        }
        return prev + Math.random() * 8;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [complete]);

  const overallProgress = Math.min(
    100,
    ((currentStep + stepProgress / 100) / PIPELINE.length) * 100
  );

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <AuroraBackground intensity="subtle" />

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
              <FileVideo className="w-6 h-6 text-purple-glow" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">product_demo_final.mp4</p>
              <p className="text-2xs text-text-muted">1.2 GB • 24:36 duration</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {complete ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <Check className="w-6 h-6 text-green-400" />
                  Processing Complete!
                </h1>
                <p className="text-sm text-text-secondary mt-1">
                  Your video is ready. All outputs generated successfully.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h1 className="text-2xl font-bold text-white">
                  <span className="text-gradient">AI Processing</span> in Progress
                </h1>
                <p className="text-sm text-text-secondary mt-1">
                  Sit back — this usually takes 3-5 minutes.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Overall progress ring / bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Overall Progress</span>
            <span className="text-xs font-mono text-white">{overallProgress.toFixed(0)}%</span>
          </div>
          <div className="h-2 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue via-purple to-cyan relative"
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>

        {/* Animated waveform while processing */}
        {!complete && (
          <div className="flex items-end justify-center gap-1 h-16 mb-8">
            {Array.from({ length: 40 }, (_, i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full bg-gradient-to-t from-purple/40 to-blue/60"
                animate={{
                  height: [`${10 + Math.random() * 20}%`, `${40 + Math.random() * 60}%`, `${10 + Math.random() * 20}%`],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.6,
                  repeat: Infinity,
                  delay: i * 0.02,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Pipeline steps */}
        <div className="space-y-3">
          {PIPELINE.map((step, index) => {
            const isDone = index < currentStep || complete;
            const isActive = index === currentStep && !complete;
            const isPending = index > currentStep && !complete;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-purple/[0.06] border-purple/30 shadow-[0_0_24px_rgba(139,92,246,0.12)]"
                      : isDone
                      ? "bg-green-500/[0.03] border-green-500/20"
                      : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: isDone
                        ? "rgba(16,185,129,0.1)"
                        : isActive
                        ? `${step.color}15`
                        : "rgba(255,255,255,0.04)",
                    }}
                  >
                    {isDone ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : isActive ? (
                      <Loader2 className="w-5 h-5 animate-spin" style={{ color: step.color }} />
                    ) : (
                      <step.icon className="w-5 h-5 text-text-muted" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isPending ? "text-text-muted" : "text-white"}`}>
                        {step.label}
                      </span>
                      {isActive && (
                        <span className="text-2xs font-mono text-purple-glow">
                          {Math.min(100, stepProgress).toFixed(0)}%
                        </span>
                      )}
                      {isDone && <span className="text-2xs text-green-400">Done</span>}
                    </div>
                    <p className="text-2xs text-text-muted mt-0.5">{step.description}</p>

                    {/* Active step progress */}
                    {isActive && (
                      <div className="mt-2 h-1 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${step.color}, ${step.color}88)` }}
                          animate={{ width: `${Math.min(100, stepProgress)}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Actions */}
        {complete && (
          <motion.div
            className="flex justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <a href="/dashboard/subtitles">
              <Button variant="secondary" size="lg" icon={<Captions className="w-4 h-4" />}>
                Edit Subtitles
              </Button>
            </a>
            <a href="/dashboard/export">
              <Button variant="gradient" size="lg" magnetic glow icon={<Download className="w-4 h-4" />}>
                Download All
              </Button>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
