"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Twitter, Github, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Footer with animated gradient divider, newsletter signup, and social links.
 */

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Demo", href: "#demo" },
    { label: "Changelog", href: "#" },
    { label: "API", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Tutorials", href: "#" },
    { label: "Community", href: "#" },
    { label: "Status", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Press", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

const SOCIALS = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative">
      {/* Animated gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent" />

      {/* Newsletter CTA */}
      <div className="container-wide py-16">
        <motion.div
          className="relative rounded-3xl p-8 lg:p-12 overflow-hidden border border-[rgba(255,255,255,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple/[0.08] via-transparent to-blue/[0.05]" />
          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-purple/10 blur-[100px] rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Ready to Transform Your Content?
              </h3>
              <p className="text-text-secondary">
                Join 10,000+ creators using AI to scale their video content.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                placeholder="Enter your email"
                className="sm:w-72"
              />
              <Button
                variant="gradient"
                size="lg"
                magnetic
                icon={<Sparkles className="w-4 h-4" />}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer links */}
      <div className="container-wide pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-blue flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">SubVerse AI</span>
            </div>
            <p className="text-sm text-text-muted mb-4 max-w-xs">
              Turn any video into content for every platform. AI-powered subtitles, translations, and content generation.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] hover:border-purple/30 hover:bg-purple/[0.05] transition-all text-text-muted hover:text-white"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-3">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-muted hover:text-white transition-colors animated-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © 2024 SubVerse AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-text-muted">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
