"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useTheme } from "@/context/ThemeContext";

declare global {
  interface Window {
    __azymarLenis?: Lenis | null;
  }
}

export function scrollToTarget(target: string | number) {
  if (typeof window === "undefined") return;
  if (window.__azymarLenis) {
    window.__azymarLenis.scrollTo(target, { offset: typeof target === "string" ? -72 : 0 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { prefersReducedMotion } = useTheme();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      window.__azymarLenis = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.__azymarLenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      window.__azymarLenis = null;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
