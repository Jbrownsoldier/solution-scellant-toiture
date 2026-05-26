import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CursorGlow } from './components/CursorGlow';
import { QuoteProvider } from './context/QuoteContext';
import { LanguageProvider } from './context/LanguageContext';
const QuoteModal = lazy(() => import('./components/quote/QuoteModal').then(m => ({ default: m.QuoteModal })));
import { ScrollToTop } from './components/ScrollToTop';
import { EntryPopup } from './components/EntryPopup';
import { FacebookWidget } from './components/FacebookWidget';

const HomePage          = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ShingleTreatmentPage = lazy(() => import('./pages/shingle-treatment/ShingleTreatmentPage').then(m => ({ default: m.ShingleTreatmentPage })));
const InspectionPage    = lazy(() => import('./pages/inspection/InspectionPage').then(m => ({ default: m.InspectionPage })));
const ServicesPage      = lazy(() => import('./pages/services/ServicesPage').then(m => ({ default: m.ServicesPage })));
const AreasPage         = lazy(() => import('./pages/areas/AreasPage').then(m => ({ default: m.AreasPage })));
const ReviewsPage       = lazy(() => import('./pages/reviews/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const AboutPage         = lazy(() => import('./pages/about/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage       = lazy(() => import('./pages/contact/ContactPage').then(m => ({ default: m.ContactPage })));

export default function App() {
  return (
    <LanguageProvider>
      <QuoteProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-slate-50 relative pb-[100px] lg:pb-0">
            {/* JSON-LD Local Business SEO Schema */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HomeAndConstructionBusiness",
                "name": "Solution Scellant Toiture",
                "image": "https://solutionscellanttoiture.com/logo.jpg",
                "@id": "https://solutionscellanttoiture.com/#organization",
                "url": "https://solutionscellanttoiture.com",
                                "telephone": "+1-438-392-6208",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Montréal HQ",
                  "addressLocality": "Montréal",
                  "addressRegion": "QC",
                  "postalCode": "H2Y 1C6",
                  "addressCountry": "CA"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 45.5017,
                  "longitude": -73.5673
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                "sameAs": [
                  "https://www.facebook.com/profile.php?id=61590089413439"
                ],
                "areaServed": [
                  {
                    "@type": "AdministrativeArea",
                    "name": "Montréal"
                  },
                  {
                    "@type": "AdministrativeArea",
                    "name": "Rive-Sud"
                  },
                  {
                    "@type": "AdministrativeArea",
                    "name": "Rive-Nord"
                  }
                ],
                "description": "Spécialistes certifiés en traitement scellant protecteur et revitalisation de bardeaux d'asphalte à Montréal. Économisez jusqu'à 80% par rapport au remplacement complet de toiture."
              })}
            </script>

            <CursorGlow />
            <Navigation />
            <Suspense fallback={
              <div style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF' }}>
                <div style={{ width: 36, height: 36, border: '3px solid #0066CC', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/traitement-protecteur" element={<ShingleTreatmentPage />} />
                <Route path="/inspection" element={<InspectionPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/areas" element={<AreasPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Suspense>
            <Footer />
            <MobileBottomBar />
            <QuoteModal />
            <EntryPopup />
            <FacebookWidget />
          </div>
        </BrowserRouter>
      </QuoteProvider>
    </LanguageProvider>
  );
}

