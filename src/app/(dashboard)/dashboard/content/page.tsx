"use client";

import * as React from "react";
import { Sparkles, Instagram, Linkedin, Twitter, FileText, Hash, Search, Copy, Check, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useGenerateContent } from "@/hooks/use-actions";
import { useToast } from "@/components/ui/toast";
import type { ContentKind } from "@/lib/api-client";

/**
 * AI Content Generator — generates platform content from a video transcript
 * via the /api/content endpoint (real when OpenAI is configured, demo samples
 * otherwise). Supports tone selection, regeneration, and copy-to-clipboard.
 */

const CONTENT_TYPES: { id: ContentKind; label: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }[] = [
  { id: "instagram", label: "Instagram Caption", icon: Instagram, color: "#E1306C" },
  { id: "linkedin", label: "LinkedIn Post", icon: Linkedin, color: "#0A66C2" },
  { id: "twitter", label: "Twitter Thread", icon: Twitter, color: "#1DA1F2" },
  { id: "blog", label: "Blog Article", icon: FileText, color: "#10B981" },
  { id: "hashtags", label: "Hashtags", icon: Hash, color: "#F59E0B" },
  { id: "seo", label: "SEO Description", icon: Search, color: "#8B5CF6" },
];

const TONES = ["professional", "casual", "humorous", "educational", "inspirational", "promotional"];

export default function ContentPage() {
  const { toast } = useToast();
  const generate = useGenerateContent();

  const [activeType, setActiveType] = React.useState<ContentKind>("instagram");
  const [tone, setTone] = React.useState("professional");
  const [content, setContent] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const run = React.useCallback(
    async (kind: ContentKind, t: string) => {
      const res = await generate.mutateAsync({ kind, tone: t });
      setContent(res.content);
    },
    [generate]
  );

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({ title: "Copied to clipboard", variant: "success" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">AI Content Generator</h1>
          <p className="text-sm text-text-secondary">Generate platform-optimized content from your video</p>
        </div>
        <Button
          variant="gradient"
          size="sm"
          icon={generate.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          onClick={() => run(activeType, tone)}
          disabled={generate.isPending}
        >
          Generate
        </Button>
      </div>

      {/* Content type selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CONTENT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => { setActiveType(type.id); run(type.id, tone); }}
            className={`p-3 rounded-xl border text-center transition-all ${
              activeType === type.id
                ? "bg-purple/[0.08] border-purple/30"
                : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
            }`}
          >
            <type.icon className="w-5 h-5 mx-auto mb-2" style={{ color: activeType === type.id ? type.color : undefined }} />
            <span className="text-2xs font-medium text-text-secondary">{type.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main content */}
        <GlassCard padding="lg" tilt={false} hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Generated Content</h3>
            <Button
              variant="ghost"
              size="sm"
              icon={copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              onClick={handleCopy}
              disabled={!content}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="relative p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] min-h-[300px]">
            {generate.isPending && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-purple-glow animate-spin" />
              </div>
            )}
            {!generate.isPending && (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Click a content type or 'Generate' to create AI-powered content from your video."
                className="w-full min-h-[268px] bg-transparent text-sm text-text-secondary leading-relaxed resize-none focus:outline-none placeholder:text-text-muted"
              />
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="secondary" size="sm" icon={<Sparkles className="w-3 h-3" />} onClick={() => run(activeType, tone)} disabled={generate.isPending}>
              Regenerate
            </Button>
            <Button variant="primary" size="sm" onClick={handleCopy} disabled={!content}>Use This</Button>
          </div>
        </GlassCard>

        {/* Settings */}
        <div className="space-y-4">
          <GlassCard padding="md" tilt={false} hover={false}>
            <h3 className="text-sm font-semibold text-white mb-3">Tone & Style</h3>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border capitalize transition-all ${
                    tone === t
                      ? "bg-purple/15 border-purple/40 text-white"
                      : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-text-secondary hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard padding="md" tilt={false} hover={false}>
            <h3 className="text-sm font-semibold text-white mb-3">AI Suggestions</h3>
            <div className="space-y-2">
              {["Add a question to boost engagement", "Include a trending hashtag", "Mention the video's key takeaway"].map((s) => (
                <div key={s} className="flex items-start gap-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                  <Sparkles className="w-3 h-3 text-yellow-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-text-secondary">{s}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
