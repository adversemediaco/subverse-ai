import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict build: TypeScript type errors and ESLint errors will fail the build.
  // Pedantic style rules (unused vars, unescaped entities) are configured as
  // warnings in .eslintrc.json so they surface in `npm run lint` without
  // blocking deploys.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "pub-*.r2.dev" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
