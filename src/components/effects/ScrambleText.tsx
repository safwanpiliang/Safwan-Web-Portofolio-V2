"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

export function ScrambleText({ text, duration = 1500, loop = false }: { text: string, duration?: number, loop?: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  useEffect(() => {
    if (!isInView) return;

    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const runAnimation = () => {
      const start = Date.now();
      
      intervalId = setInterval(() => {
        const now = Date.now();
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        
        let newText = "";
        for (let i = 0; i < text.length; i++) {
          if (progress >= (i / text.length)) {
            newText += text[i];
          } else {
            newText += text[i] === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        
        setDisplayText(newText);

        if (progress === 1) {
          clearInterval(intervalId);
          if (loop) {
            timeoutId = setTimeout(() => {
              runAnimation();
            }, 800); // Pause before repeating
          }
        }
      }, 40);
    };

    runAnimation();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [isInView, text, duration, loop]);

  return <span ref={ref}>{displayText}</span>;
}
