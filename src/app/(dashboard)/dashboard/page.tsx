"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, Video, Globe, Sparkles, TrendingUp, Clock, ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProjects } from "@/hooks/use-projects";
import { formatDuration } from "@/lib/utils";

/**
 * Dashboard Home — Overview with stats, recent projects, and quick actions.
 * Recent projects are pulled live via useProjects (demo data when unconfigured).
 */

const STATS = [
  { label: "Videos Processed", value: "127", change: "+12 this week", icon: Video, color: "#3B82F6" },
  { label: "Languages Used", value: "24", change: "+3 new", icon: Globe, color: "#8B5CF6" },
  { label: "AI Content Pieces", value: "892", change: "+156 this month", icon: Sparkles, color: "#06B6D4" },
  { label: "Time Saved", value: "340h", change: "This quarter", icon: Clock, color: "#10B981" },
];

export default function DashboardPage() {
  const { data: projects } = useProjects();
  const recent = (projects ?? []).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, John</h1>
          <p className="text-sm text-text-secondary mt-1">Here&apos;s what&apos;s happening with your content.</p>
        </div>
        <a href="/dashboard/upload">
          <Button variant="gradient" size="md" icon={<Upload className="w-4 h-4" />}>
            Upload Video
          </Button>
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <GlassCard padding="md" tilt={false} hover={false}>
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="flex items-center gap-1 text-2xs text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Usage & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage */}
        <GlassCard padding="lg" tilt={false} hover={false}>
          <h3 className="text-sm font-semibold text-white mb-4">Monthly Usage</h3>
          <div className="space-y-4">
            <Progress value={64} label="Videos" showValue size="md" gradient="blue-purple" />
            <Progress value={42} label="Storage" showValue size="md" gradient="cyan-blue" />
            <Progress value={88} label="AI Credits" showValue size="md" gradient="green" />
          </div>
          <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">32/50 videos used</span>
              <a href="/dashboard/billing" className="text-purple-glow hover:text-white transition-colors">
                Upgrade →
              </a>
            </div>
          </div>
        </GlassCard>

        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <GlassCard padding="lg" tilt={false} hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Recent Projects</h3>
              <a href="/dashboard/projects" className="text-xs text-purple-glow hover:text-white transition-colors">
                View all
              </a>
            </div>
            <div className="space-y-3">
              {recent.length === 0 && (
                <p className="text-sm text-text-muted py-6 text-center">No projects yet — upload your first video.</p>
              )}
              {recent.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors group cursor-pointer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4 text-text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{project.name}</p>
                    <p className="text-2xs text-text-muted">
                      {formatDuration(project.duration)} • {project.languages} languages
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-2xs font-medium px-2 py-0.5 rounded-full ${
                        project.status === "COMPLETE"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-purple/10 text-purple-glow"
                      }`}
                    >
                      {project.status === "COMPLETE" ? "Complete" : "Processing"}
                    </span>
                    <span className="text-2xs text-text-muted hidden sm:inline">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
