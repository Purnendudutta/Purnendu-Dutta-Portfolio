"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "dark" | "light";
export type AccentColor = "purple" | "cyan" | "green" | "orange" | "pink" | "red";

export interface AccentOption {
  id: AccentColor;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  colorClass: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  {
    id: "purple",
    name: "Purple / Blue",
    primaryColor: "#8b5cf6",
    secondaryColor: "#3b82f6",
    colorClass: "bg-purple-500",
  },
  {
    id: "cyan",
    name: "Cyan",
    primaryColor: "#06b6d4",
    secondaryColor: "#3b82f6",
    colorClass: "bg-cyan-500",
  },
  {
    id: "green",
    name: "Green",
    primaryColor: "#10b981",
    secondaryColor: "#06b6d4",
    colorClass: "bg-emerald-500",
  },
  {
    id: "orange",
    name: "Orange",
    primaryColor: "#f97316",
    secondaryColor: "#eab308",
    colorClass: "bg-orange-500",
  },
  {
    id: "pink",
    name: "Pink",
    primaryColor: "#ec4899",
    secondaryColor: "#8b5cf6",
    colorClass: "bg-pink-500",
  },
  {
    id: "red",
    name: "Red",
    primaryColor: "#ef4444",
    secondaryColor: "#f97316",
    colorClass: "bg-red-500",
  },
];

interface ThemeContextType {
  mode: ThemeMode;
  accent: AccentColor;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [accent, setAccentState] = useState<AccentColor>("purple");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage
    const savedMode = localStorage.getItem("portfolio_theme_mode") as ThemeMode | null;
    const savedAccent = localStorage.getItem("portfolio_theme_accent") as AccentColor | null;

    if (savedMode && (savedMode === "dark" || savedMode === "light")) {
      setModeState(savedMode);
    }
    if (savedAccent && ACCENT_OPTIONS.some((opt) => opt.id === savedAccent)) {
      setAccentState(savedAccent);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    // Update Mode class
    if (mode === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("portfolio_theme_mode", mode);

    // Update Accent attribute
    root.setAttribute("data-accent", accent);
    document.body.setAttribute("data-accent", accent);
    localStorage.setItem("portfolio_theme_accent", accent);
  }, [mode, accent, mounted]);

  const toggleMode = () => {
    setModeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
  };

  return (
    <ThemeContext.Provider value={{ mode, accent, toggleMode, setMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
