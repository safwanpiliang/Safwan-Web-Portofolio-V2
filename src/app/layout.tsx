import type { Metadata } from "next";
import { Inter, Montserrat, Doto, Jaro, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { MotionProvider } from "@/components/layout/MotionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

// Editorial serif for the Insights & Articles "journal".
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jaro = Jaro({
  variable: "--font-jaro",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  // Resolves relative Open Graph image paths (case study covers) to absolute URLs.
  metadataBase: new URL("https://safwan.id"),
  title: "Safwan Piliang - Portfolio",
  description: "Portfolio of Safwan Piliang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${doto.variable} ${jaro.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-inter">
        <MotionProvider>
          <LoadingScreen />
          {/* Page progress, like a file loading bar (CSS scroll timeline, see globals.css) */}
          <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 z-[60] h-0.5 bg-selection" />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
