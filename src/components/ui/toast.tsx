"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Lightweight toast system (no external dependency).
 * Provides a ToastProvider (mounted once) and a useToast() hook for imperative
 * notifications with success/error/info/loading variants.
 */

type ToastVariant = "success" | "error" | "info" | "loading";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toast: (t: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    // No provider (e.g. during SSR or in isolation) — return no-ops so callers
    // never crash.
    return {
      toast: () => "",
      dismiss: () => {},
    } as ToastContextValue;
  }
  return ctx;
}

const variantConfig: Record<
  ToastVariant,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  success: { icon: CheckCircle2, color: "#10B981" },
  error: { icon: AlertCircle, color: "#EF4444" },
  info: { icon: Info, color: "#3B82F6" },
  loading: { icon: Loader2, color: "#8B5CF6" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (t: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      const duration = t.duration ?? (t.variant === "loading" ? 0 : 4000);
      setToasts((prev) => [...prev, { ...t, id }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Toast viewport */}
      <div className="fixed bottom-4 right-4 z-[500] flex flex-col gap-2 w-[360px] max-w-[calc(100vw-2rem)] pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const { icon: Icon, color } = variantConfig[t.variant];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="pointer-events-auto glass-card rounded-2xl p-4 flex items-start gap-3 shadow-glass-lg"
              >
                <Icon
                  className={cn("w-5 h-5 shrink-0 mt-0.5", t.variant === "loading" && "animate-spin")}
                  style={{ color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{t.title}</p>
                  {t.description && (
                    <p className="text-xs text-text-secondary mt-0.5">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-text-muted hover:text-white transition-colors shrink-0"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
