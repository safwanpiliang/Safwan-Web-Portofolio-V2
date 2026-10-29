import Image from "next/image";

const ROW_1 = [
  { word: "UI Design", src: "/images/projects/porsenigama.webp" },
  { word: "Branding", src: "/images/projects/bem-sv.webp" },
  { word: "3D Mascots", src: "/images/projects/gadani.webp" },
];
const ROW_2 = [
  { word: "Illustration", src: "/images/projects/nobo.webp" },
  { word: "Social Media", src: "/images/projects/tges.webp" },
  { word: "Systems", src: "/images/projects/skybase.webp" },
];

function Row({ items, reverse }: { items: typeof ROW_1; reverse?: boolean }) {
  return (
    <p className={`${reverse ? "slide-band-reverse" : "slide-band"} whitespace-nowrap font-montserrat text-[48px] md:text-[112px] font-bold leading-[1.1] tracking-[-2px] text-slate-800`}>
      {Array.from({ length: 3 }, (_, copy) =>
        items.map(({ word, src }) => (
          <span key={`${copy}-${word}`}>
            {word}
            <span className="relative mx-[0.25em] inline-block h-[0.7em] w-[1.05em] overflow-hidden rounded-[0.18em] align-[-0.04em] rotate-[-4deg] shadow-[0_8px_24px_rgba(15,23,42,0.18)]">
              {/* eager: copies start off-screen horizontally and would pop in late if lazy-loaded */}
              <Image src={src} alt="" fill sizes="(min-width: 768px) 130px, 60px" loading="eager" className="object-cover" />
            </span>
          </span>
        ))
      )}
    </p>
  );
}

/** Two oversized rows of disciplines with project thumbnails set inline, sliding in opposite directions with the scroll. */
export function EditorialBand() {
  return (
    <div aria-hidden className="band-track w-full overflow-clip py-10 md:py-16">
      <Row items={ROW_1} />
      <Row items={ROW_2} reverse />
    </div>
  );
}
