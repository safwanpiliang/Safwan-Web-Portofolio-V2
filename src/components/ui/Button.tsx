"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const BASE =
  "inline-flex items-center justify-center rounded-full font-inter font-medium whitespace-nowrap transition-colors";

const VARIANTS = {
  white: "bg-slate-100 text-slate-700 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-slate-100 hover:bg-white",
  ghost: "bg-white/25 text-slate-700 hover:bg-white/40",
  orange: "bg-brand-orange text-ink border border-brand-orange shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-brand-orange-hover",
};

const SIZES = {
  /** Small CTA inside cards (Live Project, Read on Medium). */
  xs: {
    button: "gap-1 sm:gap-1.5 md:gap-2 px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3.5 md:py-2 text-[10px] sm:text-[12px] md:text-[14px] leading-[20px]",
    icon: "w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5",
  },
  /** Toolbar-sized pill (Full on Behance). */
  sm: {
    button: "gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2.5 text-[12px] md:text-[14px] leading-[20px]",
    icon: "w-4 h-4 md:w-5 md:h-5",
  },
  /** Wide standalone action (Load More). */
  md: {
    button: "gap-1.5 md:gap-2 px-6 py-2.5 md:px-8 md:py-3 text-[12px] md:text-[14px] leading-[20px]",
    icon: "w-4 h-4 md:w-5 md:h-5",
  },
  /** Hero call-to-action. */
  lg: {
    button: "relative overflow-hidden gap-1.5 md:gap-2 px-3 py-1.5 md:px-4.5 md:py-2.5 text-[12px] md:text-[16px] leading-[18px] md:leading-[24px]",
    icon: "w-5 h-5",
  },
};

interface ButtonProps {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  icon?: LucideIcon;
  /** Renders an external link (new tab) instead of a button. */
  href?: string;
  onClick?: () => void;
  /** Subtle scale on hover/tap. */
  animated?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = "white",
  size = "lg",
  icon: Icon,
  href,
  onClick,
  animated = false,
  className = "",
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size].button} ${className}`;
  const content = (
    <>
      {children}
      {Icon && <Icon className={SIZES[size].icon} />}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  if (animated) {
    return (
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={classes}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
