"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/lib/context/ToastContext";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  recommendedSize?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
  recommendedSize = "1200x800px recommended",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [useUrlInput, setUseUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("File size must be under 5MB", "error");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
        setUrlValue(data.url);
        showToast("Image uploaded successfully", "success");
      } else {
        showToast(data.error || "Failed to upload image", "error");
      }
    } catch (err) {
      showToast("Upload failed due to network error", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlValue.trim()) {
      onChange(urlValue.trim());
      showToast("Image URL applied", "success");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-medium text-surface-muted">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setUseUrlInput(!useUrlInput)}
          className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
        >
          {useUrlInput ? <Upload className="w-3 h-3" /> : <LinkIcon className="w-3 h-3" />}
          <span>{useUrlInput ? "Upload File" : "Paste URL"}</span>
        </button>
      </div>

      {value ? (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-surface-border bg-surface-card group">
          <Image
            src={value}
            alt="Uploaded preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setUrlValue("");
              }}
              className="p-2 rounded-xl bg-rose-500/80 text-white hover:bg-rose-600 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : useUrlInput ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="flex-grow px-4 py-2.5 rounded-xl glass-input text-xs text-surface-text"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-medium hover:bg-accent-dark transition-all"
          >
            Apply
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-36 border-2 border-dashed border-surface-border hover:border-accent rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer bg-surface-card/40 hover:bg-surface-card transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <span className="text-xs text-surface-muted">Uploading image...</span>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-2xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-surface-text">
                  Click to upload image
                </span>
                <p className="text-[10px] text-surface-subtle">{recommendedSize}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
