"use client";

import React, { useState, useEffect } from "react";
import { User, Save, Loader2, Award, Briefcase, FolderGit2, Cpu } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useToast } from "@/lib/context/ToastContext";
import { ProfileData, initialProfile } from "@/lib/seedData";

export default function AdminAboutEditorPage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile(data.profile);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfile(data.profile);
        showToast("About section and statistics saved!", "success");
      } else {
        showToast(data.error || "Failed to update about details", "error");
      }
    } catch (err) {
      showToast("Error saving changes", "error");
    } finally {
      setSaving(false);
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
        title="About &amp; Statistics"
        subtitle="Manage your professional biography, engineering highlights, and showcase metrics"
      />

      <main className="p-6 sm:p-8 max-w-5xl space-y-8">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Biography Content */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-surface-border space-y-6">
            <h3 className="text-lg font-bold text-surface-text flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              <span>Professional Narrative</span>
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-surface-muted">
                Comprehensive Biography / Story *
              </label>
              <textarea
                rows={6}
                required
                value={profile.longBio}
                onChange={(e) => setProfile({ ...profile, longBio: e.target.value })}
                placeholder="Explain your technical focus, experience, and background..."
                className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Key Statistics Matrix */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-surface-border space-y-6">
            <h3 className="text-lg font-bold text-surface-text flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <span>Key Metric Counters</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-accent" />
                  <span>Years of Experience</span>
                </label>
                <input
                  type="text"
                  required
                  value={profile.stats?.yearsExperience || "4+"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats, yearsExperience: e.target.value },
                    })
                  }
                  placeholder="e.g. 4+"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-accent" />
                  <span>Projects Completed</span>
                </label>
                <input
                  type="text"
                  required
                  value={profile.stats?.projectsCompleted || "25+"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats, projectsCompleted: e.target.value },
                    })
                  }
                  placeholder="e.g. 25+"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-accent" />
                  <span>Technologies Mastered</span>
                </label>
                <input
                  type="text"
                  required
                  value={profile.stats?.technologies || "30+"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats, technologies: e.target.value },
                    })
                  }
                  placeholder="e.g. 30+"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-accent" />
                  <span>Certificates Earned</span>
                </label>
                <input
                  type="text"
                  required
                  value={profile.stats?.certificates || "8+"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats, certificates: e.target.value },
                    })
                  }
                  placeholder="e.g. 8+"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-accent hover:bg-accent-dark shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_30px_var(--primary-glow)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save About &amp; Stats</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
