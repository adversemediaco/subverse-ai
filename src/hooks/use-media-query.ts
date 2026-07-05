"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect media query matches (responsive breakpoints).
 * @param query CSS media query string, e.g. "(min-width: 768px)"
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

/** Convenience hooks for common breakpoints (Tailwind defaults). */
export const useIsMobile = () => !useMediaQuery("(min-width: 768px)");
export const useIsTablet = () => useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
