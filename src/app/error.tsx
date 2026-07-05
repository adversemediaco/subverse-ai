"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

/**
 * Global error boundary UI.
 * Catches runtime errors in the route segment and offers a recovery action.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, log to an error reporting service (Sentry, etc.)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 mesh-gradient">
      <div className="relative z-10 text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-text-secondary mb-8">
          We hit an unexpected error. Our team has been notified. You can try again below.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-gradient-to-r from-blue-electric to-purple text-white font-medium hover:shadow-glow-blue transition-shadow"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
