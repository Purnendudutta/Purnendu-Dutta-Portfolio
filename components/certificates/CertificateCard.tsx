"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { CertificateData } from "@/lib/seedData";

interface CertificateCardProps {
  certificate: CertificateData;
  onOpenModal: (certificate: CertificateData) => void;
}

export default function CertificateCard({ certificate, onOpenModal }: CertificateCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpenModal(certificate)}
      className="group relative rounded-3xl glass-card border border-surface-border overflow-hidden flex flex-col h-full shadow-lg hover:border-accent hover:shadow-[0_15px_35px_-10px_var(--primary-glow)] cursor-pointer"
    >
      {/* Certificate Image Container with Hover Overlay */}
      <div className="relative w-full h-48 overflow-hidden bg-surface-card">
        <Image
          src={certificate.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"}
          alt={certificate.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Default subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-accent/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="px-4 py-2 rounded-xl bg-black/80 border border-white/20 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span>View Certificate</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono flex items-center gap-1 z-10">
          <Calendar className="w-3 h-3 text-accent" />
          <span>{certificate.date}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-mono text-accent font-semibold">
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{certificate.issuer}</span>
          </div>
          <h4 className="font-bold text-base text-surface-text group-hover:text-accent transition-colors line-clamp-2 leading-snug">
            {certificate.title}
          </h4>
        </div>

        {certificate.credentialId && (
          <div className="pt-2 border-t border-surface-border text-[11px] font-mono text-surface-subtle truncate">
            ID: {certificate.credentialId}
          </div>
        )}
      </div>
    </motion.div>
  );
}
