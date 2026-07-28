"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactNode } from "react";

interface ParallaxWrapperProps {
  children: ReactNode;
  speed: number;
  className?: string;
}

export function ParallaxWrapper({ children, speed, className = "" }: ParallaxWrapperProps) {
  const { scrollY } = useScroll();
  
  // speed 0.5 translates element DOWN by 500px for every 1000px scrolled.
  // This counteracts the normal upward scroll, making it appear slower.
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  return (
    <motion.div style={{ y }} className={`transform-gpu will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
}
