import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Frame, Lock } from "lucide-react";
import { ScrambleText } from "@/components/effects/ScrambleText";
import { CASE_STUDIES, projectFor, type CaseStudy } from "@/data/caseStudies";

/** Name + period row above a frame, like Figma's frame label on the canvas. */
function FrameLabel({ study, locked }: { study: CaseStudy; locked?: boolean }) {
  const Icon = locked ? Lock : Frame;
  return (
    <div className="flex items-center justify-between gap-2 pb-1.5 font-inter text-[11px] md:text-xs text-slate-500 transition-colors group-hover:text-selection">
      <span className="flex min-w-0 items-center gap-1">
        <Icon aria-hidden className="size-3 shrink-0" strokeWidth={2} />
        <span className="truncate">{study.title}</span>
      </span>
      <span className="shrink-0 tabular-nums">{study.period}</span>
    </div>
  );
}

function StudyText({ study }: { study: CaseStudy }) {
  return (
    <div className="min-w-0">
      <h3 className="font-montserrat text-xl md:text-2xl font-semibold text-slate-800">{study.title}</h3>
      <p className="mt-1 font-inter text-sm md:text-base text-slate-600">{study.tagline}</p>
      <p className="mt-2 font-inter text-xs text-slate-500">{study.role}</p>
    </div>
  );
}

function CaseStudyFrame({ study }: { study: CaseStudy }) {
  const project = projectFor(study);
  return (
    <Link href={`/work/${study.slug}`} className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-selection">
      <FrameLabel study={study} />
      <div className="relative aspect-[5/4] overflow-hidden bg-white outline outline-1 outline-transparent transition-[outline-color] duration-200 group-hover:outline-selection">
        {project && (
          <Image
            src={project.image}
            alt={study.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <StudyText study={study} />
        <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full border border-panel-border bg-panel text-slate-700 transition-colors group-hover:border-selection group-hover:bg-selection group-hover:text-white">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Link>
  );
}

/** Client work waiting for publication permission: visible, but without details or a page. */
function LockedFrame({ study }: { study: CaseStudy }) {
  return (
    <div>
      <FrameLabel study={study} locked />
      <div className="flex aspect-[5/4] flex-col items-center justify-center gap-2 border border-dashed border-slate-300 bg-panel/60 text-slate-500">
        <Lock aria-hidden className="size-5" strokeWidth={1.75} />
        <p className="font-inter text-sm">Case study coming soon</p>
      </div>
      <div className="mt-4">
        <StudyText study={study} />
      </div>
    </div>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="relative w-full pt-20 sm:pt-40 md:pt-56 pb-8 md:pb-12 flex flex-col items-center">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-montserrat font-medium text-[32px] md:text-[64px] text-slate-700 tracking-[-1px]">
            Case <span className="font-doto font-black"><ScrambleText text="Studies" /></span>
          </h2>
          <p className="font-inter text-slate-700 text-base md:text-lg max-w-2xl">
            How I think through a problem, from the brief to the final screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-10 md:gap-y-14">
          {CASE_STUDIES.map((study) =>
            study.locked ? <LockedFrame key={study.slug} study={study} /> : <CaseStudyFrame key={study.slug} study={study} />
          )}
        </div>
      </div>
    </section>
  );
}
