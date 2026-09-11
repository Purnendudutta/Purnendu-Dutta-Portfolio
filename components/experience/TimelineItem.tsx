"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { ExperienceData } from "@/lib/seedData";
import { formatDate } from "@/lib/utils";

interface TimelineItemProps {
  experience: ExperienceData;
  isLast: boolean;
}

export default function TimelineItem({ experience, isLast }: TimelineItemProps) {
  const startStr = formatDate(experience.startDate);
  const endStr = experience.current ? "Present" : formatDate(experience.endDate);

  return (
    <div className="relative flex gap-6 md:gap-10 group">
      {/* Left Timeline Line & Glowing Node */}
      <div className="flex flex-col items-center">
        {/* Node */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-surface-card border-2 border-accent text-accent shadow-[0_0_15px_var(--primary-glow)] group-hover:scale-110 transition-transform duration-300 z-10">
          <Briefcase className="w-4 h-4 text-accent" />
          {experience.current && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-surface-bg animate-pulse" />
          )}
        </div>

        {/* Vertical Line Connector */}
        {!isLast && (
          <div className="w-[2px] flex-grow bg-gradient-to-b from-accent via-accent/30 to-surface-border my-2 transition-all duration-300 group-hover:from-accent group-hover:to-accent/50" />
        )}
      </div>

      {/* Right Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex-grow pb-12"
      >
        <div className="p-6 sm:p-7 rounded-3xl glass-card border border-surface-border space-y-4 shadow-lg hover:border-accent hover:shadow-[0_10px_30px_-10px_var(--primary-glow)] transition-all">
          {/* Header & Company */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-surface-text group-hover:text-accent transition-colors">
                {experience.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {experience.companyUrl ? (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-accent hover:underline flex items-center gap-1"
                  >
                    <span>{experience.company}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-accent">
                    {experience.company}
                  </span>
                )}
                {experience.location && (
                  <span className="text-xs text-surface-muted flex items-center gap-1">
                    • <MapPin className="w-3 h-3 text-surface-subtle" />
                    {experience.location}
                  </span>
                )}
              </div>
            </div>

            {/* Date Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-accent/20 bg-accent/10 text-accent self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {startStr} – {endStr}
              </span>
            </div>
          </div>

          {/* Responsibilities Bullets */}
          {experience.description && experience.description.length > 0 && (
            <ul className="space-y-2 text-sm text-surface-muted leading-relaxed">
              {experience.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech Stack Tags */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {experience.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-surface-bg border border-surface-border text-surface-subtle"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
