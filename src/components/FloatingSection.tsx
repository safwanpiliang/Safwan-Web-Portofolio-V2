"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
  const rawY = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]);
  const smoothY = useSpring(rawY, { stiffness: 400, damping: 90 });
  const y = useTransform(smoothY, (val) => Math.round(val));

  return (
    <motion.div ref={ref} style={{ y }} className={`${className} transform-gpu will-change-transform`}>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay
        }}
        className="w-full h-full transform-gpu will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
