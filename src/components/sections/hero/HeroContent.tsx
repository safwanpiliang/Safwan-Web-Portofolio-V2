"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { ImageChip, KineticWord, Scribble } from "@/components/effects/Kinetic";
import { ScrambleText } from "@/components/effects/ScrambleText";
import { Button } from "@/components/ui/Button";
import { SITE_LINKS } from "@/data/site";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export function HeroContent() {
  // Stagger variants for the main text elements
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    // Mobile: Auto height with balanced padding so the hill image is visible in the first frame
    // Desktop: auto height
    <section
      className="relative flex-1 md:flex-none w-full pt-25 md:pt-75 pb-15 md:pb-12.5 lg:pb-17.5 flex flex-col items-center justify-center md:justify-start z-0"
    >

      {/* Decorative floating blobs (pure CSS animations, see globals.css) */}
      <div className="animate-float-up absolute top-[20%] left-[10%] w-37.5 h-37.5 md:w-75 md:h-75 bg-slate-900/10 rounded-full blur-3xl pointer-events-none will-change-transform" />
      <div className="animate-float-down absolute bottom-[20%] right-[15%] w-50 h-50 md:w-100 md:h-100 bg-white/20 rounded-full blur-3xl pointer-events-none will-change-transform" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center gap-3 md:gap-8 px-4 md:px-6"
      >
        {/* Text block */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1 md:gap-2 items-center text-center tracking-[0.33px] md:tracking-[0.6px]">
          {/* Figma mobile: 12px / Desktop: 20px */}
          <p className="font-montserrat text-[12px] md:text-[20px] text-slate-100">
            Hi, I&apos;m <span className="font-semibold">Safwan Piliang!</span>
          </p>

          {/* Kinetic headline: letters rise in, project thumbnails pop in inline, the underline draws
              itself, and on scroll the words drift apart (.drift). Mobile 36px / desktop 48–80px. */}
          <h1 className="flex max-w-[11ch] md:max-w-none flex-wrap items-center justify-center gap-x-[0.22em] gap-y-1 text-[40px] md:text-[56px] lg:text-[80px] leading-[1.1] text-slate-100 tracking-[0.2px]">
            <span className="drift font-montserrat font-bold" style={{ "--dx": "-14vw", "--rot": "-6deg" } as CSSProperties}>
              <KineticWord text="Crafting" delay={100} />
              <ImageChip src="/images/projects/pionir.webp" alt="PIONIR Gadjah Mada 2025 website" rotate={-8} delay={650} />
            </span>
            <span className="drift font-doto font-black" style={{ "--dx": "12vw", "--rot": "5deg" } as CSSProperties}>
              <ScrambleText text="Digital" />
            </span>
            <span className="drift relative font-montserrat font-bold" style={{ "--dx": "-6vw", "--rot": "-3deg" } as CSSProperties}>
              <KineticWord text="Experience" delay={350} />
              <Scribble delay={1100} className="-bottom-[0.12em] h-[0.3em] text-brand-orange" />
            </span>
          </h1>

          {/* Mobile: 16px / Desktop: 36px */}
          <p className="mt-2 font-montserrat font-medium text-[16px] md:text-[24px] lg:text-[36px] text-slate-100 tracking-[0.2px]">
            across <span className="font-semibold">UI</span>
            <ImageChip src="/images/projects/porsenigama.webp" alt="PORSENIGAMA 2025 UI" rotate={6} delay={900} />,{" "}
            <span className="font-semibold">Graphic Design</span>
            <ImageChip src="/images/projects/kmid-logo.webp" alt="KMID UGM logo redesign" rotate={-5} delay={1000} />, and{" "}
            <span className="font-semibold">3D</span>
            <ImageChip src="/images/projects/muzzy.webp" alt="Muzzy 3D mascot" rotate={8} delay={1100} />
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:flex-wrap justify-center gap-2.5 md:gap-4 w-full max-w-[283px] md:max-w-none md:w-auto">
          <Button
            variant="white"
            icon={ChevronDown}
            animated
            className="w-full md:w-auto"
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore My Work
          </Button>
          <Button href={SITE_LINKS.cv} variant="ghost" icon={ArrowUpRight} animated className="w-full md:w-auto">
            Download CV
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
