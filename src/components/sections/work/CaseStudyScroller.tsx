"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Frame, Lock } from "lucide-react";
import { CASE_STUDIES, projectFor } from "@/data/caseStudies";

/** Scroll distance spent on each case study while the section is pinned. */
const STEP_SVH = 45;

/**
 * Desktop "present mode": the section pins to the screen and scrolling steps through the case
 * studies. Each next frame wipes up over the previous one (clip-path) while its image settles from
 * a slight zoom. A Figma-like Layers panel tracks the position and jumps on click.
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
        <div className="mx-auto flex h-full w-full max-w-[1600px] items-center gap-6 lg:gap-10 px-6">
          {/* Layers panel */}
          <div className="flex w-56 lg:w-64 shrink-0 flex-col rounded-xl border border-panel-border bg-panel p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
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

          {/* Stage: as large as the screen allows (5:4 covers, so height drives the width) */}
          <div className="flex h-full min-w-0 flex-1 flex-col justify-center">
            <div className="mx-auto flex w-full max-w-[calc((100svh-15rem)*1.25)] flex-col">
              <div className="flex items-center justify-between gap-2 pb-1.5 font-inter text-xs">
                <span className="flex items-center gap-1 text-selection">
                  <Frame aria-hidden className="size-3" strokeWidth={2} />
                  {study.title}
                </span>
                <span className="tabular-nums text-slate-500">{study.period}</span>
              </div>

              <div className="relative aspect-[5/4] w-full outline outline-1 outline-selection">
                {CASE_STUDIES.map((s, i) => {
                  const project = projectFor(s);
                  const shown = i <= active;
                  return (
                    <div
                      key={s.slug}
                      aria-hidden={i !== active}
                      className="absolute inset-0 overflow-hidden bg-white transition-[clip-path] duration-700 ease-(--ease-out)"
                      style={{ zIndex: i, clipPath: shown ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
                    >
                      {project ? (
                        <Image
                          src={project.image}
                          alt={s.title}
                          fill
                          sizes="(min-width: 1280px) 60vw, 75vw"
                          className="object-cover transition-transform duration-1000 ease-(--ease-out)"
                          style={{ transform: i === active ? "none" : "scale(1.08)" }}
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 border border-dashed border-slate-300 bg-panel text-slate-500">
                          <Lock aria-hidden className="size-7" strokeWidth={1.75} />
                          <p className="font-inter text-sm">Case study coming soon</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((pos) => (
                  <span key={pos} aria-hidden className={`absolute z-30 size-2 border border-selection bg-white ${pos}`} />
                ))}
              </div>

              {/* Caption below the frame (covers carry their own text); re-keyed to fade in per study */}
              <div key={study.slug} className="animate-fade-in mt-4 flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <h3 className="font-montserrat text-2xl lg:text-3xl font-semibold text-slate-800">{study.title}</h3>
                  <p className="mt-1 font-inter text-sm lg:text-base text-slate-600">
                    {study.tagline} <span className="text-slate-400">· {study.role}</span>
                  </p>
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
    </div>
  );
}
