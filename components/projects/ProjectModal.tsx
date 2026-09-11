"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from "lucide-react";
import { ProjectData } from "@/lib/seedData";

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (project) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-surface-border bg-surface-bg shadow-2xl p-6 sm:p-8 space-y-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-5 right-5 p-2 rounded-xl bg-surface-card border border-surface-border text-surface-muted hover:text-surface-text hover:border-accent transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Image Preview */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-surface-border">
            <Image
              src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {project.featured && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-white text-xs font-mono font-semibold shadow-[0_0_12px_var(--primary-glow)] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Project
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-surface-text">
              {project.title}
            </h3>
            <p className="text-base text-surface-muted leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-surface-subtle font-semibold">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-accent/10 border border-accent/20 text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-surface-border">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-medium shadow-[0_0_15px_var(--primary-glow)] hover:bg-accent-dark transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-card-hover text-surface-text hover:border-accent transition-all font-medium"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
