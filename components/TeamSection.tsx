"use client";

import React from "react";
import { TEAM_PARTY } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

export default function TeamSection() {
  const { isDark } = useTheme();

  return (
    <section
      id="team"
      aria-label="The Party Team Members"
      className={`border-t py-24 transition-colors sm:py-28 ${
        isDark
          ? "border-white/10 bg-[#0F0F1A]"
          : "border-gray-100 bg-[#FFFFFF]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger>
          <FadeInItem>
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#4361EE]">
                Meet the Guild
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                The Party
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B7280] sm:text-base dark:text-gray-400">
                Engineers, artists, and simulation specialists united by a shared
                obsession with craft.
              </p>
            </div>
          </FadeInItem>
        </FadeInStagger>

        {/* Team Members Grid - Centered & Balanced */}
        <FadeInStagger className="mt-14 flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-12">
          {TEAM_PARTY.map((member) => (
            <FadeInItem
              key={member.name}
              className="group flex w-40 flex-col items-center text-center sm:w-48 lg:w-52"
            >
              {/* Gradient Ring Wrapper via padding + background-gradient trick */}
              <div className="rounded-full bg-transparent p-[3px] transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-[#4361EE] group-hover:to-[#7B2FF7] group-hover:shadow-lg group-hover:shadow-[#4361EE]/20">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-24 w-24 rounded-full border-2 border-white object-cover object-center shadow-inner sm:h-28 sm:w-28 dark:border-[#0F0F1A]"
                  />
                ) : (
                  <div
                    className={`flex h-24 w-24 items-center justify-center rounded-full border-2 border-white font-display text-xl font-bold sm:h-28 sm:w-28 ${
                      isDark
                        ? "border-[#0F0F1A] bg-[#222238] text-white"
                        : "bg-gray-200 text-[#1A1A2E]"
                    }`}
                  >
                    {member.initials}
                  </div>
                )}
              </div>

              <span className="mt-4 font-mono text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">
                {member.rpgClass}
              </span>
              <h3 className="mt-1 font-display text-base font-bold sm:text-lg">
                {member.name}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-[#6B7280] sm:text-sm dark:text-gray-400">
                {member.role}
              </p>

              {/* Social Icons Fade In Below on Hover */}
              <div className="mt-3 flex items-center gap-2.5 opacity-0 translate-y-1 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:opacity-100">
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on Twitter`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-[11px] font-bold text-[#1A1A2E] transition hover:border-[#4361EE] hover:text-[#4361EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] dark:border-white/15 dark:bg-[#171728] dark:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-[11px] font-bold text-[#1A1A2E] transition hover:border-[#4361EE] hover:text-[#4361EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] dark:border-white/15 dark:bg-[#171728] dark:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                )}
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
