"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

function TypewriterText({ text }: { text: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isInView) {
      setDisplayedText("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className="inline-flex items-center">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="w-[3px] md:w-[4px] h-[32px] md:h-[64px] bg-[#f1f5f9] ml-1 md:ml-2 inline-block"
      />
    </span>
  );
}

const ARTICLE_DATA = [
  {
    id: 1,
    title: "Taming an 11 Color Palette & Shaping the Hype: A UI Case Study on PORSENIGAMA 2025",
    readTime: "6 min read",
    image: "/source_image/projects/porseni_article.webp",
    link: "https://safwanpiliang.medium.com/taming-an-11-color-branding-guide-a-ui-case-study-on-porsenigama-2025-1bc85e6a0fd2?sharedUserId=safwanpiliang"
  },
  {
    id: 2,
    title: "Behind the Interface: Crafting a “Digital Welcome” for UGM’s 2025 Freshmen",
    readTime: "5 min read",
    image: "/source_image/projects/PIONIR_Cover.webp",
    link: "https://safwanpiliang.medium.com/behind-the-interface-crafting-a-digital-welcome-for-ugms-2025-freshmen-347abe67fde9?sharedUserId=safwanpiliang"
  }
];

function ArticleCard({ article }: { article: any }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      className="relative group w-full h-full"
    >
      {/* Background Paper 1 (Bottom-most) */}
      <div className="absolute inset-0 bg-slate-300 border border-slate-300 transition-all duration-500 ease-out origin-bottom-left rotate-[2deg] translate-x-1 group-hover:rotate-[4deg] group-hover:translate-x-2 group-hover:-translate-y-1 z-[-2] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]" />

      {/* Background Paper 2 (Middle) */}
      <div className="absolute inset-0 bg-slate-200 border border-slate-200 transition-all duration-500 ease-out origin-bottom-right -rotate-[1deg] -translate-x-1 group-hover:-rotate-[2deg] group-hover:-translate-x-2 group-hover:-translate-y-0.5 z-[-1] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]" />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="bg-[#f9fafb] p-[6px] sm:p-[8px] pb-[12px] sm:pb-[16px] flex flex-col gap-[8px] sm:gap-[16px] md:gap-[24px] shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-out border border-white relative z-10 h-full"
      >
        {/* Image Box */}
        <div
          className="w-full h-[100px] sm:h-[120px] md:h-[148px] overflow-hidden bg-white relative shrink-0"
        >
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            loading="lazy"
          />
        </div>

        {/* Text Content */}
        <div
          className="flex flex-col gap-[8px] px-[8px] flex-grow"
        >
          <p className="font-montserrat font-semibold text-[11px] md:text-[12px] leading-[normal] text-slate-600">
            {article.readTime}
          </p>
          <h3 className="font-montserrat font-semibold text-[12px] sm:text-[16px] md:text-[20px] leading-[16px] sm:leading-[24px] text-slate-800 line-clamp-2">
            {article.title}
          </h3>
        </div>

        {/* Action Button */}
        <div
          className="flex items-center justify-end w-full px-[8px] mt-auto shrink-0"
        >
          <a href={article.link} target="_blank" rel="noopener noreferrer" className="bg-[#ffab2f] border border-[#ffab2f] text-[#333] font-inter font-medium text-[10px] sm:text-[12px] md:text-[14px] leading-[20px] px-[8px] py-[4px] sm:px-[14px] sm:py-[8px] rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex items-center gap-[4px] sm:gap-[6px] md:gap-[8px] hover:bg-[#e69b2a] transition-colors">
            Read on Medium
            <ArrowUpRight className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Articles() {
  return (
    <section id="articles" className="relative w-full pt-12 sm:pt-8 md:pt-16 pb-12 sm:pb-8 md:pb-16 flex flex-col items-center justify-center overflow-hidden">

      <div className="w-full max-w-[1400px] px-4 sm:px-6 z-10 flex flex-col gap-6 md:gap-8">

        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            className="flex flex-wrap justify-center items-center gap-[12px] sm:gap-[16px]"
          >
            <span className="font-montserrat font-medium text-[32px] md:text-[64px] text-[#334155] tracking-[-1px]">
              Insights &
            </span>
            <div className="bg-[#1e45fc] flex items-center justify-center px-[12px] md:px-[16px] py-[4px] md:py-[8px]">
              <span className="font-montserrat font-bold text-[32px] md:text-[64px] leading-none text-[#f1f5f9]">
                <TypewriterText text="Articles" />
              </span>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-inter text-slate-700 text-base md:text-lg max-w-2xl mx-auto"
          >
            Deep dives into my design process, case studies, and explorations in UI and 3D visualization.
          </motion.p>
        </div>

        {/* Article Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-[12px] sm:gap-[24px] md:gap-[48px] lg:gap-[64px] items-stretch pt-2 w-full"
        >
          {ARTICLE_DATA.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>

        {/* Pagination (Temporarily Hidden) */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-[6px] mt-2"
        >
          ...
        </motion.div> */}

      </div>
    </section>
  );
}
