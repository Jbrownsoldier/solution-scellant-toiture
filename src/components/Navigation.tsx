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
    <div className={`flex items-center rounded-full p-0.5 backdrop-blur-sm relative overflow-hidden transition-all duration-500 ${
      isScrolled 
        ? 'bg-slate-100 border border-slate-200/60' 
        : 'bg-white/10 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
    }`}>
      <button
        onClick={() => setLanguage('fr')}
        aria-label="Changer la langue en français"
        aria-pressed={language === 'fr'}
        className={`px-2.5 py-1 text-[10px] font-headline font-bold uppercase tracking-wider rounded-full transition-all duration-300 relative z-10 ${
          language === 'fr' 
            ? 'text-white bg-secondary shadow-[0_2px_8px_rgba(0,102,204,0.25)]' 
            : isScrolled
              ? 'text-slate-500 hover:text-slate-800'
              : 'text-white/60 hover:text-white'
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
            ? 'text-white bg-secondary shadow-[0_2px_8px_rgba(0,102,204,0.25)]' 
            : isScrolled
              ? 'text-slate-500 hover:text-slate-800'
              : 'text-white/60 hover:text-white'
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
          ? 'border-b border-slate-200/50 shadow-sm'
          : 'bg-transparent border-transparent'
      }`} style={isScrolled ? { background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)' } : {}}>
        <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center relative group/logo transition-transform duration-300 hover:scale-[1.03]"
            aria-label="Solution Scellant Toiture Home"
          >
            {/* Soft background blue glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-blue-500 rounded-xl blur-md opacity-20 group-hover/logo:opacity-35 transition-opacity duration-300 pointer-events-none"></div>
            {/* Premium glass-like rounded-xl container */}
            <div className="relative px-4 py-2 bg-white/95 rounded-xl border border-slate-200/50 shadow-sm flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="Solution Scellant Toiture Logo"
                className="h-16 md:h-20 w-auto object-contain"
                loading="eager"
                width="320"
                height="76"
              />
            </div>
          </Link>

          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`nav-link px-2 py-1 transition-colors duration-300 ${
                    isActive 
                      ? 'active text-secondary' 
                      : isScrolled
                        ? 'text-[#1F2421] hover:text-secondary'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href="tel:+14383926208"
                className={`px-6 py-2 border font-headline font-bold uppercase text-xs tracking-widest rounded transition-all duration-300 ${
                  isScrolled
                    ? 'border-secondary/30 text-secondary hover:bg-secondary hover:text-white'
                    : 'border-white/30 text-white hover:bg-white hover:text-primary'
                }`}
              >
                (438) 392-6208
              </a>
              <button 
                onClick={openQuoteModal}
                className="btn-magnetic px-6 py-2 bg-secondary text-white font-headline font-bold uppercase text-xs tracking-widest rounded shadow-sm"
              >
                {t('nav.cta')}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors focus-visible:outline-none focus:ring-2 focus:ring-secondary rounded-lg ${
                isMobileMenuOpen 
                  ? 'text-[#1F2421]' 
                  : isScrolled 
                    ? 'text-[#1F2421]' 
                    : 'text-white'
              } hover:text-secondary`}
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
          md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24
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
                className="text-xl font-headline font-bold uppercase tracking-widest text-secondary hover:text-primary active:text-secondary transition-colors py-4 border-b border-slate-200/60"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 mb-4">
              <span className="text-slate-500 font-headline font-bold uppercase text-xs tracking-wider">
                {language === 'fr' ? 'Changer de langue' : 'Switch Language'}
              </span>
              <LanguageToggle />
            </div>
            <a 
              href="tel:+14383926208"
              className="w-full py-4 border border-secondary/30 text-secondary font-headline font-bold uppercase text-sm tracking-widest rounded flex justify-center items-center hover:bg-secondary hover:text-white transition-all duration-300"
            >
              (438) 392-6208
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full py-4 bg-secondary text-white font-headline font-bold uppercase text-sm tracking-widest rounded flex justify-center items-center hover:bg-secondary/90 transition-colors"
            >
              {t('nav.cta')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

