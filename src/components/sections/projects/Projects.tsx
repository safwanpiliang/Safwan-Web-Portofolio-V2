"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/effects/ScrambleText";
import { Button } from "@/components/ui/Button";
import { ALL_VIEW_ORDER, PROJECTS, type Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ALL_CATEGORY, ProjectFilters } from "./ProjectFilters";

const PAGE_SIZE = 6;

const rankInAllView = (project: Project) => {
  const i = ALL_VIEW_ORDER.indexOf(project.id);
  return i === -1 ? Infinity : i;
};

export function Projects() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredProjects = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return [...PROJECTS].sort((a, b) => rankInAllView(a) - rankInAllView(b));
    }
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section id="projects" className="relative w-full pt-16 pb-12 sm:pb-8 md:pt-24 md:pb-16 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 z-10 flex flex-col gap-6 md:gap-8">

        <div className="flex flex-col gap-6 items-center w-full">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 md:gap-x-4 text-center"
          >
            <span className="font-montserrat font-medium text-[32px] md:text-[64px] text-slate-700 tracking-[-1px]">
              Selected <span className="font-doto font-black"><ScrambleText text="Projects" /></span>
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4 md:gap-8 justify-center items-center w-full"
          >
            <ProjectFilters active={activeCategory} onChange={changeCategory} />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-12 lg:gap-16 justify-center items-stretch pt-2">
          {visibleProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {visibleCount < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mt-4"
          >
            <Button variant="orange" size="md" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
              Load More Projects
            </Button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
