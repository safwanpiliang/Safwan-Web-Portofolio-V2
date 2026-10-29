import { Reveal } from "@/components/effects/Reveal";
import { ScrambleText } from "@/components/effects/ScrambleText";
import { ARTICLES } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";

/**
 * "Insights & Articles" as a small printed journal: a masthead, then the article pages, which
 * start as one neat pile and fan out side by side as the section scrolls in (.journal-track).
 */
export function Articles() {
  return (
    <section id="articles" className="relative w-full py-12 md:py-24 flex flex-col items-center">
      <div className="w-full max-w-[1100px] px-4 sm:px-6 flex flex-col gap-10 md:gap-16">
        {/* Masthead */}
        <header className="flex flex-col items-center text-center">
          <div className="flex w-full items-center gap-3 font-inter text-[11px] uppercase tracking-[0.2em] text-slate-500">
            <span className="h-px flex-1 bg-slate-300" />
            <span>The Safwan Journal · Vol. 01</span>
            <span className="h-px flex-1 bg-slate-300" />
          </div>
          {/* Same type as the other section headings; the journal frame around it is what sets it apart */}
          <h2 className="mt-4 font-montserrat font-medium text-[32px] md:text-[64px] text-slate-700 tracking-[-1px]">
            <Reveal>Insights</Reveal> <Reveal index={1}>&amp;</Reveal>{" "}
            <Reveal index={2}><span className="font-doto font-black"><ScrambleText text="Articles" /></span></Reveal>
          </h2>
          <p className="mt-3 max-w-xl font-inter text-base md:text-lg text-slate-700">
            <Reveal index={3}>Deep dives into my design process, written as UI case studies.</Reveal>
          </p>
          <div className="mt-6 h-[3px] w-full bg-slate-700" />
          <div className="mt-1 h-px w-full bg-slate-700" />
        </header>

        <div className="journal-track grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {ARTICLES.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
