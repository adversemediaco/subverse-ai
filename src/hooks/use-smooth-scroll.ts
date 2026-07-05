"use client";

import { useEffect } from "react";

/**
 * Hook that initializes Lenis smooth scroll for a cinematic scroll experience.
 * Gracefully degrades if Lenis isn't available.
 *
 * Usage: call useSmoothScroll() once in a top-level client component.
 */
export function useSmoothScroll() {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let rafId: number;

    // Respect reduced motion preference for accessibility
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Dynamically import Lenis so SSR isn't affected
    import("lenis")
      .then(({ default: Lenis }) => {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        function raf(time: number) {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      })
      .catch(() => {
        // Lenis not installed — native scroll used as fallback
      });

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);
}
