"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/effects/Reveal";
import { ScrambleText } from "@/components/effects/ScrambleText";
import { SERVICES, type Service } from "@/data/services";

interface CardProps {
  service: Service;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}

/**
 * One full-screen sticky slot. Cards stack on top of each other; once a card is covered it
 * shrinks a little, so the deck reads as layers (scale only: composited, no layout).
 */
function ServiceCard({ service, index, progress, reduce }: CardProps) {
  const count = SERVICES.length;
  const targetScale = 1 - (count - index) * 0.04;
  const scale = useTransform(progress, [index / count, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-svh items-start justify-center px-4 sm:px-6 pt-6 pb-[var(--toolbar-space)] md:pb-12">
      <motion.article
        // Each card sits a little lower than the one before so the stack's edges show; shorten it by
        // the same amount so it never slides under the toolbar.
        style={{ scale: reduce ? 1 : scale, top: `${index * 20}px`, height: `calc(100% - ${index * 20}px)` }}
        className={`relative flex max-h-[640px] w-full max-w-[1200px] origin-top flex-col justify-between gap-6 overflow-hidden rounded-3xl p-6 md:p-10 shadow-[0_-12px_40px_rgba(15,23,42,0.12)] ${service.tone}`}
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
          <div className="flex flex-col gap-4">
            <span className="font-doto text-lg font-black opacity-80">[{String(index + 1).padStart(2, "0")}]</span>
            <h3 className="font-montserrat text-[32px] md:text-[56px] font-bold leading-[1.05] tracking-[-1px]">{service.title}</h3>
            <p className="max-w-md font-inter text-base md:text-lg leading-relaxed opacity-85">{service.description}</p>
          </div>

          {service.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 md:grid-cols-2 md:gap-3">
              {service.images.map((img, i) => (
                <div
                  key={img.src}
                  className="relative aspect-[5/4] overflow-hidden rounded-lg md:rounded-xl bg-white/10 ring-1 ring-white/20"
                  style={{ rotate: `${i % 2 ? 2 : -2}deg` }}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 280px, 25vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <ul className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-current/30 px-3 py-1.5 font-inter text-xs md:text-sm font-medium">
              {tag}
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

/** "What I do": a deck of service cards that stack as you scroll (inspired by stacked-scroll studio sites). */
export function Services() {
  const deckRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: deckRef, offset: ["start start", "end end"] });

  return (
    <section id="services" className="relative w-full pt-20 sm:pt-40 md:pt-56">
      <div className="flex flex-col items-center gap-3 px-4 text-center">
        <h2 className="font-montserrat font-medium text-[32px] md:text-[64px] text-slate-700 tracking-[-1px]">
          <Reveal>What</Reveal> <Reveal index={1}>I</Reveal>{" "}
          <Reveal index={2}><span className="font-doto font-black"><ScrambleText text="Do" /></span></Reveal>
        </h2>
        <p className="font-inter text-slate-700 text-base md:text-lg max-w-2xl">
          <Reveal index={3}>Four things I bring to a team, from the first flow to the final render.</Reveal>
        </p>
      </div>

      <div ref={deckRef} className="relative">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} progress={scrollYProgress} reduce={reduce} />
        ))}
      </div>
    </section>
  );
}
