import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { ScrambleText } from "@/components/effects/ScrambleText";
import { SITE_LINKS, SOCIAL_LINKS, STATUS } from "@/data/site";
import { CopyEmailButton } from "./CopyEmailButton";

/**
 * Closing call to action, kept simple: availability, one sentence, then the two ways to reach
 * out (email / copy email) and the secondary links (CV, socials).
 */
export function Contact() {
  return (
    <section id="contact" className="relative w-full px-4 sm:px-6 py-16 md:py-28 flex flex-col items-center text-center">
      <p className="reveal-on-view inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-inter text-xs md:text-sm font-medium text-emerald-700">
        <span aria-hidden className="size-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
        {STATUS}
      </p>

      <h2 className="mt-6 font-montserrat font-medium text-[40px] md:text-[80px] leading-none text-slate-800 tracking-[-1px]">
        <Reveal>Let&apos;s</Reveal> <Reveal index={1}><span className="font-doto font-black"><ScrambleText text="Talk" /></span></Reveal>
      </h2>

      <p className="mt-5 max-w-lg font-inter text-base md:text-lg leading-relaxed text-slate-600">
        <Reveal index={2}>Looking for a UI/UX or design intern for January–July, or have a project in mind?</Reveal>{" "}
        <Reveal index={3}>My inbox is open.</Reveal>
      </p>

      <div className="reveal-on-view mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row">
        <a
          href={`mailto:${SITE_LINKS.email}`}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 font-inter text-sm font-semibold text-ink transition-colors hover:bg-brand-orange-hover"
        >
          <Mail aria-hidden className="size-4" />
          Email me
        </a>
        <CopyEmailButton email={SITE_LINKS.email} />
      </div>

      <ul className="reveal-on-view mt-8 flex flex-wrap items-center justify-center gap-1">
        <li>
          <a
            href={SITE_LINKS.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center gap-1.5 rounded-lg px-3 font-inter text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200/60 hover:text-slate-900"
          >
            Download CV
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </li>
        <li aria-hidden className="mx-1 h-5 w-px bg-slate-300" />
        {SOCIAL_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex size-11 items-center justify-center rounded-lg transition-colors hover:bg-slate-200/60"
            >
              <Image src={link.icon} alt="" width={20} height={20} className="size-5 object-contain" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
