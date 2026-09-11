"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/context/ThemeContext";

export default function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <button
      onClick={toggleMode}
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      className="relative p-2.5 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent transition-all duration-300 group shadow-sm"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {mode === "dark" ? (
          <Moon className="w-4 h-4 text-accent transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
        )}
      </div>
    </button>
  );
}
