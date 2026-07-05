"use client";

import * as React from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";

/**
 * Floating navigation bar with glass morphism.
 * Hides on scroll down, shows on scroll up.
 * Mobile hamburger menu with animated drawer.
 */

export function Navbar() {
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    lastScrollY.current = latest;

    if (direction === "down" && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl",
          "rounded-2xl px-4 sm:px-6 py-3",
          "transition-all duration-300",
          scrolled
            ? "glass shadow-glass-lg border border-[rgba(255,255,255,0.08)]"
            : "bg-transparent"
        )}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-blue flex items-center justify-center group-hover:shadow-glow-purple transition-shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-white hidden sm:inline">
              SubVerse AI
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-[rgba(255,255,255,0.04)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a href="/login" className="hidden sm:inline-block">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </a>
            <a href="/signup">
              <Button variant="primary" size="sm" magnetic>
                Get Started
              </Button>
            </a>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
          <div className="relative pt-24 px-6 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-lg font-medium text-text-secondary hover:text-white transition-colors rounded-xl hover:bg-[rgba(255,255,255,0.04)]"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <a href="/login">
                <Button variant="secondary" size="lg" fullWidth>
                  Log in
                </Button>
              </a>
              <a href="/signup">
                <Button variant="gradient" size="lg" fullWidth>
                  Get Started Free
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Navbar;
