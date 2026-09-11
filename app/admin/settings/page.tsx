"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  RotateCcw,
  Loader2,
  Globe,
  Palette,
  Check,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import { useToast } from "@/lib/context/ToastContext";
import { useTheme, ACCENT_OPTIONS, AccentColor } from "@/lib/context/ThemeContext";
import { SiteSettingsData, initialSiteSettings } from "@/lib/seedData";

export default function AdminSettingsManagerPage() {
  const [settings, setSettings] = useState<SiteSettingsData>(initialSiteSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const { showToast } = useToast();
  const { setAccent, setMode } = useTheme();

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setSettings(data.settings);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        showToast("Site settings saved successfully!", "success");
        // Apply live
        if (settings.defaultAccent) setAccent(settings.defaultAccent);
        if (settings.defaultTheme) setMode(settings.defaultTheme);
      } else {
        showToast("Failed to save settings", "error");
      }
    } catch (err) {
      showToast("Error saving settings", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReSeed = async () => {
    if (!confirm("Reset database to initial seed data? This will restore default projects and certificates.")) return;
    setSeeding(true);

    try {
      const res = await fetch("/api/seed", { method: "POST" });
      if (res.ok) {
        showToast("Database successfully re-seeded!", "success");
        setTimeout(() => window.location.reload(), 1200);
      } else {
        showToast("Failed to re-seed database", "error");
      }
    } catch (err) {
      showToast("Network error re-seeding", "error");
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Site Settings &amp; SEO"
        subtitle="Configure default theme preferences, metadata, and database operations"
      />

      <main className="p-6 sm:p-8 max-w-5xl space-y-8">
        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* Default Theme & Accent Color */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-surface-border space-y-6">
            <h3 className="text-lg font-bold text-surface-text flex items-center gap-2">
              <Palette className="w-5 h-5 text-accent" />
              <span>Default Theme &amp; Accent</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  Default Display Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, defaultTheme: "dark" })}
                    className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                      settings.defaultTheme === "dark"
                        ? "bg-accent/20 border-accent text-accent shadow-md"
                        : "bg-surface-card border-surface-border text-surface-muted hover:text-surface-text"
                    }`}
                  >
                    Dark Mode (Futuristic)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, defaultTheme: "light" })}
                    className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                      settings.defaultTheme === "light"
                        ? "bg-accent/20 border-accent text-accent shadow-md"
                        : "bg-surface-card border-surface-border text-surface-muted hover:text-surface-text"
                    }`}
                  >
                    Light Mode
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  Default Accent Palette
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ACCENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setSettings({
                          ...settings,
                          defaultAccent: opt.id as AccentColor,
                        })
                      }
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                        settings.defaultAccent === opt.id
                          ? "border-accent bg-accent/15 text-accent font-bold"
                          : "border-surface-border bg-surface-card text-surface-muted hover:text-surface-text"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: opt.primaryColor }}
                      />
                      <span className="truncate">{opt.name.split("/")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-surface-border space-y-6">
            <h3 className="text-lg font-bold text-surface-text flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              <span>Search Engine Optimization (SEO)</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  Meta Title *
                </label>
                <input
                  type="text"
                  required
                  value={settings.seoTitle}
                  onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                  placeholder="Purnendu Dutta | AI Engineer & Full Stack Developer"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  Meta Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={settings.seoDescription}
                  onChange={(e) =>
                    setSettings({ ...settings, seoDescription: e.target.value })
                  }
                  placeholder="Professional developer portfolio showcasing projects, skills, experience and certifications."
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text resize-none"
                />
              </div>

              <ImageUploader
                label="Social Share / Open Graph (OG) Image"
                value={settings.ogImage || ""}
                onChange={(url) => setSettings({ ...settings, ogImage: url })}
                recommendedSize="1200x630px recommended"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              disabled={seeding}
              onClick={handleReSeed}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-rose-500/30 text-rose-400 hover:bg-rose-950/40 text-xs font-semibold transition-all cursor-pointer"
            >
              {seeding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RotateCcw className="w-4 h-4" />
              )}
              <span>Restore Initial Seed Data</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-accent hover:bg-accent-dark shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_30px_var(--primary-glow)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
