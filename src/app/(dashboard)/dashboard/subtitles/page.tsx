"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Captions, Clock, Edit3, Plus, Trash2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

/**
 * Subtitle Editor Page — Timeline editor with frame-accurate sync.
 */

const SUBTITLES = [
  { id: 1, start: "00:00:02.100", end: "00:00:05.400", text: "Welcome to our product demo. Today we're going to show you", speaker: "Host" },
  { id: 2, start: "00:00:05.500", end: "00:00:08.900", text: "how SubVerse AI transforms your video content workflow.", speaker: "Host" },
  { id: 3, start: "00:00:09.200", end: "00:00:13.100", text: "Let's start with the upload process — it's incredibly simple.", speaker: "Host" },
  { id: 4, start: "00:00:13.500", end: "00:00:17.200", text: "You just drag and drop your video file, and the AI takes over.", speaker: "Host" },
  { id: 5, start: "00:00:17.800", end: "00:00:21.400", text: "Within minutes, you'll have transcriptions in any language.", speaker: "Host" },
  { id: 6, start: "00:00:22.000", end: "00:00:25.600", text: "The accuracy is remarkable — over 99% for most languages.", speaker: "Guest" },
];

export default function SubtitlesPage() {
  const [activeSubtitle, setActiveSubtitle] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="space-y-4 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Subtitle Editor</h1>
          <p className="text-sm text-text-secondary">product_demo_final.mp4 • 6 subtitles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={<Plus className="w-3 h-3" />}>Add</Button>
          <Button variant="primary" size="sm">Save & Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Video Preview */}
        <div className="xl:col-span-2 space-y-3">
          <GlassCard padding="none" tilt={false} hover={false}>
            {/* Video area */}
            <div className="aspect-video bg-surface-2 rounded-t-2xl relative flex items-center justify-center">
              <div className="flex items-end gap-0.5 h-12">
                {Array.from({ length: 32 }, (_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-blue/60 to-purple/60 rounded-full"
                    style={{ height: `${20 + Math.sin(i * 0.4) * 60}%` }}
                  />
                ))}
              </div>
              {/* Subtitle overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-sm text-white text-center">
                  {SUBTITLES.find(s => s.id === activeSubtitle)?.text}
                </p>
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-4 p-4 border-t border-[rgba(255,255,255,0.06)]">
              <button className="text-text-muted hover:text-white transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
              </button>
              <button className="text-text-muted hover:text-white transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>
              <span className="text-xs text-text-muted font-mono ml-4">00:00:05.40 / 00:12:45.00</span>
            </div>
          </GlassCard>

          {/* Timeline */}
          <GlassCard padding="sm" tilt={false} hover={false}>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-text-muted" />
              <span className="text-xs font-medium text-text-secondary">Timeline</span>
            </div>
            <div className="relative h-16 bg-[rgba(255,255,255,0.02)] rounded-xl overflow-hidden">
              {/* Time markers */}
              <div className="absolute top-0 left-0 right-0 h-4 flex items-center border-b border-[rgba(255,255,255,0.04)]">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="flex-1 text-center text-2xs text-text-muted">
                    0:{(i * 3).toString().padStart(2, "0")}
                  </div>
                ))}
              </div>
              {/* Subtitle blocks */}
              <div className="absolute top-5 bottom-1 left-0 right-0 px-1">
                {SUBTITLES.map((sub, i) => (
                  <div
                    key={sub.id}
                    className={`absolute h-8 rounded-md cursor-pointer transition-all ${
                      sub.id === activeSubtitle
                        ? "bg-purple/40 border border-purple/60"
                        : "bg-blue/20 border border-blue/30 hover:bg-blue/30"
                    }`}
                    style={{
                      left: `${(i * 16) + 2}%`,
                      width: "14%",
                      top: "4px",
                    }}
                    onClick={() => setActiveSubtitle(sub.id)}
                  >
                    <span className="text-2xs text-white/70 px-1 truncate block mt-1.5">
                      {sub.text.slice(0, 20)}...
                    </span>
                  </div>
                ))}
              </div>
              {/* Playhead */}
              <div className="absolute top-0 bottom-0 left-[20%] w-0.5 bg-red-500 z-10">
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Subtitle List */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {SUBTITLES.map((sub) => (
            <motion.div
              key={sub.id}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                sub.id === activeSubtitle
                  ? "bg-purple/[0.06] border-purple/30"
                  : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
              }`}
              onClick={() => setActiveSubtitle(sub.id)}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xs text-text-muted font-mono">{sub.start} → {sub.end}</span>
                <div className="flex gap-1">
                  <button className="text-text-muted hover:text-white transition-colors">
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button className="text-text-muted hover:text-red-400 transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-white leading-relaxed">{sub.text}</p>
              <span className="text-2xs text-purple-glow mt-1 inline-block">{sub.speaker}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
