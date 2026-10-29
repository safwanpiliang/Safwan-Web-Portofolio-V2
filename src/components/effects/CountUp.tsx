"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a stat like "22" or "1,000+" up from zero the first time it scrolls into view.
 * The real value is rendered on the server and kept for reduced motion and screen readers.
 * Frames are written straight to the DOM (no React state), so the count never re-renders.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const match = value.match(/^([\d,]+)(.*)$/);
    // Write to React's own text node so a re-render still owns the same node.
    const node = textRef.current?.firstChild;
    if (!inView || reduce || !match || !node) return;
    const target = Number(match[1].replace(/,/g, ""));
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (n) => {
        node.nodeValue = Math.round(n).toLocaleString("en-US") + match[2];
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} aria-label={value}>
      <span ref={textRef} aria-hidden>
        {value}
      </span>
    </span>
  );
}
