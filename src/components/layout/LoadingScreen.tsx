"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrambleText } from "@/components/effects/ScrambleText";

/** How long the intro screen stays up. It does not wait for images to load. */
const DISPLAY_MS = 2000;

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-100 font-doto"
        >
          <div className="text-2xl md:text-5xl font-bold text-slate-900 tracking-[0.2em] md:tracking-[0.3em]">
            <ScrambleText text="LOADING..." duration={1200} loop={true} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
