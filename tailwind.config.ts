import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        background: "#04040B",
        surface: "#0A0A14",
        "surface-2": "#0F0F1A",
        border: "rgba(255,255,255,0.08)",
        "border-bright": "rgba(255,255,255,0.16)",

        // Accent Colors
        blue: {
          DEFAULT: "#3B82F6",
          electric: "#2563EB",
          glow: "#60A5FA",
          subtle: "rgba(59,130,246,0.15)",
        },
        purple: {
          DEFAULT: "#8B5CF6",
          neon: "#7C3AED",
          glow: "#A78BFA",
          subtle: "rgba(139,92,246,0.15)",
        },
        cyan: {
          DEFAULT: "#06B6D4",
          bright: "#22D3EE",
          subtle: "rgba(6,182,212,0.15)",
        },
        violet: {
          DEFAULT: "#6D28D9",
          bright: "#7C3AED",
          subtle: "rgba(109,40,217,0.15)",
        },

        // Text
        text: {
          primary: "#FFFFFF",
          secondary: "#94A3B8",
          muted: "#475569",
        },

        // Status
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },

      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        display: ["var(--font-cal)", ...fontFamily.sans],
        mono: ["var(--font-jetbrains)", ...fontFamily.mono],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        "glow-blue": "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
        "glow-purple": "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
        "glow-cyan": "radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)",
        "hero-gradient": "radial-gradient(ellipse at center top, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
        "text-gradient-blue-purple": "linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F0ABFC 100%)",
        "text-gradient-cyan-blue": "linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)",
      },

      boxShadow: {
        glass: "0 4px 24px -1px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-lg": "0 8px 40px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glow-blue": "0 0 24px rgba(59,130,246,0.5), 0 0 48px rgba(59,130,246,0.2)",
        "glow-purple": "0 0 24px rgba(139,92,246,0.5), 0 0 48px rgba(139,92,246,0.2)",
        "glow-cyan": "0 0 24px rgba(6,182,212,0.5), 0 0 48px rgba(6,182,212,0.2)",
        "card-hover": "0 20px 60px -10px rgba(0,0,0,0.7)",
        inner: "inset 0 2px 4px rgba(0,0,0,0.3)",
      },

      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "aurora": "aurora 15s ease infinite",
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.4s ease-out",
        "count-up": "count-up 2s ease-out forwards",
        "orbit": "orbit 20s linear infinite",
        "orbit-reverse": "orbit 20s linear infinite reverse",
        "border-beam": "border-beam 4s linear infinite",
        "grid-fade": "grid-fade 8s ease-in-out infinite",
        "typing": "typing 3s steps(40, end)",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", filter: "blur(20px)" },
          "50%": { opacity: "1", filter: "blur(30px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(200px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(200px) rotate(-360deg)" },
        },
        "border-beam": {
          "0%": { offsetDistance: "0%" },
          "100%": { offsetDistance: "100%" },
        },
        "grid-fade": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },

      backdropBlur: {
        xs: "2px",
      },

      transitionTimingFunction: {
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
