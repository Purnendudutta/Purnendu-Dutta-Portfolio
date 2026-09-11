"use client";

import React from "react";
import { Briefcase } from "lucide-react";
import TimelineItem from "./TimelineItem";
import { ExperienceData } from "@/lib/seedData";

interface ExperienceSectionProps {
  experience: ExperienceData[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  const sortedExp = [...(experience || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="experience" className="py-20 md:py-28 relative overflow-hidden">
      {/* Ambient background blob */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono font-semibold tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-text">
            Work <span className="gradient-text-accent">Experience</span>
          </h2>
          <p className="text-base sm:text-lg text-surface-muted">
            Proven track record of designing, delivering, and optimizing enterprise applications and autonomous AI software.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative mt-8">
          {sortedExp.map((exp, index) => (
            <TimelineItem
              key={exp._id || `${exp.company}-${index}`}
              experience={exp}
              isLast={index === sortedExp.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
