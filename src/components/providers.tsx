"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { isClerkEnabled } from "@/lib/config";

/**
 * App-wide client providers.
 *
 * - React Query: powers all client-side data fetching/caching.
 * - Clerk: wraps the tree ONLY when a publishable key is configured. In demo
 *   mode (no key) we skip ClerkProvider entirely, since instantiating it
 *   without a key throws. Importing the component is harmless — only rendering
 *   it without a key would error, and we guard that with `isClerkEnabled`.
 */

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  // Server: always a fresh client. Browser: reuse a singleton across renders.
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

// Dark theme applied to all Clerk-hosted UI components to match our design.
const clerkAppearance = {
  variables: {
    colorPrimary: "#8B5CF6",
    colorBackground: "#0A0A14",
    colorText: "#FFFFFF",
    colorTextSecondary: "#94A3B8",
    colorInputBackground: "rgba(255,255,255,0.04)",
    colorInputText: "#FFFFFF",
    borderRadius: "0.75rem",
  },
  elements: {
    card: "bg-transparent shadow-none",
    rootBox: "w-full",
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const tree = (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  if (isClerkEnabled) {
    return <ClerkProvider appearance={clerkAppearance}>{tree}</ClerkProvider>;
  }

  return tree;
}

export default Providers;
