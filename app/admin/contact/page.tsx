"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Save,
  Loader2,
  Trash2,
  Inbox,
  User,
  Calendar,
  Sparkles,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useToast } from "@/lib/context/ToastContext";
import { ProfileData, initialProfile } from "@/lib/seedData";
import { MessageData } from "@/lib/dataStore";

export default function AdminContactManagerPage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const [contactEmail, setContactEmail] = useState("purnendu.dutta@example.com");
  const [githubUrl, setGithubUrl] = useState("https://github.com");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com");
  const [twitterUrl, setTwitterUrl] = useState("https://twitter.com");

  const fetchData = async () => {
    try {
      const [profRes, msgRes] = await Promise.all([
        fetch("/api/profile"),
        fetch("/api/contact"),
      ]);

      const profData = await profRes.json();
      const msgData = await msgRes.json();

      if (profData.profile) {
        setProfile(profData.profile);
        const emailLink = profData.profile.socialLinks?.find(
          (s: any) => s.platform.toLowerCase() === "email"
        );
        if (emailLink) setContactEmail(emailLink.url.replace("mailto:", ""));

        const gh = profData.profile.socialLinks?.find((s: any) => s.platform.toLowerCase() === "github");
        if (gh) setGithubUrl(gh.url);

        const li = profData.profile.socialLinks?.find((s: any) => s.platform.toLowerCase() === "linkedin");
        if (li) setLinkedinUrl(li.url);

        const tw = profData.profile.socialLinks?.find((s: any) => s.platform.toLowerCase() === "twitter");
        if (tw) setTwitterUrl(tw.url);
      }

      if (msgData.messages) {
        setMessages(msgData.messages);
      }
    } catch (err) {
      showToast("Error loading contact data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedSocialLinks = [
        { platform: "GitHub", url: githubUrl, icon: "Github" },
        { platform: "LinkedIn", url: linkedinUrl, icon: "Linkedin" },
        { platform: "Twitter", url: twitterUrl, icon: "Twitter" },
        { platform: "Email", url: `mailto:${contactEmail}`, icon: "Mail" },
      ];

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profile,
          socialLinks: updatedSocialLinks,
        }),
      });

      if (res.ok) {
        showToast("Contact details updated successfully", "success");
      } else {
        showToast("Failed to update contact info", "error");
      }
    } catch (err) {
      showToast("Error saving contact details", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m) => m._id !== id));
        showToast("Message deleted", "success");
      }
    } catch (err) {
      showToast("Failed to delete message", "error");
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
        title="Contact &amp; Messages Inbox"
        subtitle="Manage public contact parameters and review inbound user messages"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-10">
        {/* Contact Information Form */}
        <form onSubmit={handleSaveContact} className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-surface-border space-y-6">
            <h3 className="text-lg font-bold text-surface-text flex items-center gap-2">
              <Mail className="w-5 h-5 text-accent" />
              <span>Public Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  Primary Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="purnendu.dutta@example.com"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-surface-muted">
                  Twitter / X Profile URL
                </label>
                <input
                  type="url"
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-xs font-bold shadow-[0_0_15px_var(--primary-glow)] hover:bg-accent-dark transition-all disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Contact Info"}
              </button>
            </div>
          </div>
        </form>

        {/* Received Inbound Messages Inbox */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-surface-border space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-surface-text flex items-center gap-2">
              <Inbox className="w-5 h-5 text-accent" />
              <span>Received Inbound Messages ({messages.length})</span>
            </h3>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 text-center text-surface-muted text-xs">
              No contact messages received yet. Messages submitted on the public contact form will appear here.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-3 hover:border-accent/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-accent/10 text-accent font-bold text-xs flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-surface-text">
                          {msg.name}
                        </div>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-accent hover:underline font-mono"
                        >
                          {msg.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-[11px] font-mono text-surface-subtle flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-surface-border/60">
                    <div className="text-xs font-semibold text-surface-text mb-1">
                      Subject: {msg.subject}
                    </div>
                    <p className="text-xs text-surface-muted whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
