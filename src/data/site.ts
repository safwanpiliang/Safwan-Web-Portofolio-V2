export const SITE_LINKS = {
  instagram: "https://www.instagram.com/safwan.piliang",
  behance: "https://www.behance.net/safwanpiliang",
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
