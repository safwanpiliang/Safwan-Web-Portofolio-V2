"use client";

import { useState } from "react";
import { ScrambleText } from "@/components/effects/ScrambleText";
import { ARTICLES } from "@/data/articles";
import { CASE_STUDIES } from "@/data/caseStudies";
import { EXPERIENCE, EXPERIENCE_GROUPS } from "@/data/experience";
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

/** Experience styled as Figma's version history: newest first, blue dot = still ongoing. */
export function VersionHistory() {
  const [group, setGroup] = useState(ALL);
  const rows = group === ALL ? EXPERIENCE : EXPERIENCE.filter((e) => e.group === group);

  return (
    <section id="experience" className="relative w-full py-12 md:py-20 flex flex-col items-center">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 flex flex-col items-center gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-montserrat font-medium text-[32px] md:text-[64px] text-slate-700 tracking-[-1px]">
            Version <span className="font-doto font-black"><ScrambleText text="History" /></span>
          </h2>
          <p className="font-inter text-slate-700 text-base md:text-lg max-w-2xl">Every role so far, newest first.</p>
        </div>

        <dl className="grid w-full max-w-3xl grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="reveal-on-view flex flex-col-reverse gap-1 rounded-xl border border-panel-border bg-panel p-4">
              <dt className="font-inter text-xs text-slate-500">{s.label}</dt>
              <dd className="font-doto text-3xl md:text-4xl font-black text-slate-800 tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="reveal-on-view w-full max-w-3xl overflow-hidden rounded-xl border border-panel-border bg-panel">
          <div className="flex flex-wrap gap-1.5 border-b border-panel-border p-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setGroup(f)}
                aria-pressed={group === f}
                className={`h-11 md:h-9 rounded-lg px-3 font-inter text-[13px] font-medium transition-colors ${
                  group === f ? "bg-selection text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Keyed on the filter so the list re-mounts and fades in on every change */}
          <ol key={group} className="animate-fade-in">
            {rows.map((e) => (
              <li key={`${e.org}-${e.role}`} className="flex gap-3 border-t border-panel-border px-4 py-3 first:border-t-0">
                <span
                  aria-hidden
                  className={`mt-1.5 size-2.5 shrink-0 rounded-full ${e.current ? "bg-selection ring-4 ring-selection/15" : "bg-slate-300"}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <p className="font-inter text-sm md:text-base font-semibold text-slate-800">
                      {e.role}
                      {e.current && <span className="sr-only"> (current)</span>}
                    </p>
                    <p className="shrink-0 font-inter text-xs text-slate-500 tabular-nums">{e.period}</p>
                  </div>
                  <p className="font-inter text-sm text-slate-600">{e.org}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
