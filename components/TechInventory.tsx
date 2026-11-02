"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TECH_INVENTORY } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

export default function TechInventory() {
  const { isDark, prefersReducedMotion } = useTheme();
  const [flippedSlot, setFlippedSlot] = useState<string | null>(null);

  return (
    <section
      id="inventory"
      aria-label="Our Inventory Tech Stack"
      className={`py-24 transition-colors sm:py-28 ${
        isDark ? "bg-[#0F0F1A]" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger>
          <FadeInItem>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#7B2FF7]">
                  Equipped Loadout · Hover or Tap to Inspect
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Our Inventory
                </h2>
              </div>
              <span className="font-mono text-xs text-[#6B7280] dark:text-gray-400">
                SLOTS [8 / 8] EQUIPPED
              </span>
            </div>
          </FadeInItem>
        </FadeInStagger>

        <FadeInStagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {TECH_INVENTORY.map((item, idx) => {
            const isFlipped = flippedSlot === item.name;

            return (
              <FadeInItem key={item.name}>
                <div
                  onMouseEnter={() => setFlippedSlot(item.name)}
                  onMouseLeave={() => setFlippedSlot(null)}
                  onClick={() =>
                    setFlippedSlot((prev) =>
                      prev === item.name ? null : item.name
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setFlippedSlot((prev) =>
                        prev === item.name ? null : item.name
                      );
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${item.name} — ${item.proficiency}% proficiency`}
                  className="perspective-1000 aspect-square w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] rounded-xl"
                >
                  <motion.div
                    animate={{
                      rotateY: isFlipped && !prefersReducedMotion ? 180 : 0,
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="preserve-3d relative h-full w-full"
                  >
                    {/* FRONT FACE */}
                    <div
                      className={`backface-hidden absolute inset-0 flex flex-col items-center justify-between rounded-xl border p-5 transition-colors ${
                        isDark
                          ? "border-white/15 bg-[#171728] text-white"
                          : "border-gray-200 bg-gray-50 text-[#1A1A2E]"
                      } ${
                        isFlipped && prefersReducedMotion
                          ? "opacity-0"
                          : "opacity-100"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between font-mono text-[10px] font-semibold text-[#6B7280] dark:text-gray-400">
                        <span>0{idx + 1}</span>
                        <span>{item.abbr}</span>
                      </div>

                      <div className="flex flex-col items-center gap-2.5 text-center">
                        <span className="text-3xl sm:text-4xl" aria-hidden="true">
                          {item.badge}
                        </span>
                        <h3 className="font-display text-sm font-bold sm:text-base">
                          {item.name}
                        </h3>
                      </div>

                      <span className="text-[10px] font-medium text-[#6B7280] dark:text-gray-400">
                        Inspect Stats ↻
                      </span>
                    </div>

                    {/* BACK FACE (180deg Y-Axis) */}
                    <div
                      className={` ${
                        prefersReducedMotion
                          ? isFlipped
                            ? "opacity-100"
                            : "pointer-events-none opacity-0"
                          : "backface-hidden rotate-y-180"
                      } absolute inset-0 flex flex-col justify-between rounded-xl border border-[#4361EE] bg-[#1A1A2E] p-5 text-white shadow-xl`}
                    >
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">
                          MASTERY LEVEL
                        </span>
                        <h4 className="mt-0.5 font-display text-base font-bold">
                          {item.name}
                        </h4>
                        <p className="mt-1.5 text-[11px] leading-snug text-gray-300">
                          {item.role}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="font-mono text-[11px] tracking-tight text-gray-200">
                          {item.asciiBar}
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{
                              width: isFlipped ? `${item.proficiency}%` : "0%",
                            }}
                            transition={{ duration: 0.65, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-[#4361EE] to-[#7B2FF7]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
