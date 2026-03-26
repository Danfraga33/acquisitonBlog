import { Header } from "components/header";
import { HeroSection } from "components/hero-section";
import { AboutSection } from "components/about-section";
import { StatsSection } from "components/stats-section";
import { LatestPosts } from "components/latest-posts";
import { ContactSection } from "components/contact-section";
import { Footer } from "components/footer";
import type { Post } from "lib/supabase";

export function Welcome({ posts }: { posts: Post[] }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <LatestPosts posts={posts} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
