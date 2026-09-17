"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Respects the OS "reduce motion" setting: framer-motion skips transform animations (fades still run). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
