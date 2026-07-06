"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileVideo, Film, X, Globe, Sparkles, Loader2, Captions, Copy, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useTranscribeDirect } from "@/hooks/use-actions";
import { useToast } from "@/components/ui/toast";
import { formatFileSize, formatDuration } from "@/lib/utils";
import type { ContentKind, TranscribeResult } from "@/lib/api-client";

/**
 * Upload / Transcribe Page — the fastest real-AI experience.
 * Pick a short video → choose languages + content → "Transcribe Now" sends it
 * straight to Whisper (only needs OPENAI_API_KEY) and shows the transcript,
 * translations, and generated content inline. Falls back to demo data otherwise.
 */

const LANGUAGE_OPTIONS = [
  { code: "hi", label: "Hindi" },
  { code: "hinglish", label: "Hinglish" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "ja", label: "Japanese" },
  { code: "ar", label: "Arabic" },
];

const CONTENT_OPTIONS: { kind: ContentKind; label: string }[] = [
  { kind: "instagram", label: "Instagram" },
  { kind: "twitter", label: "Twitter" },
  { kind: "blog", label: "Blog" },
  { kind: "hashtags", label: "Hashtags" },
  { kind: "seo", label: "SEO" },
];

export default function UploadPage() {
  const { toast } = useToast();
  const transcribe = useTranscribeDirect();

  const [file, setFile] = React.useState<File | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [languages, setLanguages] = React.useState<string[]>(["hi", "es"]);
  const [contentKinds, setContentKinds] = React.useState<ContentKind[]>(["instagram", "hashtags"]);
  const [result, setResult] = React.useState<TranscribeResult | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const toggle = <T,>(list: T[], value: T, setter: (v: T[]) => void) =>
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("video/") && !f.type.startsWith("audio/")) {
      toast({ title: "Invalid file", description: "Select a video or audio file.", variant: "error" });
      return;
    }
    setFile(f);
    setResult(null);
  };

  const run = async () => {
    if (!file) return;
    const res = await transcribe.mutateAsync({
      file,
      translate: languages,
      content: contentKinds,
    });
    setResult(res);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Upload &amp; Transcribe</h1>
        <p className="text-sm text-text-secondary mt-1">
          Drop a short clip (&le;25MB) to get AI subtitles, translations, and content instantly.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/*,audio/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {/* Drop zone */}
      <GlassCard padding="none" tilt={false}>
        <div
          className={`p-10 flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl m-1 transition-colors cursor-pointer ${
            dragActive ? "border-purple/60 bg-purple/[0.04]" : "border-[rgba(255,255,255,0.08)] hover:border-purple/30"
          }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
        >
          <motion.div
            className="w-16 h-16 rounded-3xl bg-purple/10 flex items-center justify-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Upload className="w-8 h-8 text-purple-glow" />
          </motion.div>
          <div className="text-center">
            <p className="text-base font-medium text-white">Drag &amp; drop, or click to browse</p>
            <p className="text-sm text-text-muted mt-1">MP4, MOV, MP3, WAV • up to 25MB</p>
          </div>
          <Button variant="secondary" size="md" icon={<FileVideo className="w-4 h-4" />}>Browse Files</Button>
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
                <p className="text-sm font-medium text-white truncate">{file.name}</p>
                <p className="text-2xs text-text-muted">{formatFileSize(file.size)}</p>
              </div>
              <button className="text-text-muted hover:text-white" onClick={() => { setFile(null); setResult(null); }}>
                <X className="w-4 h-4" />
              </button>
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
            <h3 className="text-sm font-semibold text-white">Generate Content</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {CONTENT_OPTIONS.map(({ kind, label }) => (
              <button
                key={kind}
                onClick={() => toggle(contentKinds, kind, setContentKinds)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  contentKinds.includes(kind)
                    ? "bg-purple/15 border-purple/40 text-white"
                    : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-text-secondary hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Action */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          {file ? `${languages.length} languages • ${contentKinds.length} content types` : "Select a file to begin."}
        </p>
        <Button
          variant="gradient"
          size="lg"
          magnetic
          glow
          disabled={!file || transcribe.isPending}
          onClick={run}
          icon={transcribe.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        >
          {transcribe.isPending ? "Transcribing…" : "Transcribe Now"}
        </Button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {result.demo && (
              <div className="text-xs text-yellow-400/90 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-2">
                Demo results — add <code className="font-mono">OPENAI_API_KEY</code> in Vercel to transcribe your real video.
              </div>
            )}

            {/* Transcript */}
            <GlassCard padding="lg" tilt={false} hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <Captions className="w-5 h-5 text-blue-glow" />
                <h3 className="text-sm font-semibold text-white">Transcript ({result.transcript.language})</h3>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {result.transcript.segments.map((s, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-2xs text-text-muted font-mono shrink-0 mt-0.5 w-24">
                      {formatDuration(s.start)} → {formatDuration(s.end)}
                    </span>
                    <span className="text-text-secondary">{s.text}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Translations */}
            {result.translations.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.translations.map((t) => (
                  <GlassCard key={t.language} padding="md" tilt={false} hover={false}>
                    <h4 className="text-xs font-semibold text-purple-glow uppercase tracking-wider mb-2">{t.language}</h4>
                    <p className="text-sm text-text-secondary line-clamp-4">
                      {t.segments.map((s) => s.text).join(" ")}
                    </p>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* Content */}
            {result.content.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.content.map((c) => (
                  <ContentCard key={c.kind} kind={c.kind} text={c.text} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContentCard({ kind, text }: { kind: string; text: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <GlassCard padding="md" tilt={false} hover={false}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold text-white capitalize">{kind.replace("-", " ")}</h4>
        <button onClick={copy} className="text-text-muted hover:text-white transition-colors">
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line line-clamp-6">{text}</p>
    </GlassCard>
  );
}
