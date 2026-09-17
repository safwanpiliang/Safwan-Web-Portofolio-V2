"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterTextProps {
  /** Typed in order; every word except the last is deleted again. */
  words: string[];
  /** Size/color of the blinking caret (it should match the font size). */
  caretClassName: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  /** Pause after a word is typed, before it gets deleted. */
  holdDelay?: number;
  /** Pause after a word is deleted, before the next one starts. */
  gapDelay?: number;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Types the words each time the element scrolls into view. */
export function TypewriterText({
  words,
  caretClassName,
  typeSpeed = 150,
  deleteSpeed = 100,
  holdDelay = 800,
  gapDelay = 300,
}: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [displayedText, setDisplayedText] = useState("");
  // Depend on the joined string so inline arrays don't restart the effect every render.
  const wordsKey = words.join("\n");

  useEffect(() => {
    if (!isInView) return;
    const list = wordsKey.split("\n");
    let cancelled = false;

    const run = async () => {
      for (let w = 0; w < list.length; w++) {
        const word = list[w];
        for (let i = 1; i <= word.length; i++) {
          if (cancelled) return;
          setDisplayedText(word.slice(0, i));
          await wait(typeSpeed);
        }
        if (w === list.length - 1) return;

        await wait(holdDelay);
        for (let i = word.length; i >= 0; i--) {
          if (cancelled) return;
          setDisplayedText(word.slice(0, i));
          await wait(deleteSpeed);
        }
        await wait(gapDelay);
      }
    };
    run();

    return () => {
      cancelled = true;
      setDisplayedText("");
    };
  }, [isInView, wordsKey, typeSpeed, deleteSpeed, holdDelay, gapDelay]);

  return (
    <span ref={ref} className="inline-flex items-center">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className={`inline-block ${caretClassName}`}
      />
    </span>
  );
}
