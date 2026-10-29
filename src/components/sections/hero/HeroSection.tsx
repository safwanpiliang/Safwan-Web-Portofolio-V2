import Image from "next/image";
import { ClientLogos } from "./ClientLogos";
import { HeroContent } from "./HeroContent";

/** `parallax-hero` (globals.css) lets the hero lag behind on desktop so the next section slides over it. */
export function HeroSection() {
  return (
    <div id="hero" className="parallax-hero w-full flex flex-col justify-between md:justify-start min-h-[100svh] md:min-h-0 items-center bg-gradient-to-b from-sky from-[20%] md:from-[5%] to-blue-50 relative z-0">
      <HeroContent />

      <div className="w-full relative -mt-10 z-10 flex flex-col justify-end">
        <Image
          src="/images/hero/hero-landing.webp"
          alt="3D Robot on Grassy Hill"
          width={1512}
          height={1003}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="w-full h-auto object-cover z-0 pointer-events-none"
        />
        <ClientLogos />
      </div>
    </div>
  );
}
