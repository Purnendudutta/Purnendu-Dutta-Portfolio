"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { SkillData } from "@/lib/seedData";

interface SkillCardProps {
  skill: SkillData;
}

export default function SkillCard({ skill }: SkillCardProps) {
  // Dynamically resolve Lucide Icon
  const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Code2;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="p-4 rounded-2xl glass-card border border-surface-border flex flex-col justify-between relative group cursor-default"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:shadow-[0_0_15px_var(--primary-glow)] group-hover:scale-110 transition-all duration-300">
          <IconComponent className="w-5 h-5" />
        </div>
        {skill.years > 0 && (
          <span className="text-[11px] font-mono text-surface-subtle font-medium">
            {skill.years} {skill.years === 1 ? "yr" : "yrs"}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm text-surface-text group-hover:text-accent transition-colors truncate">
            {skill.name}
          </h4>
          <span className="text-xs font-mono font-medium text-accent">
            {skill.proficiency}%
          </span>
        </div>

        {/* Proficiency Progress Bar */}
        <div className="w-full h-1.5 bg-surface-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full"
            style={{
              boxShadow: "0 0 8px var(--primary-glow)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
