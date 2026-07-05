"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, FileVideo, Film, X, Settings2, Globe, Captions, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/**
 * Upload Page — Drag and drop zone with processing options.
 */

export default function UploadPage() {
  const [files, setFiles] = React.useState<{ name: string; size: string; progress: number }[]>([]);

  const simulateUpload = () => {
    setFiles([{ name: "product_demo_final.mp4", size: "856 MB", progress: 0 }]);
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setFiles([{ name: "product_demo_final.mp4", size: "856 MB", progress }]);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Upload Video</h1>
        <p className="text-sm text-text-secondary mt-1">Upload your video and configure processing options.</p>
      </div>

      {/* Drop Zone */}
      <GlassCard padding="none" tilt={false}>
        <div
          className="p-12 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-[rgba(255,255,255,0.08)] rounded-2xl m-1 hover:border-purple/30 transition-colors cursor-pointer"
          onClick={simulateUpload}
        >
          <motion.div
            className="w-20 h-20 rounded-3xl bg-purple/10 flex items-center justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Upload className="w-10 h-10 text-purple-glow" />
          </motion.div>
          <div className="text-center">
            <p className="text-base font-medium text-white">
              Drag and drop your video here
            </p>
            <p className="text-sm text-text-muted mt-1">
              or click to browse • MP4, MOV, AVI, MKV • Up to 5GB
            </p>
          </div>
          <Button variant="secondary" size="md" icon={<FileVideo className="w-4 h-4" />}>
            Browse Files
          </Button>
        </div>
      </GlassCard>

      {/* Uploaded file */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard padding="md" tilt={false} hover={false}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center shrink-0">
                <Film className="w-6 h-6 text-blue-glow" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-white truncate">{files[0].name}</p>
                  <button className="text-text-muted hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-2xs text-text-muted mb-2">{files[0].size}</p>
                <Progress value={files[0].progress} size="sm" gradient="blue-purple" />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Processing Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard padding="md" tilt={false} hover={false}>
          <div className="flex items-center gap-3 mb-4">
            <Settings2 className="w-5 h-5 text-purple-glow" />
            <h3 className="text-sm font-semibold text-white">Processing Options</h3>
          </div>
          <div className="space-y-3">
            {["AI Transcription", "Speaker Detection", "Burned Captions", "Auto-trim Silence"].map((option) => (
              <label key={option} className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-text-secondary group-hover:text-white transition-colors">{option}</span>
                <div className="w-9 h-5 rounded-full bg-purple/20 relative">
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-purple-glow" />
                </div>
              </label>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="md" tilt={false} hover={false}>
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-cyan" />
            <h3 className="text-sm font-semibold text-white">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["English", "Hindi", "Hinglish", "Spanish", "French", "Japanese", "Korean", "Arabic"].map((lang) => (
              <span
                key={lang}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-text-secondary hover:border-purple/30 hover:text-white transition-all cursor-pointer"
              >
                {lang}
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-lg text-xs font-medium text-purple-glow cursor-pointer hover:text-white transition-colors">
              + 92 more
            </span>
          </div>
        </GlassCard>

        <GlassCard padding="md" tilt={false} hover={false}>
          <div className="flex items-center gap-3 mb-4">
            <Captions className="w-5 h-5 text-blue-glow" />
            <h3 className="text-sm font-semibold text-white">Caption Style</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["TikTok Bold", "YouTube CC", "Netflix", "Minimal"].map((style) => (
              <div
                key={style}
                className="p-3 rounded-xl text-center text-xs font-medium bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-text-secondary hover:border-purple/30 hover:text-white transition-all cursor-pointer"
              >
                {style}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="md" tilt={false} hover={false}>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h3 className="text-sm font-semibold text-white">AI Content</h3>
          </div>
          <div className="space-y-3">
            {["Instagram Caption", "Blog Article", "Twitter Thread", "SEO Description", "Hashtags"].map((content) => (
              <label key={content} className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-text-secondary group-hover:text-white transition-colors">{content}</span>
                <div className="w-9 h-5 rounded-full bg-purple/20 relative">
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-purple-glow" />
                </div>
              </label>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Start Processing */}
      <div className="flex justify-end">
        <Button variant="gradient" size="lg" magnetic glow icon={<Sparkles className="w-4 h-4" />}>
          Start AI Processing
        </Button>
      </div>
    </div>
  );
}
