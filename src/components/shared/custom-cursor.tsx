"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor with dot + ring that follows mouse position.
 * The ring has a spring lag behind the dot for fluid motion.
 * Expands on interactive elements.
 */

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ring follows with spring lag
  const ringX = useSpring(cursorX, { stiffness: 200, damping: 25 });
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 25 });

  const [isHovering, setIsHovering] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Only render on non-touch, fine-pointer devices
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setIsVisible(true);
    // Signal CSS that it's safe to hide the native cursor now.
    document.body.classList.add("cursor-ready");

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleElementEnter = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Add hover detection to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button'], [data-cursor-hover]"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementEnter);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementEnter);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
      document.body.classList.remove("cursor-ready");
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot - follows cursor exactly */}
      <motion.div
        className="cursor-dot"
        style={{
          left: cursorX,
          top: cursorY,
          scale: isHovering ? 1.5 : 1,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Ring - follows with spring lag */}
      <motion.div
        className="cursor-ring"
        style={{
          left: ringX,
          top: ringY,
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering
            ? "rgba(139, 92, 246, 0.7)"
            : "rgba(255, 255, 255, 0.4)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}

export default CustomCursor;
