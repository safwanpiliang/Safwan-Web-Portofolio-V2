import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/data/articles";

/**
 * An article as a printed journal page. The outer element carries the scroll motion
 * (`.paper-fan-*` in globals.css); the inner page carries the hover lift, so the two
 * transforms never fight.
 */
export function ArticleCard({ article, index }: { article: Article; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <div className={index % 2 ? "paper-fan-right" : "paper-fan-left"}>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-full bg-panel p-5 md:p-7 shadow-[0_18px_50px_rgba(15,23,42,0.12)] ring-1 ring-black/5 transition-transform duration-300 ease-(--ease-out) hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-selection"
      >
        {/* Folded corner */}
        <span aria-hidden className="absolute right-0 top-0 size-8 bg-[linear-gradient(225deg,var(--color-canvas)_50%,var(--color-slate-200)_50%)] shadow-[-2px_2px_4px_rgba(0,0,0,0.06)]" />

        <div className="flex items-center justify-between gap-3 border-b border-slate-700/80 pb-2 pr-7 font-inter text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span>No. {number} · UI case study</span>
          <span className="tabular-nums">{article.readTime}</span>
        </div>
        {/* Ink rule that draws in as the page arrives (.ink-draw) */}
        <span aria-hidden className="ink-draw mt-1 block h-[3px] origin-left bg-selection" />

        <h3 className="mt-5 font-montserrat text-[20px] md:text-[26px] font-semibold leading-[1.2] tracking-[-0.3px] text-slate-800">{article.title}</h3>

        <div className="relative mt-5 aspect-[16/10] overflow-hidden bg-slate-200">
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 520px, (min-width: 768px) 45vw, 90vw"
            className="object-cover grayscale-[35%] transition-[filter,transform] duration-700 ease-(--ease-out) group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 font-inter text-sm">
          <span className="text-slate-500">Published on Medium</span>
          <span className="flex items-center gap-1.5 font-semibold text-slate-800">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-(--ease-out) group-hover:bg-[length:100%_1.5px]">
              Read the article
            </span>
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </div>
  );
}
