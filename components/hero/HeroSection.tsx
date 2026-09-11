"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail } from "lucide-react";
import Typewriter from "./Typewriter";
import HeroFrame from "./HeroFrame";
import { ProfileData } from "@/lib/seedData";

interface HeroSectionProps {
  profile: ProfileData;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const getSocialIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case "github":
        return <Github className="w-5 h-5" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      case "mail":
      case "email":
        return <Mail className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  const dynamicRoles =
    profile?.dynamicRoles && profile.dynamicRoles.length > 0
      ? profile.dynamicRoles
      : ["AI Engineer", "Full Stack Developer", "Web Developer", "Software Engineer"];

  const heroImageSrc = profile?.heroImage || profile?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-accent-secondary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-xs font-mono font-medium text-surface-text">
                Available for high-impact projects & roles
              </span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <p className="text-lg md:text-xl font-mono text-surface-muted font-normal">
                Hi, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-surface-text leading-[1.1]">
                <span className="gradient-text-accent">
                  {profile?.name || "Purnendu Dutta"}
                </span>
              </h1>
            </div>

            {/* Dynamic Typewriter Line */}
            <div className="text-xl sm:text-2xl md:text-3xl font-medium text-surface-text flex items-center flex-wrap gap-2">
              <span className="text-surface-muted">I am a</span>
              <Typewriter roles={dynamicRoles} />
            </div>

            {/* Professional Description */}
            <p className="text-base sm:text-lg text-surface-muted max-w-xl leading-relaxed">
              {profile?.shortDescription ||
                "I build intelligent systems and modern web applications that solve real-world problems."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-accent hover:bg-accent-dark shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_30px_var(--primary-glow)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={profile?.resumeUrl || "/resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-surface-text border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
              >
                <Download className="w-4 h-4 text-accent transition-transform group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Connect Links */}
            <div className="pt-4 space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-surface-subtle">
                Connect with me
              </div>
              <div className="flex items-center gap-3">
                {profile?.socialLinks && profile.socialLinks.length > 0 ? (
                  profile.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="p-2.5 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent text-surface-muted hover:text-accent transition-all duration-300 hover:-translate-y-1 shadow-sm"
                    >
                      {getSocialIcon(social.icon || social.platform)}
                    </a>
                  ))
                ) : (
                  <>
                    <a
                      href="https://github.com/Purnendudutta"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="p-2.5 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent text-surface-muted hover:text-accent transition-all duration-300 hover:-translate-y-1"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/purnendudutta/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="p-2.5 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent text-surface-muted hover:text-accent transition-all duration-300 hover:-translate-y-1"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com/Purnendu521"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="p-2.5 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent text-surface-muted hover:text-accent transition-all duration-300 hover:-translate-y-1"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:purnendudutta8172@gmail.com"
                      aria-label="Email"
                      className="p-2.5 rounded-xl border border-surface-border bg-surface-card hover:bg-surface-card-hover hover:border-accent text-surface-muted hover:text-accent transition-all duration-300 hover:-translate-y-1"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Fixed Modern Futuristic Frame with Editable Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <HeroFrame
              imageSrc={heroImageSrc}
              name={profile?.name || "Purnendu Dutta"}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
