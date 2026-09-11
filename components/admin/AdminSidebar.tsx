"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  User,
  Layers,
  FolderGit2,
  Award,
  Briefcase,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  Code2,
} from "lucide-react";
import { useToast } from "@/lib/context/ToastContext";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const ADMIN_NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Hero & Roles", href: "/admin/hero", icon: Sparkles },
  { name: "About Me", href: "/admin/about", icon: User },
  { name: "Skills", href: "/admin/skills", icon: Layers },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Contact & Inbox", href: "/admin/contact", icon: Mail },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      showToast("Logged out successfully", "info");
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      router.push("/admin/login");
    }
  };

  return (
    <aside className="w-64 h-full flex flex-col justify-between border-r border-surface-border bg-surface-bg/95 backdrop-blur-2xl p-4 sm:p-5 select-none">
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-accent/15 border border-accent/30 text-accent shadow-[0_0_15px_var(--primary-glow)]">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-sm font-bold text-surface-text tracking-tight flex items-center gap-1.5">
              <span>ADMIN CMS</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-accent/20 text-accent uppercase font-bold">
                PRO
              </span>
            </div>
            <div className="text-[11px] text-surface-muted">Portfolio Manager</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-accent text-white shadow-[0_0_15px_var(--primary-glow)] font-semibold"
                    : "text-surface-muted hover:bg-surface-card-hover hover:text-surface-text"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2 pt-4 border-t border-surface-border">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-surface-muted hover:text-surface-text hover:bg-surface-card-hover transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-accent" />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] font-mono text-surface-subtle">↗</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
