"use client";

import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";

export function HeroParallaxWrapper({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [threshold, setThreshold] = useState(400); // Default fallback

  useEffect(() => {
    // 50vh is half the window height (middle of the screen)
    setThreshold(window.innerHeight / 2);
  }, []);

  // When scrollY is below the 50vh threshold, y remains 0 (normal scroll).
  // When scrollY exceeds the threshold, y translates DOWN by 40% of the additional scroll distance.
  // This means the hero section continues to scroll UP  // This smoothly delays the parallax overtake until the logos reach the center!
  // To avoid a sudden "jerk" (infinite acceleration) when hitting the threshold, 
  // we add an easing ramp (threshold + 200) so the speed ramps up smoothly from 0% to 20% to 40%.
  const rawY = useTransform(
    scrollY,
    [0, threshold, threshold + 200, threshold + 1000],
    [0, 0, 40, 360]
  );

  const y = useSpring(rawY, { stiffness: 400, damping: 90 });

  return (
    <motion.div style={{ y }} className="w-full relative z-0 transform-gpu will-change-transform">
      {children}
    </motion.div>
  );
}
