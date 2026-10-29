import Image from "next/image";
import type { CSSProperties } from "react";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * A word whose letters rise in one after another (`.kinetic-letter`). `delay` offsets the whole
 * word in ms. The animation waits while the intro loader is up (html[data-intro]).
 */
export function KineticWord({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span aria-label={text} className={`inline-block whitespace-nowrap ${className}`}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden className="kinetic-letter" style={{ "--i": i, "--d": `${delay}ms` } as Vars}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/** Small project thumbnail set inline in a headline, popping in with a tilt (`.chip-pop`). */
export function ImageChip({ src, alt, rotate, delay }: { src: string; alt: string; rotate: number; delay: number }) {
  return (
    <span
      className="chip-pop relative mx-[0.08em] inline-block h-[0.78em] w-[1.05em] shrink-0 overflow-hidden rounded-[0.16em] border-2 border-white align-[-0.06em] shadow-[0_6px_16px_rgba(15,23,42,0.25)]"
      style={{ "--r": `${rotate}deg`, "--d": `${delay}ms` } as Vars}
    >
      <Image src={src} alt={alt} fill sizes="96px" loading="eager" className="object-cover" />
    </span>
  );
}

/** Hand-drawn underline that draws itself under a word (`.scribble-path`). */
export function Scribble({ delay, className = "" }: { delay: number; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 300 24" preserveAspectRatio="none" className={`pointer-events-none absolute left-0 w-full ${className}`}>
      <path
        d="M4 16 C 60 6, 120 4, 180 10 S 270 20, 296 8"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        className="scribble-path"
        style={{ "--d": `${delay}ms` } as Vars}
      />
    </svg>
  );
}
