"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToTarget } from "@/components/SmoothScroll";
import { useTheme } from "@/context/ThemeContext";

const NAV_LINKS = [
  { label: "Games", href: "#games" },
  { label: "Mini-Game", href: "#minigame" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#services" },
  { label: "Quest Log", href: "#process" },
  { label: "Party", href: "#team" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark } = useTheme();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToTarget(href);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-[3px] z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-[#0F0F1A]/80 text-white"
          : "border-gray-200/70 bg-white/80 text-[#1A1A2E]"
      }`}
    >
      <nav
        aria-label="Primary Navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          aria-label="AZYMAR Home"
          className="group flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE]"
        >
          <img
            src="/images/brand/azymar-logo.png"
            alt="AZYMAR Logo"
            className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight">
              AZYMAR
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6B7280] dark:text-gray-400">
              Game &amp; XR Studio
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#4361EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] dark:text-gray-300 dark:hover:text-[#4361EE]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://azymar.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-1.5 text-xs font-semibold text-[#1A1A2E] transition-colors hover:border-[#4361EE] hover:text-[#4361EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] dark:border-white/15 dark:text-gray-200"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Playground Live
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="rounded-full bg-[#4361EE] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:scale-105 hover:bg-[#3651d4] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] focus-visible:ring-offset-2"
          >
            Start a Project
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#1A1A2E] hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] md:hidden dark:text-white dark:hover:bg-white/10"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`overflow-hidden border-t md:hidden ${
              isDark
                ? "border-white/10 bg-[#0F0F1A]"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-gray-50 hover:text-[#4361EE] dark:text-gray-200 dark:hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-2 pt-2">
                <a
                  href="https://azymar.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full border border-gray-200 py-2.5 text-center text-xs font-semibold text-[#1A1A2E] dark:border-white/15 dark:text-white"
                >
                  Playground Live ↗
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="flex-1 rounded-full bg-[#4361EE] py-2.5 text-center text-xs font-semibold text-white"
                >
                  Start a Project
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
