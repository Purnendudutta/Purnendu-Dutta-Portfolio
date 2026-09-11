"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ExternalLink, ShieldCheck } from "lucide-react";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import AccentSwitcher from "@/components/navbar/AccentSwitcher";
import AdminSidebar from "./AdminSidebar";
import { motion, AnimatePresence } from "framer-motion";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-bg/85 backdrop-blur-xl">
        {/* Left Title & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
            className="lg:hidden p-2 rounded-xl border border-surface-border bg-surface-card text-surface-text"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-surface-text tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-surface-muted hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right Switchers & Badges */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-accent/20 bg-accent/10 text-accent text-xs font-mono font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authenticated</span>
          </div>

          <ThemeToggle />
          <AccentSwitcher />

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent text-xs font-semibold text-surface-text transition-all"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-accent" />
          </Link>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-64 h-full"
            >
              <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
