"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import type { FakeCursorConfig } from "@/data/cursors";

type FakeCursorProps = Omit<FakeCursorConfig, "id">;

// Only shown on desktop-sized screens; touch devices have no cursor to imitate.
const DESKTOP_QUERY = "(min-width: 768px)";
const subscribeDesktop = (onChange: () => void) => {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};
const useIsDesktop = () =>
  useSyncExternalStore(subscribeDesktop, () => window.matchMedia(DESKTOP_QUERY).matches, () => false);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Resolves immediately if the tab is visible, otherwise once it becomes visible again. */
const whenVisible = () =>
  new Promise<void>((resolve) => {
    if (!document.hidden) return resolve();
    const onChange = () => {
      if (document.hidden) return;
      document.removeEventListener("visibilitychange", onChange);
      resolve();
    };
    document.addEventListener("visibilitychange", onChange);
  });

/** A fake "multiplayer" cursor that wanders around the page and occasionally types a chat bubble. */
export function FakeCursor({ cursorImage, cursorArrowImage, messages, themeColor, initialDelay }: FakeCursorProps) {
  const controls = useAnimation();
  const isDesktop = useIsDesktop();
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isDesktop) return;
    let active = true;

    // Random start so multiple cursors don't overlap
    let currentX = Math.random() * window.innerWidth;
    let currentY = window.innerHeight / 2 + (Math.random() - 0.5) * 400;

    const run = async () => {
      await controls.set({ x: currentX, y: currentY, opacity: 0 });
      if (initialDelay > 0) await sleep(initialDelay);
      if (!active) return;

      await controls.start({ opacity: 1, transition: { duration: 1 } });

      while (active) {
        // Don't burn CPU animating while the tab is in the background
        await whenVisible();
        if (!active) return;

        // Next target inside the current viewport (page coordinates, so it scrolls with the page)
        const nextX = Math.random() * (window.innerWidth - 100);
        const nextY = window.scrollY + Math.random() * (window.innerHeight - 100);
        // Offset midpoint for a curved, human-like path
        const midX = (currentX + nextX) / 2 + (Math.random() - 0.5) * 400;
        const midY = (currentY + nextY) / 2 + (Math.random() - 0.5) * 400;

        await controls.start({
          x: [currentX, midX, nextX],
          y: [currentY, midY, nextY],
          transition: { duration: 0.8 + Math.random() * 1.2, ease: "easeInOut", times: [0, 0.5, 1] },
        });
        currentX = nextX;
        currentY = nextY;

        if (Math.random() > 0.6) {
          setIsTyping(true);
          setDisplayedText("");
          await sleep(500 + Math.random() * 1000);
          if (!active) return;

          const message = messages[Math.floor(Math.random() * messages.length)];
          for (let i = 0; i <= message.length; i++) {
            setDisplayedText(message.substring(0, i));
            await sleep(30 + Math.random() * 90);
            if (!active) return;
          }

          await sleep(2500 + Math.random() * 1500); // time to "read" the message
          if (!active) return;
          setIsTyping(false);
          setDisplayedText("");
        } else {
          await sleep(200 + Math.random() * 1300);
        }
      }
    };

    run();
    return () => {
      active = false;
    };
  }, [isDesktop, controls, messages, initialDelay]);

  if (!isDesktop) return null;

  return (
    <motion.div
      animate={controls}
      className="absolute top-0 left-0 z-[9999] pointer-events-none will-change-transform drop-shadow-[1px_2px_2px_rgba(0,0,0,0.3)] flex flex-col items-start"
    >
      <Image
        src={isTyping ? cursorArrowImage : cursorImage}
        alt=""
        width={82}
        height={42}
        loading="eager"
        className="w-22.5 h-auto relative z-10"
      />

      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, transformOrigin: "top left" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            style={{ backgroundColor: themeColor }}
            className="absolute top-5 left-[19px] z-20 text-slate-100 text-[14px] px-3.5 py-2 rounded-r-2xl rounded-bl-2xl whitespace-nowrap font-inter font-medium shadow-md flex items-center min-h-9"
          >
            <span>{displayedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-0.5 h-3.5 bg-white ml-[3px] rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
