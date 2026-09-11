"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Twitter, Mail, Code2, Heart } from "lucide-react";
import { ProfileData } from "@/lib/seedData";

interface FooterProps {
  profile: ProfileData;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const name = profile?.name || "Purnendu Dutta";

  return (
    <footer className="border-t border-surface-border bg-surface-bg py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <Link
              href="#hero"
              className="flex items-center gap-2 group font-mono text-base font-bold text-surface-text hover:text-accent transition-colors"
            >
              <Code2 className="w-4 h-4 text-accent" />
              <span>{name.toUpperCase()}</span>
            </Link>
            <p className="text-xs text-surface-muted">
              © {new Date().getFullYear()} {name}. All rights reserved.
            </p>
          </div>

          {/* Tech Stack attribution */}
          <div className="flex items-center gap-1.5 text-xs text-surface-subtle font-mono">
            <span>Built with</span>
            <span className="text-surface-text font-medium">Next.js</span>
            <span>•</span>
            <span className="text-surface-text font-medium">TypeScript</span>
            <span>•</span>
            <span className="text-surface-text font-medium">Tailwind</span>
            <span>•</span>
            <span className="text-surface-text font-medium">MongoDB</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-xl border border-surface-border bg-surface-card hover:border-accent text-surface-muted hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-xl border border-surface-border bg-surface-card hover:border-accent text-surface-muted hover:text-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2 rounded-xl border border-surface-border bg-surface-card hover:border-accent text-surface-muted hover:text-accent transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent text-surface-muted hover:text-accent transition-all duration-300 group shadow-sm"
            >
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
