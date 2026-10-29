import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { ScrambleText } from "@/components/effects/ScrambleText";
import { SITE_LINKS, SOCIAL_LINKS, STATUS } from "@/data/site";

/** Closing call to action, styled as a Figma comment pinned on the canvas. */
export function Contact() {
  return (
    <section id="contact" className="relative w-full px-4 sm:px-6 py-12 md:py-24 flex flex-col items-center gap-8 md:gap-12">
      {/* Oversized band that slides sideways with the scroll (.slide-band) */}
      <div aria-hidden className="band-track -mx-4 sm:-mx-6 self-stretch overflow-clip">
        <p className="slide-band whitespace-nowrap font-montserrat text-[64px] md:text-[144px] font-bold leading-none tracking-[-2px] text-slate-200">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i}>
              Let&apos;s talk <span className="text-selection">✳</span> Open for an internship <span className="text-brand-orange">✳</span>{" "}
            </span>
          ))}
        </p>
      </div>

      <h2 className="font-montserrat font-medium text-[32px] md:text-[64px] text-slate-700 tracking-[-1px] text-center">
        <Reveal>Let&apos;s</Reveal> <Reveal index={1}><span className="font-doto font-black"><ScrambleText text="Talk" /></span></Reveal>
      </h2>

      <div className="reveal-on-view flex w-full max-w-xl items-start gap-3">
        {/* Comment pin */}
        <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full rounded-bl-none bg-selection font-inter text-sm font-semibold text-white shadow-md">
          SP
        </span>

        <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-panel-border bg-panel p-4 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <p className="font-inter text-sm">
            <span className="font-semibold text-slate-900">Safwan Piliang</span>
            <span className="text-slate-500"> · just now</span>
          </p>
          <p className="mt-2 flex items-center gap-2 font-inter text-sm font-medium text-emerald-700">
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
            {STATUS}
          </p>
          <p className="mt-3 font-inter text-base leading-relaxed text-slate-700">
            I&apos;m looking for a UI/UX or design internship for the January–July period. Have a role or a project in mind? Send me a message.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-2">
            <a
              href={`mailto:${SITE_LINKS.email}`}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 font-inter text-sm font-semibold text-ink transition-colors hover:bg-brand-orange-hover"
            >
              <Mail aria-hidden className="size-4" />
              Email me
            </a>
            <a
              href={SITE_LINKS.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-panel-border px-4 font-inter text-sm font-medium text-slate-700 transition-colors hover:border-selection hover:text-selection"
            >
              Download CV
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2 border-t border-panel-border pt-4">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex size-11 items-center justify-center rounded-xl border border-panel-border transition-colors hover:border-selection"
                >
                  <Image src={link.icon} alt="" width={20} height={20} className="size-5 object-contain" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-inter text-xs text-slate-500 break-all">{SITE_LINKS.email}</p>
        </div>
      </div>
    </section>
  );
}
