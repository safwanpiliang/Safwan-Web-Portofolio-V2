"use client";

import { motion, type Variants } from "framer-motion";
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
            Hi, Im <span className="font-semibold">Safwan Piliang!</span>
          </p>

          {/* Mobile: scaled down to 36px, Desktop: 64/72px */}
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-x-3 gap-y-[3px] md:gap-y-[4px] items-center text-[36px] md:text-[48px] lg:text-[72px] text-slate-100 tracking-[0.2px]">
            <motion.p
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="font-montserrat font-bold leading-[1.2]"
            >
              Crafting
            </motion.p>
            <motion.p
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="font-doto font-black text-slate-100 leading-[1.2]"
            >
              <ScrambleText text="Digital" />
            </motion.p>
            <motion.p
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="font-montserrat font-bold leading-[1.2]"
            >
              Experience
            </motion.p>
          </div>

          {/* Mobile: 16px / Desktop: 36px */}
          <p className="font-montserrat font-medium text-[16px] md:text-[24px] lg:text-[36px] text-slate-100 tracking-[0.2px]">
            across <span className="font-semibold">UI</span>, <span className="font-semibold">Graphic Design</span>, and <span className="font-semibold">3D</span>
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:flex-wrap justify-center gap-2.5 md:gap-4 w-full max-w-[283px] md:max-w-none md:w-auto">
          <Button
            variant="white"
            icon={ChevronDown}
            animated
            className="w-full md:w-auto"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
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
