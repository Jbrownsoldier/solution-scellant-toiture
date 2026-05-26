import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useTranslation } from '../context/LanguageContext';

export function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const serviceLinks = [
    { label: t('services_preview.gonano_title'), to: '/traitement-protecteur' },
    { label: t('services_preview.inspection_title'), to: '/inspection' },
    { label: t('services_preview.maintenance_title'), to: '/services' },
  ];

  const exploreLinks = [
    { label: t('nav.services'), to: '/services' },
    { label: t('nav.zones'), to: '/areas' },
    { label: t('nav.reviews'), to: '/reviews' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.contact'), to: '/contact' },
  ];

  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location.pathname, navigate]);

  return (
    <footer className="bg-primary w-full rounded-t-none text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16 w-full max-w-7xl mx-auto">
        <div className="md:col-span-1">
          <Link to="/" aria-label="Solution Scellant Toiture Home">
            {/* White-grounded creative logo container in footer */}
            <div className="inline-block px-3 py-1.5 bg-white rounded-xl mb-4">
              <img
                src="/logo.jpg"
                alt="Solution Scellant Toiture Logo"
                className="h-10 w-auto object-contain"
                loading="lazy"
                width="200"
                height="48"
              />
            </div>
          </Link>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{t('footer.tagline')}</p>
          <div className="flex space-x-4">
            <a href="https://facebook.com/solutionscellanttoiture" className="text-slate-300 hover:text-secondary transition-colors" aria-label="Facebook">
              <SocialIcon name="facebook" />
            </a>
            <a href="https://www.instagram.com/p/DYx8aFqsPRu/" className="text-slate-300 hover:text-secondary transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <SocialIcon name="instagram" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-headline font-bold mb-6 text-xs uppercase tracking-widest">Solutions</h4>
          <ul className="space-y-4">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-slate-300 hover:text-secondary transition-transform duration-200 inline-block hover:translate-x-1 text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-headline font-bold mb-6 text-xs uppercase tracking-widest">{t('footer.links')}</h4>
          <ul className="space-y-4">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-slate-300 hover:text-secondary transition-transform duration-200 inline-block hover:translate-x-1 text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-headline font-bold mb-6 text-xs uppercase tracking-widest">Contact</h4>
          <p className="text-slate-300 text-sm mb-2"><strong>{t('footer.phone')}:</strong> <a href="tel:+14383926208" className="hover:text-secondary transition-colors">(438) 392-6208</a></p>
          <p className="text-slate-300 text-sm mb-6"><strong>{t('footer.hours')}:</strong> {t('footer.hours_val')}</p>
          <p className="text-slate-400 text-xs font-semibold">
            {t('footer.license')} · Spécialiste certifié en protection de toiture
          </p>
        </div>
      </div>

      <div className="px-8 py-8 bg-[#071D33] border-t border-white/10 text-center flex flex-col items-center">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">© {year} Solution Scellant Toiture. {t('footer.rights')}</p>
        <p className="text-slate-450 text-xs">Grand Montréal, Québec, Canada</p>
      </div>
    </footer>
  );
}


function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'facebook':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return null;
  }
}
