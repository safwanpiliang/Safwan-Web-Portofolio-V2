"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ScrambleText } from "./ScrambleText";
import { Button } from "./ui/Button";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const PROJECT_DATA = [
  {
    id: 1,
    title: "PIONIR Gadjah Mada 2025",
    category: "UI Design",
    image: "/source_image/projects/PIONIR_Cover.webp",
    description: "A user interface design created for PIONIR Gadjah Mada 2025, an annual orientation and introduction program for new students at Universitas Gadjah Mada.",
    medium: "https://safwanpiliang.medium.com/behind-the-interface-crafting-a-digital-welcome-for-ugms-2025-freshmen-347abe67fde9?sharedUserId=safwanpiliang",
    behance: "https://www.behance.net/gallery/241401443/PIONIR-2025-Digital-Interface-Visual-System",
    liveProject: "https://pionirgadjahmada25.vercel.app/2025/"
  },
  {
    id: 2,
    title: "PORSENIGAMA 2025",
    category: "UI Design",
    image: "/source_image/projects/PORSENI_Cover.webp",
    description: "Translating a vibrant 11-color brand guide into a clean, high-energy digital interface for UGM's largest sports festival.",
    medium: "https://safwanpiliang.medium.com/taming-an-11-color-branding-guide-a-ui-case-study-on-porsenigama-2025-1bc85e6a0fd2?sharedUserId=safwanpiliang",
    behance: "https://www.behance.net/gallery/241408153/PORSENIGAMA-A-Colorful-Yet-Structured-UI-Exploration",
    liveProject: "https://porsenigama25.vercel.app/2025/porsenigama/"
  },
  {
    id: 3,
    title: "Tech Enthusiast Day 2025",
    category: "UI Design",
    image: "/source_image/projects/TED_Cover.webp",
    description: "This project represents how UI can be expressive without becoming chaotic, and playful without losing structure.",
    behance: "https://www.behance.net/gallery/241473405/Tech-Enthusiast-Day-Website-Visual-Driven-UI-Design",
  },
  {
    id: 4,
    title: "Batam Campus Expo 2025",
    category: "UI Design",
    image: "/source_image/projects/BATAM_Cover.webp",
    description: "Batam Campus Expo is the largest education fair in Batam, initiated by students from Batam who are studying at various universities across Indonesia.",
    behance: "https://www.behance.net/gallery/253353683/BATAM-CAMPUS-EXPO-Gamifying-the-College-Hunt",
    liveProject: "https://batamcampusexpo.onrender.com/"
  },
  {
    id: 5,
    title: "SkyBase",
    category: "UI Design",
    image: "/source_image/projects/SkyBase_Cover.webp",
    description: "SkyBase is a web-based flight schedule management system. It is designed for airline supervisors to easily input, modify, and reschedule flight schedules.",
    behance: "https://www.behance.net/gallery/253354089/SkyBase-Aviation-Inventory-Management-System"
  },
  {
    id: 6,
    title: "LIGA TRPL",
    category: "Graphic Design",
    image: "/source_image/projects/Liga TRPL_Cover.webp",
    description: "The Liga TRPL is an annual event aimed at enhancing students' competencies in the field of software engineering through various competitions and other activities.",
    behance: "https://www.behance.net/gallery/241451377/Liga-TRPL-2025-Post-Design",
    instagram: "https://www.instagram.com/liga_trpl?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },
  {
    id: 7,
    title: "Google Developer Groups on Campus UGM",
    category: "Graphic Design",
    image: "/source_image/projects/GDGoC_Cover.webp",
    description: "Google Developer Groups on Campus. It is a student-led university community backed by Google, designed to help students bridge the gap between classroom theory and practical, real-world development.",
    behance: "https://www.behance.net/gallery/241364791/GDGoC-UGM-Design-Concept-Visual-System",
    instagram: "https://www.instagram.com/gdgoc.ugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },
  {
    id: 8,
    title: "PALPOD UGM",
    category: "Graphic Design",
    image: "/source_image/projects/PALPOD_Cover.webp",
    description: "An educational podcast platform aimed at university students. The visuals are designed to communicate diverse academic and tech-related topics in a fun, approachable, and easily digestible format.",
    behance: "https://www.behance.net/gallery/241366913/Palpod-Podcast-Instagram-Feed-Visual-Identity",
    instagram: "https://www.instagram.com/palpod.ugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },
  {
    id: 9,
    title: "BEM SV UGM Brand Guidelines",
    category: "Graphic Design",
    image: "/source_image/projects/BEM_Cover.webp",
    description: "A complete visual system built to help designers stay consistent, intentional, and on-brand from color systems and typography to visual hierarchy and design rules.",
    behance: "https://www.behance.net/gallery/253354603/Brand-Guidelines-BEM-KM-SV-UGM",
    instagram: "https://www.instagram.com/bemkmsvugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },
  {
    id: 10,
    title: "KMID UGM",
    category: "Graphic Design",
    image: "/source_image/projects/KMID_Cover.webp",
    description: "KMID UGM is an official community under the Directorate of Student Affairs (Sub-directorate of Creativity) of UGM. This community provides a platform for students to learn, collaborate, and develop digital innovation ideas.",
    behance: "https://www.behance.net/gallery/253395351/KMID-Social-Media-Branding-Design",
    instagram: "https://www.instagram.com/kmidugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },
  {
    id: 11,
    title: "KMTEDI UGM 2025/2026",
    category: "Graphic Design",
    image: "/source_image/projects/KMTEDI_Cover.webp",
    description: "KMTEDI is an official student organization operating under the Department of Electrical Engineering and Informatics (DTEDI) at UGM Vocational College.",
    behance: "https://www.behance.net/gallery/253395549/KMTEDI-UGM-Brand-Guidelines-and-Social-Media-Design",
    instagram: "https://www.instagram.com/kmtedi.sv.ugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },
  {
    id: 12,
    title: "TGES 2025",
    category: "Graphic Design",
    image: "/source_image/projects/tges_cover.webp",
    description: "TEDI Games and Electronic Sports is an annual sports, arts, and esports competition organized by the Department of Electrical Engineering and Informatics (TEDI), UGM Vocational College.",
    behance: "https://www.behance.net/gallery/253395687/TGES-UGM-Social-Media-Feed-Design",
    instagram: "https://www.instagram.com/tges.ugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },
  {
    id: 13,
    title: "VOCENTIC 2025",
    category: "Graphic Design",
    image: "/source_image/projects/vocentic_cover.webp",
    description: "Vocentic (Vocational Entrepreneur and Innovation Competition) is an annual event hosted by the Student Executive Board (BEM KM) of UGM Vocational College. The event series features competitions (essay, poster, and business plan), seminars, exhibitions, and campus tours for students.",
    behance: "https://www.behance.net/gallery/253395841/VOCENTIC-Poster-and-Social-Media-Design?platform=direct",
    instagram: "https://www.instagram.com/vocentic.ugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },
  {
    id: 14,
    title: "Muzzy RDK Official Mascot",
    category: "3D Modeling",
    image: "/source_image/projects/Muzzy_Cover.webp",
    description: "A playful 3D mascot created for a Ramadhan event at Universitas Gadjah Mada, bringing warmth, joy, and togetherness to life through friendly expressions, soft shapes, and cheerful visuals.",
    behance: "https://www.behance.net/gallery/241449819/Ramadhan-Mascot-3D",
  },
  {
    id: 17,
    title: "GADANI Pionir Permadani UGM Official 3D Mascot",
    category: "3D Modeling",
    image: "/source_image/projects/gadani_cover.webp",
    description: "The official 3D mascot for Pionir Permadani Sekolah Vokasi Universitas Gadjah Mada.",
    behance: "https://www.behance.net/gallery/253470589/GADANI-Official-Pionir-Permadani-3D-Mascot",
  },
  {
    id: 15,
    title: "Habi Habitutor Official Mascot",
    category: "Illustration",
    image: "/source_image/projects/habitutor_cover.webp",
    description: "Habitutor is an educational tutoring platform and college admission preparation app based in Indonesia."
  },
  {
    id: 16,
    title: "“Nobo” 2D Character Cat",
    category: "Illustration",
    image: "/source_image/projects/nobo_cover.webp",
    description: "Nobo is a 2D character design dummy project based on my pet cat. Serving as a creative playground, this project explores various illustration styles, such as flat vectors and chibi designs, to develop engaging digital mascot assets."
  }
];

function ProjectCard({ project, index }: { project: any, index: number }) {
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
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="relative group w-full h-full transform-gpu"
    >
      {/* Background Paper 1 (Bottom-most) */}
      <div className="absolute inset-0 bg-slate-300 border border-slate-300 transition-all duration-500 ease-out origin-bottom-left rotate-[2deg] translate-x-1 group-hover:rotate-[4deg] group-hover:translate-x-2 group-hover:-translate-y-1 z-[-2] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]" />

      {/* Background Paper 2 (Middle) */}
      <div className="absolute inset-0 bg-slate-200 border border-slate-200 transition-all duration-500 ease-out origin-bottom-right -rotate-[1deg] -translate-x-1 group-hover:-rotate-[2deg] group-hover:-translate-x-2 group-hover:-translate-y-0.5 z-[-1] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]" />

      {/* Front Card */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="bg-[#f9fafb] p-[6px] sm:p-[8px] pb-[12px] sm:pb-[16px] flex flex-col gap-[8px] sm:gap-[16px] md:gap-[24px] shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-out border border-white relative z-10 h-full transform-gpu will-change-transform"
      >
        {/* Clickable Overlay */}
        {project.behance && (
          <a
            href={project.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-[5]"
            aria-label={`View ${project.title} on Behance`}
          />
        )}

        {/* Image Box */}
        <div
          className="w-full aspect-[354/283] overflow-hidden bg-white relative"
        >
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
        </div>

        {/* Text Content */}
        <div
          className="flex flex-col gap-[4px] sm:gap-[8px] px-[4px] sm:px-[8px]"
        >
          <h3 className="font-montserrat font-semibold text-[12px] sm:text-[16px] md:text-[24px] leading-[16px] sm:leading-[24px] text-slate-800 line-clamp-2">
            {project.title}
          </h3>
          <p className="font-montserrat font-normal text-[10px] sm:text-[12px] leading-[16px] sm:leading-[20px] text-slate-600 line-clamp-2 sm:line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-wrap gap-[4px] sm:gap-[8px] md:gap-[10px] items-center justify-end w-full px-[4px] sm:px-[8px] mt-auto relative z-10"
        >
          {project.medium && (
            <a href={project.medium} target="_blank" rel="noopener noreferrer" className="p-[6px] sm:p-[8px] bg-slate-300/30 rounded-full flex items-center justify-center hover:bg-slate-300/50 transition-colors">
              <img src="/source_image/ri_medium-fill.svg" alt="Medium" className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] opacity-80" />
            </a>
          )}
          {project.instagram && (
            <a href={project.instagram} target="_blank" rel="noopener noreferrer" className="p-[6px] sm:p-[8px] bg-slate-300/30 rounded-full flex items-center justify-center hover:bg-slate-300/50 transition-colors">
              <img src="/source_image/skill-icons_instagram.svg" alt="Instagram" className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] opacity-80" />
            </a>
          )}
          {project.behance && (
            <a href={project.behance} target="_blank" rel="noopener noreferrer" className="p-[6px] sm:p-[8px] bg-slate-300/30 rounded-full flex items-center justify-center hover:bg-slate-300/50 transition-colors">
              <img src="/source_image/devicon_behance.svg" alt="Behance" className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] opacity-80" />
            </a>
          )}
          {project.liveProject && (
            <a href={project.liveProject} target="_blank" rel="noopener noreferrer" className="bg-[#ffab2f] border border-[#ffab2f] text-[#333] font-inter font-medium text-[10px] sm:text-[12px] md:text-[14px] leading-[20px] px-[8px] py-[4px] sm:px-[10px] sm:py-[6px] md:px-[14px] md:py-[8px] rounded-full shadow-sm flex items-center gap-[4px] sm:gap-[6px] md:gap-[8px] hover:bg-[#e69b2a] transition-colors">
              Live Project
              <ArrowUpRight className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px]" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PROJECT_DATA;
    return PROJECT_DATA.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const setCategory = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(6);
  };

  return (
    <section id="projects" className="relative w-full pt-20 pb-12 sm:pt-40 sm:pb-8 md:pt-56 md:pb-16 flex flex-col items-center justify-center overflow-hidden">

      <div className="w-full max-w-[1400px] px-4 sm:px-6 z-10 flex flex-col gap-6 md:gap-8">

        {/* Header & Filter Bar */}
        <div className="flex flex-col gap-6 items-center w-full">

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-[8px] sm:gap-x-[12px] md:gap-x-[16px] text-center"
          >
            <span className="font-montserrat font-medium text-[32px] md:text-[64px] text-[#334155] tracking-[-1px]">
              Selected <span className="font-doto font-black"><ScrambleText text="Project's" /></span>
            </span>
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4 md:gap-8 justify-center items-center w-full"
          >
            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center items-center">
              <button
                onClick={() => setCategory("All")}
                className={`${activeCategory === "All" ? "bg-slate-300/25" : "hover:bg-slate-300/10"} text-slate-700 font-inter font-medium text-[12px] md:text-[14px] leading-[20px] px-3 py-1.5 md:px-4 md:py-2.5 rounded-full transition-colors`}
              >
                All
              </button>
              <button
                onClick={() => setCategory("UI Design")}
                className={`${activeCategory === "UI Design" ? "bg-slate-300/25" : "hover:bg-slate-300/10"} text-slate-700 font-inter font-medium text-[12px] md:text-[14px] leading-[20px] px-3 py-1.5 md:px-4 md:py-2.5 rounded-full transition-colors`}
              >
                UI Design
              </button>
              <button
                onClick={() => setCategory("3D Modeling")}
                className={`${activeCategory === "3D Modeling" ? "bg-slate-300/25" : "hover:bg-slate-300/10"} text-slate-700 font-inter font-medium text-[12px] md:text-[14px] leading-[20px] px-3 py-1.5 md:px-4 md:py-2.5 rounded-full transition-colors`}
              >
                3D Modeling
              </button>
              <button
                onClick={() => setCategory("Graphic Design")}
                className={`${activeCategory === "Graphic Design" ? "bg-slate-300/25" : "hover:bg-slate-300/10"} text-slate-700 font-inter font-medium text-[12px] md:text-[14px] leading-[20px] px-3 py-1.5 md:px-4 md:py-2.5 rounded-full transition-colors`}
              >
                Graphic Design
              </button>
              <button
                onClick={() => setCategory("Illustration")}
                className={`${activeCategory === "Illustration" ? "bg-slate-300/25" : "hover:bg-slate-300/10"} text-slate-700 font-inter font-medium text-[12px] md:text-[14px] leading-[20px] px-3 py-1.5 md:px-4 md:py-2.5 rounded-full transition-colors`}
              >
                Illustration
              </button>

              {/* Behance Button */}
              <a href="https://www.behance.net/safwanpiliang" target="_blank" rel="noopener noreferrer" className="bg-[#ffab2f] border border-[#ffab2f] text-[#333] font-inter font-medium text-[12px] md:text-[14px] leading-[20px] px-3 py-1.5 md:px-4 md:py-2.5 rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex items-center gap-[6px] md:gap-[8px] hover:bg-[#e69b2a] transition-colors shrink-0">
                Full on Behance
                <ArrowUpRight className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Project Grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-[12px] sm:gap-[24px] md:gap-[48px] lg:gap-[64px] justify-center items-stretch pt-2"
        >
          {visibleProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mt-4"
          >
            <button
              onClick={handleLoadMore}
              className="bg-[#ffab2f] border border-[#ffab2f] text-[#333] font-inter font-medium text-[12px] md:text-[14px] leading-[20px] px-6 py-2.5 md:px-8 md:py-3 rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex items-center justify-center gap-[6px] md:gap-[8px] hover:bg-[#e69b2a] transition-colors"
            >
              Load More Projects
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
