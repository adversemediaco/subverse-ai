import { Sparkles } from "lucide-react";

/**
 * Global loading UI — shown during route transitions and Suspense boundaries.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Pulsing glow */}
          <div className="absolute inset-0 rounded-2xl bg-purple/30 blur-xl animate-pulse-glow" />
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple to-blue flex items-center justify-center animate-float">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-glow ai-processing-dot" />
          <span className="w-2 h-2 rounded-full bg-blue-glow ai-processing-dot" />
          <span className="w-2 h-2 rounded-full bg-cyan ai-processing-dot" />
        </div>
      </div>
    </div>
  );
}
