"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CARD_GRID_IMAGE_SIZES, TiltCard } from "@/components/ui/TiltCard";
import { caseStudyHref } from "@/data/caseStudies";
import type { Project } from "@/data/projects";

const ICON_LINKS = [
  { key: "medium", label: "Medium", icon: "/images/icons/medium.svg" },
  { key: "instagram", label: "Instagram", icon: "/images/icons/instagram.svg" },
  { key: "behance", label: "Behance", icon: "/images/icons/behance.svg" },
] as const;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const studyHref = caseStudyHref(project.id);
  return (
    <TiltCard revealDelay={(index % 3) * 0.1}>
      {/* The whole card opens the on-site case study when there is one, otherwise Behance */}
      {studyHref ? (
        <Link href={studyHref} className="absolute inset-0 z-[5]" aria-label={`Read the ${project.title} case study`} />
      ) : project.behance && (
        <a
          href={project.behance}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-[5]"
          aria-label={`View ${project.title} on Behance`}
        />
      )}

      <div className="w-full aspect-[354/283] overflow-hidden bg-white relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={CARD_GRID_IMAGE_SIZES}
          className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />
      </div>

      <div className="flex flex-col gap-1 sm:gap-2 px-1 sm:px-2">
        <h3 className="font-montserrat font-semibold text-[12px] sm:text-[16px] md:text-[24px] leading-[16px] sm:leading-[24px] text-slate-800 line-clamp-2">
          {project.title}
        </h3>
        <p className="font-montserrat font-normal text-[10px] sm:text-[12px] leading-[16px] sm:leading-[20px] text-slate-600 line-clamp-2 sm:line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* z-10 keeps these links above the full-card overlay link */}
      <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-2.5 items-center justify-end w-full px-1 sm:px-2 mt-auto relative z-10">
        {ICON_LINKS.map(({ key, label, icon }) =>
          project[key] ? (
            <a
              key={key}
              href={project[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-1.5 sm:p-2 bg-slate-300/30 rounded-full flex items-center justify-center hover:bg-slate-300/50 transition-colors"
            >
              <Image src={icon} alt="" width={20} height={20} className="w-3.5 h-3.5 sm:w-5 sm:h-5 opacity-80" />
            </a>
          ) : null
        )}
        {project.liveProject && (
          <Button href={project.liveProject} variant="orange" size="xs" icon={ArrowUpRight}>
            Live Project
          </Button>
        )}
      </div>
    </TiltCard>
  );
}
