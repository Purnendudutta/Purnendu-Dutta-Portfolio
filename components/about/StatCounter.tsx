"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatCounterProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export default function StatCounter({ label, value, icon }: StatCounterProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-5 rounded-2xl glass-card border border-surface-border flex flex-col items-center sm:items-start text-center sm:text-left relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full group-hover:bg-accent/10 transition-colors pointer-events-none" />
      {icon && (
        <div className="mb-2 p-2 rounded-xl bg-accent/10 text-accent group-hover:shadow-[0_0_12px_var(--primary-glow)] transition-all">
          {icon}
        </div>
      )}
      <div className="text-3xl sm:text-4xl font-extrabold font-mono text-surface-text tracking-tight group-hover:text-accent transition-colors">
        {value}
      </div>
      <div className="text-xs sm:text-sm font-medium text-surface-muted mt-1">
        {label}
      </div>
    </motion.div>
  );
}
