"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const triggeredRef = useRef(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.985 && !triggeredRef.current) {
      triggeredRef.current = true;
      setShowLevelComplete(true);
    } else if (latest < 0.92 && triggeredRef.current) {
      triggeredRef.current = false;
    }
  });

  useEffect(() => {
    if (!showLevelComplete) return;
    const t = setTimeout(() => setShowLevelComplete(false), 3800);
    return () => clearTimeout(t);
  }, [showLevelComplete]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#4361EE] to-[#7B2FF7]"
      />

      <AnimatePresence>
        {showLevelComplete && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 360, damping: 25 }}
            className="fixed right-4 top-20 z-[75] flex items-center gap-2.5 rounded-2xl border border-[#4361EE]/30 bg-white px-4 py-3 text-sm font-semibold text-[#1A1A2E] shadow-xl dark:border-[#7B2FF7]/40 dark:bg-[#171728] dark:text-white"
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#4361EE] to-[#7B2FF7]" />
            <span className="font-display tracking-wide">LEVEL COMPLETE 🏆</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
