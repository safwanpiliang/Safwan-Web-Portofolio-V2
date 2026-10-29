import Image from "next/image";

/**
 * ID card that rotates upright as it scrolls toward the middle of the screen (`.id-card-in` in
 * globals.css): a CSS view timeline on the wrapper, so it runs on the compositor instead of a
 * per-frame spring on the main thread. Without support or with reduced motion it rests upright.
 */
export function IdCard3D() {
  return (
    <div className="id-card-track flex items-center justify-center lg:justify-end mt-12 lg:mt-0 w-full" style={{ perspective: "1200px" }}>
      <div className="id-card-in w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] origin-bottom">
        {/* The shadow sits on the static image, so it is painted once, not on every frame */}
        <Image
          src="/images/about/id-card.webp"
          alt="Safwan ID Card"
          width={778}
          height={487}
          sizes="(min-width: 768px) 500px, (min-width: 640px) 400px, 280px"
          className="w-full h-auto object-contain drop-shadow-[0px_20px_40px_rgba(0,0,0,0.15)]"
        />
      </div>
    </div>
  );
}
