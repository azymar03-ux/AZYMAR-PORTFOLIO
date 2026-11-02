"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { scrollToTarget } from "@/components/SmoothScroll";

const SOCIALS = [
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/azymar/posts/?feedView=all",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/azymar_studios/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    name: "WhatsApp Channel",
    href: "http://whatsapp.com/channel/0029Vb7UvOFIN9iemhBqrU0q",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29z" />
      </svg>
    ),
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    href: "https://x.com/azymar03",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "discord",
    name: "Discord",
    href: "https://discord.gg/dnAXsrr8A",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export default function FooterSection() {
  const { toggleDarkMode, prefersReducedMotion } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [eggClicks, setEggClicks] = useState(0);
  const clickResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCopyrightClick = () => {
    if (clickResetTimer.current) clearTimeout(clickResetTimer.current);

    const nextCount = eggClicks + 1;
    if (nextCount >= 5) {
      setEggClicks(0);
      toggleDarkMode();
    } else {
      setEggClicks(nextCount);
      clickResetTimer.current = setTimeout(() => setEggClicks(0), 2500);
    }
  };

  return (
    <footer className="relative bg-[#1A1A2E] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column Top-Left */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/images/brand/azymar-logo.png"
                alt="AZYMAR Logo"
                className="h-10 w-10 object-contain"
              />
              <div>
                <span className="font-display text-xl font-bold tracking-tight">
                  AZYMAR Studios
                </span>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
                  Play · Simulate · Verify
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Crafting unforgettable worlds across PC, Console, Mobile &amp;
              Spatial XR — from AZYMAR Playground&apos;s live arcade to
              mythological RPGs and surgical simulations.
            </p>

            {/* SVG Brand Social Icons with Smooth Hover Bounce */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((soc) => (
                <motion.a
                  key={soc.id}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  title={soc.name}
                  whileHover={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-300 transition-all hover:border-[#4361EE] hover:bg-[#4361EE] hover:text-white hover:shadow-lg hover:shadow-[#4361EE]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE]"
                >
                  {soc.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* 3-Column Links: Studio, Games, Connect */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-7">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Studio
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#about")}
                    className="transition hover:text-white"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#services")}
                    className="transition hover:text-white"
                  >
                    Skill Tree
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#process")}
                    className="transition hover:text-white"
                  >
                    Quest Log
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#careers")}
                    className="transition hover:text-white"
                  >
                    Careers
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Games
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
                <li>
                  <a
                    href="https://azymar.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white"
                  >
                    AZYMAR Playground
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#games")}
                    className="transition hover:text-white"
                  >
                    Murugan RPG
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#games")}
                    className="transition hover:text-white"
                  >
                    VR Surgical Sim
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#games")}
                    className="transition hover:text-white"
                  >
                    Verity Systems
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Connect
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#contact")}
                    className="transition hover:text-white"
                  >
                    Send a Signal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#minigame")}
                    className="transition hover:text-white"
                  >
                    Mini-Game
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#team")}
                    className="transition hover:text-white"
                  >
                    The Party
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:azymar03@gmail.com"
                    className="transition hover:text-white"
                  >
                    Press Kit &amp; Inquiries
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Line + 5-Click Secret Dark Mode Easter Egg */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-400 sm:flex-row">
          <p className="select-none">
            <button
              type="button"
              onClick={handleCopyrightClick}
              aria-label="Copyright 2026 — secret theme toggle easter egg on 5 clicks"
              title={
                eggClicks > 0
                  ? `${5 - eggClicks} more click${5 - eggClicks === 1 ? "" : "s"}...`
                  : "© 2026"
              }
              className="rounded px-1 py-0.5 font-mono text-gray-300 transition hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#4361EE]"
            >
              © 2026
            </button>{" "}
            AZYMAR Studios. All rights reserved.
            {eggClicks > 0 && (
              <span className="ml-2 font-mono text-[10px] text-[#4361EE]">
                [{eggClicks}/5]
              </span>
            )}
          </p>

          <p className="text-gray-500">
            Crafted with Next.js, Framer Motion &amp; React Three Fiber · Chennai
            &amp; Worldwide
          </p>
        </div>
      </div>

      {/* Fixed Back to Top Button (appears after scrolling 500px) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            onClick={() => scrollToTarget(0)}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-[65] flex h-12 w-12 items-center justify-center rounded-full bg-[#4361EE] text-white shadow-xl transition hover:scale-110 hover:bg-[#3651d4] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
