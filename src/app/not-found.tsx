import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

/**
 * 404 Not Found page with on-brand styling.
 */
export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 mesh-gradient overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple to-blue flex items-center justify-center animate-float">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-8xl font-bold text-gradient mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-text-secondary max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to another dimension.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-gradient-to-r from-blue-electric to-purple text-white font-medium hover:shadow-glow-blue transition-shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
