import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { RoomCardsSection } from "@/components/landing/RoomCardsSection";
import { CatchphraseSection } from "@/components/landing/CatchphraseSection";
import { AmenitiesSection } from "@/components/landing/AmenitiesSection";
import {
  KeyVisualSection,
  CommunitySection,
  FullWidthCatchphraseSection,
  HolidaySection,
} from "@/components/landing/CommunitySection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-white">
      <Navbar />
      <main id="home">
        <HeroSection />
        <RoomCardsSection />
        <CatchphraseSection />
        <AmenitiesSection />
        <KeyVisualSection />
        <ReviewsSection />
        <CommunitySection />
        <FullWidthCatchphraseSection />
        <HolidaySection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
