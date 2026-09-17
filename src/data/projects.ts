export const PROJECT_CATEGORIES = [
  "UI Design",
  "3D Modeling",
  "Graphic Design",
  "Logo and Branding",
  "Illustration",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  behance?: string;
  medium?: string;
  instagram?: string;
  liveProject?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "pionir",
    title: "PIONIR Gadjah Mada 2025",
    category: "UI Design",
    image: "/images/projects/pionir.webp",
    description: "A user interface design created for PIONIR Gadjah Mada 2025, an annual orientation and introduction program for new students at Universitas Gadjah Mada.",
    medium: "https://safwanpiliang.medium.com/behind-the-interface-crafting-a-digital-welcome-for-ugms-2025-freshmen-347abe67fde9?sharedUserId=safwanpiliang",
    behance: "https://www.behance.net/gallery/241401443/PIONIR-2025-Digital-Interface-Visual-System",
    liveProject: "https://pionirgadjahmada25.vercel.app/2025/",
  },
  {
    id: "porsenigama",
    title: "PORSENIGAMA 2025",
    category: "UI Design",
    image: "/images/projects/porsenigama.webp",
    description: "Translating a vibrant 11-color brand guide into a clean, high-energy digital interface for UGM's largest sports festival.",
    medium: "https://safwanpiliang.medium.com/taming-an-11-color-branding-guide-a-ui-case-study-on-porsenigama-2025-1bc85e6a0fd2?sharedUserId=safwanpiliang",
    behance: "https://www.behance.net/gallery/241408153/PORSENIGAMA-A-Colorful-Yet-Structured-UI-Exploration",
    liveProject: "https://porsenigama25.vercel.app/2025/porsenigama/",
  },
  {
    id: "ted",
    title: "Tech Enthusiast Day 2025",
    category: "UI Design",
    image: "/images/projects/ted.webp",
    description: "This project represents how UI can be expressive without becoming chaotic, and playful without losing structure.",
    behance: "https://www.behance.net/gallery/241473405/Tech-Enthusiast-Day-Website-Visual-Driven-UI-Design",
  },
  {
    id: "batam-campus-expo",
    title: "Batam Campus Expo 2025",
    category: "UI Design",
    image: "/images/projects/batam-campus-expo.webp",
    description: "Batam Campus Expo is the largest education fair in Batam, initiated by students from Batam who are studying at various universities across Indonesia.",
    behance: "https://www.behance.net/gallery/253353683/BATAM-CAMPUS-EXPO-Gamifying-the-College-Hunt",
    liveProject: "https://batamcampusexpo.onrender.com/",
  },
  {
    id: "skybase",
    title: "SkyBase",
    category: "UI Design",
    image: "/images/projects/skybase.webp",
    description: "SkyBase is a web-based flight schedule management system. It is designed for airline supervisors to easily input, modify, and reschedule flight schedules.",
    behance: "https://www.behance.net/gallery/253354089/SkyBase-Aviation-Inventory-Management-System",
  },
  {
    id: "liga-trpl",
    title: "LIGA TRPL",
    category: "Graphic Design",
    image: "/images/projects/liga-trpl.webp",
    description: "The Liga TRPL is an annual event aimed at enhancing students' competencies in the field of software engineering through various competitions and other activities.",
    behance: "https://www.behance.net/gallery/241451377/Liga-TRPL-2025-Post-Design",
    instagram: "https://www.instagram.com/liga_trpl?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: "gdgoc",
    title: "Google Developer Groups on Campus UGM",
    category: "Graphic Design",
    image: "/images/projects/gdgoc.webp",
    description: "Google Developer Groups on Campus. It is a student-led university community backed by Google, designed to help students bridge the gap between classroom theory and practical, real-world development.",
    behance: "https://www.behance.net/gallery/241364791/GDGoC-UGM-Design-Concept-Visual-System",
    instagram: "https://www.instagram.com/gdgoc.ugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: "palpod",
    title: "PALPOD UGM",
    category: "Graphic Design",
    image: "/images/projects/palpod.webp",
    description: "An educational podcast platform aimed at university students. The visuals are designed to communicate diverse academic and tech-related topics in a fun, approachable, and easily digestible format.",
    behance: "https://www.behance.net/gallery/241366913/Palpod-Podcast-Instagram-Feed-Visual-Identity",
    instagram: "https://www.instagram.com/palpod.ugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: "bem-sv",
    title: "BEM SV UGM Brand Guidelines",
    category: "Logo and Branding",
    image: "/images/projects/bem-sv.webp",
    description: "A complete visual system built to help designers stay consistent, intentional, and on-brand from color systems and typography to visual hierarchy and design rules.",
    behance: "https://www.behance.net/gallery/253354603/Brand-Guidelines-BEM-KM-SV-UGM",
    instagram: "https://www.instagram.com/bemkmsvugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: "kmid",
    title: "KMID UGM",
    category: "Graphic Design",
    image: "/images/projects/kmid.webp",
    description: "KMID UGM is an official community under the Directorate of Student Affairs (Sub-directorate of Creativity) of UGM. This community provides a platform for students to learn, collaborate, and develop digital innovation ideas.",
    behance: "https://www.behance.net/gallery/253395351/KMID-Social-Media-Branding-Design",
    instagram: "https://www.instagram.com/kmidugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: "kmtedi",
    title: "KMTEDI UGM 2025/2026",
    category: "Graphic Design",
    image: "/images/projects/kmtedi.webp",
    description: "KMTEDI is an official student organization operating under the Department of Electrical Engineering and Informatics (DTEDI) at UGM Vocational College.",
    behance: "https://www.behance.net/gallery/253395549/KMTEDI-UGM-Brand-Guidelines-and-Social-Media-Design",
    instagram: "https://www.instagram.com/kmtedi.sv.ugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: "tges",
    title: "TGES 2025",
    category: "Graphic Design",
    image: "/images/projects/tges.webp",
    description: "TEDI Games and Electronic Sports is an annual sports, arts, and esports competition organized by the Department of Electrical Engineering and Informatics (TEDI), UGM Vocational College.",
    behance: "https://www.behance.net/gallery/253395687/TGES-UGM-Social-Media-Feed-Design",
    instagram: "https://www.instagram.com/tges.ugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: "vocentic",
    title: "VOCENTIC 2025",
    category: "Graphic Design",
    image: "/images/projects/vocentic.webp",
    description: "Vocentic (Vocational Entrepreneur and Innovation Competition) is an annual event hosted by the Student Executive Board (BEM KM) of UGM Vocational College. The event series features competitions (essay, poster, and business plan), seminars, exhibitions, and campus tours for students.",
    behance: "https://www.behance.net/gallery/253395841/VOCENTIC-Poster-and-Social-Media-Design?platform=direct",
    instagram: "https://www.instagram.com/vocentic.ugm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: "muzzy",
    title: "Muzzy RDK Official Mascot",
    category: "3D Modeling",
    image: "/images/projects/muzzy.webp",
    description: "A playful 3D mascot created for a Ramadhan event at Universitas Gadjah Mada, bringing warmth, joy, and togetherness to life through friendly expressions, soft shapes, and cheerful visuals.",
    behance: "https://www.behance.net/gallery/241449819/Ramadhan-Mascot-3D",
  },
  {
    id: "gadani",
    title: "GADANI Pionir Permadani UGM Official 3D Mascot",
    category: "3D Modeling",
    image: "/images/projects/gadani.webp",
    description: "The official 3D mascot for Pionir Permadani Sekolah Vokasi Universitas Gadjah Mada.",
    behance: "https://www.behance.net/gallery/253470589/GADANI-Official-Pionir-Permadani-3D-Mascot",
  },
  {
    id: "habitutor",
    title: "Habi Habitutor Official Mascot",
    category: "Illustration",
    image: "/images/projects/habitutor.webp",
    description: "Habitutor is an educational tutoring platform and college admission preparation app based in Indonesia.",
  },
  {
    id: "nobo",
    title: "“Nobo” 2D Character Cat",
    category: "Illustration",
    image: "/images/projects/nobo.webp",
    description: "Nobo is a 2D character design dummy project based on my pet cat. Serving as a creative playground, this project explores various illustration styles, such as flat vectors and chibi designs, to develop engaging digital mascot assets.",
  },
  {
    id: "tges-logo",
    title: "TGES 2026 Event Logo & Typography",
    category: "Logo and Branding",
    image: "/images/projects/tges-logo.webp",
    description: "Visual identity design for TGES 2026 (TEDI Games and Electronic Sports), an annual multi-event festival featuring sports, arts, and esports competitions at UGM Vocational College.",
    behance: "https://www.behance.net/gallery/253528063/TGES-2026-Event-Logo-Typography",
  },
  {
    id: "kmid-logo",
    title: "KMID UGM: Logo Redesign & Visual Identity",
    category: "Logo and Branding",
    image: "/images/projects/kmid-logo.webp",
    description: "KMID UGM (Universitas Gadjah Mada Digital Innovation Student Community) is an official student organization at UGM dedicated to coaching, developing, and mentoring students for the Student Digital Innovation Competition (LIDM).",
    behance: "https://www.behance.net/gallery/253527903/KMID-UGM-Logo-Redesign-Visual-Identit",
  },
];

/**
 * Display order for the "All" tab (mixes categories). Category tabs keep the
 * order of PROJECTS above. Projects not listed here are appended at the end.
 */
export const ALL_VIEW_ORDER: string[] = [
  "kmid-logo",
  "ted",
  "liga-trpl",
  "bem-sv",
  "tges",
  "habitutor",
  "tges-logo",
  "porsenigama",
  "skybase",
  "palpod",
  "kmtedi",
  "muzzy",
  "gadani",
  "pionir",
  "batam-campus-expo",
  "gdgoc",
  "kmid",
  "vocentic",
  "nobo",
];
