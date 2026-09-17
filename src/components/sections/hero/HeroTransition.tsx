import Image from "next/image";

// Rendered at 200% of the viewport on mobile and 120% from md up.
const SIZES = "(min-width: 768px) 120vw, 200vw";

/** Decorative line that overlaps the bottom of the hero and the top of the next section. */
export function HeroTransition() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[45%] md:-translate-y-[40%] w-[200%] md:w-[120%] max-w-[5000px] z-20 pointer-events-none flex items-center justify-center overflow-visible">
      <Image
        src="/images/hero/transition-line.webp"
        alt=""
        width={5404}
        height={610}
        sizes={SIZES}
        className="relative w-[95%] h-auto object-contain pointer-events-none z-0 drop-shadow-2xl translate-y-[4%] md:translate-y-[7%]"
      />
      <Image
        src="/images/hero/transition-line-blur.webp"
        alt=""
        width={3564}
        height={370}
        sizes={SIZES}
        className="absolute w-full h-auto object-contain pointer-events-none z-10 scale-[1.3] md:scale-[1.6] drop-shadow-2xl"
      />
    </div>
  );
}
