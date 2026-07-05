import { Navbar } from "@/components/shared/navbar";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { NoiseOverlay } from "@/components/shared/noise-overlay";
import { SmoothScrollProvider } from "@/components/shared/smooth-scroll-provider";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustedBySection } from "@/components/landing/trusted-by-section";
import { DemoSection } from "@/components/landing/demo-section";
import { SubtitleShowcaseSection } from "@/components/landing/subtitle-showcase-section";
import { RepurposeSection } from "@/components/landing/repurpose-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";

/**
 * Landing Page — Assembles all sections into the complete marketing page.
 * Each section is independently animated and optimized for scroll performance.
 */

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <NoiseOverlay opacity={0.025} />
      <Navbar />

      <main className="relative">
        <HeroSection />
        <TrustedBySection />
        <DemoSection />
        <SubtitleShowcaseSection />
        <RepurposeSection />
        <FeaturesSection />
        <ComparisonSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
