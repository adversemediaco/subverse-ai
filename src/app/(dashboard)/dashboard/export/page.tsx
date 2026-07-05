"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Download, FileText, Video, Code, FileJson, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

/**
 * Export Page — Choose format and download subtitles/content.
 */

const EXPORT_FORMATS = [
  { id: "srt", name: "SRT", description: "SubRip subtitle format", icon: FileText, popular: true },
  { id: "vtt", name: "VTT", description: "Web Video Text Tracks", icon: FileText, popular: true },
  { id: "ass", name: "ASS/SSA", description: "Advanced SubStation Alpha", icon: Code, popular: false },
  { id: "json", name: "JSON", description: "Structured data format", icon: FileJson, popular: false },
  { id: "txt", name: "Plain Text", description: "Simple transcript", icon: FileText, popular: false },
  { id: "burned", name: "Burned Video", description: "Captions embedded in video", icon: Video, popular: true },
];

export default function ExportPage() {
  const [selectedFormats, setSelectedFormats] = React.useState<string[]>(["srt"]);

  const toggleFormat = (id: string) => {
    setSelectedFormats((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Export</h1>
        <p className="text-sm text-text-secondary">Choose your format and download your content.</p>
      </div>

      {/* Format selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXPORT_FORMATS.map((format, i) => (
          <motion.div
            key={format.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              onClick={() => toggleFormat(format.id)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                selectedFormats.includes(format.id)
                  ? "bg-purple/[0.08] border-purple/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                  : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
              }`}
            >
              <div className="flex items-start justify-between">
                <format.icon className={`w-5 h-5 ${selectedFormats.includes(format.id) ? "text-purple-glow" : "text-text-muted"}`} />
                {selectedFormats.includes(format.id) && (
                  <div className="w-5 h-5 rounded-full bg-purple flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-sm font-semibold text-white mt-3">{format.name}</h3>
              <p className="text-2xs text-text-muted mt-0.5">{format.description}</p>
              {format.popular && (
                <span className="inline-block mt-2 text-2xs text-purple-glow bg-purple/10 px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Export options */}
      <GlassCard padding="md" tilt={false} hover={false}>
        <h3 className="text-sm font-semibold text-white mb-4">Export Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-text-muted block mb-2">Languages to Export</label>
            <div className="flex flex-wrap gap-2">
              {["All (10)", "English", "Hindi", "Spanish"].map((lang) => (
                <span key={lang} className="px-3 py-1.5 rounded-lg text-xs bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-text-secondary">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-text-muted block mb-2">Video Quality (Burned)</label>
            <div className="flex gap-2">
              {["720p", "1080p", "4K"].map((q) => (
                <span key={q} className="px-3 py-1.5 rounded-lg text-xs bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-text-secondary cursor-pointer hover:border-purple/30 transition-all">
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Download button */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary" size="lg">Preview</Button>
        <Button variant="gradient" size="lg" magnetic glow icon={<Download className="w-4 h-4" />}>
          Export {selectedFormats.length} Format{selectedFormats.length !== 1 ? "s" : ""}
        </Button>
      </div>
    </div>
  );
}
