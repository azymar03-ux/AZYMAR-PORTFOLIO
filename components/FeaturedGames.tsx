"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Sparkles, X, ZoomIn } from "lucide-react";
import {
  FEATURED_GAMES,
  GameFilterCategory,
  GameProject,
} from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

const ModalDoctorCanvas = dynamic(
  () => import("@/components/three/ModalDoctorCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[340px] w-full items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-2.5 text-xs font-medium text-[#6B7280]">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#4361EE] border-t-transparent" />
          Loading 3D Doctor Rig...
        </div>
      </div>
    ),
  }
);

const FILTER_TABS: GameFilterCategory[] = ["All", "RPG", "FPS", "Mobile", "VR"];

function TiltGameCard({
  game,
  onSelect,
  isDark,
  prefersReducedMotion,
}: {
  game: GameProject;
  onSelect: (game: GameProject) => void;
  isDark: boolean;
  prefersReducedMotion: boolean;
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    setTilt({
      rotateX: Number((-normY * 8).toFixed(2)),
      rotateY: Number((normX * 8).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.article
      layout
      layoutId={`game-card-${game.id}`}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(game)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(game);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${game.title}`}
      data-cursor="card"
      style={{
        transform: prefersReducedMotion
          ? undefined
          : `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      className={`group flex flex-col overflow-hidden rounded-2xl border shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] ${
        isDark
          ? "border-white/10 bg-[#171728] text-white"
          : "border-gray-100 bg-white text-[#1A1A2E]"
      }`}
    >
      {/* Artwork / Gradient Header */}
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${game.gradient}`}
      >
        <img
          src={game.coverImage}
          alt={game.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Project Status Badge (Completed vs Ongoing) */}
        <div className="absolute left-3.5 top-3.5 z-10 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide shadow-sm backdrop-blur-md ${
              game.status === "Completed"
                ? "bg-emerald-500/95 text-white"
                : "bg-white/95 text-[#1A1A2E]"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                game.status === "Completed"
                  ? "bg-white"
                  : "animate-pulse bg-[#4361EE]"
              }`}
            />
            {game.status === "Completed" ? "Completed" : "Ongoing"}
          </span>

          {game.has3DDoctorModel && (
            <span className="rounded-full bg-[#7B2FF7]/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              3D Rig Inside
            </span>
          )}
        </div>

        {/* Dark Hover Overlay with "View Case Study →" */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-display text-sm font-semibold tracking-wide text-white">
            View Case Study →
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl font-bold tracking-tight">
              {game.title}
            </h3>
          </div>
          <p className="mt-1 text-xs font-medium text-[#6B7280] dark:text-gray-400">
            {game.subtitle}
          </p>

          {/* Genre Pill Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  isDark
                    ? "bg-white/10 text-gray-200"
                    : "bg-gray-100 text-[#1A1A2E]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Platform Icons (Text) */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3.5 text-xs font-semibold text-[#6B7280] dark:border-white/10 dark:text-gray-400">
          <span>{game.platforms.join(" · ")}</span>
          <span className="text-[#4361EE] transition-transform group-hover:translate-x-0.5">
            Explore →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedGames() {
  const { isDark, prefersReducedMotion } = useTheme();
  const [activeFilter, setActiveFilter] = useState<GameFilterCategory>("All");
  const [selectedGame, setSelectedGame] = useState<GameProject | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{
    src: string;
    caption: string;
  } | null>(null);

  const filteredGames =
    activeFilter === "All"
      ? FEATURED_GAMES
      : FEATURED_GAMES.filter((g) => g.categories.includes(activeFilter));

  useEffect(() => {
    if (!selectedGame) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImg) {
          setLightboxImg(null);
        } else {
          setSelectedGame(null);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedGame, lightboxImg]);

  return (
    <section
      id="games"
      aria-label="Featured Games Portfolio"
      className={`py-24 transition-colors sm:py-28 ${
        isDark ? "bg-[#0F0F1A]" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger>
          <FadeInItem>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#4361EE]">
                  Portfolio &amp; Case Studies
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Our Creations
                </h2>
              </div>

              {/* Filter Tabs with Framer Motion layoutId pill */}
              <div
                role="tablist"
                aria-label="Filter games by genre or platform"
                className={`inline-flex flex-wrap gap-1 rounded-full border p-1.5 ${
                  isDark
                    ? "border-white/10 bg-[#171728]"
                    : "border-gray-200 bg-[#FAFAFA]"
                }`}
              >
                {FILTER_TABS.map((tab) => {
                  const active = activeFilter === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveFilter(tab)}
                      className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] sm:text-sm ${
                        active
                          ? "text-white"
                          : isDark
                          ? "text-gray-300 hover:text-white"
                          : "text-[#6B7280] hover:text-[#1A1A2E]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="activeGameFilterPill"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-full bg-[#4361EE]"
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeInItem>
        </FadeInStagger>

        {/* 6-Card Responsive Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <TiltGameCard
                key={game.id}
                game={game}
                onSelect={setSelectedGame}
                isDark={isDark}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen / Expanded Case Study Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGame(null)}
            className="fixed inset-0 z-[85] overflow-y-auto bg-[#1A1A2E]/75 p-3 backdrop-blur-md sm:p-6 md:p-10"
          >
            <motion.div
              layoutId={`game-card-${selectedGame.id}`}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedGame.title} Case Study`}
              onClick={(e) => e.stopPropagation()}
              className={`mx-auto my-4 w-full max-w-5xl overflow-hidden rounded-3xl border shadow-2xl ${
                isDark
                  ? "border-white/15 bg-[#131322] text-white"
                  : "border-gray-200 bg-white text-[#1A1A2E]"
              }`}
            >
              {/* Modal Hero Banner */}
              <div
                className={`relative h-64 w-full overflow-hidden bg-gradient-to-br sm:h-80 md:h-96 ${selectedGame.gradient}`}
              >
                <img
                  src={selectedGame.coverImage}
                  alt={selectedGame.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A]/90 via-[#0F0F1A]/35 to-transparent" />

                <button
                  type="button"
                  onClick={() => setSelectedGame(null)}
                  aria-label="Close case study modal"
                  className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#1A1A2E] shadow-lg transition hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE]"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        selectedGame.status === "Completed"
                          ? "bg-emerald-500 text-white"
                          : "bg-[#4361EE] text-white"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      {selectedGame.statusLabel}
                    </span>
                    <h3 className="mt-2.5 font-display text-2xl font-bold sm:text-4xl">
                      {selectedGame.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-200 sm:text-base">
                      {selectedGame.subtitle}
                    </p>
                  </div>

                  {selectedGame.liveUrl && (
                    <a
                      href={selectedGame.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#4361EE] px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:scale-105 hover:bg-[#3451d6] sm:text-sm"
                    >
                      Play Live Portal <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="space-y-9 p-6 sm:p-8 md:p-10">
                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-4 rounded-2xl border border-gray-100 bg-[#FAFAFA] p-4 sm:p-6 dark:border-white/10 dark:bg-white/5">
                  {selectedGame.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="font-display text-xl font-bold text-[#4361EE] sm:text-3xl">
                        {metric.value}
                      </div>
                      <div className="mt-1 text-xs font-medium text-[#6B7280] dark:text-gray-400">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overview + Challenge + Solution */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#4361EE]">
                      World Overview
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B7280] dark:text-gray-300">
                      {selectedGame.summary}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#7B2FF7]">
                      The Boss Fight
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B7280] dark:text-gray-300">
                      {selectedGame.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#FF6B6B]">
                      AZYMAR Solution
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B7280] dark:text-gray-300">
                      {selectedGame.solution}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-2 text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
                    Built With:
                  </span>
                  {selectedGame.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#4361EE]/25 bg-[#4361EE]/10 px-3 py-1 text-xs font-semibold text-[#4361EE]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Interactive 3D Doctor Model Viewer for VR Surgical Sim */}
                {selectedGame.has3DDoctorModel && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-lg font-bold">
                        Interactive 3D Character Asset (glTF 2.0)
                      </h4>
                      <span className="text-xs font-medium text-[#6B7280] dark:text-gray-400">
                        Real-time WebGL Inspection
                      </span>
                    </div>
                    <ModalDoctorCanvas
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                )}

                {/* Gallery Grid */}
                <div>
                  <h4 className="font-display text-lg font-bold">
                    Production Gallery ({selectedGame.gallery.length} Captures)
                  </h4>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {selectedGame.gallery.map((item) => (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => setLightboxImg(item)}
                        className="group relative overflow-hidden rounded-2xl border border-gray-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] dark:border-white/10"
                      >
                        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-white/5">
                          <img
                            src={item.src}
                            alt={item.caption}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2 bg-[#FAFAFA] px-4 py-2.5 text-xs font-medium text-[#6B7280] dark:bg-white/5 dark:text-gray-300">
                          <span className="truncate">{item.caption}</span>
                          <ZoomIn className="h-4 w-4 shrink-0 text-[#4361EE]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-6xl overflow-hidden rounded-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                aria-label="Close zoomed image"
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-[#1A1A2E] shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={lightboxImg.src}
                alt={lightboxImg.caption}
                className="max-h-[82vh] w-auto rounded-xl object-contain"
              />
              <p className="mt-3 text-center text-sm text-gray-200">
                {lightboxImg.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
