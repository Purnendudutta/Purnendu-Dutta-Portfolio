"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import CertificateCard from "./CertificateCard";
import CertificateModal from "./CertificateModal";
import { CertificateData } from "@/lib/seedData";

interface CertificatesSectionProps {
  certificates: CertificateData[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);

  const activeCerts = (certificates || []).filter((c) => c.isActive !== false);

  return (
    <section id="certificates" className="py-20 md:py-28 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono font-semibold tracking-wider uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-text">
            Certifications &amp; <span className="gradient-text-accent">Badges</span>
          </h2>
          <p className="text-base sm:text-lg text-surface-muted">
            Continuous industry validation across cloud architecture, machine learning engineering, and full-stack development.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeCerts.map((cert) => (
            <CertificateCard
              key={cert._id || cert.title}
              certificate={cert}
              onOpenModal={(c) => setSelectedCertificate(c)}
            />
          ))}
        </div>
      </div>

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
}
