"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  Loader2,
  FileText,
  UserCheck,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import { useToast } from "@/lib/context/ToastContext";
import { ProfileData, initialProfile } from "@/lib/seedData";

export default function AdminHeroEditorPage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [roles, setRoles] = useState<string[]>(initialProfile.dynamicRoles);
  const [newRoleInput, setNewRoleInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile(data.profile);
          setRoles(data.profile.dynamicRoles || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAddRole = () => {
    if (!newRoleInput.trim()) return;
    setRoles([...roles, newRoleInput.trim()]);
    setNewRoleInput("");
  };

  const handleRemoveRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleMoveRole = (index: number, direction: "up" | "down") => {
    const newRoles = [...roles];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newRoles.length) return;
    const temp = newRoles[index];
    newRoles[index] = newRoles[targetIndex];
    newRoles[targetIndex] = temp;
    setRoles(newRoles);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedProfile = {
        ...profile,
        dynamicRoles: roles,
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfile(data.profile);
        showToast("Hero and Typewriter roles saved successfully!", "success");
      } else {
        showToast(data.error || "Failed to update hero details", "error");
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
        title="Hero &amp; Typewriter Roles"
        subtitle="Manage your primary identity, dynamic typewriter animation, and hero CTAs"
      />

      <main className="p-6 sm:p-8 max-w-5xl space-y-8">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Identity & Main Headlines */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-surface-border space-y-6">
            <h3 className="text-lg font-bold text-surface-text flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-accent" />
              <span>Personal Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Purnendu Dutta"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  placeholder="AI Engineer & Full Stack Developer"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-surface-muted">
                Hero Short Description *
              </label>
              <textarea
                rows={3}
                required
                value={profile.shortDescription}
                onChange={(e) => setProfile({ ...profile, shortDescription: e.target.value })}
                placeholder="I build intelligent systems and modern web applications that solve real-world problems."
                className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  Resume / CV URL
                </label>
                <input
                  type="text"
                  value={profile.resumeUrl || ""}
                  onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                  placeholder="/resume.pdf or Google Drive link"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                />
              </div>

              <ImageUploader
                label="Navbar PNG Logo"
                value={profile.logoUrl || ""}
                onChange={(url) => setProfile({ ...profile, logoUrl: url })}
                recommendedSize="Small PNG logo (e.g. 100x100px)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <ImageUploader
                label="Hero Frame Image (Right Side of Hero Section) *"
                value={profile.heroImage || profile.avatarUrl || ""}
                onChange={(url) => setProfile({ ...profile, heroImage: url, avatarUrl: url })}
                recommendedSize="Portrait / High quality image (e.g. 800x1000px)"
              />

              <ImageUploader
                label="Secondary Avatar / Thumbnail"
                value={profile.avatarUrl || ""}
                onChange={(url) => setProfile({ ...profile, avatarUrl: url })}
                recommendedSize="Square image, e.g. 600x600px"
              />
            </div>
          </div>

          {/* Dynamic Typewriter Sequence Editor */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-surface-border space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-surface-text flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span>Dynamic Typewriter Sequence</span>
              </h3>
              <span className="text-xs font-mono text-surface-muted">
                {roles.length} Roles configured
              </span>
            </div>

            <p className="text-xs text-surface-muted">
              These phrases will animate character-by-character continuously on the public hero section.
            </p>

            {/* Add Role Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newRoleInput}
                onChange={(e) => setNewRoleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddRole();
                  }
                }}
                placeholder="e.g. Distributed Systems Architect"
                className="flex-grow px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
              />
              <button
                type="button"
                onClick={handleAddRole}
                className="px-5 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-semibold text-xs transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Role</span>
              </button>
            </div>

            {/* Roles List with reordering */}
            <div className="space-y-2">
              {roles.map((role, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-card border border-surface-border group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-surface-bg border border-surface-border text-surface-subtle text-xs font-mono flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-surface-text">
                      {role}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveRole(idx, "up")}
                      className="p-1.5 rounded-lg text-surface-muted hover:text-accent hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === roles.length - 1}
                      onClick={() => handleMoveRole(idx, "down")}
                      className="p-1.5 rounded-lg text-surface-muted hover:text-accent hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(idx)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
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
                  <span>Save Hero &amp; Roles</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
