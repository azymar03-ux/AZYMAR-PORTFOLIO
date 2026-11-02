"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

const MiniGameCanvas = dynamic(() => import("@/components/MiniGameCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[280px] w-full items-center justify-center rounded-3xl border border-gray-200 bg-white">
      <span className="text-sm font-medium text-[#6B7280]">
        Loading Mini-Game Engine...
      </span>
    </div>
  ),
});

export default function MiniGameSection() {
  const { isDark } = useTheme();

  return (
    <section
      id="minigame"
      aria-label="Interactive Mini Game"
      className={`border-y py-24 transition-colors ${
        isDark
          ? "border-white/10 bg-[#141423]"
          : "border-gray-100 bg-[#FAFAFA]"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger>
          <FadeInItem>
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#7B2FF7]">
                Playable Micro-Loop
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Try It Yourself 🎮
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B7280] sm:text-base dark:text-gray-400">
                Great games start with responsive 30-second feel. Test your
                reflexes right inside the browser, or explore 13+ full arcade
                games on{" "}
                <a
                  href="https://azymar.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#4361EE] underline decoration-[#4361EE]/40 underline-offset-4 hover:decoration-[#4361EE]"
                >
                  AZYMAR Playground
                </a>
                .
              </p>
            </div>
          </FadeInItem>

          <FadeInItem>
            <MiniGameCanvas />
          </FadeInItem>
        </FadeInStagger>
      </div>
    </section>
  );
}
