import { PROJECTS, type Project } from "./projects";

/**
 * Case study pages (/work/[slug]); project grid cards link here when a study exists.
 * Cover image and Behance/Medium/live links come from the matching entry in projects.ts.
 * Facts follow Safwan's own project overviews; do not add claims that are not in them.
 */
export interface CaseStudy {
  slug: string;
  /** id in PROJECTS (cover image and links). */
  projectId: string;
  title: string;
  tagline: string;
  role: string;
  period: string;
  team?: string;
  tools: string[];
  challenge: string;
  decisions: string[];
  outcome?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "pionir",
    projectId: "pionir",
    title: "PIONIR Gadjah Mada 2025",
    tagline: "A digital welcome for UGM's 2025 freshmen.",
    role: "UI Designer & 3D Modeler",
    period: "2025",
    team: "UX research, wireframes and information architecture by teammates",
    tools: ["Figma", "Blender", "Illustrator"],
    challenge:
      "PIONIR is UGM's official orientation program. Its website had to turn a very colorful brand guide into a calm, orderly interface, and make thousands of new students feel welcome before they ever reach campus: a digital front door for events, schedules, announcements and tasks.",
    decisions: [
      "A 3D render of UGM's Balairung building anchors the hero.",
      "Green is the landing page's anchor color (growth, UGM's environment). Every color pair was checked for contrast, including color-vision deficiency.",
      "A modular card grid, with every component and 3D visual scaled so mobile stays as complete as desktop.",
      "Vector assets exported from Illustrator for the build.",
    ],
    outcome: "Good UI isn't about adding elements, it's about deciding what to leave out.",
  },
  {
    slug: "porsenigama",
    projectId: "porsenigama",
    title: "PORSENIGAMA 2025",
    tagline: "Translating energy into interface for UGM's largest sports & arts festival.",
    role: "UI Designer",
    period: "2025",
    tools: ["Figma"],
    challenge:
      "The festival's brand guide came with 11 bright colors. Used freely, the interface would turn noisy and hard to read, while the site still had to carry scores and brackets for many competitions.",
    decisions: [
      "Grid and white space first, settled at the wireframe stage.",
      "A modified 60-30-10 rule: white 60%, purple and blue 30%, yellow and pink as 10% accents. The other seven colors live only on the illustrated competition cards.",
      "A leaderboard for 20 faculties with white and pale-yellow zebra rows; brand color is reserved for ranks 1 to 3.",
      "Sharp-cornered buttons and cards to feel competitive; multi-sport scores and tournament brackets adapted for mobile.",
    ],
  },
  {
    slug: "skybase",
    projectId: "skybase",
    title: "SkyBase",
    tagline: "Aviation inventory management, from apron to warehouse.",
    role: "System Analyst & UX Designer",
    period: "Aug 2025 – Jan 2026",
    tools: ["Figma"],
    challenge:
      "A conceptual B2B platform that digitizes inspections of Aircraft Safety Equipment and flight documents. The hard part was the logic between three roles: Supervisor (flight schedules), Ground Crew (validation on the apron) and Warehouse Manager (item requests).",
    decisions: [
      "Requirements and user flows mapped so one role's action updates the others: an expired item reported on the apron updates warehouse inventory right away.",
      "High contrast so screens stay readable in bright outdoor conditions.",
      "Role-based navigation, interactive data tables and quick-action buttons.",
      "Supervisor dashboard, Ground Crew validation, synced warehouse inventory, and account management for Ground Crew and Warehouse.",
    ],
  },
  {
    slug: "batam-campus-expo",
    projectId: "batam-campus-expo",
    title: "Batam Campus Expo",
    tagline: "Gamifying the college hunt with pixel art.",
    role: "UI Designer",
    period: "Oct 2024 – Mar 2025",
    tools: ["Figma"],
    challenge:
      "Development had to start six months before the event. The \"Pixel Art\" theme was set, but there was no brand guide or assets yet, so the visual identity was built from scratch. It was my first UI project, and I worked much like an art director.",
    decisions: [
      "Visual hierarchy, navigation and custom 8-bit assets designed from zero.",
      "A countdown in the hero and a \"Top Leaderboard\" where high-school students pick their dream campus.",
    ],
    outcome: "Built in under a month and used by more than 1,000 registrants.",
  },
];

export const projectFor = (study: CaseStudy): Project | undefined =>
  PROJECTS.find((p) => p.id === study.projectId);

/** Case study page for a project grid card, if one is published. */
export const caseStudyHref = (projectId: string) => {
  const study = CASE_STUDIES.find((c) => c.projectId === projectId);
  return study ? `/work/${study.slug}` : undefined;
};
