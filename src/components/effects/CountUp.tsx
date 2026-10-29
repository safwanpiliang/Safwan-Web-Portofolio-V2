"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a stat like "22" or "1,000+" up from zero the first time it scrolls into view.
 * The real value is rendered on the server and kept for reduced motion and screen readers.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^([\d,]+)(.*)$/);
    if (!inView || reduce || !match) return;
    const target = Number(match[1].replace(/,/g, ""));
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (n) => setDisplay(Math.round(n).toLocaleString("en-US") + match[2]),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
