"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

type CursorMode = "default" | "button" | "card";

export default function CustomCursor() {
  const { prefersReducedMotion } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 650, damping: 36, mass: 0.35 });
  const springY = useSpring(mouseY, { stiffness: 650, damping: 36, mass: 0.35 });

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }
    const finePointer = window.matchMedia("(pointer: fine)");
    setEnabled(finePointer.matches);

    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    finePointer.addEventListener("change", onChange);
    return () => finePointer.removeEventListener("change", onChange);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="card"]')) {
        setMode("card");
      } else if (
        target.closest(
          'button, a, select, summary, [role="button"], [data-cursor="button"]'
        )
      ) {
        setMode("button");
      } else {
        setMode("default");
      }
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [enabled, mouseX, mouseY, visible]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
        mixBlendMode: "difference",
      }}
      className={`pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {mode === "card" ? (
        <motion.div
          key="crosshair"
          initial={{ scale: 0.6, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.18 }}
          className="relative flex h-10 w-10 items-center justify-center"
        >
          <span className="absolute h-8 w-[2px] bg-white" />
          <span className="absolute h-[2px] w-8 bg-white" />
          <span className="h-4 w-4 rounded-full border-2 border-white" />
        </motion.div>
      ) : mode === "button" ? (
        <motion.div
          key="circle"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          className="h-11 w-11 rounded-full border-2 border-white bg-white/90"
        />
      ) : (
        <motion.div
          key="dot"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="h-3 w-3 rounded-full bg-white"
        />
      )}
    </motion.div>
  );
}
