"use client";

import { motion } from "framer-motion";
import { TypewriterText } from "@/components/effects/TypewriterText";
import { IdCard3D } from "./IdCard3D";

const TITLE_WORDS = ["You?", "Me?"];

/** Bio as [text, bold] runs. */
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

          <p className="reveal-on-view font-montserrat font-medium text-[13px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-slate-700 leading-[22px] sm:leading-[26px] md:leading-[32px] text-center md:text-left tracking-[0.15px]">
            {BIO.map(([text, bold], i) => (bold ? <span key={i} className="font-bold">{text}</span> : text))}
          </p>
        </div>

        <IdCard3D />

      </div>
    </section>
  );
}
