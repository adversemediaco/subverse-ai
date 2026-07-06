"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, FileVideo, Film, X, Settings2, Globe, Captions, Sparkles, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUpload, useProcess } from "@/hooks/use-actions";
import { useToast } from "@/components/ui/toast";
import { formatFileSize } from "@/lib/utils";
import type { ContentKind } from "@/lib/api-client";

/**
 * Upload Page — real drag-and-drop upload → project creation → processing.
 * Options are selectable and passed to the processing pipeline.
 */

const LANGUAGE_OPTIONS = [
  { code: "hi", label: "Hindi" },
  { code: "hinglish", label: "Hinglish" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "ar", label: "Arabic" },
  { code: "de", label: "German" },
];

const CONTENT_OPTIONS: { kind: ContentKind; label: string }[] = [
  { kind: "instagram", label: "Instagram Caption" },
  { kind: "blog", label: "Blog Article" },
  { kind: "twitter", label: "Twitter Thread" },
  { kind: "seo", label: "SEO Description" },
  { kind: "hashtags", label: "Hashtags" },
];

export default function UploadPage() {
  const { toast } = useToast();
  const upload = useUpload();
  const process = useProcess();

  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [projectId, setProjectId] = React.useState<string | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [languages, setLanguages] = React.useState<string[]>(["hi", "es"]);
  const [contentKinds, setContentKinds] = React.useState<ContentKind[]>(["instagram", "hashtags"]);

  const toggle = <T,>(list: T[], value: T, setter: (v: T[]) => void) =>
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("video/")) {
      toast({ title: "Invalid file", description: "Please select a video file.", variant: "error" });
      return;
    }
    setFile(f);
    setProjectId(null);
    setProgress(0);
  };

  const startUpload = async () => {
    if (!file) return;
    // Simulated progress bar (real byte-progress needs XHR; kept lightweight here).
    setProgress(10);
    const timer = setInterval(() => setProgress((p) => Math.min(p + 12, 90)), 300);
    try {
      const { projectId: pid } = await upload.mutateAsync(file);
      clearInterval(timer);
      setProgress(100);
      setProjectId(pid);
    } catch {
      clearInterval(timer);
      setProgress(0);
    }
  };

  const startProcessing = () => {
    if (!projectId) return;
    process.mutate({ projectId, translate: languages, generateContent: contentKinds });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Upload Video</h1>
        <p className="text-sm text-text-secondary mt-1">Upload your video and configure processing options.</p>
      </div>

      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {/* Drop Zone */}
      <GlassCard padding="none" tilt={false}>
        <div
          className={`p-12 flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl m-1 transition-colors cursor-pointer ${
            dragActive ? "border-purple/60 bg-purple/[0.04]" : "border-[rgba(255,255,255,0.08)] hover:border-purple/30"
          }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
        >
          <motion.div
            className="w-20 h-20 rounded-3xl bg-purple/10 flex items-center justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Upload className="w-10 h-10 text-purple-glow" />
          </motion.div>
          <div className="text-center">
            <p className="text-base font-medium text-white">Drag and drop your video here</p>
            <p className="text-sm text-text-muted mt-1">or click to browse • MP4, MOV, AVI, MKV • Up to 5GB</p>
          </div>
          <Button variant="secondary" size="md" icon={<FileVideo className="w-4 h-4" />}>
            Browse Files
          </Button>
        </div>
      </GlassCard>

      {/* Selected file */}
      {file && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard padding="md" tilt={false} hover={false}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center shrink-0">
                <Film className="w-6 h-6 text-blue-glow" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                  <button className="text-text-muted hover:text-white" onClick={() => { setFile(null); setProgress(0); setProjectId(null); }}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-2xs text-text-muted mb-2">
                  {formatFileSize(file.size)}
                  {projectId && <span className="text-green-400 ml-2">• Uploaded</span>}
                </p>
                {(progress > 0 || upload.isPending) && (
                  <Progress value={progress} size="sm" gradient={projectId ? "green" : "blue-purple"} />
                )}
              </div>
              {!projectId && (
                <Button variant="primary" size="sm" onClick={startUpload} loading={upload.isPending}>
                  Upload
                </Button>
              )}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard padding="md" tilt={false} hover={false}>
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-cyan" />
            <h3 className="text-sm font-semibold text-white">Translate To</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {LANGUAGE_OPTIONS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => toggle(languages, code, setLanguages)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  languages.includes(code)
                    ? "bg-purple/15 border-purple/40 text-white"
                    : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-text-secondary hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="md" tilt={false} hover={false}>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h3 className="text-sm font-semibold text-white">Generate AI Content</h3>
          </div>
          <div className="space-y-2.5">
            {CONTENT_OPTIONS.map(({ kind, label }) => (
              <label key={kind} className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-text-secondary group-hover:text-white transition-colors">{label}</span>
                <button
                  type="button"
                  onClick={() => toggle(contentKinds, kind, setContentKinds)}
                  className={`w-9 h-5 rounded-full relative transition-colors ${contentKinds.includes(kind) ? "bg-purple/60" : "bg-[rgba(255,255,255,0.1)]"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${contentKinds.includes(kind) ? "left-[18px]" : "left-0.5"}`} />
                </button>
              </label>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Start Processing */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          {projectId
            ? `${languages.length} languages • ${contentKinds.length} content types selected`
            : "Upload a video to enable processing."}
        </p>
        <Button
          variant="gradient"
          size="lg"
          magnetic
          glow
          disabled={!projectId || process.isPending}
          onClick={startProcessing}
          icon={process.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        >
          {process.isPending ? "Processing…" : "Start AI Processing"}
        </Button>
      </div>
    </div>
  );
}
