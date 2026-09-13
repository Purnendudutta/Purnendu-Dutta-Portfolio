"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, Calendar, Hash } from "lucide-react";
import { CertificateData } from "@/lib/seedData";

interface CertificateModalProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (certificate) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-surface-border bg-surface-bg shadow-2xl p-6 sm:p-8 space-y-6"
        >
          <button
            onClick={onClose}
            aria-label="Close certificate modal"
            className="absolute top-5 right-5 p-2 rounded-xl bg-surface-card border border-surface-border text-surface-muted hover:text-surface-text hover:border-accent transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Certificate Image View */}
          <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-surface-border bg-surface-card">
            <Image
              src={certificate.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"}
              alt={certificate.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold">
              <Award className="w-4 h-4" />
              <span>{certificate.issuer}</span>
            </div>
            <h3 className="text-2xl font-bold text-surface-text">
              {certificate.title}
            </h3>
          </div>

          {/* Meta Details */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-surface-card border border-surface-border">
            <div className="space-y-1">
              <div className="text-xs text-surface-muted flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>Issue Date</span>
              </div>
              <div className="text-sm font-semibold text-surface-text font-mono">
                {certificate.date}
              </div>
            </div>

            {certificate.credentialId && (
              <div className="space-y-1">
                <div className="text-xs text-surface-muted flex items-center gap-1.5 font-medium">
                  <Hash className="w-3.5 h-3.5 text-accent" />
                  <span>Credential ID</span>
                </div>
                <div className="text-xs font-mono font-semibold text-surface-text truncate">
                  {certificate.credentialId}
                </div>
              </div>
            )}
          </div>

          {/* Action */}
          {certificate.verificationUrl && (
            <div className="pt-2">
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-semibold shadow-[0_0_15px_var(--primary-glow)] hover:bg-accent-dark transition-all"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
