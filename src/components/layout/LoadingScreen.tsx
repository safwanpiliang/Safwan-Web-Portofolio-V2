"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { File } from "lucide-react";

/** How long the intro screen stays up. It does not wait for images to load. */
const DISPLAY_MS = 2000;

/** Intro styled as opening a design file; the bar fills in pure CSS (see `animate-load-bar`). */
export function LoadingScreen() {
  // Only a first visit to the home page gets the intro; a shared case study link opens straight away.
  // The layout keeps this mounted, so client navigation back to "/" doesn't replay it either.
  const [isLoading, setIsLoading] = useState(usePathname() === "/");

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [isLoading]);

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
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="canvas-grid fixed inset-0 z-[10000] flex items-center justify-center px-4"
        >
          <div role="status" className="w-full max-w-80 rounded-xl border border-panel-border bg-panel p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2 font-inter text-sm font-medium text-slate-900">
              <File aria-hidden className="size-4 shrink-0 text-selection" strokeWidth={2} />
              <span className="truncate">Safwan-Portfolio.fig</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200">
              <div className="animate-load-bar h-full w-full rounded-full bg-selection" />
            </div>
            <p className="mt-2 font-inter text-xs text-slate-500">Opening file…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
