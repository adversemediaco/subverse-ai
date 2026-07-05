"use client";

import * as React from "react";
import { User, Bell, Shield, Key } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Settings Page — Profile, notifications, security, preferences.
 */

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-sm text-text-secondary">Manage your account preferences.</p>
      </div>

      {/* Profile */}
      <GlassCard padding="lg" tilt={false} hover={false}>
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-purple-glow" />
          <h3 className="text-sm font-semibold text-white">Profile</h3>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple/30 to-blue/30 flex items-center justify-center text-xl font-bold text-white">
            JP
          </div>
          <div>
            <Button variant="secondary" size="sm">Change Avatar</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue="John Patel" />
          <Input label="Email" defaultValue="john@example.com" type="email" />
          <Input label="Company" defaultValue="Acme Inc" />
          <Input label="Role" defaultValue="Content Director" />
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="primary" size="sm">Save Changes</Button>
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard padding="lg" tilt={false} hover={false}>
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-cyan" />
          <h3 className="text-sm font-semibold text-white">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Processing complete", desc: "Get notified when your video is done processing" },
            { label: "Weekly digest", desc: "Summary of your content performance" },
            { label: "Product updates", desc: "New features and improvements" },
            { label: "Usage alerts", desc: "Approaching plan limits" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">{item.label}</p>
                <p className="text-2xs text-text-muted">{item.desc}</p>
              </div>
              <div className="w-9 h-5 rounded-full bg-purple/20 relative cursor-pointer">
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-purple-glow transition-all" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Security */}
      <GlassCard padding="lg" tilt={false} hover={false}>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-green-400" />
          <h3 className="text-sm font-semibold text-white">Security</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-3">
              <Key className="w-4 h-4 text-text-muted" />
              <div>
                <p className="text-sm text-white">Password</p>
                <p className="text-2xs text-text-muted">Last changed 30 days ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-text-muted" />
              <div>
                <p className="text-sm text-white">Two-Factor Authentication</p>
                <p className="text-2xs text-text-muted">Add extra security to your account</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Enable</Button>
          </div>
        </div>
      </GlassCard>

      {/* Danger Zone */}
      <GlassCard padding="lg" tilt={false} hover={false} className="border-red-500/20">
        <h3 className="text-sm font-semibold text-red-400 mb-3">Danger Zone</h3>
        <p className="text-sm text-text-muted mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button variant="danger" size="sm">Delete Account</Button>
      </GlassCard>
    </div>
  );
}
