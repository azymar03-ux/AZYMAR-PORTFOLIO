"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInStagger({
  children,
  className = "",
  delay = 0,
}: FadeInStaggerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { prefersReducedMotion } = useTheme();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate={isInView || prefersReducedMotion ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.1,
            delayChildren: prefersReducedMotion ? 0 : delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { prefersReducedMotion } = useTheme();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
