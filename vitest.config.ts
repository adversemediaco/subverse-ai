import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Vitest configuration.
 * Tests target pure, framework-agnostic logic (subtitle converters, utils),
 * so we use the default Node environment — fast and dependency-light.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
