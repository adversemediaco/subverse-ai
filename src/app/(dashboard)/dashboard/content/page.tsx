"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, Instagram, Linkedin, Twitter, FileText, Hash, Search, Copy, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

/**
 * AI Content Generator Page — Generate social posts, blogs, hashtags, SEO from video.
 */

const CONTENT_TYPES = [
  { id: "instagram", label: "Instagram Caption", icon: Instagram, color: "#E1306C" },
  { id: "linkedin", label: "LinkedIn Post", icon: Linkedin, color: "#0A66C2" },
  { id: "twitter", label: "Twitter Thread", icon: Twitter, color: "#1DA1F2" },
  { id: "blog", label: "Blog Article", icon: FileText, color: "#10B981" },
  { id: "hashtags", label: "Hashtags", icon: Hash, color: "#F59E0B" },
  { id: "seo", label: "SEO Description", icon: Search, color: "#8B5CF6" },
];

const GENERATED_CONTENT = {
  instagram: {
    title: "Instagram Caption",
    content: `🚀 Just discovered the future of content creation!\n\nSubVerse AI turned my 45-minute podcast into:\n✅ Subtitles in 12 languages\n✅ Blog post (2,500 words)\n✅ Twitter thread\n✅ This caption 😄\n\nThe AI is scary good at understanding context and tone. No more spending hours repurposing content manually.\n\nWho else is using AI for content? Drop a 🤖 below!\n\n#ContentCreator #AITools #Productivity #SubVerseAI #VideoMarketing #SocialMediaTips`,
  },
  linkedin: {
    title: "LinkedIn Post",
    content: `I just saved 20+ hours this week using AI for content repurposing.\n\nHere's the workflow:\n1. Record one video\n2. Upload to SubVerse AI\n3. Get transcriptions, translations, and content for every platform\n\nThe result? 50+ pieces of content from a single recording.\n\nThis isn't about replacing creativity — it's about removing the tedious parts so you can focus on what matters: connecting with your audience.\n\nWhat's your biggest time sink in content creation?`,
  },
};

export default function ContentPage() {
  const [activeType, setActiveType] = React.useState("instagram");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">AI Content Generator</h1>
          <p className="text-sm text-text-secondary">Generate platform-optimized content from your video</p>
        </div>
        <Button variant="gradient" size="sm" icon={<Sparkles className="w-4 h-4" />}>
          Regenerate All
        </Button>
      </div>

      {/* Content type selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CONTENT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`p-3 rounded-xl border text-center transition-all ${
              activeType === type.id
                ? "bg-purple/[0.08] border-purple/30"
                : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
            }`}
          >
            <type.icon
              className="w-5 h-5 mx-auto mb-2"
              style={{ color: activeType === type.id ? type.color : undefined }}
            />
            <span className="text-2xs font-medium text-text-secondary">{type.label}</span>
          </button>
        ))}
      </div>

      {/* Generated content display */}
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
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] min-h-[300px]">
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {GENERATED_CONTENT[activeType as keyof typeof GENERATED_CONTENT]?.content ||
                "Select a content type and click Generate to create AI-powered content from your video."}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="secondary" size="sm">Edit</Button>
            <Button variant="secondary" size="sm" icon={<Sparkles className="w-3 h-3" />}>Regenerate</Button>
            <Button variant="primary" size="sm">Use This</Button>
          </div>
        </GlassCard>

        {/* Settings & options */}
        <div className="space-y-4">
          <GlassCard padding="md" tilt={false} hover={false}>
            <h3 className="text-sm font-semibold text-white mb-3">Tone & Style</h3>
            <div className="flex flex-wrap gap-2">
              {["Professional", "Casual", "Humorous", "Educational", "Inspirational", "Promotional"].map((tone) => (
                <span
                  key={tone}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-text-secondary hover:border-purple/30 hover:text-white cursor-pointer transition-all"
                >
                  {tone}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard padding="md" tilt={false} hover={false}>
            <h3 className="text-sm font-semibold text-white mb-3">Customization</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-text-muted block mb-1">Max Length</label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  defaultValue="280"
                  className="w-full accent-purple"
                />
                <div className="flex justify-between text-2xs text-text-muted">
                  <span>Short</span>
                  <span>280 chars</span>
                  <span>Long</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">Include</label>
                <div className="flex flex-wrap gap-2">
                  {["Emojis", "Hashtags", "CTA", "Stats"].map((opt) => (
                    <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-3 h-3 rounded accent-purple" />
                      <span className="text-xs text-text-secondary">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard padding="md" tilt={false} hover={false}>
            <h3 className="text-sm font-semibold text-white mb-3">AI Suggestions</h3>
            <div className="space-y-2">
              {["Add a question to boost engagement", "Include trending hashtag #AIContent", "Mention the video duration for context"].map((suggestion) => (
                <div key={suggestion} className="flex items-start gap-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.03)] cursor-pointer transition-colors">
                  <Sparkles className="w-3 h-3 text-yellow-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-text-secondary">{suggestion}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
