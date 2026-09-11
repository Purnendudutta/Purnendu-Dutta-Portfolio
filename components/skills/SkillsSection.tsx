"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Sparkles } from "lucide-react";
import SkillCard from "./SkillCard";
import { SkillData } from "@/lib/seedData";

interface SkillsSectionProps {
  skills: SkillData[];
}

const CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "AI / Machine Learning",
  "DevOps & Cloud",
];

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const activeSkills = (skills || []).filter((s) => s.isActive !== false);

  const filteredSkills =
    selectedCategory === "All"
      ? activeSkills
      : activeSkills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono font-semibold tracking-wider uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-text">
            Skills &amp; <span className="gradient-text-accent">Expertise</span>
          </h2>
          <p className="text-base sm:text-lg text-surface-muted">
            Specialized toolkit spanning modern frontend architectures, robust backend systems, and cutting-edge artificial intelligence.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-accent text-white shadow-[0_0_15px_var(--primary-glow)] font-semibold"
                    : "glass-card text-surface-muted hover:text-surface-text hover:border-accent/40"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill._id || skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
