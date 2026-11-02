"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { MotionConfig, AnimatePresence, motion } from "framer-motion";

interface ThemeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
  prefersReducedMotion: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleDarkMode: () => {},
  prefersReducedMotion: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [easterEggToast, setEasterEggToast] = useState<string | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      setEasterEggToast(
        next
          ? "🕹️ Secret Unlocked: AZYMAR Night Mode Activated!"
          : "☀️ Daylight Studio Theme Restored!"
      );
      return next;
    });
  }, []);

  useEffect(() => {
    if (!easterEggToast) return;
    const timer = setTimeout(() => setEasterEggToast(null), 3600);
    return () => clearTimeout(timer);
  }, [easterEggToast]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode, prefersReducedMotion }}>
      <MotionConfig reducedMotion="user">
        <div
          className={`min-h-screen transition-colors duration-500 ${
            isDark
              ? "bg-[#0F0F1A] text-white selection:bg-[#4361EE] selection:text-white"
              : "bg-[#FFFFFF] text-[#1A1A2E] selection:bg-[#4361EE]/15 selection:text-[#4361EE]"
          }`}
        >
          {children}

          <AnimatePresence>
            {easterEggToast && (
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.95 }}
                role="status"
                aria-live="polite"
                className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-[#4361EE]/40 bg-[#1A1A2E] px-5 py-2.5 text-sm font-medium text-white shadow-2xl"
              >
                {easterEggToast}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
