"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Frame, MessageCircle, MousePointer2, Type, type LucideIcon } from "lucide-react";
import { NAV_TABS } from "@/data/site";

/** Each section is a Figma tool: Move (home), Frame (works), Text (about). */
const TAB_ICONS: Record<(typeof NAV_TABS)[number]["id"], LucideIcon> = {
  hero: MousePointer2,
  projects: Frame,
  about: Type,
};

interface PageLayout {
  /** Document-relative top of each tab's section. */
  sectionTops: number[];
  pageHeight: number;
}

/** Reads layout once; scroll handling then only does arithmetic (no forced layout per frame). */
function measureLayout(): PageLayout {
  return {
    sectionTops: NAV_TABS.map((tab) => {
      const el = document.getElementById(tab.id);
      return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
    }),
    pageHeight: document.body.offsetHeight,
  };
}

/** Index of the tab whose section sits under the middle of the viewport. */
function findActiveTab(scrollY: number, { sectionTops, pageHeight }: PageLayout) {
  const viewportHeight = window.innerHeight;
  if (scrollY + viewportHeight >= pageHeight - 50) return NAV_TABS.length - 1;
  for (let i = sectionTops.length - 1; i >= 0; i--) {
    if (sectionTops[i] - scrollY <= viewportHeight * 0.5) return i;
  }
  return 0;
}

/**
 * Floating Figma-style toolbar at the bottom of the screen: in thumb reach on phones and the same
 * on every device. Phones show only the active tab's label so the bar fits a 360px screen.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [activeTab, setActiveTab] = useState(0);

  const layout = useRef<PageLayout>({ sectionTops: [], pageHeight: 0 });

  // Re-measure section positions whenever the page size changes (resize, images, "Load More").
  useEffect(() => {
    const update = () => {
      layout.current = measureLayout();
      setActiveTab(findActiveTab(window.scrollY, layout.current));
    };
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  // Motion values fire at most once per frame, so this doubles as a throttled scroll handler.
  useMotionValueEvent(scrollY, "change", (latest) => {
    setActiveTab(findActiveTab(latest, layout.current));
  });

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    document.getElementById(NAV_TABS[index].id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav aria-label="Sections" className="fixed inset-x-0 bottom-4 md:bottom-6 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 rounded-2xl border border-panel-border bg-panel/95 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
        {NAV_TABS.map((tab, i) => {
          const Icon = TAB_ICONS[tab.id];
          const isActive = i === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(i)}
              aria-label={tab.label}
              aria-current={isActive ? "true" : undefined}
              className={`relative flex h-11 min-w-11 items-center justify-center gap-2 rounded-xl px-3 font-inter text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${
                isActive ? "text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {/* One shared highlight that slides between tabs, like Figma's active tool */}
              {isActive && (
                <motion.span
                  layoutId="toolbar-active"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className="absolute inset-0 rounded-xl bg-selection"
                />
              )}
              <Icon aria-hidden className="relative size-[18px] shrink-0" strokeWidth={1.75} />
              <span aria-hidden className={`relative ${isActive ? "inline" : "hidden sm:inline"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}

        <span aria-hidden className="mx-1 h-6 w-px bg-panel-border" />

        <button
          type="button"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Let's talk"
          className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-xl bg-brand-orange px-3 font-inter text-[13px] font-semibold text-ink whitespace-nowrap transition-colors duration-150 hover:bg-brand-orange-hover"
        >
          <MessageCircle aria-hidden className="size-[18px] shrink-0" strokeWidth={1.75} />
          <span aria-hidden className="hidden sm:inline">Let&apos;s talk</span>
        </button>
      </div>
    </nav>
  );
}
