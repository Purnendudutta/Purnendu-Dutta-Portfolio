"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Brain,
  Database,
  Cloud,
  Terminal,
  Cpu,
  Sparkles,
  Layers,
  Network,
} from "lucide-react";

export default function TechGraphic() {
  return (
    <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center select-none">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 rounded-full bg-accent/15 blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute w-3/4 h-3/4 rounded-full bg-accent-secondary/15 blur-2xl -z-10" />

      {/* Futuristic Orbit Rings */}
      <div className="absolute inset-4 rounded-full border border-dashed border-surface-border animate-spin-slow opacity-40 pointer-events-none" />
      <div className="absolute inset-16 rounded-full border border-surface-border/60 opacity-60 pointer-events-none" />
      <div className="absolute inset-28 rounded-full border border-accent/20 animate-pulse pointer-events-none" />

      {/* SVG Connecting Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 400 400">
        <line x1="200" y1="200" x2="80" y2="90" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
        <line x1="200" y1="200" x2="320" y2="80" stroke="var(--secondary)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="200" y1="200" x2="330" y2="290" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="200" y1="200" x2="70" y2="300" stroke="var(--secondary)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="200" y1="200" x2="200" y2="50" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="200" y1="200" x2="200" y2="350" stroke="var(--secondary)" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>

      {/* Central Neural / AI Core Node */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 flex flex-col items-center justify-center w-32 h-32 rounded-3xl glass-panel border border-accent/40 shadow-[0_0_35px_var(--primary-glow)] bg-surface-card/90 cursor-pointer group"
      >
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent to-accent-secondary opacity-30 blur-md group-hover:opacity-70 transition-opacity" />
        <div className="relative flex flex-col items-center gap-1.5 text-center">
          <Cpu className="w-9 h-9 text-accent group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[11px] font-mono font-bold tracking-wider text-surface-text">
            AI CORE
          </span>
          <span className="text-[9px] font-mono text-accent font-medium">
            ONLINE
          </span>
        </div>
      </motion.div>

      {/* Floating Orbital Node 1: Code */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-8 z-10 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl glass-panel border border-surface-border hover:border-accent shadow-lg bg-surface-card/85 cursor-default group transition-all"
      >
        <div className="p-2 rounded-xl bg-accent/15 text-accent group-hover:shadow-[0_0_12px_var(--primary)] transition-all">
          <Code className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-surface-text">TypeScript</span>
          <span className="text-[10px] font-mono text-surface-muted">Next.js & React</span>
        </div>
      </motion.div>

      {/* Floating Orbital Node 2: AI & LLM Engine */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-6 right-6 z-10 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl glass-panel border border-surface-border hover:border-accent shadow-lg bg-surface-card/85 cursor-default group transition-all"
      >
        <div className="p-2 rounded-xl bg-accent/15 text-accent group-hover:shadow-[0_0_12px_var(--primary)] transition-all">
          <Brain className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-surface-text">LLM Agents</span>
          <span className="text-[10px] font-mono text-surface-muted">LangGraph & RAG</span>
        </div>
      </motion.div>

      {/* Floating Orbital Node 3: Database */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-4 z-10 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl glass-panel border border-surface-border hover:border-accent shadow-lg bg-surface-card/85 cursor-default group transition-all"
      >
        <div className="p-2 rounded-xl bg-accent/15 text-accent group-hover:shadow-[0_0_12px_var(--primary)] transition-all">
          <Database className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-surface-text">MongoDB</span>
          <span className="text-[10px] font-mono text-surface-muted">Postgres & Vector DB</span>
        </div>
      </motion.div>

      {/* Floating Orbital Node 4: Cloud & DevOps */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-12 left-4 z-10 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl glass-panel border border-surface-border hover:border-accent shadow-lg bg-surface-card/85 cursor-default group transition-all"
      >
        <div className="p-2 rounded-xl bg-accent/15 text-accent group-hover:shadow-[0_0_12px_var(--primary)] transition-all">
          <Cloud className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-surface-text">Cloud & Docker</span>
          <span className="text-[10px] font-mono text-surface-muted">AWS Architecture</span>
        </div>
      </motion.div>

      {/* Micro Node: Terminal */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 p-2 rounded-xl glass-panel border border-surface-border text-accent shadow-md"
      >
        <Terminal className="w-4 h-4" />
      </motion.div>

      {/* Micro Node: Network */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2 rounded-xl glass-panel border border-surface-border text-accent shadow-md"
      >
        <Network className="w-4 h-4" />
      </motion.div>
    </div>
  );
}
