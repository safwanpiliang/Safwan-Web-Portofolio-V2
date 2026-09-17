import Image from "next/image";
import { CLIENT_LOGOS_ROW_1, CLIENT_LOGOS_ROW_2, type ClientLogo } from "@/data/clientLogos";

// The track scrolls by -50%, so each half must be wider than the widest screen:
// 4 copies of a row (~1300px each) keep the loop seamless up to ~2600px viewports.
const COPIES = 4;

function MarqueeRow({ logos, direction }: { logos: ClientLogo[]; direction: "left" | "right" }) {
  return (
    <div className="relative flex w-full overflow-hidden">
      <div className={`flex gap-7.5 md:gap-12.5 w-[max-content] pl-7.5 md:pl-12.5 items-center ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
        {Array.from({ length: COPIES }, (_, copy) =>
          logos.map((logo) => (
            <div
              key={`${copy}-${logo.src}`}
              // Only the first copy is announced to screen readers
              aria-hidden={copy > 0 || undefined}
              className="h-7.5 md:h-12.5 relative shrink-0 w-auto"
              style={{ aspectRatio: logo.aspectRatio }}
            >
              {/* eager: copies start off-screen horizontally and would pop in late if lazy-loaded */}
              <Image src={logo.src} alt={copy > 0 ? "" : logo.alt} fill sizes="200px" loading="eager" className="object-contain" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function ClientLogos() {
  return (
    <div className="absolute bottom-[20%] md:bottom-[28%] left-0 w-full flex flex-col gap-5 md:gap-10 z-20 pointer-events-none overflow-hidden">
      <MarqueeRow logos={CLIENT_LOGOS_ROW_1} direction="left" />
      <MarqueeRow logos={CLIENT_LOGOS_ROW_2} direction="right" />
    </div>
  );
}
