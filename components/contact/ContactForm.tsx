"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/lib/context/ToastContext";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Basic client validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message: data.message || "Thank you! Your message has been sent successfully.",
        });
        showToast("Message sent successfully! I'll reply soon.", "success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
        showToast(data.error || "Failed to send message", "error");
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
      showToast("Network error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-surface-border space-y-6 shadow-xl relative overflow-hidden">
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-surface-text">
          Let&apos;s Work Together
        </h3>
        <p className="text-sm text-surface-muted mt-1.5">
          Have an idea, project, or open role in mind? Send me a message and let&apos;s connect.
        </p>
      </div>

      {status && (
        <div
          className={`p-4 rounded-2xl flex items-start gap-3 text-sm border ${
            status.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
              : "bg-rose-950/60 border-rose-500/30 text-rose-300"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="text-xs font-mono font-medium text-surface-muted">
              Your Name *
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
              className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="text-xs font-mono font-medium text-surface-muted">
              Email Address *
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              required
              className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-subject" className="text-xs font-mono font-medium text-surface-muted">
            Subject *
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Project Consultation / AI Engineering Opportunity"
            required
            className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-xs font-mono font-medium text-surface-muted">
            Message *
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your project, goals, or timeline..."
            required
            className="w-full px-4 py-3 rounded-xl glass-input text-sm text-surface-text resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-semibold text-white bg-accent hover:bg-accent-dark shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_30px_var(--primary-glow)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
