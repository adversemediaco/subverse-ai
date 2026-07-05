"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs } from "@/components/ui/tabs";

/**
 * Subtitle Showcase Section
 * Shows before/after and different caption styles:
 * TikTok, YouTube, Podcast, Instagram — each with live animation.
 */

const STYLE_TABS = [
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "podcast", label: "Podcast" },
  { id: "instagram", label: "Instagram" },
];

const CAPTION_CONTENT = {
  tiktok: {
    words: ["This", "is", "how", "AI", "creates", "perfect", "captions", "instantly"],
    style: "bold center animated",
  },
  youtube: {
    text: "SubVerse AI automatically generates perfectly timed subtitles for your YouTube videos with support for 100+ languages.",
    style: "bottom white bg",
  },
  podcast: {
    speakers: [
      { name: "Host", text: "So how does the AI actually work?", color: "#60A5FA" },
      { name: "Guest", text: "It uses a transformer-based architecture trained on millions of hours of audio.", color: "#A78BFA" },
    ],
    style: "labeled",
  },
  instagram: {
    words: ["Making", "content", "creation", "effortless", "✨"],
    style: "gradient animated pop",
  },
};

export function SubtitleShowcaseSection() {
  const [activeTab, setActiveTab] = React.useState("tiktok");

  return (
    <section className="relative section-padding">
      <div className="container-wide">
        <SectionHeading
          badge="Caption Styles"
          title="Every Style, Every Platform"
          titleGradient="Every Platform"
          subtitle="From TikTok word-by-word animations to Netflix-quality subtitles. Choose from 20+ styles or create your own."
        />

        {/* Style Tabs */}
        <div className="flex justify-center mt-12">
          <Tabs tabs={STYLE_TABS} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Preview Area */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-surface">
            {/* Simulated video background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a14] via-[#0f0f1a] to-[#04040b]">
              {/* Fake content area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple/20 to-blue/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple/30 to-blue/30" />
                </div>
              </div>
            </div>

            {/* Caption Overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="absolute inset-0 flex items-end justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "tiktok" && <TikTokCaption />}
                {activeTab === "youtube" && <YouTubeCaption />}
                {activeTab === "podcast" && <PodcastCaption />}
                {activeTab === "instagram" && <InstagramCaption />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function TikTokCaption() {
  const words = CAPTION_CONTENT.tiktok.words;
  return (
    <div className="absolute inset-0 flex items-center justify-center px-8">
      <div className="text-center">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block text-2xl sm:text-4xl font-black text-white mx-1"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.3,
              ease: [0.175, 0.885, 0.32, 1.275],
            }}
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.8), 0 0 30px rgba(139,92,246,0.3)",
            }}
          >
            {word === "AI" ? (
              <span className="text-gradient">{word}</span>
            ) : (
              word
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function YouTubeCaption() {
  return (
    <div className="w-full p-6">
      <motion.div
        className="bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 max-w-lg mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-sm sm:text-base text-white text-center leading-relaxed">
          {CAPTION_CONTENT.youtube.text}
        </p>
      </motion.div>
    </div>
  );
}

function PodcastCaption() {
  return (
    <div className="absolute inset-0 flex flex-col items-start justify-end p-6 gap-3">
      {CAPTION_CONTENT.podcast.speakers.map((speaker, i) => (
        <motion.div
          key={i}
          className="flex items-start gap-3 max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.5, duration: 0.4 }}
        >
          <span
            className="text-xs font-bold uppercase tracking-wider shrink-0 mt-0.5"
            style={{ color: speaker.color }}
          >
            {speaker.name}:
          </span>
          <span className="text-sm text-white/90">{speaker.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

function InstagramCaption() {
  const words = CAPTION_CONTENT.instagram.words;
  return (
    <div className="absolute inset-0 flex items-center justify-center px-8">
      <div className="text-center">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block text-xl sm:text-3xl font-bold mx-1"
            initial={{ opacity: 0, y: 30, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: i * 0.12,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              background: `linear-gradient(135deg, #A78BFA ${i * 10}%, #EC4899 ${50 + i * 10}%, #F59E0B 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default SubtitleShowcaseSection;
