import { FloatingNavbar } from "@/components/ui/floating-navbar";
import { HeroSection } from "@/components/features/hero-section";
import { AboutSection } from "@/components/features/about-section";
import { ProjectsBento } from "@/components/features/projects-bento";
import { NowTerminal } from "@/components/features/now-terminal";
import { TechMarquee } from "@/components/features/tech-marquee";
import { ContactFooter } from "@/components/features/contact-footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-(--bg) text-(--text) transition-colors duration-300 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-500">
      {/* Floating Glassmorphic Navbar */}
      <FloatingNavbar />

      {/* Single-page orchestrator sections */}
      <main id="main-content" className="relative z-10 flex flex-col">
        <HeroSection />
        <AboutSection />
        <ProjectsBento />
        <NowTerminal />
        <TechMarquee />
      </main>

      {/* High-impact contact & footer */}
      <ContactFooter />
    </div>
  );
}
