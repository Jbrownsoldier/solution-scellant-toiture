import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteContext';
import { useTranslation } from '../context/LanguageContext';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openQuoteModal } = useQuoteModal();
  const { language, setLanguage, t } = useTranslation();

  const navLinks = [
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.zones'), path: '/areas' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.reviews'), path: '/reviews' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const handleNavClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const LanguageToggle = () => (
    <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-full p-0.5 backdrop-blur-sm relative overflow-hidden transition-all duration-300">
      <button
        onClick={() => setLanguage('fr')}
        aria-label="Changer la langue en français"
        aria-pressed={language === 'fr'}
        className={`px-2.5 py-1 text-[10px] font-headline font-bold uppercase tracking-wider rounded-full transition-all duration-300 relative z-10 ${
          language === 'fr' 
            ? 'text-primary bg-secondary shadow-[0_2px_8px_rgba(26,158,143,0.3)]' 
            : 'text-slate-400 hover:text-white'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        aria-label="Switch language to English"
        aria-pressed={language === 'en'}
        className={`px-2.5 py-1 text-[10px] font-headline font-bold uppercase tracking-wider rounded-full transition-all duration-300 relative z-10 ${
          language === 'en' 
            ? 'text-primary bg-secondary shadow-[0_2px_8px_rgba(26,158,143,0.3)]' 
            : 'text-slate-400 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'border-b border-white/[0.06] shadow-[0_1px_0_rgba(26,158,143,0.15),0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-transparent'
      }`} style={isScrolled ? { background: 'rgba(14,27,42,0.82)', backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)' } : {}}>
        <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
          
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1 hover:opacity-90 transition-opacity"
            aria-label="Solution Scellant Toiture Home"
          >
            <img
              src="/logo.jpg"
              alt="Solution Scellant Toiture Logo"
              className="h-10 w-auto object-contain"
              loading="eager"
              width="180"
              height="40"
            />
          </Link>

          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`nav-link px-2 py-1 ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href="tel:+15146136904"
                className="px-6 py-2 border border-secondary/30 text-secondary font-headline font-bold uppercase text-xs tracking-widest rounded hover:bg-secondary/10 transition-colors"
              >
                (514) 613-6904
              </a>
              <button 
                onClick={openQuoteModal}
                className="btn-magnetic px-6 py-2 bg-secondary text-primary font-headline font-bold uppercase text-xs tracking-widest rounded shadow-sm"
              >
                {t('nav.cta')}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-secondary transition-colors focus-visible:outline-none focus:ring-2 focus:ring-secondary rounded-lg"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden fixed inset-0 z-40 bg-primary/98 backdrop-blur-md pt-24
          transition-all duration-300 ease-out
          ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <div className="px-6 py-6 flex flex-col gap-6 h-full overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className="text-xl font-headline font-bold uppercase tracking-widest text-slate-300 hover:text-white active:text-secondary transition-colors py-4 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col gap-4 mt-8">
            <a 
              href="tel:+15146136904"
              className="w-full py-4 border border-secondary/30 text-secondary font-headline font-bold uppercase text-sm tracking-widest rounded flex justify-center items-center"
            >
              (514) 613-6904
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full py-4 bg-secondary text-primary font-headline font-bold uppercase text-sm tracking-widest rounded flex justify-center items-center"
            >
              {t('nav.cta')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

