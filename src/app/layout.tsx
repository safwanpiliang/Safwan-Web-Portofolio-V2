import type { Metadata } from "next";
import { Inter, Montserrat, Doto, Jaro } from "next/font/google";
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
      className={`${inter.variable} ${montserrat.variable} ${doto.variable} ${jaro.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-inter">
        <MotionProvider>
          <LoadingScreen />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
