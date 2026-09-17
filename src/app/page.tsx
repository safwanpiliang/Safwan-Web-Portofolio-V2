import { MultiplayerCursors } from "@/components/effects/MultiplayerCursors";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/about/About";
import { Articles } from "@/components/sections/articles/Articles";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { HeroTransition } from "@/components/sections/hero/HeroTransition";
import { Projects } from "@/components/sections/projects/Projects";

export default function Home() {
  return (
    <main className="page-shell flex min-h-screen flex-col items-center w-full bg-slate-100">
      <MultiplayerCursors />
      <Navbar />

      <HeroSection />

      {/* Dotted background; sits above the hero so the transition line can overlap it */}
      <div className="w-full relative z-10 flex flex-col items-center min-h-screen bg-slate-100 bg-[radial-gradient(var(--color-slate-300)_1px,transparent_1px)] [background-size:24px_24px]">
        <HeroTransition />
        <Projects />
        <Articles />
        <About />
        <div className="w-full relative z-10">
          <Footer />
        </div>
      </div>
    </main>
  );
}
