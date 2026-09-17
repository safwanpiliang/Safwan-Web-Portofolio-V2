"use client";

import { motion } from "framer-motion";
import { TypewriterText } from "@/components/effects/TypewriterText";
import { ARTICLES } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";

const TITLE_WORDS = ["Articles"];

export function Articles() {
  return (
    <section id="articles" className="relative w-full pt-12 sm:pt-8 md:pt-16 pb-12 sm:pb-8 md:pb-16 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 z-10 flex flex-col gap-6 md:gap-8">

        <div className="flex flex-col gap-4 text-center items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            className="flex flex-wrap justify-center items-center gap-3 sm:gap-4"
          >
            <span className="font-montserrat font-medium text-[32px] md:text-[64px] text-slate-700 tracking-[-1px]">
              Insights &
            </span>
            <span className="bg-brand-blue flex items-center justify-center px-3 md:px-4 py-1 md:py-2">
              <span className="font-montserrat font-bold text-[32px] md:text-[64px] leading-none text-slate-100">
                <TypewriterText
                  words={TITLE_WORDS}
                  caretClassName="w-[3px] md:w-[4px] h-8 md:h-16 bg-slate-100 ml-1 md:ml-2"
                />
              </span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-inter text-slate-700 text-base md:text-lg max-w-2xl mx-auto"
          >
            Deep dives into my design process, case studies, and explorations in UI and 3D visualization.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-12 lg:gap-16 items-stretch pt-2 w-full">
          {ARTICLES.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
