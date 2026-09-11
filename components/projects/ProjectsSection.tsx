"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { ProjectData } from "@/lib/seedData";

interface ProjectsSectionProps {
  projects: ProjectData[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const allProjects = projects || [];
  const featuredProjects = allProjects.filter((p) => p.featured);
  const displayedProjects = showAll
    ? allProjects
    : featuredProjects.length > 0
    ? featuredProjects
    : allProjects.slice(0, 3);

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Radial Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono font-semibold tracking-wider uppercase">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-text">
            Featured <span className="gradient-text-accent">Projects</span>
          </h2>
          <p className="text-base sm:text-lg text-surface-muted">
            Engineered for real-world impact — exploring autonomous agents, distributed microservices, and modern user experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {displayedProjects.map((project) => (
              <motion.div
                key={project._id || project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={project}
                  onOpenModal={(p) => setSelectedProject(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects CTA Toggle */}
        {allProjects.length > 3 && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent text-surface-text font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-[0_0_20px_var(--primary-glow)]"
            >
              <span>{showAll ? "Show Featured Only" : "View All Projects"}</span>
              <ArrowRight className={`w-4 h-4 text-accent transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-x-1"}`} />
            </button>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
