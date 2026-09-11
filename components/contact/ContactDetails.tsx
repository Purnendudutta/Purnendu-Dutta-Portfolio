"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowRight, ShieldAlert, Sparkles, Settings } from "lucide-react";
import { ProfileData } from "@/lib/seedData";

interface ContactDetailsProps {
  profile: ProfileData;
}

export default function ContactDetails({ profile }: ContactDetailsProps) {
  const email = profile?.socialLinks?.find((s) => s.platform.toLowerCase() === "email")?.url.replace("mailto:", "") || "purnendu.dutta@example.com";

  return (
    <div className="p-8 sm:p-10 rounded-3xl glass-card border border-surface-border flex flex-col justify-between space-y-8 shadow-xl">
      {/* Top Details */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-surface-text">
            Contact Details
          </h3>
          <p className="text-sm text-surface-muted mt-1.5">
            Always open to discussing new engineering challenges, AI integrations, or speaking engagements.
          </p>
        </div>

        {/* Contact Info Items */}
        <div className="space-y-4">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-4 p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-accent group transition-all"
          >
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent group-hover:shadow-[0_0_12px_var(--primary-glow)] transition-all shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-mono text-surface-subtle">Email</div>
              <div className="text-sm font-semibold text-surface-text group-hover:text-accent transition-colors truncate">
                {email}
              </div>
            </div>
          </a>

          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-surface-card border border-surface-border">
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-mono text-surface-subtle">Location</div>
              <div className="text-sm font-semibold text-surface-text truncate">
                San Francisco, CA / Open to Remote
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Matrix */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-mono uppercase tracking-wider text-surface-subtle font-semibold">
            Social Channels
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-card border border-surface-border hover:border-accent text-xs font-medium text-surface-text hover:text-accent transition-all"
            >
              <Github className="w-4 h-4 text-accent" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-card border border-surface-border hover:border-accent text-xs font-medium text-surface-text hover:text-accent transition-all"
            >
              <Linkedin className="w-4 h-4 text-accent" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-card border border-surface-border hover:border-accent text-xs font-medium text-surface-text hover:text-accent transition-all"
            >
              <Twitter className="w-4 h-4 text-accent" />
              <span>Twitter/X</span>
            </a>
          </div>
        </div>
      </div>

      {/* Admin Panel Gateway Button - ONLY PUBLIC LINK */}
      <div className="pt-6 border-t border-surface-border">
        <Link
          href="/admin/login"
          className="group flex items-center justify-between p-4 rounded-2xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent text-surface-muted hover:text-surface-text transition-all duration-300 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-surface-bg border border-surface-border text-surface-subtle group-hover:text-accent group-hover:border-accent transition-all">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-surface-text group-hover:text-accent transition-colors">
                Admin Panel
              </div>
              <div className="text-[11px] font-mono text-surface-subtle">
                Content Management System
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-surface-subtle group-hover:text-accent group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}
