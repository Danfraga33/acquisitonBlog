import { Header } from "components/header";
import { HeroSection } from "components/hero-section";
import { Revolver3D } from "components/revolver-3d";
import { AboutSection } from "components/about-section";
import { StatsSection } from "components/stats-section";
import { LatestPosts } from "components/latest-posts";
import { ContactSection } from "components/contact-section";
import { Footer } from "components/footer";

export function Welcome() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <HeroSection />
        {/* <section id="revolver" className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              What I Write About
            </p>
            <Revolver3D />
          </div>
        </section> */}
        <AboutSection />
        <StatsSection />
        <LatestPosts />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
