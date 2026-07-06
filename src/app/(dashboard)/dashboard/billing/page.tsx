"use client";

import * as React from "react";
import { CreditCard, Check, Zap, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useBilling } from "@/hooks/use-actions";

/**
 * Billing Page — Current plan, usage, payment methods, invoices.
 * Plan actions launch a Stripe Checkout / Billing Portal session.
 */

export default function BillingPage() {
  const billing = useBilling();

  const upgrade = () =>
    billing.mutate({ action: "create-checkout", priceId: "price_pro" });
  const managePlan = () =>
    billing.mutate({ action: "manage-subscription" });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Billing & Plan</h1>
        <p className="text-sm text-text-secondary">Manage your subscription and payment methods.</p>
      </div>

      {/* Current Plan */}
      <GlassCard padding="lg" tilt={false} hover={false} className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple to-blue flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Pro Plan</h3>
                <Badge variant="gradient" size="sm">Active</Badge>
              </div>
              <p className="text-sm text-text-secondary">$29/month • Renews Aug 15, 2024</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={upgrade}
              loading={billing.isPending}
            >
              Change Plan
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-text-muted"
              onClick={managePlan}
              disabled={billing.isPending}
            >
              Manage
            </Button>
          </div>
        </div>

        {/* Usage */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Progress value={64} label="Videos (32/50)" showValue size="md" gradient="blue-purple" />
          </div>
          <div>
            <Progress value={42} label="Storage (4.2/10 GB)" showValue size="md" gradient="cyan-blue" />
          </div>
          <div>
            <Progress value={88} label="AI Credits (880/1000)" showValue size="md" gradient="green" />
          </div>
        </div>
      </GlassCard>

      {/* Payment Method */}
      <GlassCard padding="md" tilt={false} hover={false}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Payment Method</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={managePlan}
            icon={billing.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : undefined}
          >
            Manage
          </Button>
        </div>
        <div className="flex items-center gap-4 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
          <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-glow" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
            <p className="text-2xs text-text-muted">Visa • Expires 12/25</p>
          </div>
          <Badge variant="success" size="sm">Default</Badge>
        </div>
      </GlassCard>

      {/* Invoices */}
      <GlassCard padding="md" tilt={false} hover={false}>
        <h3 className="text-sm font-semibold text-white mb-4">Recent Invoices</h3>
        <div className="space-y-2">
          {[
            { date: "Jul 15, 2024", amount: "$29.00", status: "Paid" },
            { date: "Jun 15, 2024", amount: "$29.00", status: "Paid" },
            { date: "May 15, 2024", amount: "$29.00", status: "Paid" },
          ].map((invoice) => (
            <div key={invoice.date} className="flex items-center justify-between p-3 rounded-xl hover:bg-[rgba(255,255,255,0.02)] transition-colors">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm text-text-secondary">{invoice.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-white">{invoice.amount}</span>
                <Badge variant="success" size="sm">{invoice.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
