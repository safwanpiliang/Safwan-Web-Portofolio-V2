export interface ClientLogo {
  alt: string;
  src: string;
  /** Width / height of the logo, used to reserve space before it loads. */
  aspectRatio: string;
}

export const CLIENT_LOGOS_ROW_1: ClientLogo[] = [
  { alt: "Logo UGM", src: "/images/logos/ugm.svg", aspectRatio: "218/62" },
  { alt: "Logo PIONIR", src: "/images/logos/pionir.svg", aspectRatio: "228/62" },
  { alt: "GDGoC", src: "/images/logos/gdgoc.svg", aspectRatio: "149.6/62.9" },
  { alt: "RDK", src: "/images/logos/rdk.svg", aspectRatio: "90/62" },
  { alt: "PSG", src: "/images/logos/psg.svg", aspectRatio: "54/62" },
  { alt: "Palpod", src: "/images/logos/palpod.svg", aspectRatio: "144/62" },
  { alt: "BEM SV", src: "/images/logos/bem-sv.svg", aspectRatio: "1/1" },
  { alt: "Permadani", src: "/images/logos/permadani.svg", aspectRatio: "65/62" },
  { alt: "KMID", src: "/images/logos/kmid.svg", aspectRatio: "120/62" },
];

export const CLIENT_LOGOS_ROW_2: ClientLogo[] = [
  { alt: "KMTEDI", src: "/images/logos/kmtedi.svg", aspectRatio: "61/62" },
  { alt: "APECX", src: "/images/logos/apecx.svg", aspectRatio: "66.5/62" },
  { alt: "TGES", src: "/images/logos/tges.svg", aspectRatio: "47/62" },
  { alt: "SkyBase", src: "/images/logos/skybase.svg", aspectRatio: "252/62" },
  { alt: "TED", src: "/images/logos/ted.svg", aspectRatio: "237/62" },
  { alt: "Liga TRPL", src: "/images/logos/liga-trpl.svg", aspectRatio: "90/62" },
  { alt: "Vocentic", src: "/images/logos/vocentic.svg", aspectRatio: "64/62" },
  { alt: "Assets", src: "/images/logos/assets.svg", aspectRatio: "221/52" },
];
