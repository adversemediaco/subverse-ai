"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Video, Globe, Clock, MoreHorizontal, Plus, Search, Filter, Trash2, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/use-projects";
import { useDeleteProject } from "@/hooks/use-actions";
import { formatDuration, formatFileSize } from "@/lib/utils";

/**
 * Projects Page — live project library via useProjects (demo data when the
 * DB/auth aren't configured). Supports search and delete.
 */

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useProjects();
  const del = useDeleteProject();
  const [query, setQuery] = React.useState("");
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const filtered = (projects ?? []).filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Projects</h1>
          <p className="text-sm text-text-secondary">
            {isLoading ? "Loading…" : `${filtered.length} videos`}
          </p>
        </div>
        <a href="/dashboard/upload">
          <Button variant="gradient" size="sm" icon={<Plus className="w-4 h-4" />}>New Project</Button>
        </a>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search projects..."
            className="w-full h-10 pl-10 pr-4 rounded-xl text-sm bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-white placeholder:text-text-muted focus:outline-none focus:border-purple/30"
          />
        </div>
        <Button variant="secondary" size="md" icon={<Filter className="w-4 h-4" />}>Filter</Button>
      </div>

      {/* States */}
      {isLoading && (
        <div className="flex items-center justify-center py-20 text-text-muted">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}
      {isError && (
        <GlassCard padding="lg" tilt={false} hover={false}>
          <p className="text-sm text-error text-center">Failed to load projects. Please try again.</p>
        </GlassCard>
      )}
      {!isLoading && !isError && filtered.length === 0 && (
        <GlassCard padding="lg" tilt={false} hover={false}>
          <div className="text-center py-10">
            <Video className="w-10 h-10 text-text-muted/40 mx-auto mb-3" />
            <p className="text-sm text-text-secondary">No projects yet.</p>
            <a href="/dashboard/upload" className="text-sm text-purple-glow hover:text-white mt-2 inline-block">
              Upload your first video →
            </a>
          </div>
        </GlassCard>
      )}

      {/* Grid */}
      {!isLoading && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <GlassCard padding="md" className="group cursor-pointer">
                <div className="aspect-video rounded-xl bg-surface-2 border border-[rgba(255,255,255,0.04)] mb-3 flex items-center justify-center relative overflow-hidden">
                  <Video className="w-8 h-8 text-text-muted/30" />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-2xs text-white font-mono">
                    {formatDuration(project.duration)}
                  </div>
                </div>

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
                        <Clock className="w-3 h-3" /> {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      className="text-text-muted hover:text-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === project.id ? null : project.id); }}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {openMenu === project.id && (
                      <div className="absolute right-0 top-6 z-10 w-32 rounded-xl glass-card p-1">
                        <button
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-error hover:bg-[rgba(255,255,255,0.04)] rounded-lg"
                          onClick={(e) => { e.stopPropagation(); del.mutate(project.id); setOpenMenu(null); }}
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${
                    project.status === "COMPLETE" ? "bg-green-500/10 text-green-400" : "bg-purple/10 text-purple-glow"
                  }`}>
                    {project.status === "COMPLETE" ? "Complete" : project.status.toLowerCase()}
                  </span>
                  <span className="text-2xs text-text-muted">{formatFileSize(project.fileSize)}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
