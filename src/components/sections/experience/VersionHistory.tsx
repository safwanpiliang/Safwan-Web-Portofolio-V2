"use client";

import { useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/effects/CountUp";
import { Reveal } from "@/components/effects/Reveal";
import { ScrambleText } from "@/components/effects/ScrambleText";
import { ARTICLES } from "@/data/articles";
import { CASE_STUDIES } from "@/data/caseStudies";
import { EXPERIENCE, EXPERIENCE_GROUPS, type Experience } from "@/data/experience";
import { PROJECTS } from "@/data/projects";

const ALL = "All";
const FILTERS = [ALL, ...EXPERIENCE_GROUPS];

// Every number is derived from the data files, except the Batam figure from its project overview.
const SINCE = EXPERIENCE.map((e) => e.start).sort()[0].slice(0, 4);
const STATS = [
  { value: String(PROJECTS.length + CASE_STUDIES.filter((c) => c.locked).length), label: "projects" },
  { value: String(EXPERIENCE.length), label: `roles since ${SINCE}` },
  { value: String(ARTICLES.length), label: "case studies on Medium" },
  { value: "1,000+", label: "registrants on Batam Campus Expo" },
];

/** Figma-style version number: the oldest role is v1, the newest the highest. */
const versionOf = (e: Experience) => `v${EXPERIENCE.length - EXPERIENCE.indexOf(e)}`;

function Stats({ className }: { className: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-3 ${className}`}>
      {STATS.map((s) => (
        <div key={s.label} className="reveal-on-view flex flex-col-reverse gap-1 rounded-xl border border-panel-border bg-panel p-4">
          <dt className="font-inter text-xs text-slate-500">{s.label}</dt>
          <dd className="font-doto text-3xl font-black text-slate-800 tabular-nums">
            <CountUp value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Experience as Figma's version history. Scrolling plays through it: the row crossing the middle
 * of the screen becomes the selected version (highlight, pulsing dot), a sticky panel shows its
 * year and version number, and the blue line draws down the list.
 */
export function VersionHistory() {
  const [group, setGroup] = useState(ALL);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const rows = group === ALL ? EXPERIENCE : EXPERIENCE.filter((e) => e.group === group);
  const current = rows[Math.min(active, rows.length - 1)];

  // The row whose box crosses the horizontal middle of the viewport is the active one.
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLLIElement>("li[data-index]");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    items.forEach((li) => observer.observe(li));
    return () => observer.disconnect();
  }, [group]);

  const changeGroup = (f: string) => {
    setGroup(f);
    setActive(0);
  };

  return (
    <section id="experience" className="relative w-full py-12 md:py-20 flex flex-col items-center">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 flex flex-col items-center gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-montserrat font-medium text-[32px] md:text-[64px] text-slate-700 tracking-[-1px]">
            <Reveal>Version</Reveal> <Reveal index={1}><span className="font-doto font-black"><ScrambleText text="History" /></span></Reveal>
          </h2>
          <p className="font-inter text-slate-700 text-base md:text-lg max-w-2xl">
            <Reveal index={2}>Every role so far, newest first. Scroll to play through it.</Reveal>
          </p>
        </div>

        <Stats className="w-full max-w-3xl md:hidden" />

        <div className="grid w-full max-w-5xl items-start gap-6 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-10">
          {/* Sticky "now viewing" panel (md+) */}
          <aside className="hidden md:sticky md:top-10 md:flex flex-col gap-4">
            <div className="rounded-xl border border-panel-border bg-panel p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <p className="font-inter text-xs text-slate-500">Viewing version</p>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="font-doto text-7xl font-black leading-none text-slate-800 tabular-nums">
                  <ScrambleText text={current.start.slice(0, 4)} duration={500} />
                </span>
                <span className="font-inter text-lg font-semibold text-selection">{versionOf(current)}</span>
              </div>
              <div key={`${current.org}-${current.role}`} className="animate-fade-in mt-4 min-h-16">
                <p className="font-inter text-sm font-semibold text-slate-800">{current.role}</p>
                <p className="font-inter text-sm text-slate-600">{current.org}</p>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full origin-left rounded-full bg-selection transition-transform duration-300 ease-(--ease-out)"
                  style={{ transform: `scaleX(${(rows.indexOf(current) + 1) / rows.length})` }}
                />
              </div>
            </div>
            <Stats className="" />
          </aside>

          <div className="w-full overflow-clip rounded-xl border border-panel-border bg-panel">
            {/* Filters stay pinned while the list scrolls; phones also get the current year here */}
            <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1.5 border-b border-panel-border bg-panel/95 p-2 backdrop-blur-md">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => changeGroup(f)}
                  aria-pressed={group === f}
                  className={`h-11 md:h-9 rounded-lg px-3 font-inter text-[13px] font-medium transition-colors ${
                    group === f ? "bg-selection text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {f}
                </button>
              ))}
              <span className="ml-auto px-2 font-inter text-xs font-semibold tabular-nums text-selection md:hidden">
                {current.start.slice(0, 4)} · {versionOf(current)}
              </span>
            </div>

            {/* Keyed on the filter so the list re-mounts and fades in on every change */}
            <ol ref={listRef} key={group} className="history-track animate-fade-in relative">
              <span aria-hidden className="absolute left-[21px] top-5 bottom-5 w-px bg-slate-200" />
              <span aria-hidden className="draw-y absolute left-[21px] top-5 bottom-5 w-px bg-selection" />
              {rows.map((e, i) => {
                const isActive = e === current;
                return (
                  <li
                    key={`${e.org}-${e.role}`}
                    data-index={i}
                    aria-current={isActive ? "true" : undefined}
                    className={`reveal-on-view relative flex gap-3 border-t border-panel-border px-4 py-4 transition-colors duration-300 first-of-type:border-t-0 ${
                      isActive ? "bg-selection/[0.06]" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 w-0.5 origin-top bg-selection transition-transform duration-300 ease-(--ease-out) ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <span aria-hidden className="relative mt-1.5 flex size-2.5 shrink-0">
                      {isActive && <span className="absolute inset-0 rounded-full bg-selection motion-safe:animate-ping" />}
                      <span
                        className={`relative size-2.5 rounded-full transition-colors duration-300 ${
                          isActive || e.current ? "bg-selection" : "bg-slate-300"
                        } ${e.current ? "ring-4 ring-selection/15" : ""}`}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <p className={`font-inter text-sm md:text-base font-semibold transition-colors duration-300 ${isActive ? "text-selection" : "text-slate-800"}`}>
                          {e.role}
                          {e.current && <span className="sr-only"> (current)</span>}
                        </p>
                        <p className="shrink-0 font-inter text-xs text-slate-500 tabular-nums">
                          <span className="mr-2 font-semibold text-slate-400">{versionOf(e)}</span>
                          {e.period}
                        </p>
                      </div>
                      <p className="font-inter text-sm text-slate-600">{e.org}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
