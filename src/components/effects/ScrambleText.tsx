"use client";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

/**
 * Scrambles into `text` the first time it scrolls into view (or when the text changes).
 * Frames are written straight to the DOM every 40ms, so it never re-renders React.
 */
export function ScrambleText({ text, duration = 1500, loop = false }: { text: string, duration?: number, loop?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Separate ref for the text: a ref handed to useInView must not be written through.
  const textRef = useRef<HTMLSpanElement>(null);
  // Once only: re-scrambling on every scroll past re-lays-out the text while the page is scrolling.
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    // Write to React's own text node so later renders (a new `text`) still update it.
    const node = textRef.current?.firstChild;
    if (!node) return;
    // Out of view (or scrolled away mid-scramble): just show the final text.
    if (!isInView) {
      node.nodeValue = text;
      return;
    }

    let intervalId: ReturnType<typeof setInterval>;
    let timeoutId: ReturnType<typeof setTimeout>;

    const runAnimation = () => {
      const start = Date.now();

      intervalId = setInterval(() => {
        const progress = Math.min((Date.now() - start) / duration, 1);

        let newText = "";
        for (let i = 0; i < text.length; i++) {
          if (progress >= i / text.length) {
            newText += text[i];
          } else {
            newText += text[i] === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        node.nodeValue = newText;

        if (progress === 1) {
          clearInterval(intervalId);
          if (loop) {
            timeoutId = setTimeout(runAnimation, 800); // Pause before repeating
          }
        }
      }, 40);
    };

    runAnimation();

    // Only stop the timers: by now React may already have written a newer `text` to this node.
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [isInView, text, duration, loop]);

  return (
    <span ref={ref}>
      <span ref={textRef}>{text}</span>
    </span>
  );
}
