import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import {
  LazyAboutSection,
  LazySkillsSection,
  LazyProjectsSection,
  LazyTestimonialsSection,
  LazyCertificatesSection,
  LazyContactSection,
} from "@/components/lazy-sections";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <HeroSection />
        <LazyAboutSection />
        <LazySkillsSection />
        <LazyProjectsSection />
        <LazyTestimonialsSection />
        <LazyCertificatesSection />
        <LazyContactSection />
      </main>
      <Footer />
    </>
  );
}
