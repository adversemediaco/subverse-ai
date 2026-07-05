"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Users, DollarSign, Video, TrendingUp, TrendingDown, Server,
  Activity, AlertTriangle, MoreHorizontal, Search, Shield, Cpu, HardDrive
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Progress } from "@/components/ui/progress";

/**
 * Admin Dashboard — Platform-wide analytics, user management,
 * revenue tracking, system health, and content moderation.
 * Restricted to users with ADMIN role.
 */

const ADMIN_STATS = [
  { label: "Total Users", value: 48293, change: 12.4, up: true, icon: Users, color: "#3B82F6", prefix: "", suffix: "" },
  { label: "MRR", value: 284500, change: 8.2, up: true, icon: DollarSign, color: "#10B981", prefix: "$", suffix: "" },
  { label: "Videos Processed", value: 1284392, change: 23.1, up: true, icon: Video, color: "#8B5CF6", prefix: "", suffix: "" },
  { label: "Churn Rate", value: 2.3, change: 0.4, up: false, icon: Activity, color: "#F59E0B", prefix: "", suffix: "%" },
];

const RECENT_USERS = [
  { name: "Emma Watson", email: "emma@studio.com", plan: "Enterprise", status: "active", joined: "2 min ago", spend: "$99" },
  { name: "Raj Malhotra", email: "raj@creators.in", plan: "Pro", status: "active", joined: "18 min ago", spend: "$29" },
  { name: "Chen Wei", email: "chen@media.cn", plan: "Pro", status: "active", joined: "1 hour ago", spend: "$29" },
  { name: "Sofia Garcia", email: "sofia@films.es", plan: "Free", status: "trial", joined: "2 hours ago", spend: "$0" },
  { name: "James Miller", email: "james@agency.co", plan: "Enterprise", status: "active", joined: "3 hours ago", spend: "$99" },
];

const REVENUE_BARS = [45, 52, 48, 61, 58, 72, 68, 75, 82, 79, 91, 95];
const SYSTEM_HEALTH = [
  { label: "API Servers", value: 42, status: "healthy", icon: Server },
  { label: "GPU Cluster", value: 78, status: "high", icon: Cpu },
  { label: "Storage (R2)", value: 34, status: "healthy", icon: HardDrive },
];

const MODERATION_QUEUE = [
  { type: "Flagged Content", count: 3, severity: "high" },
  { type: "Copyright Claims", count: 7, severity: "medium" },
  { type: "Failed Jobs", count: 12, severity: "low" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/20">
            <Shield className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <Badge variant="error" size="sm">Restricted</Badge>
            </div>
            <p className="text-sm text-text-secondary">Platform-wide overview and controls</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">Export Report</Button>
          <Button variant="primary" size="sm">System Settings</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ADMIN_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard padding="md" tilt={false} hover={false}>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className={`flex items-center gap-1 text-2xs ${stat.up ? "text-green-400" : "text-red-400"}`}>
                  {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{stat.change}%</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-white">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.suffix === "%" ? 1 : 0}
                  />
                </p>
                <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <GlassCard padding="lg" tilt={false} hover={false}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold text-white">Revenue Growth</h3>
                <p className="text-2xs text-text-muted">Last 12 months</p>
              </div>
              <Badge variant="success" size="sm">+34% YoY</Badge>
            </div>
            {/* Bar chart */}
            <div className="flex items-end justify-between gap-2 h-48">
              {REVENUE_BARS.map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-purple/40 to-blue/60 relative group"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-2xs text-white whitespace-nowrap">
                    ${(height * 3).toFixed(0)}k
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-2xs text-text-muted">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* System Health */}
        <GlassCard padding="lg" tilt={false} hover={false}>
          <h3 className="text-sm font-semibold text-white mb-4">System Health</h3>
          <div className="space-y-4">
            {SYSTEM_HEALTH.map((system) => (
              <div key={system.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <system.icon className="w-4 h-4 text-text-muted" />
                    <span className="text-xs text-text-secondary">{system.label}</span>
                  </div>
                  <span className={`text-2xs font-medium ${system.status === "high" ? "text-orange-400" : "text-green-400"}`}>
                    {system.value}%
                  </span>
                </div>
                <Progress
                  value={system.value}
                  size="sm"
                  gradient={system.status === "high" ? "orange" : "green"}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-text-secondary">All systems operational</span>
            </div>
            <p className="text-2xs text-text-muted mt-1">99.98% uptime this month</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="lg:col-span-2">
          <GlassCard padding="lg" tilt={false} hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Recent Signups</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="h-8 pl-8 pr-3 rounded-lg text-xs bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-white placeholder:text-text-muted focus:outline-none focus:border-purple/30 w-40"
                />
              </div>
            </div>
            <div className="space-y-1">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-2 px-3 py-2 text-2xs uppercase tracking-wider text-text-muted">
                <div className="col-span-5">User</div>
                <div className="col-span-3">Plan</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">MRR</div>
              </div>
              {RECENT_USERS.map((user, i) => (
                <motion.div
                  key={user.email}
                  className="grid grid-cols-12 gap-2 px-3 py-2.5 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="col-span-5 flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple/30 to-blue/30 flex items-center justify-center text-2xs font-bold text-white shrink-0">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white truncate">{user.name}</p>
                      <p className="text-2xs text-text-muted truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <span className={`text-2xs px-2 py-0.5 rounded-full ${
                      user.plan === "Enterprise" ? "bg-purple/10 text-purple-glow"
                      : user.plan === "Pro" ? "bg-blue/10 text-blue-glow"
                      : "bg-[rgba(255,255,255,0.04)] text-text-muted"
                    }`}>
                      {user.plan}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-2xs ${user.status === "active" ? "text-green-400" : "text-yellow-400"}`}>
                      ● {user.status}
                    </span>
                  </div>
                  <div className="col-span-2 text-right text-xs font-medium text-white">{user.spend}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Moderation Queue */}
        <GlassCard padding="lg" tilt={false} hover={false}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-semibold text-white">Moderation Queue</h3>
          </div>
          <div className="space-y-3">
            {MODERATION_QUEUE.map((item) => (
              <div
                key={item.type}
                className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.severity === "high" ? "bg-red-400"
                    : item.severity === "medium" ? "bg-orange-400"
                    : "bg-yellow-400"
                  }`} />
                  <span className="text-xs text-text-secondary">{item.type}</span>
                </div>
                <span className="text-sm font-bold text-white">{item.count}</span>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" fullWidth className="mt-4">
            Review All
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}
