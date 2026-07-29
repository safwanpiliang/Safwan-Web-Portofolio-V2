"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

function AboutTypewriter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isInView) {
      setDisplayedText("");
      return;
    }
    
    let isCancelled = false;
    
    const typeSequence = async () => {
      const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      const typeStr = async (str: string) => {
        for (let i = 1; i <= str.length; i++) {
          if (isCancelled) return;
          setDisplayedText(str.slice(0, i));
          await wait(150);
        }
      };
      
      const deleteStr = async (str: string) => {
        for (let i = str.length; i >= 0; i--) {
          if (isCancelled) return;
          setDisplayedText(str.slice(0, i));
          await wait(100);
        }
      };

      await typeStr("You?");
      if (isCancelled) return;
      await wait(800);
      await deleteStr("You?");
      if (isCancelled) return;
      await wait(300);
      await typeStr("Me?");
    };

    typeSequence();

    return () => {
      isCancelled = true;
    };
  }, [isInView]);

  return (
    <span ref={ref} className="inline-flex items-center">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="w-[3px] sm:w-[4px] md:w-[6px] h-[28px] sm:h-[40px] md:h-[72px] lg:h-[88px] bg-[#f1f5f9] ml-1 md:ml-2 inline-block"
      />
    </span>
  );
}

function About3DCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track scroll exactly relative to this specific image container, not the whole giant section.
  // "0 1" means start when top of card hits bottom of screen.
  // "0.5 0.5" means end exactly when center of card hits center of screen.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "0.5 0.5"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  const rotateXNum = useTransform(smoothProgress, [0, 1], [70, 15]);
  const rotateX = useTransform(rotateXNum, v => `${v}deg`);

  const rotateZNum = useTransform(smoothProgress, [0, 1], [20, -5]);
  const rotateZ = useTransform(rotateZNum, v => `${v}deg`);

  const yNum = useTransform(smoothProgress, [0, 1], [200, 0]);
  const y = useTransform(yNum, v => `${v}px`);

  const scale = useTransform(smoothProgress, [0, 1], [0.8, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div ref={cardRef} className="flex items-center justify-center lg:justify-end mt-12 lg:mt-0 w-full" style={{ perspective: "1200px" }}>
      <motion.img
        src="/source_image/ktp about me.webp"
        alt="Safwan ID Card"
        style={{
          rotateX,
          rotateZ,
          y,
          scale,
          opacity
        }}
        className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] h-auto object-contain drop-shadow-[0px_20px_40px_rgba(0,0,0,0.15)] origin-bottom"
      />
    </div>
  );
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);

  const socialLinks = [
    { name: "Safwan Piliang", iconPath: "/source_image/skill-icons_linkedin.svg", href: "https://www.linkedin.com/in/safwan-piliang-548b9a325" },
    { name: "safwanpiliang17@gmail.com", iconPath: "/source_image/skill-icons_gmail-light.svg", href: "mailto:safwanpiliang17@gmail.com" },
    { name: "Safwan Piliang", iconPath: "/source_image/devicon_behance.svg", href: "https://www.behance.net/safwanpiliang" },
    { name: "safwan.piliang", iconPath: "/source_image/skill-icons_instagram.svg", href: "https://www.instagram.com/safwan.piliang?igsh=MXZibHh1dzhseWZvYQ==" },
  ];

  return (
    <section ref={containerRef} id="about" className="relative w-full py-10 sm:py-16 md:py-32 px-4 sm:px-6 md:px-8 flex justify-center">

      <div className="relative z-10 w-full max-w-[1216px] grid grid-cols-1 lg:grid-cols-2 gap-[32px] md:gap-[64px] items-center">

        {/* Left Column (Text Content) */}
        <div className="flex flex-col items-center md:items-start gap-[16px] sm:gap-[24px] md:gap-[48px] text-center md:text-left">

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-x-[8px] sm:gap-x-[12px] md:gap-x-[16px] justify-center md:justify-start"
          >
            <span className="font-montserrat font-semibold text-[36px] sm:text-[40px] md:text-[72px] lg:text-[80px] text-slate-700 leading-none">About</span>
            <div className="bg-[#1e45fc] flex items-center justify-center px-[6px] sm:px-[8px] md:px-[12px] lg:px-[16px] py-[2px] sm:py-[4px] md:py-[6px] lg:py-[8px]">
              <span className="font-montserrat font-bold text-[36px] sm:text-[40px] md:text-[72px] lg:text-[80px] text-[#f1f5f9] leading-none">
                <AboutTypewriter />
              </span>
            </div>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="font-montserrat font-medium text-[13px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-slate-700 leading-[22px] sm:leading-[26px] md:leading-[32px] text-center md:text-left tracking-[0.15px]"
          >
            "Hi, I’m <span className="font-bold">Safwan Piliang</span> the person behind the projects above. As a freelance multidisciplinary designer and tech student at UGM, my work is driven by a simple idea: see the world through my eyes. I specialize in <span className="font-bold">Graphic Design</span>, <span className="font-bold">UI-focused Product Design</span>, and <span className="font-bold">3D Modeling</span> using Blender, focusing on <span className="font-bold">crafting visually engaging and user-friendly digital spaces</span>. Let's collaborate and bring your ideas to life!"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col items-center md:items-start gap-[12px] sm:gap-[24px] mt-2 sm:mt-4 w-full"
          >
            <h3 className="font-montserrat font-bold text-[14px] sm:text-[18px] md:text-[20px] leading-[24px] sm:leading-[32px] tracking-[0.15px] text-slate-700 text-center md:text-left">Social Links:</h3>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-[12px] sm:gap-y-[24px] gap-x-[16px] sm:gap-x-[48px] md:gap-x-[64px] w-full">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[8px] sm:gap-[12px] md:gap-[16px] group justify-center md:justify-start"
                >
                  <div className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] flex items-center justify-center shrink-0">
                    <img src={link.iconPath} alt={link.name} className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] object-contain" loading="lazy" />
                  </div>
                  <span className="relative font-inter font-normal text-[11px] sm:text-[14px] md:text-[16px] text-slate-700 group-hover:text-slate-600 transition-colors break-all sm:break-normal">
                    {link.name}
                    <span className="absolute left-0 bottom-[-2px] w-0 h-[1.5px] bg-slate-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Column (3D Scroll Animation) */}
        <About3DCard />

      </div>
    </section>
  );
}
