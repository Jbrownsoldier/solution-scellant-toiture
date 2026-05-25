import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CursorGlow } from './components/CursorGlow';
import { QuoteProvider } from './context/QuoteContext';
const QuoteModal = lazy(() => import('./components/quote/QuoteModal').then(m => ({ default: m.QuoteModal })));
import { ScrollToTop } from './components/ScrollToTop';
import { EntryPopup } from './components/EntryPopup';

const HomePage          = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const GoNanoTreatmentPage = lazy(() => import('./pages/gonano-treatment/GoNanoTreatmentPage').then(m => ({ default: m.GoNanoTreatmentPage })));
const InspectionPage    = lazy(() => import('./pages/inspection/InspectionPage').then(m => ({ default: m.InspectionPage })));
const ServicesPage      = lazy(() => import('./pages/services/ServicesPage').then(m => ({ default: m.ServicesPage })));
const AreasPage         = lazy(() => import('./pages/areas/AreasPage').then(m => ({ default: m.AreasPage })));
const ReviewsPage       = lazy(() => import('./pages/reviews/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const AboutPage         = lazy(() => import('./pages/about/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage       = lazy(() => import('./pages/contact/ContactPage').then(m => ({ default: m.ContactPage })));

export default function App() {
  return (
    <QuoteProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-50 relative pb-[100px] lg:pb-0">
          <CursorGlow />
          <Navigation />
          <Suspense fallback={
            <div style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0E1B2A' }}>
              <div style={{ width: 36, height: 36, border: '3px solid #1A9E8F', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gonano-treatment" element={<GoNanoTreatmentPage />} />
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
        </div>
      </BrowserRouter>
    </QuoteProvider>
  );
}
