import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Award,
  Layers,
  Briefcase,
  Mail,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Certificate from "@/models/Certificate";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Message from "@/models/Message";
import { fallbackStore } from "@/lib/dataStore";

export const dynamic = "force-dynamic";

async function getDashboardStats() {
  try {
    const db = await connectDB();
    if (db) {
      const [projCount, certCount, skillCount, expCount, msgCount, recentMsgs] =
        await Promise.all([
          Project.countDocuments(),
          Certificate.countDocuments(),
          Skill.countDocuments(),
          Experience.countDocuments(),
          Message.countDocuments(),
          Message.find().sort({ createdAt: -1 }).limit(3).lean(),
        ]);

      return {
        projects: projCount || fallbackStore.projects.length,
        certificates: certCount || fallbackStore.certificates.length,
        skills: skillCount || fallbackStore.skills.length,
        experience: expCount || fallbackStore.experience.length,
        messages: msgCount || fallbackStore.messages.length,
        recentMessages: recentMsgs && recentMsgs.length > 0
          ? JSON.parse(JSON.stringify(recentMsgs))
          : fallbackStore.messages.slice(0, 3),
      };
    }
  } catch (e) {}

  return {
    projects: fallbackStore.projects.length,
    certificates: fallbackStore.certificates.length,
    skills: fallbackStore.skills.length,
    experience: fallbackStore.experience.length,
    messages: fallbackStore.messages.length,
    recentMessages: fallbackStore.messages.slice(0, 3),
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const metrics = [
    {
      title: "Featured Projects",
      value: stats.projects < 10 ? `0${stats.projects}` : `${stats.projects}`,
      icon: FolderGit2,
      href: "/admin/projects",
      badge: "Live Projects",
    },
    {
      title: "Certifications",
      value: stats.certificates < 10 ? `0${stats.certificates}` : `${stats.certificates}`,
      icon: Award,
      href: "/admin/certificates",
      badge: "Verified",
    },
    {
      title: "Active Skills",
      value: stats.skills < 10 ? `0${stats.skills}` : `${stats.skills}`,
      icon: Layers,
      href: "/admin/skills",
      badge: "Categories",
    },
    {
      title: "Experience Roles",
      value: stats.experience < 10 ? `0${stats.experience}` : `${stats.experience}`,
      icon: Briefcase,
      href: "/admin/experience",
      badge: "Timeline",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Portfolio CMS Overview"
        subtitle="Real-time control center for your developer portfolio"
      />

      <main className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* Welcome Banner */}
        <div className="p-8 rounded-3xl glass-panel border border-surface-border relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[90px] pointer-events-none -z-10" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live CMS Connected</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-text tracking-tight">
                Welcome to your Portfolio Dashboard
              </h2>
              <p className="text-sm text-surface-muted max-w-xl">
                Edit hero roles, upload project showcases, manage certifications, update skills, and view inbound contact submissions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/hero"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-xs font-semibold shadow-[0_0_15px_var(--primary-glow)] hover:bg-accent-dark transition-all"
              >
                <span>Edit Hero &amp; Roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Main Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.title}
                href={m.href}
                className="p-6 rounded-3xl glass-card border border-surface-border hover:border-accent shadow-md flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-surface-muted">
                    {m.badge}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-accent/10 text-accent group-hover:scale-110 group-hover:shadow-[0_0_12px_var(--primary-glow)] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold font-mono text-surface-text group-hover:text-accent transition-colors tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold text-surface-muted mt-1">
                    {m.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions & Recent Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quick Actions Tile */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl glass-card border border-surface-border space-y-5">
            <h3 className="text-lg font-bold text-surface-text flex items-center gap-2">
              <Plus className="w-5 h-5 text-accent" />
              <span>Quick Actions</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/admin/projects"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-accent text-xs font-semibold text-surface-text transition-all group"
              >
                <FolderGit2 className="w-4 h-4 text-accent" />
                <span>+ Add Project</span>
              </Link>
              <Link
                href="/admin/certificates"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-accent text-xs font-semibold text-surface-text transition-all group"
              >
                <Award className="w-4 h-4 text-accent" />
                <span>+ Add Certificate</span>
              </Link>
              <Link
                href="/admin/skills"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-accent text-xs font-semibold text-surface-text transition-all group"
              >
                <Layers className="w-4 h-4 text-accent" />
                <span>+ Add Skill</span>
              </Link>
              <Link
                href="/admin/experience"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-accent text-xs font-semibold text-surface-text transition-all group"
              >
                <Briefcase className="w-4 h-4 text-accent" />
                <span>+ Add Experience</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-surface-border flex items-center justify-between text-xs text-surface-muted">
              <span>Need to change theme default?</span>
              <Link href="/admin/settings" className="text-accent hover:underline">
                Settings &rarr;
              </Link>
            </div>
          </div>

          {/* Recent Inbound Messages */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl glass-card border border-surface-border space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-surface-text flex items-center gap-2">
                <Mail className="w-5 h-5 text-accent" />
                <span>Recent Inbound Messages</span>
              </h3>
              <Link
                href="/admin/contact"
                className="text-xs font-mono text-accent hover:underline"
              >
                View all ({stats.messages})
              </Link>
            </div>

            <div className="space-y-3">
              {stats.recentMessages && stats.recentMessages.length > 0 ? (
                stats.recentMessages.map((msg: any) => (
                  <div
                    key={msg._id}
                    className="p-4 rounded-2xl bg-surface-card border border-surface-border space-y-1.5 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-surface-text">
                        {msg.name}
                      </div>
                      <div className="text-[11px] font-mono text-surface-subtle">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-xs font-medium text-accent">
                      {msg.subject}
                    </div>
                    <p className="text-xs text-surface-muted line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-surface-subtle">
                  No contact messages received yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
