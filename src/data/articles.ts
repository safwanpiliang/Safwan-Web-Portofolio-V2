export interface Article {
  id: string;
  title: string;
  readTime: string;
  image: string;
  link: string;
}

export const ARTICLES: Article[] = [
  {
    id: "porsenigama-case-study",
    title: "Taming an 11 Color Palette & Shaping the Hype: A UI Case Study on PORSENIGAMA 2025",
    readTime: "6 min read",
    image: "/images/articles/porsenigama.webp",
    link: "https://safwanpiliang.medium.com/taming-an-11-color-branding-guide-a-ui-case-study-on-porsenigama-2025-1bc85e6a0fd2?sharedUserId=safwanpiliang",
  },
  {
    id: "pionir-case-study",
    title: "Behind the Interface: Crafting a “Digital Welcome” for UGM’s 2025 Freshmen",
    readTime: "5 min read",
    image: "/images/projects/pionir.webp",
    link: "https://safwanpiliang.medium.com/behind-the-interface-crafting-a-digital-welcome-for-ugms-2025-freshmen-347abe67fde9?sharedUserId=safwanpiliang",
  },
];
