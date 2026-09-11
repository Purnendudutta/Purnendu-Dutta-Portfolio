"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowLeft, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import AccentSwitcher from "@/components/navbar/AccentSwitcher";
import { useToast } from "@/lib/context/ToastContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("Welcome back, Administrator!", "success");
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Invalid email or password.");
        showToast(data.error || "Authentication failed", "error");
      }
    } catch (err: any) {
      setError("Network error occurred. Please try again.");
      showToast("Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-6 bg-grid-pattern relative overflow-hidden">
      {/* Dynamic Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-surface-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <AccentSwitcher />
        </div>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-auto p-8 sm:p-10 rounded-3xl glass-panel border border-surface-border shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 text-accent shadow-[0_0_20px_var(--primary-glow)] mb-2">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-text">
            Admin CMS Login
          </h2>
          <p className="text-xs text-surface-muted">
            Enter your administrator credentials to access the management dashboard.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-surface-muted">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-surface-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-surface-text"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-surface-muted">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-surface-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-surface-text"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-accent hover:bg-accent-dark shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_30px_var(--primary-glow)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ShieldCheck className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-xs text-surface-subtle font-mono py-2">
        Portfolio CMS • Protected Route • Session Encryption
      </div>
    </div>
  );
}
