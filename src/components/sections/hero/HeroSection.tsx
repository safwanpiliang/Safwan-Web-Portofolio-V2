import Image from "next/image";
import { SelectionFrame } from "@/components/ui/SelectionFrame";
import { ClientLogos } from "./ClientLogos";
import { HeroContent } from "./HeroContent";

/**
 * The hero is a selected frame sitting on the dotted canvas. On phones the canvas keeps room at the
 * bottom so the floating toolbar never covers the frame.
 * `hero-zoom` (globals.css) zooms the frame out as you scroll, while the next section slides over it.
 */
export function HeroSection() {
  return (
    <div
      id="hero"
      className="hero-zoom canvas-grid relative z-0 flex w-full flex-col min-h-[100svh] md:min-h-0 px-3 pt-3 pb-[var(--toolbar-space)] md:px-6 md:pt-6 md:pb-0"
    >
      <SelectionFrame label="Hero" className="flex flex-1 flex-col">
        <div className="relative flex flex-1 w-full flex-col items-center justify-between md:justify-start overflow-hidden bg-gradient-to-b from-sky from-[20%] md:from-[5%] to-blue-50">
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
      </SelectionFrame>
    </div>
  );
}
