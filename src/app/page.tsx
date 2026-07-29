import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Articles } from "@/components/Articles";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { ClientLogos } from "@/components/ClientLogos";
import { MultiplayerCursors } from "@/components/MultiplayerCursors";
import { HeroParallaxWrapper } from "@/components/HeroParallaxWrapper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-[#f1f5f9] overflow-x-hidden">
      <MultiplayerCursors />
      <Navbar />

      {/* ═══════ TOP SECTION (Hero + Image + Logos) ═══════ */}
      <HeroParallaxWrapper>
        <div id="hero" className="w-full flex flex-col justify-between md:justify-start min-h-[100svh] md:min-h-0 items-center bg-gradient-to-b from-[#28a6ff] from-[20%] md:from-[5%] to-[#EFF6FF] relative z-0">

          {/* Rendered ONCE */}
          <Hero />

          <div className="w-full relative mt-[-40px] z-10 flex flex-col justify-end">
            {/* Base Image (row 1) */}
            <Image
              src="/source_image/Landing Page 2 char 3 1 WEBP.webp"
              alt="3D Robot on Grassy Hill"
              width={1512}
              height={1003}
              priority
              className="w-full h-auto object-cover z-0 pointer-events-none transform-gpu will-change-transform"
            />

            {/* Client Logos over the image */}
            <ClientLogos />
          </div>

        </div>
      </HeroParallaxWrapper>

      {/* ═══════ SECTIONS 3 AND ONWARDS ═══════ */}
      {/* We add a solid background here so it can slide OVER Section 2 */}
      <div className="w-full relative z-10 flex flex-col items-center min-h-screen bg-[#f1f5f9] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]">

        {/* Transition Images moved to the top of Section 3 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[45%] md:-translate-y-[40%] w-[200%] md:w-[120%] max-w-[5000px] z-20 pointer-events-none flex items-center justify-center overflow-visible">
          <img
            src="/source_image/Garis Transisi Section 2 ke 3.webp"
            alt="Transisi"
            className="relative w-[95%] h-auto object-contain pointer-events-none z-0 drop-shadow-2xl translate-y-[4%] md:translate-y-[7%]"
            fetchPriority="high"
          />
          <img
            src="/source_image/Garis Transisi burem Section 2 ke 3.webp"
            alt="Transisi Burem"
            className="absolute w-full h-auto object-contain pointer-events-none z-10 scale-[1.3] md:scale-[1.6] drop-shadow-2xl"
            fetchPriority="high"
          />
        </div>

        <Projects />
        <Articles />
        <About />
        <div className="w-full relative z-10">
          <Footer />
        </div>
      </div>
    </main>
  );
}
