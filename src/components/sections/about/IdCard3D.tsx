"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** ID card that rotates upright as it scrolls toward the middle of the screen. */
export function IdCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Starts when the card's top enters the bottom of the viewport,
  // ends when the card's center reaches the viewport center.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "0.5 0.5"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  const rotateX = useTransform(progress, [0, 1], [70, 15]);
  const rotateZ = useTransform(progress, [0, 1], [20, -5]);
  const y = useTransform(progress, [0, 1], [200, 0]);
  const scale = useTransform(progress, [0, 1], [0.8, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div ref={cardRef} className="flex items-center justify-center lg:justify-end mt-12 lg:mt-0 w-full" style={{ perspective: "1200px" }}>
      <motion.div
        style={{ rotateX, rotateZ, y, scale, opacity }}
        className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] drop-shadow-[0px_20px_40px_rgba(0,0,0,0.15)] origin-bottom"
      >
        <Image
          src="/images/about/id-card.webp"
          alt="Safwan ID Card"
          width={778}
          height={487}
          sizes="(min-width: 768px) 500px, (min-width: 640px) 400px, 280px"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </div>
  );
}
