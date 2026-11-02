"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Box, Play, UserCheck, X, ExternalLink } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { scrollToTarget } from "@/components/SmoothScroll";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[340px] w-full items-center justify-center sm:h-[420px] lg:h-[490px]">
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-gray-200/80 bg-white/70 px-6 py-5 backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4361EE] border-t-transparent" />
        <span className="text-xs font-medium text-[#6B7280] dark:text-gray-400">
          Initializing WebGL Scene...
        </span>
      </div>
    </div>
  ),
});

const HERO_HEADING = "We Build Worlds You Can't Put Down";

const SHOWREEL_SLIDES = [
  {
    title: "AZYMAR Playground — Live Arcade Portal",
    tag: "COMPLETED · LIVE",
    image: "/images/projects/playground-hero.jpg",
    caption: "13+ instant-play browser & mobile titles live at azymar.me.",
  },
  {
    title: "Murugan: Surasamharam — Action RPG",
    tag: "ONGOING · UNREAL ENGINE",
    image: "/images/projects/murugan-hero.jpg",
    caption: "Mythological boss combat with celestial Vel abilities and dynamic colosseums.",
  },
  {
    title: "VR Surgical & Medical Simulation",
    tag: "ONGOING · OPENXR 90HZ",
    image: "/images/projects/vr-surg-overview.jpg",
    caption: "Sterile operating theater training with 6DoF surgical instruments and 3D avatars.",
  },
  {
    title: "Verity Research Systems",
    tag: "ONGOING · 21-SCREEN SYSTEM",
    image: "/images/projects/verity-cover.jpg",
    caption: "Zero-trust cryptographic dossier verification and public ledger anchoring.",
  },
];

export default function HeroSection() {
  const { isDark, prefersReducedMotion } = useTheme();
  const [modelMode, setModelMode] = useState<"icosahedron" | "doctor">("icosahedron");
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!showreelOpen) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SHOWREEL_SLIDES.length);
    }, 3600);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowreelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", onKey);
    };
  }, [showreelOpen]);

  const words = HERO_HEADING.split(" ");
  let globalCharIndex = 0;

  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        backgroundImage: isDark
          ? "radial-gradient(rgba(255,255,255,0.09) 2px, transparent 2px)"
          : "radial-gradient(#E5E7EB 2px, transparent 2px)",
        backgroundSize: "30px 30px",
      }}
      className={`relative flex min-h-screen flex-col justify-between overflow-hidden pt-20 ${
        !prefersReducedMotion ? "animate-dot-drift" : ""
      } ${isDark ? "bg-[#0F0F1A]" : "bg-[#FFFFFF]"}`}
    >
      {/* Subtle top-right ambient radial wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-[#4361EE]/[0.05] blur-3xl"
      />

      <div className="mx-auto my-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left Copy Column */}
        <FadeInStagger className="lg:col-span-7">
          <FadeInItem>
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur dark:border-white/15 dark:bg-[#171728]/90">
              <img
                src="/images/brand/azymar-logo.png"
                alt=""
                aria-hidden="true"
                className="h-4 w-4 object-contain"
              />
              <span className="text-xs font-semibold tracking-wide text-[#1A1A2E] dark:text-gray-200">
                AZYMAR STUDIO · GAMES, XR &amp; INTERACTIVE WORLDS
              </span>
            </div>
          </FadeInItem>

          {/* Typewriter Heading with 0.05s character stagger */}
          <h1
            aria-label={HERO_HEADING}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#1A1A2E] sm:text-5xl md:text-6xl lg:text-[4.1rem] dark:text-white"
          >
            {words.map((word, wIdx) => (
              <span key={wIdx} className="mr-[0.26em] inline-block whitespace-nowrap">
                {word.split("").map((char, cIdx) => {
                  const delayIndex = globalCharIndex++;
                  return (
                    <motion.span
                      key={`${wIdx}-${cIdx}`}
                      aria-hidden="true"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.16,
                        delay: prefersReducedMotion ? 0 : delayIndex * 0.05,
                        ease: "easeOut",
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <FadeInItem>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6B7280] sm:text-lg md:text-xl dark:text-gray-300">
              Award-winning game studio crafting immersive experiences across PC,
              Console &amp; Mobile.
            </p>
          </FadeInItem>

          {/* CTA Buttons */}
          <FadeInItem>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToTarget("#games")}
                aria-label="Explore Our Games"
                className="rounded-full bg-[#4361EE] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] focus-visible:ring-offset-2 sm:text-base"
              >
                Explore Our Games
              </button>

              <button
                type="button"
                onClick={() => setShowreelOpen(true)}
                aria-label="Watch Showreel"
                className={`inline-flex items-center gap-2 rounded-full border-2 px-7 py-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] focus-visible:ring-offset-2 sm:text-base ${
                  isDark
                    ? "border-white text-white hover:bg-white hover:text-[#1A1A2E]"
                    : "border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white"
                }`}
              >
                <Play className="h-4 w-4 fill-current" />
                Watch Showreel
              </button>
            </div>
          </FadeInItem>

          {/* Quick studio status pills */}
          <FadeInItem>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-xs font-medium text-[#6B7280] dark:text-gray-400">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                AZYMAR Playground — Completed &amp; Live
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#4361EE]" />
                3 Flagship Worlds In Production
              </span>
            </div>
          </FadeInItem>
        </FadeInStagger>

        {/* Right 3D Interactive Viewport */}
        <div className="relative flex flex-col items-center lg:col-span-5">
          <div className="relative w-full rounded-3xl border border-gray-200/80 bg-[#FAFAFA]/70 p-2 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#171728]/60">
            <HeroCanvas
              mode={modelMode}
              prefersReducedMotion={prefersReducedMotion}
              isDark={isDark}
            />

            {/* Interactive Model Switcher Pill */}
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-200/80 bg-white px-3 py-2 text-xs dark:border-white/10 dark:bg-[#0F0F1A]">
              <span className="font-medium text-[#6B7280] dark:text-gray-400">
                Drag to rotate 3D mesh
              </span>
              <div
                role="group"
                aria-label="Switch Hero 3D Model"
                className="inline-flex rounded-full bg-gray-100 p-0.5 dark:bg-white/10"
              >
                <button
                  type="button"
                  onClick={() => setModelMode("icosahedron")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                    modelMode === "icosahedron"
                      ? "bg-[#4361EE] text-white shadow-sm"
                      : "text-[#6B7280] hover:text-[#1A1A2E] dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  <Box className="h-3.5 w-3.5" />
                  Icosahedron
                </button>
                <button
                  type="button"
                  onClick={() => setModelMode("doctor")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                    modelMode === "doctor"
                      ? "bg-[#4361EE] text-white shadow-sm"
                      : "text-[#6B7280] hover:text-[#1A1A2E] dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  3D Doctor (.GLB)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouncing scroll-down arrow at bottom */}
      <div className="pb-7 flex justify-center">
        <motion.button
          type="button"
          onClick={() => scrollToTarget("#trusted-by")}
          aria-label="Scroll down to next section"
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-[#1A1A2E] shadow-sm transition hover:border-[#4361EE] hover:text-[#4361EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] dark:border-white/15 dark:bg-[#171728] dark:text-white"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Interactive Showreel Modal */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowreelOpen(false)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#1A1A2E]/80 p-4 backdrop-blur-md"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="AZYMAR Studio Showreel"
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-[#0F0F1A] text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/brand/azymar-logo.png"
                    alt="AZYMAR"
                    className="h-6 w-6 object-contain"
                  />
                  <span className="font-display text-sm font-bold tracking-wide">
                    AZYMAR 2026 STUDIO SHOWREEL
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowreelOpen(false)}
                  aria-label="Close showreel modal"
                  className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlide}
                    src={SHOWREEL_SLIDES[activeSlide].image}
                    alt={SHOWREEL_SLIDES[activeSlide].title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-[#0F0F1A]/20 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-full bg-[#4361EE] px-3 py-1 text-[11px] font-bold tracking-wider">
                      {SHOWREEL_SLIDES[activeSlide].tag}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">
                      {SHOWREEL_SLIDES[activeSlide].title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-300">
                      {SHOWREEL_SLIDES[activeSlide].caption}
                    </p>
                  </div>
                  <a
                    href="https://azymar.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#1A1A2E] transition hover:bg-gray-100"
                  >
                    Visit Playground <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 bg-[#141424] p-3">
                {SHOWREEL_SLIDES.map((s, idx) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`rounded-xl px-3 py-2 text-left text-xs transition ${
                      activeSlide === idx
                        ? "bg-[#4361EE] text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="truncate font-semibold">{s.title}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
