export const EXPERIENCE_GROUPS = ["UI/UX & Systems", "Visual & 3D", "Leadership"] as const;

export type ExperienceGroup = (typeof EXPERIENCE_GROUPS)[number];

export interface Experience {
  role: string;
  org: string;
  group: ExperienceGroup;
  /** "YYYY-MM", used for sorting and the "since" stat. */
  start: string;
  /** Display text for the period. */
  period: string;
  current?: boolean;
}

/**
 * Roles shown in "Version history". Dates follow Safwan's CV (Oct 2026), which wins where LinkedIn
 * disagrees. Roles with unknown dates (SIKOLOV) or an unclear owner (Liga TRPL) are left out.
 */
export const EXPERIENCE: Experience[] = [
  { role: "System Analyst & UX Designer", org: "SiMatkul", group: "UI/UX & Systems", start: "2026-08", period: "Aug 2026 – now", current: true },
  { role: "System Analyst & UX Designer", org: "SiMagang", group: "UI/UX & Systems", start: "2026-08", period: "Aug 2026 – now", current: true },
  { role: "Vice President · UI/UX Mentor · PM, ASSETS Web Profile", org: "ASSETS (Software Engineering Student Association)", group: "Leadership", start: "2026-01", period: "Jan 2026 – now", current: true },
  { role: "System Analyst & UX Designer", org: "SiBudaya, Dinas Kebudayaan D.I. Yogyakarta", group: "UI/UX & Systems", start: "2026-01", period: "Jan – Aug 2026" },
  { role: "3D Designer", org: "Pionir Permadani 2026", group: "Visual & 3D", start: "2026-01", period: "Jan – Aug 2026" },
  { role: "Head & Mentor, UX Division", org: "KOMATIK UGM (UXGama)", group: "Leadership", start: "2025-12", period: "Dec 2025 – now", current: true },
  { role: "Visual Designer & Creative Team", org: "GDGoC UGM", group: "Visual & 3D", start: "2025-11", period: "Nov 2025 – now", current: true },
  { role: "Brand & Visual Designer", org: "BEM KM SV UGM", group: "Visual & 3D", start: "2025-11", period: "Nov 2025 – now", current: true },
  { role: "Head of Creative & Media", org: "KMID UGM", group: "Leadership", start: "2025-10", period: "Oct – Dec 2025" },
  { role: "System Analyst & UX Designer", org: "SkyBase", group: "UI/UX & Systems", start: "2025-08", period: "Aug 2025 – Jan 2026" },
  { role: "UI Designer", org: "Tech Enthusiast Day", group: "UI/UX & Systems", start: "2025-07", period: "Jul 2025 – now", current: true },
  { role: "UI Designer", org: "PORSENIGAMA 2025", group: "UI/UX & Systems", start: "2025-03", period: "Mar – Dec 2025" },
  { role: "UI Designer", org: "PIONIR Gadjah Mada 2025", group: "UI/UX & Systems", start: "2025-01", period: "Jan – Dec 2025" },
  { role: "Social Media & Visual Designer", org: "PalPod UGM", group: "Visual & 3D", start: "2024-12", period: "Dec 2024 – now", current: true },
  { role: "3D Designer", org: "Ramadhan di Kampus UGM", group: "Visual & 3D", start: "2024-11", period: "Nov 2024 – Apr 2025" },
  { role: "Head of Communication & Information", org: "KMTEDI SV UGM", group: "Leadership", start: "2024-10", period: "Oct 2024 – now", current: true },
  { role: "UI Designer", org: "Batam Campus Expo", group: "UI/UX & Systems", start: "2024-10", period: "Oct 2024 – Mar 2025" },
];
