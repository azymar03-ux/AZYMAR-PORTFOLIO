"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { QUEST_LOG_STEPS } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

export default function ProcessQuestLog() {
  const { isDark } = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>("q4");

  return (
    <section
      id="process"
      aria-label="The Quest Log Production Process"
      className={`border-y py-24 transition-colors sm:py-28 ${
        isDark
          ? "border-white/10 bg-[#141423]"
          : "border-gray-100 bg-[#FAFAFA]"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger>
          <FadeInItem>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#4361EE]">
              How We Ship Worlds
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              The Quest Log
            </h2>
            <p className="mt-3 text-sm text-[#6B7280] sm:text-base dark:text-gray-400">
              Click any milestone to expand deliverables, playtest gates, and
              XP progression.
            </p>
          </FadeInItem>
        </FadeInStagger>

        {/* Vertical Timeline */}
        <div className="relative mt-12 pl-8 sm:pl-10">
          {/* Thin Left Vertical Line */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[15px] top-3 w-[2px] bg-gray-200 sm:left-[19px] dark:bg-white/15"
          />

          <FadeInStagger className="space-y-5">
            {QUEST_LOG_STEPS.map((quest) => {
              const isOpen = expandedId === quest.id;

              return (
                <FadeInItem key={quest.id} className="relative">
                  {/* Timeline Status Node */}
                  <div className="absolute -left-8 top-5 flex items-center justify-center sm:-left-10">
                    {quest.status === "completed" && (
                      <span
                        title="Completed"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22C55E] text-white shadow-sm ring-4 ring-[#FAFAFA] dark:ring-[#141423]"
                      >
                        <Check className="h-4 w-4 stroke-[3]" />
                      </span>
                    )}

                    {quest.status === "in-progress" && (
                      <span
                        title="In Progress"
                        className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#EAB308] text-white shadow-sm ring-4 ring-[#FAFAFA] dark:ring-[#141423]"
                      >
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EAB308] opacity-60" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
                      </span>
                    )}

                    {quest.status === "locked" && (
                      <span
                        title="Locked"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-xs ring-4 ring-[#FAFAFA] dark:border-white/20 dark:bg-[#232338] dark:ring-[#141423]"
                      >
                        🔒
                      </span>
                    )}
                  </div>

                  {/* Quest Card */}
                  <div
                    className={`overflow-hidden rounded-2xl border transition-all ${
                      isDark
                        ? "border-white/10 bg-[#171728]"
                        : "border-gray-200/90 bg-white"
                    } ${isOpen ? "shadow-md" : "shadow-sm"}`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId((prev) =>
                          prev === quest.id ? null : quest.id
                        )
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] sm:p-6"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4361EE]">
                            {quest.number}
                          </span>
                          {quest.status === "in-progress" && (
                            <span className="rounded-full bg-[#EAB308]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#B45309] dark:text-[#FACC15]">
                              In Progress
                            </span>
                          )}
                          {quest.status === "completed" && (
                            <span className="rounded-full bg-[#22C55E]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#15803D] dark:text-[#4ADE80]">
                              Completed
                            </span>
                          )}
                          <span className="font-mono text-[11px] text-[#6B7280] dark:text-gray-400">
                            {quest.xp}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-bold sm:text-xl">
                          {quest.title}
                        </h3>
                        <p className="text-sm text-[#6B7280] dark:text-gray-300">
                          {quest.summary}
                        </p>
                      </div>

                      <ChevronDown
                        className={`mt-1 h-5 w-5 shrink-0 text-[#6B7280] transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#4361EE]" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-100 px-5 pb-6 pt-4 sm:px-6 dark:border-white/10">
                            <p className="text-sm leading-relaxed text-[#6B7280] dark:text-gray-300">
                              {quest.details}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {quest.deliverables.map((deliv) => (
                                <span
                                  key={deliv}
                                  className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-[#1A1A2E] dark:bg-white/10 dark:text-gray-200"
                                >
                                  ✦ {deliv}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
