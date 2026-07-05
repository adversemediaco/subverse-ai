"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Video, Globe, Clock, MoreHorizontal, Plus, Search, Filter } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

/**
 * Projects Page — List all video projects with search and filter.
 */

const PROJECTS = [
  { id: 1, name: "Marketing Webinar Q4", duration: "1:24:36", languages: 5, status: "complete", date: "Jul 3, 2024", size: "2.4 GB" },
  { id: 2, name: "Product Demo v2.1", duration: "12:45", languages: 3, status: "processing", date: "Jul 3, 2024", size: "456 MB" },
  { id: 3, name: "Podcast Ep. 42", duration: "45:20", languages: 8, status: "complete", date: "Jul 2, 2024", size: "1.1 GB" },
  { id: 4, name: "Instagram Reels Pack", duration: "3:12", languages: 2, status: "complete", date: "Jul 1, 2024", size: "128 MB" },
  { id: 5, name: "Customer Testimonial", duration: "5:48", languages: 12, status: "complete", date: "Jun 30, 2024", size: "234 MB" },
  { id: 6, name: "Team Standup Recording", duration: "18:42", languages: 1, status: "complete", date: "Jun 29, 2024", size: "567 MB" },
  { id: 7, name: "Brand Campaign Video", duration: "2:30", languages: 15, status: "complete", date: "Jun 28, 2024", size: "890 MB" },
  { id: 8, name: "Tutorial Series Ep.1", duration: "32:15", languages: 6, status: "complete", date: "Jun 27, 2024", size: "1.8 GB" },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Projects</h1>
          <p className="text-sm text-text-secondary">{PROJECTS.length} videos processed</p>
        </div>
        <a href="/dashboard/upload">
          <Button variant="gradient" size="sm" icon={<Plus className="w-4 h-4" />}>
            New Project
          </Button>
        </a>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full h-10 pl-10 pr-4 rounded-xl text-sm bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-white placeholder:text-text-muted focus:outline-none focus:border-purple/30"
          />
        </div>
        <Button variant="secondary" size="md" icon={<Filter className="w-4 h-4" />}>
          Filter
        </Button>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <GlassCard padding="md" className="group cursor-pointer">
              {/* Thumbnail placeholder */}
              <div className="aspect-video rounded-xl bg-surface-2 border border-[rgba(255,255,255,0.04)] mb-3 flex items-center justify-center relative overflow-hidden">
                <Video className="w-8 h-8 text-text-muted/30" />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-2xs text-white font-mono">
                  {project.duration}
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-white truncate group-hover:text-purple-glow transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-2xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {project.languages} langs
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {project.date}
                    </span>
                  </div>
                </div>
                <button className="text-text-muted hover:text-white transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Status */}
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`text-2xs font-medium px-2 py-0.5 rounded-full ${
                    project.status === "complete"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-purple/10 text-purple-glow"
                  }`}
                >
                  {project.status === "complete" ? "Complete" : "Processing"}
                </span>
                <span className="text-2xs text-text-muted">{project.size}</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
