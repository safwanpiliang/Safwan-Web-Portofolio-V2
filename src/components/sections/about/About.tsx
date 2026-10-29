"use client";

import { motion } from "framer-motion";
import { TypewriterText } from "@/components/effects/TypewriterText";
import { PROFILE, STATUS } from "@/data/site";
import { IdCard3D } from "./IdCard3D";

const TITLE_WORDS = ["You?", "Me?"];

/** Bio as [text, bold] runs, split into words for the scroll highlight. */
const BIO: [string, boolean][] = [
  ["\u201cHi, I\u2019m ", false],
  ["Safwan Piliang", true],
  [" the person behind the projects above. As a freelance multidisciplinary designer and tech student at UGM, my work is driven by a simple idea: see the world through my eyes. I specialize in ", false],
  ["Graphic Design", true],
  [", ", false],
  ["UI-focused Product Design", true],
  [", and ", false],
  ["3D Modeling", true],
  [" using Blender, focusing on ", false],
  ["crafting visually engaging and user-friendly digital spaces", true],
  [". Let\u2019s collaborate and bring your ideas to life!\u201d", false],
];

export function About() {
  return (
    <section id="about" className="relative w-full py-10 sm:py-16 md:py-32 px-4 sm:px-6 md:px-8 flex justify-center">
      <div className="relative z-10 w-full max-w-[1216px] grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

        <div className="flex flex-col items-center md:items-start gap-4 sm:gap-6 md:gap-12 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 md:gap-x-4 justify-center md:justify-start"
          >
            <span className="font-montserrat font-semibold text-[36px] sm:text-[40px] md:text-[72px] lg:text-[80px] text-slate-700 leading-none">About</span>
            <span className="bg-brand-blue flex items-center justify-center px-1.5 sm:px-2 md:px-3 lg:px-4 py-0.5 sm:py-1 md:py-1.5 lg:py-2">
              <span className="font-montserrat font-bold text-[36px] sm:text-[40px] md:text-[72px] lg:text-[80px] text-slate-100 leading-none">
                <TypewriterText
                  words={TITLE_WORDS}
                  caretClassName="w-[3px] sm:w-[4px] md:w-[6px] h-7 sm:h-10 md:h-18 lg:h-22 bg-slate-100 ml-1 md:ml-2"
                />
              </span>
            </span>
          </motion.h2>

          {/* Words brighten line by line as the bio scrolls into the reading zone (.scrub-word) */}
          <p className="font-montserrat font-medium text-[13px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-slate-700 leading-[22px] sm:leading-[26px] md:leading-[32px] text-center md:text-left tracking-[0.15px]">
            {BIO.flatMap(([text, bold], i) =>
              // Words are inline-block so each gets its own view timeline (inline spans share the
              // paragraph's); spaces stay plain text so lines still wrap normally.
              text.split(/( )/).filter(Boolean).map((token, j) =>
                token === " " ? (
                  " "
                ) : (
                  <span key={`${i}-${j}`} className={`scrub-word inline-block${bold ? " font-bold" : ""}`}>
                    {token}
                  </span>
                )
              )
            )}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="w-full max-w-xl rounded-xl border border-panel-border bg-panel p-4 text-left"
          >
            {/* Figma-style "Inspect" panel with the facts a recruiter scans for */}
            <p className="font-inter text-xs font-semibold text-slate-900">Inspect</p>
            <dl className="mt-3 grid grid-cols-[80px_minmax(0,1fr)] gap-x-3 gap-y-2 font-inter text-sm">
              {PROFILE.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="text-slate-500">{row.label}</dt>
                  <dd className="text-slate-800">{row.value}</dd>
                </div>
              ))}
              <dt className="text-slate-500">Status</dt>
              <dd className="flex items-center gap-2 font-medium text-emerald-700">
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
                {STATUS}
              </dd>
            </dl>
          </motion.div>
        </div>

        <IdCard3D />

      </div>
    </section>
  );
}
