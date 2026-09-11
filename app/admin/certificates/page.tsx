"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  ExternalLink,
  X,
  Loader2,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import { useToast } from "@/lib/context/ToastContext";
import { CertificateData } from "@/lib/seedData";

export default function AdminCertificatesManagerPage() {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateData | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<Partial<CertificateData>>({
    title: "",
    issuer: "",
    image: "",
    date: new Date().getFullYear().toString(),
    credentialId: "",
    verificationUrl: "",
    order: 0,
    isActive: true,
  });

  const fetchCertificates = async () => {
    try {
      const res = await fetch("/api/certificates");
      const data = await res.json();
      if (data.certificates) {
        setCertificates(data.certificates);
      }
    } catch (err) {
      showToast("Failed to fetch certificates", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const openCreateModal = () => {
    setEditingCert(null);
    setFormData({
      title: "",
      issuer: "",
      image: "",
      date: new Date().getFullYear().toString(),
      credentialId: "",
      verificationUrl: "",
      order: certificates.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (cert: CertificateData) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      image: cert.image,
      date: cert.date,
      credentialId: cert.credentialId,
      verificationUrl: cert.verificationUrl,
      order: cert.order,
      isActive: cert.isActive,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !confirm("Are you sure you want to delete this certificate?")) return;

    try {
      const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCertificates(certificates.filter((c) => c._id !== id));
        showToast("Certificate deleted", "success");
      }
    } catch (err) {
      showToast("Error deleting certificate", "error");
    }
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingCert && editingCert._id) {
        const res = await fetch(`/api/certificates/${editingCert._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast("Certificate updated", "success");
          fetchCertificates();
          setModalOpen(false);
        }
      } else {
        const res = await fetch("/api/certificates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast("Certificate added", "success");
          fetchCertificates();
          setModalOpen(false);
        }
      }
    } catch (err) {
      showToast("Error saving certificate", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Certificates Manager"
        subtitle="Upload verified credentials, issuers, credential IDs, and verification badges"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-8">
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-surface-text">Certificates List</h2>
            <p className="text-xs text-surface-muted">
              {certificates.length} Total Certificates
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs shadow-[0_0_15px_var(--primary-glow)] hover:bg-accent-dark transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Certificate</span>
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert._id || cert.title}
                className="rounded-3xl glass-card border border-surface-border overflow-hidden flex flex-col justify-between group shadow-lg"
              >
                <div className="relative w-full h-44 bg-surface-card overflow-hidden">
                  <Image
                    src={cert.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"}
                    alt={cert.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-mono flex items-center gap-1 backdrop-blur-md">
                    <Calendar className="w-3 h-3 text-accent" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-accent font-semibold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{cert.issuer}</span>
                    </div>
                    <h3 className="font-bold text-sm text-surface-text line-clamp-2">
                      {cert.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-surface-border flex items-center justify-between">
                    <span className="text-[11px] font-mono text-surface-subtle truncate max-w-[150px]">
                      {cert.credentialId || "No ID"}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(cert)}
                        className="p-1.5 rounded-lg text-surface-muted hover:text-accent hover:bg-accent/10 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cert._id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-lg rounded-3xl glass-panel border border-surface-border bg-surface-bg p-6 sm:p-8 space-y-6 shadow-2xl my-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-surface-text">
                  {editingCert ? "Edit Certificate" : "Add New Certificate"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-xl text-surface-muted hover:text-surface-text"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCert} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-surface-muted">
                    Certificate Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. AWS Certified Solutions Architect"
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Issuing Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.issuer || ""}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                      placeholder="e.g. Amazon Web Services"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-surface-muted">
                      Year / Date *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.date || ""}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="2026"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                    />
                  </div>
                </div>

                <ImageUploader
                  label="Certificate Image"
                  value={formData.image || ""}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  recommendedSize="800x600px recommended"
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-surface-muted">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    value={formData.credentialId || ""}
                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                    placeholder="e.g. AWS-SAA-904812"
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-surface-muted">
                    Verification URL
                  </label>
                  <input
                    type="url"
                    value={formData.verificationUrl || ""}
                    onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="cert-active"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded accent-accent"
                  />
                  <label htmlFor="cert-active" className="text-xs text-surface-text font-medium">
                    Certificate is active and visible on public portfolio
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-surface-border text-xs font-medium text-surface-muted hover:text-surface-text"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-accent text-white text-xs font-bold shadow-[0_0_15px_var(--primary-glow)] hover:bg-accent-dark transition-all disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Certificate"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
