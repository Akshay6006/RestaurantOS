import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import DashboardPreview from "@/components/landing/DashboardPreview";
import AISection from "@/components/landing/AISection";
import TechStack from "@/components/landing/TechStack";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <DashboardPreview />
      <AISection />
      <TechStack />
      <CTA />
      <Footer />
    </main>
  );
}