"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, ReactNode } from "react";

export function HeroFreezeWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"]
  });

  // When the bottom of this element hits the bottom of the viewport ("end end"), 
  // it starts translating DOWN by exactly the viewport height as the user keeps scrolling.
  // This perfectly cancels out the scroll, freezing the element in place 
  // and allowing the next section to slide over it seamlessly.
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  return (
    <motion.div ref={ref} style={{ y }} className="w-full relative z-0">
      {children}
    </motion.div>
  );
}
