"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  Sparkles,
  X,
  Loader2,
  ArrowUpDown,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import { useToast } from "@/lib/context/ToastContext";
import { ProjectData } from "@/lib/seedData";

export default function AdminProjectsManagerPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<Partial<ProjectData>>({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    technologies: [],
    githubUrl: "",
    liveUrl: "",
    featured: false,
    order: 0,
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (err) {
      showToast("Failed to fetch projects", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      longDescription: "",
      image: "",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      githubUrl: "",
      liveUrl: "",
      featured: false,
      order: projects.length + 1,
    });
    setTechInput("");
    setModalOpen(true);
  };

  const openEditModal = (proj: ProjectData) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      description: proj.description,
      longDescription: proj.longDescription,
      image: proj.image,
      technologies: [...(proj.technologies || [])],
      githubUrl: proj.githubUrl,
      liveUrl: proj.liveUrl,
      featured: proj.featured,
      order: proj.order,
    });
    setTechInput("");
    setModalOpen(true);
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    const current = formData.technologies || [];
    if (!current.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...current, techInput.trim()] });
    }
    setTechInput("");
  };

  const handleRemoveTech = (tech: string) => {
    const current = formData.technologies || [];
    setFormData({ ...formData, technologies: current.filter((t) => t !== tech) });
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
        showToast("Project deleted", "success");
      }
    } catch (err) {
      showToast("Error deleting project", "error");
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingProject && editingProject._id) {
        const res = await fetch(`/api/projects/${editingProject._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast("Project updated", "success");
          fetchProjects();
          setModalOpen(false);
        }
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast("Project created", "success");
          fetchProjects();
          setModalOpen(false);
        }
      }
    } catch (err) {
      showToast("Error saving project", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Projects Manager"
        subtitle="Create, showcase, and maintain your software projects portfolio"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-8">
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-surface-text">Project List</h2>
            <p className="text-xs text-surface-muted">
              {projects.length} Total Projects ({projects.filter((p) => p.featured).length} Featured)
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs shadow-[0_0_15px_var(--primary-glow)] hover:bg-accent-dark transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Projects Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id || project.slug}
                className="rounded-3xl glass-card border border-surface-border overflow-hidden flex flex-col justify-between group shadow-lg"
              >
                <div className="relative w-full h-44 bg-surface-card overflow-hidden">
                  <Image
                    src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-accent text-white text-[10px] font-mono font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-surface-text line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-surface-muted line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent/10 text-accent font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-surface-border">
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-surface-muted hover:text-accent"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-surface-muted hover:text-accent"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(project)}
                          className="p-1.5 rounded-lg text-surface-muted hover:text-accent hover:bg-accent/10 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-surface-border bg-surface-bg p-6 sm:p-8 space-y-6 shadow-2xl my-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-surface-text">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-xl text-surface-muted hover:text-surface-text"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-surface-muted">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. AI Autonomous Agent Orchestrator"
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-surface-muted">
                    Short Summary (Card Preview) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief 1-2 sentence overview of the project..."
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-surface-muted">
                    Detailed Description (Modal View)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.longDescription || ""}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    placeholder="In-depth explanation of technical architecture, results, and features..."
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text resize-none"
                  />
                </div>

                <ImageUploader
                  label="Project Screenshot / Banner"
                  value={formData.image || ""}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  recommendedSize="1200x800px recommended"
                />

                {/* Tech Tags input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-surface-muted">
                    Technologies
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
                      placeholder="e.g. Next.js, FastAPI, Docker"
                      className="flex-grow px-4 py-2.5 rounded-xl glass-input text-sm text-surface-text"
                    />
                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-medium hover:bg-accent-dark transition-all"
                    >
                      Add Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl || ""}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Live Demo Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.liveUrl || ""}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="proj-featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded accent-accent"
                  />
                  <label htmlFor="proj-featured" className="text-xs text-surface-text font-medium">
                    Mark as Featured Project on homepage
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
                    {saving ? "Saving..." : "Save Project"}
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
