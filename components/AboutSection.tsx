"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

interface StatItemProps {
  target: number;
  suffix?: string;
  label: string;
  prefersReducedMotion: boolean;
}

function StatCounter({
  target,
  suffix = "",
  label,
  prefersReducedMotion,
}: StatItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(
    prefersReducedMotion ? target : 0
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }
    if (!inView) return;

    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [count, inView, prefersReducedMotion, target]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-gray-100 bg-[#FAFAFA] p-6 text-center transition hover:border-[#4361EE]/30 dark:border-white/10 dark:bg-[#171728]"
    >
      <div className="font-display text-4xl font-bold tracking-tight text-[#4361EE] sm:text-5xl">
        {displayValue}
        {suffix}
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#6B7280] sm:text-sm dark:text-gray-400">
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { isDark, prefersReducedMotion } = useTheme();

  return (
    <section
      id="about"
      aria-label="About AZYMAR Studio and Statistics"
      className={`py-24 transition-colors sm:py-28 ${
        isDark ? "bg-[#0F0F1A]" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two-Column Studio Story */}
        <FadeInStagger className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInItem>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#4361EE]">
              Our Origin Story
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Crafting Games · Nov 2025 – Present
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#6B7280] dark:text-gray-300">
              Founded in November 2025 by passionate engineers, technical
              artists, and worldbuilders, AZYMAR is an independent game
              development and spatial computing studio dedicated to tactile
              mechanics and unforgettable visual clarity.
              Whether launching our completed 13-game web portal{" "}
              <strong className="font-semibold text-[#1A1A2E] dark:text-white">
                AZYMAR Playground
              </strong>{" "}
              or forging mythological boss battles in{" "}
              <strong className="font-semibold text-[#1A1A2E] dark:text-white">
                Murugan: Surasamharam
              </strong>
              , every frame is engineered for pure player flow.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#6B7280] dark:text-gray-300">
              Beyond entertainment, our real-time rendering expertise powers
              next-generation{" "}
              <strong className="font-semibold text-[#1A1A2E] dark:text-white">
                VR Surgical Simulations
              </strong>{" "}
              and cryptographic platforms like{" "}
              <strong className="font-semibold text-[#1A1A2E] dark:text-white">
                Verity
              </strong>
              — proving that game-engine precision can transform how teams play,
              train, and discover.
            </p>
          </FadeInItem>

          {/* Right Placeholder Studio Photo Area */}
          <FadeInItem>
            <div
              className={`group relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border p-8 transition ${
                isDark
                  ? "border-white/10 bg-[#171728]"
                  : "border-gray-200 bg-gray-100"
              }`}
            >
              {/* Subtle architectural studio grid */}
              <div
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(107,114,128,0.22) 1.5px, transparent 1.5px)",
                  backgroundSize: "24px 24px",
                }}
                className="absolute inset-0"
              />

              {/* Subtle workspace preview watermark on hover */}
              <img
                src="/images/projects/azymar-studio-code.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-20"
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-[#0F0F1A]">
                  <img
                    src="/images/brand/azymar-logo.png"
                    alt="AZYMAR Emblem"
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <span className="font-display text-lg font-bold tracking-wide text-[#1A1A2E] dark:text-white">
                  Studio Photo
                </span>
                <span className="mt-1 text-xs font-medium text-[#6B7280] dark:text-gray-400">
                  AZYMAR Production Lab · Motion Capture, VR Bay &amp; Dev Floor
                </span>
              </div>
            </div>
          </FadeInItem>
        </FadeInStagger>

        {/* 4 Stat Counters Row */}
        <FadeInStagger className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          <FadeInItem>
            <StatCounter
              target={13}
              suffix="+"
              label="Games Shipped"
              prefersReducedMotion={prefersReducedMotion}
            />
          </FadeInItem>
          <FadeInItem>
            <StatCounter
              target={100}
              suffix="% FPS"
              label="Realtime Target"
              prefersReducedMotion={prefersReducedMotion}
            />
          </FadeInItem>
          <FadeInItem>
            <StatCounter
              target={2025}
              suffix=""
              label="Established (Nov)"
              prefersReducedMotion={prefersReducedMotion}
            />
          </FadeInItem>
          <FadeInItem>
            <StatCounter
              target={7}
              suffix=""
              label="Core Team"
              prefersReducedMotion={prefersReducedMotion}
            />
          </FadeInItem>
        </FadeInStagger>
      </div>
    </section>
  );
}
