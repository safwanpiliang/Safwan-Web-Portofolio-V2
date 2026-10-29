import { MultiplayerCursors } from "@/components/effects/MultiplayerCursors";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/about/About";
import { Articles } from "@/components/sections/articles/Articles";
import { Contact } from "@/components/sections/contact/Contact";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { HeroTransition } from "@/components/sections/hero/HeroTransition";
import { Projects } from "@/components/sections/projects/Projects";
import { Services } from "@/components/sections/services/Services";
import { EditorialBand } from "@/components/sections/work/EditorialBand";

export default function Home() {
  return (
    <main className="page-shell flex min-h-svh flex-col items-center w-full bg-canvas">
      <MultiplayerCursors />
      <Navbar />

      <HeroSection />

      {/* Dotted canvas; sits above the hero so the transition line can overlap it */}
      <div className="canvas-grid w-full relative z-10 flex flex-col items-center min-h-svh">
        <HeroTransition />
        <Services />
        <EditorialBand />
        <Projects />
        <Articles />
        <About />
        <Contact />
        <div className="w-full relative z-10">
          <Footer />
        </div>
      </div>
    </main>
  );
}
