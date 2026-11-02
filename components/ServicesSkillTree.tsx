"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Glasses,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SKILL_TREE_SERVICES, SkillNode } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

const ICON_MAP = {
  code: Code2,
  sparkles: Sparkles,
  network: Network,
  glasses: Glasses,
  cpu: Cpu,
  shield: ShieldCheck,
};

const PARTICLE_VECTORS = Array.from({ length: 8 }, (_, idx) => {
  const angle = (idx * Math.PI * 2) / 8;
  return {
    tx: `${Math.round(Math.cos(angle) * 54)}px`,
    ty: `${Math.round(Math.sin(angle) * 54)}px`,
    color: idx % 2 === 0 ? "#4361EE" : "#7B2FF7",
  };
});

export default function ServicesSkillTree() {
  const { isDark } = useTheme();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activatedIds, setActivatedIds] = useState<Record<string, boolean>>({
    "full-cycle": true,
  });
  const [burstKeyMap, setBurstKeyMap] = useState<Record<string, number>>({});

  const handleToggleNode = (node: SkillNode) => {
    setActivatedIds((prev) => ({
      ...prev,
      [node.id]: !prev[node.id],
    }));
    setBurstKeyMap((prev) => ({
      ...prev,
      [node.id]: (prev[node.id] || 0) + 1,
    }));
  };

  return (
    <section
      id="services"
      aria-label="Our Skill Tree Services"
      className={`border-t py-24 transition-colors sm:py-28 ${
        isDark
          ? "border-white/10 bg-[#141423]"
          : "border-gray-100 bg-[#FAFAFA]"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger>
          <FadeInItem>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#4361EE]">
                  Capabilities · Click Nodes to Unlock
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Our Skill Tree
                </h2>
              </div>
              <p className="text-xs font-medium text-[#6B7280] dark:text-gray-400">
                Skills Unlocked:{" "}
                <span className="font-bold text-[#4361EE]">
                  {Object.values(activatedIds).filter(Boolean).length} /{" "}
                  {SKILL_TREE_SERVICES.length}
                </span>
              </p>
            </div>
          </FadeInItem>
        </FadeInStagger>

        {/* Skill Tree Container with Decorative SVG Connecting Lines */}
        <div className="relative mt-16">
          {/* Desktop Decorative SVG Connections (2 rows x 3 cols) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 900 320"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          >
            {/* Row 1 horizontal */}
            <line
              x1="150"
              y1="64"
              x2="450"
              y2="64"
              stroke={
                activatedIds["full-cycle"] && activatedIds["art-anim"]
                  ? "#4361EE"
                  : isDark
                  ? "#2B2B44"
                  : "#E5E7EB"
              }
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <line
              x1="450"
              y1="64"
              x2="750"
              y2="64"
              stroke={
                activatedIds["art-anim"] && activatedIds["multiplayer"]
                  ? "#4361EE"
                  : isDark
                  ? "#2B2B44"
                  : "#E5E7EB"
              }
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            {/* Row 2 horizontal */}
            <line
              x1="150"
              y1="235"
              x2="450"
              y2="235"
              stroke={
                activatedIds["vr-ar"] && activatedIds["porting"]
                  ? "#4361EE"
                  : isDark
                  ? "#2B2B44"
                  : "#E5E7EB"
              }
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <line
              x1="450"
              y1="235"
              x2="750"
              y2="235"
              stroke={
                activatedIds["porting"] && activatedIds["qa-testing"]
                  ? "#4361EE"
                  : isDark
                  ? "#2B2B44"
                  : "#E5E7EB"
              }
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            {/* Vertical tier connectors */}
            <line
              x1="150"
              y1="64"
              x2="150"
              y2="235"
              stroke={
                activatedIds["full-cycle"] && activatedIds["vr-ar"]
                  ? "#4361EE"
                  : isDark
                  ? "#2B2B44"
                  : "#E5E7EB"
              }
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <line
              x1="450"
              y1="64"
              x2="450"
              y2="235"
              stroke={
                activatedIds["art-anim"] && activatedIds["porting"]
                  ? "#4361EE"
                  : isDark
                  ? "#2B2B44"
                  : "#E5E7EB"
              }
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <line
              x1="750"
              y1="64"
              x2="750"
              y2="235"
              stroke={
                activatedIds["multiplayer"] && activatedIds["qa-testing"]
                  ? "#4361EE"
                  : isDark
                  ? "#2B2B44"
                  : "#E5E7EB"
              }
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
          </svg>

          <FadeInStagger className="relative z-10 grid grid-cols-1 gap-y-16 gap-x-8 sm:grid-cols-2 md:grid-cols-3">
            {SKILL_TREE_SERVICES.map((service) => {
              const Icon = ICON_MAP[service.icon];
              const isActivated = Boolean(activatedIds[service.id]);
              const isHovered = hoveredId === service.id;
              const burstKey = burstKeyMap[service.id] || 0;

              return (
                <FadeInItem
                  key={service.id}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    onMouseEnter={() => setHoveredId(service.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative flex flex-col items-center"
                  >
                    {/* 80px Circular Icon Node */}
                    <button
                      type="button"
                      onClick={() => handleToggleNode(service)}
                      onFocus={() => setHoveredId(service.id)}
                      onBlur={() => setHoveredId(null)}
                      aria-pressed={isActivated}
                      aria-label={`${service.name} skill node`}
                      className={`group relative flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4361EE]/25 ${
                        isActivated
                          ? "border-[#4361EE] bg-[#4361EE]/10 text-[#4361EE] shadow-lg shadow-[#4361EE]/15"
                          : isHovered
                          ? "border-[#4361EE] bg-white text-[#4361EE] shadow-md dark:bg-[#1E1E35]"
                          : isDark
                          ? "border-white/15 bg-[#171728] text-gray-300"
                          : "border-gray-200 bg-gray-50 text-[#1A1A2E]"
                      }`}
                    >
                      <Icon
                        className={`h-8 w-8 transition-transform duration-300 ${
                          isHovered || isActivated ? "scale-110" : "scale-100"
                        }`}
                      />

                      {/* CSS-Only 8-Dot Particle Burst on Click */}
                      {burstKey > 0 && (
                        <span
                          key={burstKey}
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0"
                        >
                          {PARTICLE_VECTORS.map((vec, i) => (
                            <span
                              key={i}
                              style={
                                {
                                  "--tx": vec.tx,
                                  "--ty": vec.ty,
                                  backgroundColor: vec.color,
                                } as React.CSSProperties
                              }
                              className="animate-particle-burst absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
                            />
                          ))}
                        </span>
                      )}
                    </button>

                    <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7280] dark:text-gray-400">
                      {service.tier}
                    </span>
                    <h3 className="mt-1 font-display text-base font-bold">
                      {service.name}
                    </h3>

                    {isActivated && (
                      <span className="mt-1 rounded-full bg-[#4361EE]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#4361EE]">
                        ACTIVE
                      </span>
                    )}

                    {/* Framer Motion AnimatePresence Tooltip Below */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className={`pointer-events-none absolute top-[132px] z-30 w-64 rounded-2xl border p-3.5 text-xs leading-relaxed shadow-xl ${
                            isDark
                              ? "border-white/15 bg-[#0F0F1A] text-gray-200"
                              : "border-gray-200 bg-white text-[#6B7280]"
                          }`}
                        >
                          <p className="line-clamp-2">{service.description}</p>
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
