"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, FolderGit2, Cpu, Award, Sparkles, Terminal, Rocket, CheckCircle2 } from "lucide-react";
import StatCounter from "./StatCounter";
import { ProfileData } from "@/lib/seedData";

interface AboutSectionProps {
  profile: ProfileData;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const highlights = [
    "Full-lifecycle autonomous AI agents & workflow orchestration",
    "Scalable high-concurrency microservices & Next.js web applications",
    "Vector embeddings, RAG pipelines, and hybrid semantic retrieval",
    "Modern cloud-native architecture, Docker containerization & CI/CD",
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover My Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-text">
            About <span className="gradient-text-accent">Me</span>
          </h2>
          <p className="text-base sm:text-lg text-surface-muted">
            Crafting intelligent digital experiences at the intersection of modern software engineering and artificial intelligence.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Glass Card with Profile Bio */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-8 rounded-3xl glass-card border border-surface-border space-y-6 shadow-xl relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-accent/10 text-accent border border-accent/20">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-surface-text">
                    Engineering Intelligent Systems
                  </h3>
                  <p className="text-xs font-mono text-accent">
                    {profile?.headline || "AI Engineer & Full Stack Developer"}
                  </p>
                </div>
              </div>

              <p className="text-surface-muted leading-relaxed text-base">
                {profile?.longBio ||
                  "I am a passionate software engineer specializing in building intelligent full-stack applications, scalable distributed architectures, and AI-powered systems. With deep expertise across Next.js, Node.js, Python, and Large Language Models, I design high-performance solutions that bridge the gap between advanced algorithms and seamless user experiences."}
              </p>

              {/* Core Competencies Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-surface-subtle font-semibold">
                  Key Focus Areas
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-surface-text">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Statistics Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <StatCounter
              label="Years Experience"
              value={profile?.stats?.yearsExperience || "4+"}
              icon={<Briefcase className="w-5 h-5" />}
            />
            <StatCounter
              label="Projects Completed"
              value={profile?.stats?.projectsCompleted || "25+"}
              icon={<FolderGit2 className="w-5 h-5" />}
            />
            <StatCounter
              label="Technologies"
              value={profile?.stats?.technologies || "30+"}
              icon={<Cpu className="w-5 h-5" />}
            />
            <StatCounter
              label="Certificates"
              value={profile?.stats?.certificates || "8+"}
              icon={<Award className="w-5 h-5" />}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
