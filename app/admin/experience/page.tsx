"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  ExternalLink,
  X,
  Loader2,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useToast } from "@/lib/context/ToastContext";
import { ExperienceData } from "@/lib/seedData";
import { formatDate } from "@/lib/utils";

export default function AdminExperienceManagerPage() {
  const [experience, setExperience] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceData | null>(null);
  const [descInput, setDescInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<Partial<ExperienceData>>({
    title: "",
    company: "",
    companyUrl: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: [],
    technologies: [],
    order: 0,
  });

  const fetchExperience = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      if (data.experience) {
        setExperience(data.experience);
      }
    } catch (err) {
      showToast("Failed to fetch experience", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const openCreateModal = () => {
    setEditingExp(null);
    setFormData({
      title: "",
      company: "",
      companyUrl: "",
      location: "",
      startDate: new Date().toISOString().substring(0, 10),
      endDate: "",
      current: false,
      description: [],
      technologies: [],
      order: experience.length + 1,
    });
    setDescInput("");
    setTechInput("");
    setModalOpen(true);
  };

  const openEditModal = (exp: ExperienceData) => {
    setEditingExp(exp);
    setFormData({
      title: exp.title,
      company: exp.company,
      companyUrl: exp.companyUrl,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: [...(exp.description || [])],
      technologies: [...(exp.technologies || [])],
      order: exp.order,
    });
    setDescInput("");
    setTechInput("");
    setModalOpen(true);
  };

  const handleAddDesc = () => {
    if (!descInput.trim()) return;
    const current = formData.description || [];
    setFormData({ ...formData, description: [...current, descInput.trim()] });
    setDescInput("");
  };

  const handleRemoveDesc = (idx: number) => {
    const current = formData.description || [];
    setFormData({ ...formData, description: current.filter((_, i) => i !== idx) });
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    const current = formData.technologies || [];
    if (!current.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...current, techInput.trim()] });
    }
    setTechInput("");
  };

  const handleRemoveTech = (t: string) => {
    const current = formData.technologies || [];
    setFormData({ ...formData, technologies: current.filter((item) => item !== t) });
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !confirm("Are you sure you want to delete this experience record?")) return;

    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (res.ok) {
        setExperience(experience.filter((e) => e._id !== id));
        showToast("Experience record deleted", "success");
      }
    } catch (err) {
      showToast("Error deleting experience", "error");
    }
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingExp && editingExp._id) {
        const res = await fetch(`/api/experience/${editingExp._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast("Experience updated", "success");
          fetchExperience();
          setModalOpen(false);
        }
      } else {
        const res = await fetch("/api/experience", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast("Experience added", "success");
          fetchExperience();
          setModalOpen(false);
        }
      }
    } catch (err) {
      showToast("Error saving experience", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Experience Manager"
        subtitle="Manage career timeline, positions, responsibilities, and technologies"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-surface-text">Career History</h2>
            <p className="text-xs text-surface-muted">
              {experience.length} Total Experience Records
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs shadow-[0_0_15px_var(--primary-glow)] hover:bg-accent-dark transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Experience</span>
          </button>
        </div>

        {/* Timeline list */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="space-y-4">
            {experience.map((exp) => (
              <div
                key={exp._id || `${exp.company}-${exp.title}`}
                className="p-6 rounded-3xl glass-card border border-surface-border flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-bold text-base text-surface-text">
                      {exp.title}
                    </h3>
                    <span className="text-accent font-semibold text-sm">
                      @ {exp.company}
                    </span>
                    {exp.current && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold">
                        Present
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-surface-muted font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {exp.description && exp.description.length > 0 && (
                    <ul className="space-y-1 text-xs text-surface-muted pt-1">
                      {exp.description.map((d, i) => (
                        <li key={i} className="line-clamp-1">
                          • {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => openEditModal(exp)}
                    className="p-2 rounded-xl bg-surface-card border border-surface-border text-surface-muted hover:text-accent hover:border-accent transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="p-2 rounded-xl bg-surface-card border border-surface-border text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-surface-border bg-surface-bg p-6 sm:p-8 space-y-6 shadow-2xl my-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-surface-text">
                  {editingExp ? "Edit Experience" : "Add New Experience"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-xl text-surface-muted hover:text-surface-text"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveExp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Job Title / Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Senior Full Stack & AI Engineer"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company || ""}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. TechNova Systems"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location || ""}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. San Francisco, CA (Remote)"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Company Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.companyUrl || ""}
                      onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Start Date *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.startDate || ""}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      placeholder="2024-01-01"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      End Date {formData.current && "(Present)"}
                    </label>
                    <input
                      type="text"
                      disabled={formData.current}
                      value={formData.current ? "" : formData.endDate || ""}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      placeholder="2024-12-31"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono disabled:opacity-40"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="exp-current"
                    checked={formData.current}
                    onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                    className="w-4 h-4 rounded accent-accent"
                  />
                  <label htmlFor="exp-current" className="text-xs text-surface-text font-medium">
                    I currently work in this position (Displays &quot;Present&quot;)
                  </label>
                </div>

                {/* Key Responsibilities */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-mono font-medium text-surface-muted">
                    Key Achievements / Bullet Points
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={descInput}
                      onChange={(e) => setDescInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddDesc();
                        }
                      }}
                      placeholder="Add an accomplishment bullet point..."
                      className="flex-grow px-4 py-2.5 rounded-xl glass-input text-sm text-surface-text"
                    />
                    <button
                      type="button"
                      onClick={handleAddDesc}
                      className="px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-medium hover:bg-accent-dark transition-all"
                    >
                      Add Point
                    </button>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {(formData.description || []).map((desc, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-surface-card border border-surface-border text-xs text-surface-text"
                      >
                        <span>• {desc}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDesc(idx)}
                          className="text-surface-muted hover:text-rose-400 shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-mono font-medium text-surface-muted">
                    Technologies Used
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTech();
                        }
                      }}
                      placeholder="e.g. Next.js, Python, AWS"
                      className="flex-grow px-4 py-2.5 rounded-xl glass-input text-sm text-surface-text"
                    />
                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-medium hover:bg-accent-dark transition-all"
                    >
                      Add Tech
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(formData.technologies || []).map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-accent/15 text-accent border border-accent/30"
                      >
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(t)}
                          className="hover:text-rose-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-surface-border text-xs font-medium text-surface-muted hover:text-surface-text"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-accent text-white text-xs font-bold shadow-[0_0_15px_var(--primary-glow)] hover:bg-accent-dark transition-all disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Experience"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
