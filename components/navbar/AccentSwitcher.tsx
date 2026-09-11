"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { useTheme, ACCENT_OPTIONS, AccentColor } from "@/lib/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function AccentSwitcher() {
  const { accent, setAccent } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentOption = ACCENT_OPTIONS.find((opt) => opt.id === accent) || ACCENT_OPTIONS[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Customize accent color theme"
        aria-expanded={isOpen}
        className="flex items-center gap-2 p-2.5 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent transition-all duration-300 group shadow-sm"
      >
        <div
          className="w-4 h-4 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${currentOption.primaryColor}, ${currentOption.secondaryColor})`,
            boxShadow: `0 0 10px ${currentOption.primaryColor}80`,
          }}
        />
        <Palette className="w-4 h-4 text-surface-muted group-hover:text-accent transition-colors hidden sm:block" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-56 p-3 rounded-2xl glass-panel shadow-2xl z-50 border border-surface-border"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-surface-muted px-2 py-1.5 mb-1">
              Choose Accent
            </div>
            <div className="space-y-1">
              {ACCENT_OPTIONS.map((opt) => {
                const isSelected = accent === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setAccent(opt.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-accent/15 text-accent border border-accent/30 font-semibold"
                        : "text-surface-text hover:bg-surface-card-hover hover:text-accent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${opt.primaryColor}, ${opt.secondaryColor})`,
                          boxShadow: isSelected ? `0 0 12px ${opt.primaryColor}` : "none",
                        }}
                      />
                      <span>{opt.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-accent" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
