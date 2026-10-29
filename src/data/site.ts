export const SITE_LINKS = {
  behance: "https://www.behance.net/safwanpiliang",
  /**
   * Direct download of the CV from Google Drive. To change the file, replace the id with the one from the
   * Drive share link (.../file/d/<ID>/view). The file must be shared as "Anyone with the link".
   */
  cv: "https://drive.google.com/uc?export=download&id=1iMM0v3KjinXg9lZdYFGMDpj3lmXj1FGc",
  email: "safwanpiliang17@gmail.com",
} as const;

/** Availability shown in About and Contact. Update when the internship search changes. */
export const STATUS = "Open for a UI/UX internship · from Dec 2026";


export const NAV_TABS = [
  { label: "Home", id: "hero" },
  { label: "My Works", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "About me", id: "about" },
] as const;

export interface SocialLink {
  /** Platform name, used as the icon link's accessible label. */
  label: string;
  icon: string;
  href: string;
}

/** Icon links in the Contact section; email has its own button (SITE_LINKS.email). */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", icon: "/images/icons/linkedin.svg", href: "https://www.linkedin.com/in/safwan-piliang-548b9a325" },
  { label: "Behance", icon: "/images/icons/behance.svg", href: "https://www.behance.net/safwanpiliang" },
  { label: "Medium", icon: "/images/icons/medium.svg", href: "https://safwanpiliang.medium.com" },
  { label: "Instagram", icon: "/images/icons/instagram.svg", href: "https://www.instagram.com/safwan.piliang?igsh=MXZibHh1dzhseWZvYQ==" },
];
