"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

export default function TestimonialsDialogue() {
  const { isDark, prefersReducedMotion } = useTheme();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [typedLength, setTypedLength] = useState(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const current = TESTIMONIALS[index];

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedLength(current.quote.length);
      return;
    }
    if (!inView) return;

    setTypedLength(0);
    const interval = setInterval(() => {
      setTypedLength((prev) => {
        if (prev >= current.quote.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 18);

    return () => clearInterval(interval);
  }, [current.quote, inView, prefersReducedMotion]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-label="What People Say Testimonials"
      className={`py-24 transition-colors sm:py-28 ${
        isDark ? "bg-[#0F0F1A]" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger>
          <FadeInItem>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#7B2FF7]">
                  NPC Dialogue Log
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  What People Say
                </h2>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition hover:border-[#4361EE] hover:text-[#4361EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] ${
                    isDark
                      ? "border-white/15 bg-[#171728] text-white"
                      : "border-gray-200 bg-white text-[#1A1A2E]"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-mono text-xs font-semibold text-[#6B7280] dark:text-gray-400">
                  0{index + 1} / 0{TESTIMONIALS.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition hover:border-[#4361EE] hover:text-[#4361EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] ${
                    isDark
                      ? "border-white/15 bg-[#171728] text-white"
                      : "border-gray-200 bg-white text-[#1A1A2E]"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </FadeInItem>
        </FadeInStagger>

        {/* RPG Dialogue Stage */}
        <div className="mt-12 overflow-hidden py-2">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{
                opacity: 0,
                x: prefersReducedMotion ? 0 : direction * 64,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: prefersReducedMotion ? 0 : direction * -64,
              }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="flex flex-col items-start gap-6 sm:flex-row sm:items-center"
            >
              {/* Left Side: Circular Avatar Placeholder with "NPC" Label */}
              <div className="flex shrink-0 flex-col items-center self-center sm:self-start">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-200 font-display text-lg font-bold text-[#1A1A2E] dark:border-white/20 dark:bg-[#23233A] dark:text-white">
                  NPC
                  <span className="absolute -bottom-2 rounded-full bg-[#4361EE] px-2.5 py-0.5 font-mono text-[10px] font-bold text-white shadow">
                    ALLY
                  </span>
                </div>
                <span className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
                  {current.level}
                </span>
              </div>

              {/* Right Side: RPG Speech Box with Left Triangle Pointer */}
              <div
                className={`relative flex-1 rounded-2xl border p-6 shadow-sm sm:p-8 ${
                  isDark
                    ? "border-white/15 bg-[#171728]"
                    : "border-gray-200 bg-[#F9FAFB]"
                }`}
              >
                {/* Small Triangle Pointer on the Left (desktop) */}
                <div
                  aria-hidden="true"
                  className={`hidden h-4 w-4 rotate-45 border-b border-l sm:block sm:absolute sm:-left-[9px] sm:top-9 ${
                    isDark
                      ? "border-white/15 bg-[#171728]"
                      : "border-gray-200 bg-[#F9FAFB]"
                  }`}
                />

                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/80 pb-3 dark:border-white/10">
                  <div>
                    <h3 className="font-display text-base font-bold">
                      {current.npcName}
                    </h3>
                    <p className="text-xs font-medium text-[#6B7280] dark:text-gray-400">
                      {current.npcRole} · {current.guild}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#4361EE]">
                    [DIALOGUE]
                  </span>
                </div>

                {/* Typewriter Quote */}
                <p
                  aria-label={current.quote}
                  className="mt-4 min-h-[84px] text-base leading-relaxed text-[#1A1A2E] sm:text-lg dark:text-gray-100"
                >
                  &ldquo;{current.quote.slice(0, typedLength)}
                  {typedLength < current.quote.length && (
                    <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[#4361EE]" />
                  )}
                  {typedLength >= current.quote.length && <>&rdquo;</>}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
