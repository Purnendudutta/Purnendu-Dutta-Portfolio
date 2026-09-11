"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/context/ToastContext";

const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

export default function AdminSessionGuard() {
  const router = useRouter();
  const { showToast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAutoLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      showToast("Session timed out due to inactivity. Please log in again.", "info");
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      router.push("/admin/login");
    }
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleAutoLogout, INACTIVITY_TIMEOUT_MS);
  };

  useEffect(() => {
    // Activity listeners
    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
    const handleActivity = () => resetTimer();

    events.forEach((ev) => window.addEventListener(ev, handleActivity, { passive: true }));
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((ev) => window.removeEventListener(ev, handleActivity));
    };
  }, []);

  return null;
}
