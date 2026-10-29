import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { SelectionFrame } from "@/components/ui/SelectionFrame";
import { PUBLISHED_CASE_STUDIES, projectFor } from "@/data/caseStudies";

type Props = { params: Promise<{ slug: string }> };

// Only published case studies exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED_CASE_STUDIES.map(({ slug }) => ({ slug }));
}

const findStudy = (slug: string) => PUBLISHED_CASE_STUDIES.find((s) => s.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = findStudy((await params).slug);
  if (!study) return {};
  const image = projectFor(study)?.image;
  const title = `${study.title} — Case Study · Safwan Piliang`;
  return {
    title,
    description: study.tagline,
    openGraph: { title, description: study.tagline, images: image ? [image] : undefined },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal-on-view border-t border-slate-300 pt-6">
      <h2 className="font-montserrat text-xl md:text-2xl font-semibold text-slate-800">{title}</h2>
      <div className="mt-3 font-inter text-base leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const study = findStudy((await params).slug);
  if (!study) notFound();

  const project = projectFor(study);
  const index = PUBLISHED_CASE_STUDIES.indexOf(study);
  const next = PUBLISHED_CASE_STUDIES[(index + 1) % PUBLISHED_CASE_STUDIES.length];

  const links = [
    { label: "Live project", href: project?.liveProject },
    { label: "Behance", href: project?.behance },
    { label: "Medium article", href: project?.medium },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  const facts = [
    { label: "Role", value: study.role },
    { label: "Period", value: study.period },
    { label: "Team", value: study.team },
    { label: "Tools", value: study.tools.join(", ") },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <main className="canvas-grid w-full min-h-svh">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 pt-6 md:pt-10">
        <Link
          href="/#work"
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-panel-border bg-panel px-3 font-inter text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
        >
          <ArrowLeft aria-hidden className="size-4" />
          All work
        </Link>

        <header className="mt-8 md:mt-12 max-w-3xl">
          <p className="font-inter text-xs font-semibold uppercase tracking-wider text-selection">Case study</p>
          <h1 className="mt-2 font-montserrat text-[36px] md:text-[56px] font-bold leading-[1.1] text-slate-800">{study.title}</h1>
          <p className="mt-3 font-inter text-lg md:text-xl text-slate-600">{study.tagline}</p>
        </header>

        <div className="mt-8 md:mt-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_280px] md:gap-10">
          {/* "Inspect" panel: first on phones, a sticky sidebar from md up */}
          <aside className="h-fit rounded-xl border border-panel-border bg-panel p-4 md:order-2 md:sticky md:top-6">
            <p className="font-inter text-xs font-semibold text-slate-900">Inspect</p>
            <dl className="mt-3 grid grid-cols-[72px_minmax(0,1fr)] gap-x-3 gap-y-2 font-inter text-sm">
              {facts.map((f) => (
                <div key={f.label} className="contents">
                  <dt className="text-slate-500">{f.label}</dt>
                  <dd className="text-slate-800">{f.value}</dd>
                </div>
              ))}
            </dl>
            {links.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center justify-between rounded-lg border border-panel-border px-3 font-inter text-sm font-medium text-slate-700 transition-colors hover:border-selection hover:text-selection"
                  >
                    {l.label}
                    <ArrowUpRight aria-hidden className="size-4" />
                  </a>
                ))}
              </div>
            )}
          </aside>

          <article className="flex min-w-0 flex-col gap-10 md:order-1">
            {project && (
              <SelectionFrame label={study.title}>
                <div className="relative aspect-[5/4] overflow-hidden bg-white">
                  <Image src={project.image} alt={study.title} fill priority sizes="(min-width: 1100px) 780px, 100vw" className="object-cover" />
                </div>
              </SelectionFrame>
            )}

            <Section title="The challenge">
              <p>{study.challenge}</p>
            </Section>

            <Section title="Key decisions">
              <ol className="flex flex-col gap-3">
                {study.decisions.map((d, i) => (
                  <li key={d} className="flex gap-3">
                    <span className="font-doto font-black text-selection tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ol>
            </Section>

            {study.outcome && (
              <Section title="Outcome">
                <p className="font-montserrat text-lg md:text-xl font-medium text-slate-800">{study.outcome}</p>
              </Section>
            )}

            {next !== study && (
              <Link
                href={`/work/${next.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-panel-border bg-panel p-4 md:p-6 transition-colors hover:border-selection"
              >
                <span className="min-w-0">
                  <span className="block font-inter text-xs text-slate-500">Next case study</span>
                  <span className="block truncate font-montserrat text-lg md:text-2xl font-semibold text-slate-800">{next.title}</span>
                </span>
                <ArrowRight aria-hidden className="size-6 shrink-0 text-slate-500 transition-colors group-hover:text-selection" />
              </Link>
            )}
          </article>
        </div>
      </div>
      <Footer />
    </main>
  );
}
