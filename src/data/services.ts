/**
 * "What I do" cards. Wording follows Safwan's skills note (CV Oct 2026 + project work);
 * keep claims to what is listed there.
 */
export interface Service {
  title: string;
  description: string;
  tags: string[];
  /** Project thumbnails from public/images/projects. */
  images: { src: string; alt: string }[];
  /** Card colors: background and text classes. */
  tone: string;
}

export const SERVICES: Service[] = [
  {
    title: "UI/UX & Product Design",
    description:
      "Interfaces in Figma that turn busy brand guides into clear, usable screens, with color contrast and the mobile layout checked from the start.",
    tags: ["Figma", "Prototyping", "Design systems", "Accessibility"],
    images: [
      { src: "/images/projects/pionir.webp", alt: "PIONIR Gadjah Mada 2025" },
      { src: "/images/projects/porsenigama.webp", alt: "PORSENIGAMA 2025" },
      { src: "/images/projects/skybase.webp", alt: "SkyBase" },
      { src: "/images/projects/batam-campus-expo.webp", alt: "Batam Campus Expo" },
    ],
    tone: "bg-brand-blue text-white",
  },
  {
    title: "Brand & Graphic Design",
    description:
      "Logos, brand guidelines and social media systems for student organizations and campus events, built in Illustrator and Photoshop.",
    tags: ["Brand identity", "Guidelines", "Logo design", "Social media"],
    images: [
      { src: "/images/projects/bem-sv.webp", alt: "BEM SV UGM brand guidelines" },
      { src: "/images/projects/kmid-logo.webp", alt: "KMID UGM logo redesign" },
      { src: "/images/projects/tges-logo.webp", alt: "TGES 2026 logo" },
      { src: "/images/projects/palpod.webp", alt: "PalPod feed" },
    ],
    tone: "bg-brand-orange text-ink",
  },
  {
    title: "3D & Illustration",
    description:
      "Mascots and characters modeled in Blender, from low-poly shapes to sculpting, texturing and rendering, plus 2D character work.",
    tags: ["Blender", "Low-poly", "Sculpting", "Characters"],
    images: [
      { src: "/images/projects/muzzy.webp", alt: "Muzzy RDK mascot" },
      { src: "/images/projects/gadani.webp", alt: "GADANI Pionir Permadani mascot" },
      { src: "/images/projects/habitutor.webp", alt: "Habi Habitutor mascot" },
      { src: "/images/projects/nobo.webp", alt: "Nobo 2D character" },
    ],
    tone: "bg-[#1f4d3a] text-white",
  },
  {
    title: "System Analysis",
    description:
      "The structure before the screens: requirements, user stories, user flows, ERDs and information architecture that the whole team can build from.",
    tags: ["PRD & SRS", "User flows", "ERD", "FigJam"],
    images: [],
    tone: "bg-slate-900 text-white",
  },
];
