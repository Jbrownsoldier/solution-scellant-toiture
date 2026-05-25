import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { HomeServicesPreview } from '../components/HomeServicesPreview';
import { HomeReviewsPreview } from '../components/HomeReviewsPreview';
import { FAQ } from '../components/FAQ';
import { ContactCTA } from '../components/ContactCTA';

export function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <HomeServicesPreview />
      <HomeReviewsPreview />
      <FAQ />
      <ContactCTA />
    </main>
  );
}
