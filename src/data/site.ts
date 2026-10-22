export const SITE_LINKS = {
  instagram: "https://www.instagram.com/safwan.piliang",
  behance: "https://www.behance.net/safwanpiliang",
  /**
   * Direct download of the CV from Google Drive. To change the file, replace the id with the one from the
   * Drive share link (.../file/d/<ID>/view). The file must be shared as "Anyone with the link".
   */
  cv: "https://drive.google.com/uc?export=download&id=1iMM0v3KjinXg9lZdYFGMDpj3lmXj1FGc",
} as const;

export const NAV_TABS = [
  { label: "Home", id: "hero" },
  { label: "My Works", id: "projects" },
  { label: "About me", id: "about" },
] as const;

export interface SocialLink {
  label: string;
  icon: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Safwan Piliang", icon: "/images/icons/linkedin.svg", href: "https://www.linkedin.com/in/safwan-piliang-548b9a325" },
  { label: "safwanpiliang17@gmail.com", icon: "/images/icons/gmail.svg", href: "mailto:safwanpiliang17@gmail.com" },
  { label: "Safwan Piliang", icon: "/images/icons/behance.svg", href: "https://www.behance.net/safwanpiliang" },
  { label: "safwan.piliang", icon: "/images/icons/instagram.svg", href: "https://www.instagram.com/safwan.piliang?igsh=MXZibHh1dzhseWZvYQ==" },
];
