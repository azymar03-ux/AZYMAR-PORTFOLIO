"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

const PLATFORMS = [
  "Steam",
  "Epic Games",
  "PlayStation",
  "Xbox",
  "Nintendo",
  "Unity",
  "Unreal Engine",
];

export default function LogoBar() {
  const { isDark, prefersReducedMotion } = useTheme();

  return (
    <section
      id="trusted-by"
      aria-label="Trusted By Platforms"
      className={`border-y py-10 transition-colors ${
        isDark
          ? "border-white/10 bg-[#141423]"
          : "border-gray-200/70 bg-[#F3F4F6]"
      }`}
    >
      <FadeInStagger className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInItem>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#6B7280] dark:text-gray-400">
            Trusted By
          </p>
        </FadeInItem>
      </FadeInStagger>

      <div className="relative mx-auto max-w-7xl overflow-hidden">
        {/* Soft left/right edge fade masks */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r ${
            isDark ? "from-[#141423]" : "from-[#F3F4F6]"
          } to-transparent`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l ${
            isDark ? "from-[#141423]" : "from-[#F3F4F6]"
          } to-transparent`}
        />

        <motion.div
          animate={prefersReducedMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center"
        >
          {[0, 1].map((dupIndex) => (
            <div
              key={dupIndex}
              aria-hidden={dupIndex === 1}
              className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
            >
              {PLATFORMS.map((platform) => (
                <React.Fragment key={`${dupIndex}-${platform}`}>
                  <span className="font-display text-lg font-semibold tracking-tight text-[#6B7280] transition-colors hover:text-[#1A1A2E] sm:text-xl dark:text-gray-400 dark:hover:text-white">
                    {platform}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-sm text-gray-400 dark:text-gray-600"
                  >
                    ·
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
