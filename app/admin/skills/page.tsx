"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Loader2,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useToast } from "@/lib/context/ToastContext";
import { SkillData } from "@/lib/seedData";

const CATEGORIES: SkillData["category"][] = [
  "Frontend",
  "Backend",
  "Database",
  "AI / Machine Learning",
  "DevOps & Cloud",
  "Tools & Others",
];

const POPULAR_ICONS = [
  "Code2",
  "Layers",
  "FileCode",
  "Code",
  "Palette",
  "Layout",
  "Sparkles",
  "Database",
  "Server",
  "Terminal",
  "Zap",
  "Cpu",
  "Globe",
  "Share2",
  "HardDrive",
  "Bot",
  "Search",
  "Workflow",
  "Box",
  "Cloud",
  "GitBranch",
  "Repeat",
  "Shield",
];

export default function AdminSkillsManagerPage() {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillData | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<Partial<SkillData>>({
    name: "",
    category: "Frontend",
    icon: "Code2",
    proficiency: 85,
    years: 2,
    order: 0,
    isActive: true,
  });

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (data.skills) {
        setSkills(data.skills);
      }
    } catch (err) {
      showToast("Failed to fetch skills", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      name: "",
      category: "Frontend",
      icon: "Code2",
      proficiency: 85,
      years: 2,
      order: skills.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (skill: SkillData) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      icon: skill.icon,
      proficiency: skill.proficiency,
      years: skill.years,
      order: skill.order,
      isActive: skill.isActive,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSkills(skills.filter((s) => s._id !== id));
        showToast("Skill deleted", "success");
      }
    } catch (err) {
      showToast("Error deleting skill", "error");
    }
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingSkill && editingSkill._id) {
        const res = await fetch(`/api/skills/${editingSkill._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          showToast("Skill updated", "success");
          fetchSkills();
          setModalOpen(false);
        }
      } else {
        const res = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          showToast("Skill created", "success");
          fetchSkills();
          setModalOpen(false);
        }
      }
    } catch (err) {
      showToast("Error saving skill", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Skills Manager"
        subtitle="Organize categorized technical capabilities, icons, and proficiency levels"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-surface-text">Technical Skills</h2>
            <p className="text-xs text-surface-muted">
              Total {skills.length} skills listed in database
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs shadow-[0_0_15px_var(--primary-glow)] hover:bg-accent-dark transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
          </button>
        </div>

        {/* Skills Grid by Category */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="space-y-8">
            {CATEGORIES.map((category) => {
              const categorySkills = skills.filter((s) => s.category === category);
              if (categorySkills.length === 0) return null;

              return (
                <div key={category} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-surface-border pb-2">
                    <h3 className="font-mono text-sm font-bold text-accent uppercase tracking-wider">
                      {category}
                    </h3>
                    <span className="text-xs text-surface-subtle font-mono">
                      {categorySkills.length} skills
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                    {categorySkills.map((skill) => {
                      const IconComp = (LucideIcons as any)[skill.icon] || LucideIcons.Code2;

                      return (
                        <div
                          key={skill._id || skill.name}
                          className="p-4 rounded-2xl glass-card border border-surface-border flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 rounded-xl bg-accent/10 text-accent border border-accent/20 shrink-0">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-sm text-surface-text truncate">
                                {skill.name}
                              </div>
                              <div className="text-[11px] font-mono text-surface-muted">
                                {skill.proficiency}% • {skill.years} yrs
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => openEditModal(skill)}
                              className="p-1.5 rounded-lg text-surface-muted hover:text-accent hover:bg-accent/10 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(skill._id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl glass-panel border border-surface-border bg-surface-bg p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-surface-text">
                  {editingSkill ? "Edit Skill" : "Add New Skill"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-xl text-surface-muted hover:text-surface-text"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveSkill} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-surface-muted">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. LangChain & LangGraph"
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as SkillData["category"],
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c} className="bg-slate-900 text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Icon
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                    >
                      {POPULAR_ICONS.map((ic) => (
                        <option key={ic} value={ic} className="bg-slate-900 text-white">
                          {ic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Proficiency ({formData.proficiency}%)
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={formData.proficiency || 80}
                      onChange={(e) =>
                        setFormData({ ...formData, proficiency: Number(e.target.value) })
                      }
                      className="w-full accent-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Years Experience
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={formData.years || 1}
                      onChange={(e) =>
                        setFormData({ ...formData, years: Number(e.target.value) })
                      }
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="skill-active"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded accent-accent"
                  />
                  <label htmlFor="skill-active" className="text-xs text-surface-text font-medium">
                    Skill is active and visible on public portfolio
                  </label>
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
                    {saving ? "Saving..." : "Save Skill"}
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
