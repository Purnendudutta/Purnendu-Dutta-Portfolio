"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import AccentSwitcher from "./AccentSwitcher";

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

interface NavbarProps {
  brandName?: string;
  logoUrl?: string;
}

export default function Navbar({ logoUrl = "/logo.png" }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Monitor scroll for navbar glassmorphic background & active link tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section intersection detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-surface-bg/85 backdrop-blur-xl border-b border-surface-border py-3.5 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Small PNG Brand Logo */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 group transition-all"
          aria-label="Home"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden p-1 border border-accent/30 bg-surface-card group-hover:border-accent shadow-[0_0_15px_var(--primary-glow)] transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
            <Image
              src={logoUrl || "/logo.png"}
              alt="Logo"
              width={40}
              height={40}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            const isHovered = hoveredItem === item.name;

            return (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-accent font-semibold -translate-y-0.5"
                    : isHovered
                    ? "text-accent -translate-y-0.5"
                    : "text-surface-muted hover:text-surface-text"
                }`}
              >
                <span>{item.name}</span>

                {/* Animated underline with glow */}
                {(isActive || isHovered) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent rounded-full"
                    style={{
                      boxShadow: "0 0 10px var(--primary-glow), 0 0 20px var(--primary-glow)",
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Switchers */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <AccentSwitcher />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2.5 rounded-xl border border-surface-border bg-surface-card text-surface-text hover:text-accent transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-surface-border bg-surface-bg/95 backdrop-blur-2xl px-6 py-4"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? "bg-accent/15 text-accent border border-accent/30 font-semibold"
                        : "text-surface-muted hover:bg-surface-card-hover hover:text-surface-text"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
