"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeroFrameProps {
  imageSrc?: string;
  name?: string;
}

export default function HeroFrame({
  imageSrc = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  name = "Purnendu Dutta",
}: HeroFrameProps) {
  const displayImage =
    imageSrc && imageSrc.trim() !== ""
      ? imageSrc
      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square flex items-center justify-center select-none py-4">
      {/* Background Pulsing Neon Glow Blobs */}
      <div className="absolute inset-4 rounded-full bg-accent/25 blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute inset-10 rounded-full bg-accent-secondary/20 blur-2xl -z-10" />

      {/* Rotating Outer Distressed Grunge / Ink Splatter Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grungeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
              <stop offset="50%" stopColor="var(--secondary)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="grungeGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.85" />
              <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.75" />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.9" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Organic Distressed Brush Stroke Ring 1 */}
          <path
            d="M 250 35 
               C 365 30, 460 120, 465 240 
               C 470 360, 375 465, 255 465 
               C 135 465, 35 375, 35 250 
               C 35 130, 130 40, 250 35 Z
               M 250 55 
               C 145 60, 55 145, 55 250 
               C 55 355, 145 445, 250 445 
               C 355 445, 445 355, 445 250 
               C 445 145, 355 55, 250 55 Z"
            fill="url(#grungeGrad1)"
            opacity="0.85"
            filter="url(#neonGlow)"
          />

          {/* Rough Distressed Brush Edges & Teeth (Layer 2) */}
          <path
            d="M 245 20 Q 280 15, 315 28 Q 360 45, 395 75 Q 435 115, 458 165 Q 475 210, 478 255 Q 480 305, 460 350 Q 435 400, 395 435 Q 350 470, 295 480 Q 240 485, 190 472 Q 135 450, 95 410 Q 50 365, 30 310 Q 15 260, 22 205 Q 35 145, 75 98 Q 120 45, 185 24 Z"
            fill="none"
            stroke="url(#grungeGrad2)"
            strokeWidth="7"
            strokeDasharray="18 12 35 10 8 16 42 14"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlow)"
          />

          {/* Splatter Dots & Ink Droplets Orbiting */}
          <circle cx="482" cy="220" r="4.5" fill="var(--primary)" opacity="0.9" />
          <circle cx="495" cy="245" r="2.5" fill="var(--secondary)" opacity="0.8" />
          <circle cx="468" cy="140" r="3.5" fill="var(--primary)" opacity="0.85" />
          <circle cx="410" cy="55" r="5" fill="var(--secondary)" opacity="0.9" />
          <circle cx="430" cy="40" r="2" fill="var(--primary)" opacity="0.7" />
          <circle cx="160" cy="18" r="4" fill="var(--primary)" opacity="0.8" />
          <circle cx="130" cy="12" r="2" fill="var(--secondary)" opacity="0.6" />
          <circle cx="45" cy="120" r="4" fill="var(--secondary)" opacity="0.85" />
          <circle cx="20" cy="150" r="2.5" fill="var(--primary)" opacity="0.7" />
          <circle cx="12" cy="280" r="4.5" fill="var(--primary)" opacity="0.9" />
          <circle cx="35" cy="380" r="3.5" fill="var(--secondary)" opacity="0.8" />
          <circle cx="70" cy="445" r="5" fill="var(--primary)" opacity="0.9" />
          <circle cx="100" cy="470" r="2" fill="var(--secondary)" opacity="0.6" />
          <circle cx="340" cy="485" r="4" fill="var(--secondary)" opacity="0.85" />
          <circle cx="370" cy="465" r="2.5" fill="var(--primary)" opacity="0.7" />
          <circle cx="445" cy="390" r="3.5" fill="var(--primary)" opacity="0.8" />
        </svg>
      </motion.div>

      {/* Reverse Rotating Secondary Brush Texture Layer */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 w-full h-full pointer-events-none opacity-80"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 250 42 
               C 340 38, 420 100, 448 185 
               C 475 270, 440 365, 380 425 
               C 310 480, 205 482, 130 435 
               C 60 385, 32 290, 48 200 
               C 65 115, 150 48, 250 42 Z"
            fill="none"
            stroke="url(#grungeGrad1)"
            strokeWidth="5"
            strokeDasharray="40 18 10 22 55 15 25 12"
            strokeLinecap="round"
            filter="url(#neonGlow)"
          />
        </svg>
      </motion.div>

      {/* Main Circular Profile Image Container with Brush Contour */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full p-2.5 glass-panel border border-surface-border shadow-2xl group cursor-pointer"
        style={{
          boxShadow: "0 0 35px var(--primary-glow), inset 0 0 20px var(--primary-glow)",
        }}
      >
        {/* Inner Glowing Ring */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent/40 group-hover:border-accent transition-colors duration-500 bg-surface-card">
          <Image
            src={displayImage}
            alt={name || "Hero Image"}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
            priority
          />

          {/* Radial Gradient Vignette for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Floating Status Pill at bottom center */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-surface-bg/95 border border-accent/40 backdrop-blur-xl shadow-lg flex items-center gap-2 z-20 group-hover:border-accent transition-all duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-[11px] font-mono font-bold text-surface-text tracking-wider uppercase flex items-center gap-1">
            <span>AI ENGINEER</span>
            <Sparkles className="w-3 h-3 text-accent" />
          </span>
        </div>
      </motion.div>
    </div>
  );
}
