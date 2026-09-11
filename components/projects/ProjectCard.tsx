"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Maximize2 } from "lucide-react";
import { ProjectData } from "@/lib/seedData";

interface ProjectCardProps {
  project: ProjectData;
  onOpenModal: (project: ProjectData) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-3xl glass-card border border-surface-border overflow-hidden flex flex-col h-full shadow-lg hover:border-accent hover:shadow-[0_15px_35px_-10px_var(--primary-glow)]"
    >
      {/* Project Image Container */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-surface-card">
        <Image
          src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-accent/90 text-white text-[11px] font-mono font-semibold backdrop-blur-md shadow-[0_0_10px_var(--primary-glow)] flex items-center gap-1.5 z-10">
            <Sparkles className="w-3 h-3" />
            Featured
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={() => onOpenModal(project)}
          aria-label={`View details for ${project.title}`}
          className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-black/60 text-white hover:text-accent hover:bg-black/80 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2.5">
          <h3
            onClick={() => onOpenModal(project)}
            className="text-xl font-bold text-surface-text group-hover:text-accent transition-colors cursor-pointer line-clamp-1"
          >
            {project.title}
          </h3>
          <p className="text-sm text-surface-muted line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-accent/10 border border-accent/20 text-accent font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-surface-subtle">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-3 border-t border-surface-border">
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                  className="p-2 rounded-lg text-surface-muted hover:text-accent hover:bg-accent/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Website Preview"
                  className="p-2 rounded-lg text-surface-muted hover:text-accent hover:bg-accent/10 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <button
              onClick={() => onOpenModal(project)}
              className="text-xs font-mono font-medium text-accent hover:underline flex items-center gap-1"
            >
              Details &rarr;
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
