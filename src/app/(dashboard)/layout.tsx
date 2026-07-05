"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Upload, FolderOpen, Captions, Globe,
  Sparkles, Download, CreditCard, Settings, LogOut, Menu, X, Bell, Search, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Dashboard Layout — Sidebar + top bar + content area.
 * Responsive: sidebar collapses to drawer on mobile.
 */

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload", href: "/dashboard/upload", icon: Upload },
  { label: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { label: "Subtitles", href: "/dashboard/subtitles", icon: Captions },
  { label: "Translations", href: "/dashboard/translations", icon: Globe },
  { label: "AI Content", href: "/dashboard/content", icon: Sparkles },
  { label: "Export", href: "/dashboard/export", icon: Download },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Admin", href: "/admin", icon: Shield },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("/dashboard");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[rgba(255,255,255,0.06)] bg-surface/50 backdrop-blur-xl">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-[rgba(255,255,255,0.06)]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-blue flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold text-white">SubVerse AI</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = activeItem === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); setActiveItem(item.href); }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-purple/10 text-white border border-purple/20"
                    : "text-text-secondary hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive && "text-purple-glow")} />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Bottom user section */}
        <div className="p-3 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple/30 to-blue/30 flex items-center justify-center text-xs font-bold text-white">
              JP
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Patel</p>
              <p className="text-2xs text-text-muted truncate">Pro Plan</p>
            </div>
            <button className="text-text-muted hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <motion.aside
            className="absolute left-0 top-0 bottom-0 w-64 bg-surface border-r border-[rgba(255,255,255,0.06)]"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="h-16 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-blue flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">SubVerse AI</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {SIDEBAR_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); setActiveItem(item.href); setSidebarOpen(false); }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    activeItem === item.href
                      ? "bg-purple/10 text-white border border-purple/20"
                      : "text-text-secondary hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.aside>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 flex items-center gap-4 px-4 lg:px-6 border-b border-[rgba(255,255,255,0.06)] bg-surface/30 backdrop-blur-xl sticky top-0 z-30">
          <button
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-4 h-4 text-white" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search projects, subtitles..."
                className="w-full h-9 pl-10 pr-4 rounded-xl text-sm bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-white placeholder:text-text-muted focus:outline-none focus:border-purple/30"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.06)] transition-colors">
              <Bell className="w-4 h-4 text-text-secondary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-glow" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple/30 to-blue/30 flex items-center justify-center text-xs font-bold text-white lg:hidden">
              JP
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
