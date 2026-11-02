"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MapPin, X } from "lucide-react";
import { CAREER_CLASSES, CareerClass } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";
import { scrollToTarget } from "@/components/SmoothScroll";

export default function CareersSection() {
  const { isDark } = useTheme();
  const [selectedJob, setSelectedJob] = useState<CareerClass | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (!selectedJob) return;
    setApplied(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedJob(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedJob]);

  return (
    <section
      id="careers"
      aria-label="Select Your Class Careers"
      className={`py-24 transition-colors sm:py-28 ${
        isDark ? "bg-[#141423]" : "bg-[#F3F4F6]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger>
          <FadeInItem>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B6B]">
                  Join AZYMAR · We&apos;re Hiring
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Build · Rig · Ship ⚔️
                </h2>
              </div>
              <p className="max-w-md text-sm text-[#6B7280] dark:text-gray-400">
                Build your portfolio with real shipped work. Send your 1-page resume + 2-3 relevant samples to{" "}
                <a
                  href="mailto:azymar03@gmail.com"
                  className="font-semibold text-[#4361EE] underline underline-offset-4 hover:text-[#3651d4]"
                >
                  azymar03@gmail.com
                </a>
                .
              </p>
            </div>
          </FadeInItem>
        </FadeInStagger>

        {/* 4 RPG Class Cards */}
        <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAREER_CLASSES.map((job) => (
            <FadeInItem key={job.id}>
              <button
                type="button"
                onClick={() => setSelectedJob(job)}
                style={
                  {
                    "--job-accent": job.accent,
                  } as React.CSSProperties
                }
                className={`group flex h-full w-full flex-col justify-between rounded-xl border p-6 text-left transition-all duration-300 ${job.hoverRotate} hover:border-[var(--job-accent)] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] ${
                  isDark
                    ? "border-white/15 bg-[#171728] text-white"
                    : "border-gray-200 bg-white text-[#1A1A2E]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl" aria-hidden="true">
                      {job.icon}
                    </span>
                    <span
                      style={{ color: job.accent }}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider dark:bg-white/10"
                    >
                      {job.classTag}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold leading-snug">
                    {job.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-[#6B7280] dark:text-gray-300">
                    {job.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-4 dark:border-white/10">
                  <div className="flex items-center justify-between text-xs font-medium text-[#6B7280] dark:text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                    <span
                      style={{ color: job.accent }}
                      className="font-semibold transition-transform group-hover:translate-x-1"
                    >
                      Inspect →
                    </span>
                  </div>
                </div>
              </button>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>

      {/* Job Description Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedJob(null)}
            className="fixed inset-0 z-[88] flex items-center justify-center bg-[#1A1A2E]/75 p-4 backdrop-blur-md"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedJob.title}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border p-6 shadow-2xl sm:p-8 ${
                isDark
                  ? "border-white/15 bg-[#131322] text-white"
                  : "border-gray-200 bg-white text-[#1A1A2E]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-3xl dark:bg-white/10">
                    {selectedJob.icon}
                  </span>
                  <div>
                    <span
                      style={{ color: selectedJob.accent }}
                      className="font-mono text-xs font-bold uppercase tracking-wider"
                    >
                      {selectedJob.classTag} · {selectedJob.type}
                    </span>
                    <h3 className="mt-0.5 font-display text-2xl font-bold">
                      {selectedJob.title}
                    </h3>
                    <p className="text-xs font-medium text-[#6B7280] dark:text-gray-400">
                      {selectedJob.location}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  aria-label="Close job modal"
                  className="rounded-full bg-gray-100 p-2 text-[#1A1A2E] transition hover:bg-gray-200 dark:bg-white/10 dark:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-[#6B7280] dark:text-gray-300">
                {selectedJob.summary}
              </p>

              {/* Base RPG Class Stats */}
              <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl bg-gray-50 p-4 sm:grid-cols-3 dark:bg-white/5">
                {selectedJob.stats.map((st) => (
                  <div key={st.label}>
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{st.label}</span>
                      <span style={{ color: selectedJob.accent }}>
                        {st.value}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                      <div
                        style={{
                          width: `${st.value}%`,
                          backgroundColor: selectedJob.accent,
                        }}
                        className="h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider">
                    Quest Objectives
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-sm text-[#6B7280] dark:text-gray-300">
                    {selectedJob.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4361EE]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider">
                    Required Gear &amp; Skills
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-sm text-[#6B7280] dark:text-gray-300">
                    {selectedJob.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7B2FF7]" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5 dark:border-white/10">
                {applied ? (
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                    Character Sheet Logged! Scroll down or drop a note in Contact
                    to attach your portfolio.
                  </div>
                ) : (
                  <>
                    <span className="text-xs font-medium text-[#6B7280] dark:text-gray-400">
                      Includes equity quest pool + hardware stipend
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedJob(null);
                          scrollToTarget("#contact");
                        }}
                        className="rounded-full border border-gray-200 px-4 py-2.5 text-xs font-semibold transition hover:border-[#4361EE] dark:border-white/15"
                      >
                        Message Recruiter
                      </button>
                      <a
                        href={`mailto:azymar03@gmail.com?subject=Application for ${encodeURIComponent(
                          selectedJob.title
                        )} - AZYMAR Careers&body=Hello AZYMAR Team,%0D%0A%0D%0AI would like to apply for the ${encodeURIComponent(
                          selectedJob.title
                        )} position.%0D%0A%0D%0APlease find my resume and portfolio attached.%0D%0A%0D%0ABest regards,`}
                        style={{ backgroundColor: selectedJob.accent }}
                        className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105"
                      >
                        Apply via Email
                      </a>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
