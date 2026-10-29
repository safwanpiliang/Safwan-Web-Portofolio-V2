"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Frame, Lock } from "lucide-react";
import { CASE_STUDIES, projectFor } from "@/data/caseStudies";

/** Scroll distance spent on each case study while the section is pinned. */
const STEP_SVH = 70;

/**
 * Desktop "prototype presentation": the section pins to the screen and scrolling steps through
 * the case studies. A Figma-like Layers panel shows where you are; the stage swaps the frame.
 * Reduced-motion users get `fallback` (the plain grid) instead.
 */
export function CaseStudyScroller({ fallback }: { fallback: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const count = CASE_STUDIES.length;

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(p * count))));
  });

  if (reduce) return <>{fallback}</>;

  // Jump to the middle of a study's scroll step, so the layer rows work as navigation too.
  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const travel = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * (i + 0.5)) / count, behavior: "smooth" });
  };

  const study = CASE_STUDIES[active];

  return (
    <div ref={trackRef} style={{ height: `${count * STEP_SVH + 100}svh` }} className="relative">
      <div className="sticky top-0 flex h-svh items-center pt-6 pb-[var(--toolbar-space)]">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] gap-8 lg:gap-12 px-6">
          {/* Layers panel */}
          <div className="flex h-fit flex-col rounded-xl border border-panel-border bg-panel p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between px-2 py-1.5 font-inter text-xs">
              <span className="font-semibold text-slate-900">Layers</span>
              <span className="tabular-nums text-slate-500">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </div>
            <ol className="mt-1 flex flex-col">
              {CASE_STUDIES.map((s, i) => {
                const Icon = s.locked ? Lock : Frame;
                const isActive = i === active;
                return (
                  <li key={s.slug}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={`flex h-10 w-full items-center gap-2 rounded-lg px-2 text-left font-inter text-[13px] transition-colors duration-200 ${
                        isActive ? "bg-selection/10 text-selection" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon aria-hidden className="size-3.5 shrink-0" strokeWidth={2} />
                      <span className="truncate font-medium">{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="mx-2 mt-2 mb-1 h-0.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full origin-left rounded-full bg-selection transition-transform duration-300 ease-(--ease-out)"
                style={{ transform: `scaleX(${(active + 1) / count})` }}
              />
            </div>
          </div>

          {/* Stage */}
          <div className="flex min-w-0 flex-col gap-5">
            <div className="flex items-center justify-between gap-2 font-inter text-xs text-selection">
              <span className="flex items-center gap-1">
                <Frame aria-hidden className="size-3" strokeWidth={2} />
                {study.title}
              </span>
              <span className="tabular-nums text-slate-500">{study.period}</span>
            </div>

            <div className="relative aspect-[5/4] w-full max-w-[calc(52svh*1.25)] outline outline-1 outline-selection">
              {CASE_STUDIES.map((s, i) => {
                const project = projectFor(s);
                const offset = i - active;
                return (
                  <div
                    key={s.slug}
                    aria-hidden={i !== active}
                    className="absolute inset-0 overflow-hidden bg-white transition-[opacity,transform] duration-500 ease-(--ease-out)"
                    style={{
                      opacity: offset === 0 ? 1 : 0,
                      transform: offset === 0 ? "none" : `translate3d(0, ${offset > 0 ? 6 : -6}%, 0) scale(0.97)`,
                    }}
                  >
                    {project ? (
                      <Image src={project.image} alt={s.title} fill sizes="(min-width: 1024px) 60vw, 70vw" className="object-cover" />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 border border-dashed border-slate-300 bg-panel text-slate-500">
                        <Lock aria-hidden className="size-6" strokeWidth={1.75} />
                        <p className="font-inter text-sm">Case study coming soon</p>
                      </div>
                    )}
                  </div>
                );
              })}
              {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((pos) => (
                <span key={pos} aria-hidden className={`absolute z-10 size-2 border border-selection bg-white ${pos}`} />
              ))}
            </div>

            <div key={study.slug} className="animate-fade-in flex max-w-[calc(52svh*1.25)] items-start justify-between gap-6">
              <div className="min-w-0">
                <h3 className="font-montserrat text-2xl lg:text-3xl font-semibold text-slate-800">{study.title}</h3>
                <p className="mt-1 font-inter text-base text-slate-600">{study.tagline}</p>
                <p className="mt-2 font-inter text-xs text-slate-500">{study.role}</p>
              </div>
              {!study.locked && (
                <Link
                  href={`/work/${study.slug}`}
                  className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-selection px-4 font-inter text-sm font-semibold text-white transition-colors hover:bg-selection/90"
                >
                  Read case study
                  <ArrowUpRight aria-hidden className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
