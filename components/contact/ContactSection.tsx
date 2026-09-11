"use client";

import React from "react";
import { Mail } from "lucide-react";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";
import { ProfileData } from "@/lib/seedData";

interface ContactSectionProps {
  profile: ProfileData;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-grid-pattern">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono font-semibold tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-text">
            Let&apos;s Build <span className="gradient-text-accent">Something Great</span>
          </h2>
          <p className="text-base sm:text-lg text-surface-muted">
            Interested in collaboration, engineering leadership, or building next-generation AI software? Send a note below.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <ContactDetails profile={profile} />
          </div>
        </div>
      </div>
    </section>
  );
}
