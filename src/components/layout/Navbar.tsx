"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NAV_TABS, SITE_LINKS } from "@/data/site";

/** Scroll distance over which the navbar morphs from transparent to the floating pill. */
const SCROLL_RANGE = [0, 200];
const px = (v: number) => `${v}px`;

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

interface NavButtonProps {
  label: string;
  isActive: boolean;
  isScrolled: boolean;
  scrollY: MotionValue<number>;
  onClick: () => void;
}

function NavButton({ label, isActive, isScrolled, scrollY, onClick }: NavButtonProps) {
  const bgActive = useTransform(scrollY, SCROLL_RANGE, ["rgba(255, 255, 255, 0.15)", "rgba(203, 213, 225, 0.4)"]);
  const textColorActive = useTransform(scrollY, SCROLL_RANGE, ["rgb(255, 255, 255)", "rgb(15, 23, 42)"]); // white → slate-900
  const textColorInactive = useTransform(scrollY, SCROLL_RANGE, ["rgb(203, 213, 225)", "rgb(71, 85, 105)"]); // slate-300 → slate-600

  return (
    <div className="relative rounded-full flex items-center justify-center">
      <motion.div
        style={{ backgroundColor: isActive ? bgActive : "transparent" }}
        className="absolute inset-0 rounded-full pointer-events-none z-[1]"
      />
      <motion.button
        type="button"
        onClick={onClick}
        aria-current={isActive ? "true" : undefined}
        style={{ color: isActive ? textColorActive : textColorInactive }}
        whileHover={{ color: isScrolled ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)" }}
        className="relative z-10 flex items-center justify-center gap-2 px-3 py-1.5 md:px-3.5 md:py-2 rounded-full font-inter font-medium text-[12px] md:text-[14px] leading-[20px] whitespace-nowrap transition-colors duration-200"
      >
        {label}
      </motion.button>
    </div>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

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
    setIsScrolled(latest > 100);
    setActiveTab(findActiveTab(latest, layout.current));
  });

  const navPadding = useTransform(useTransform(scrollY, SCROLL_RANGE, [16, 0]), px);
  const spacerFlex = useTransform(scrollY, SCROLL_RANGE, [1, 0]);

  // Shared by the tab group and the CTA group
  const groupBg = useTransform(scrollY, SCROLL_RANGE, ["rgba(248, 250, 252, 0)", "rgba(248, 250, 252, 1)"]);
  const groupShadow = useTransform(scrollY, SCROLL_RANGE, ["0px 0px 0px rgba(0, 0, 0, 0)", "0px 4px 20px rgba(0, 0, 0, 0.08)"]);
  const groupPadding = useTransform(useTransform(scrollY, SCROLL_RANGE, [0, 8]), px);

  // "Let's talk" CTA collapses into an icon-only button
  const ctaBg = useTransform(scrollY, SCROLL_RANGE, ["rgba(241, 245, 249, 1)", "rgba(241, 245, 249, 0)"]);
  const ctaColor = useTransform(scrollY, SCROLL_RANGE, ["rgb(51, 65, 85)", "rgb(71, 85, 105)"]);
  const ctaPaddingSide = useTransform(useTransform(scrollY, SCROLL_RANGE, [16, 14]), px);
  const ctaGap = useTransform(useTransform(scrollY, SCROLL_RANGE, [8, 0]), px);
  const ctaTextWidth = useTransform(useTransform(scrollY, SCROLL_RANGE, [65, 0]), px);
  const ctaTextOpacity = useTransform(scrollY, SCROLL_RANGE, [1, 0]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    document.getElementById(NAV_TABS[index].id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        style={{ paddingLeft: navPadding, paddingRight: navPadding }}
        className="flex justify-center items-center w-full max-w-[1400px] pointer-events-auto"
      >
        <motion.div
          style={{ backgroundColor: groupBg, boxShadow: groupShadow, padding: groupPadding }}
          className="relative flex items-center gap-[4px] md:gap-[15px] rounded-full"
        >
          {NAV_TABS.map((tab, i) => (
            <NavButton
              key={tab.id}
              label={tab.label}
              isActive={i === activeTab}
              isScrolled={isScrolled}
              scrollY={scrollY}
              onClick={() => handleTabClick(i)}
            />
          ))}
        </motion.div>

        {/* Spacer + CTA are desktop-only */}
        <motion.div style={{ flexGrow: spacerFlex, minWidth: "16px" }} className="hidden md:block" />

        <motion.div
          style={{ backgroundColor: groupBg, boxShadow: groupShadow, padding: groupPadding }}
          className="hidden md:flex items-center rounded-full"
        >
          <motion.a
            href={SITE_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: ctaBg,
              color: ctaColor,
              paddingLeft: ctaPaddingSide,
              paddingRight: ctaPaddingSide,
              paddingTop: "8px",
              paddingBottom: "8px",
              gap: ctaGap,
            }}
            whileHover={isScrolled ? { color: "rgb(15, 23, 42)" } : { backgroundColor: "rgb(226, 232, 240)" }}
            className="flex items-center justify-center rounded-full font-inter font-medium text-[14px] leading-[20px] whitespace-nowrap transition-colors duration-200 group"
          >
            <motion.span
              style={{ width: ctaTextWidth, opacity: ctaTextOpacity }}
              className="block overflow-hidden whitespace-nowrap"
            >
              Let&apos;s talk
            </motion.span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200" />
          </motion.a>
        </motion.div>
      </motion.nav>
    </div>
  );
}
