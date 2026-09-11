"use client";

import React, { useState, useEffect } from "react";

interface TypewriterProps {
  roles?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function Typewriter({
  roles = ["AI Engineer", "Full Stack Developer", "Web Developer", "Software Engineer"],
  typingSpeed = 75,
  deletingSpeed = 40,
  pauseDuration = 1600,
}: TypewriterProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Ensure safe array of roles
  const roleList =
    Array.isArray(roles) && roles.length > 0
      ? roles
      : ["AI Engineer", "Full Stack Developer", "Web Developer", "Software Engineer"];

  const currentPhrase = roleList[roleIndex % roleList.length];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Still typing
      if (text.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, typingSpeed);
      } else {
        // Full phrase typed -> pause, then start deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting -> move to next word
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roleList.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentPhrase, roleList.length, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center text-accent font-semibold">
      <span>{text}</span>
      <span className="ml-1 inline-block w-[2.5px] h-[1.15em] bg-accent align-middle animate-pulse shadow-[0_0_10px_var(--primary-glow)]" />
    </span>
  );
}
