"use client";

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/** `sizes` for images in the 2-column (below lg) / 3-column card grids, capped at 1400px wide. */
export const CARD_GRID_IMAGE_SIZES = "(min-width: 1400px) 420px, (min-width: 1024px) 33vw, 50vw";

const PAPER_BASE =
  "absolute inset-0 border transition-[rotate,translate,box-shadow] duration-500 ease-out shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]";

interface TiltCardProps {
  children: ReactNode;
  /** Seconds to wait before the reveal transition starts (for staggering a row). */
  revealDelay?: number;
}

/**
 * Card that tilts toward the mouse, with two stacked "paper" sheets behind it.
 * Fades/slides in once when scrolled into view, using a CSS transition (`.reveal` in globals.css)
 * so the browser runs it on the compositor instead of animating it from JS every frame.
 */
export function TiltCard({ children, revealDelay = 0 }: TiltCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isRevealed = useInView(wrapperRef, { once: true, margin: "-50px" });
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={wrapperRef}
      data-revealed={isRevealed}
      style={{ perspective: 1000, "--reveal-delay": `${revealDelay}s` } as CSSProperties}
      className="reveal relative group w-full h-full"
    >
      {/* Back paper */}
      <div className={`${PAPER_BASE} bg-slate-300 border-slate-300 origin-bottom-left rotate-[2deg] translate-x-1 group-hover:rotate-[4deg] group-hover:translate-x-2 group-hover:-translate-y-1 z-[-2]`} />
      {/* Middle paper */}
      <div className={`${PAPER_BASE} bg-slate-200 border-slate-200 origin-bottom-right -rotate-[1deg] -translate-x-1 group-hover:-rotate-[2deg] group-hover:-translate-x-2 group-hover:-translate-y-0.5 z-[-1]`} />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="bg-card p-1.5 sm:p-2 pb-3 sm:pb-4 flex flex-col gap-2 sm:gap-4 md:gap-6 shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-out border border-white relative z-10 h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
