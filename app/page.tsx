import { Footer } from "@/components/portfolio/footer";
import { Header } from "@/components/portfolio/header";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/sections/about-section";
import { ContactSection } from "@/components/portfolio/sections/contact-section";
import { NowSection } from "@/components/portfolio/sections/now-section";
import { ProjectsSection } from "@/components/portfolio/sections/projects-section";
import { SkillsSection } from "@/components/portfolio/sections/skills-section";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <NowSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
