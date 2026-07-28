"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FloatingSectionProps {
  children: React.ReactNode;
  parallaxOffset?: number;
  floatDuration?: number;
  floatDelay?: number;
  className?: string;
}

export const FloatingSection = ({ 
  children, 
  parallaxOffset = 80, 
  floatDuration = 6,
  floatDelay = 0,
  className = "w-full relative z-10"
}: FloatingSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Maps scroll progress to a Y translation (moves up as you scroll down)
  const y = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
