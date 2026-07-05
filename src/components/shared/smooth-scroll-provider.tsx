"use client";

import * as React from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

/**
 * Provider that enables Lenis smooth scrolling across the app.
 * Wrap page content with this to get the cinematic scroll experience.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}

export default SmoothScrollProvider;
