import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { HomeServicesPreview } from '../components/HomeServicesPreview';
import { HiggsfieldExtendedSections } from '../components/HiggsfieldExtendedSections';
import { ShingleVisualizer } from '../components/ShingleVisualizer';
import { HomeReviewsPreview } from '../components/HomeReviewsPreview';
import { SavingsCalculator } from '../components/SavingsCalculator';
import { FAQ } from '../components/FAQ';
import { ContactCTA } from '../components/ContactCTA';

export function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <HomeServicesPreview />
      <HiggsfieldExtendedSections />
      <ShingleVisualizer />
      <HomeReviewsPreview />
      <SavingsCalculator />
      <FAQ />
      <ContactCTA />
    </main>
  );
}
