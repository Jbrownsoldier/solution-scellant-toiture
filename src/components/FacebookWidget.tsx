import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export function FacebookWidget() {
  const { language } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('fb_widget_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    // Delay visibility slightly to make a smooth entry
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    setTimeout(() => {
      setIsDismissed(true);
      sessionStorage.setItem('fb_widget_dismissed', 'true');
    }, 300);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`
        fixed left-6 z-40
        bottom-20 md:bottom-8
        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'}
      `}
    >
      <a
        href="https://www.facebook.com/profile.php?id=61590089413439"
        target="_blank"
        rel="noopener noreferrer"
        className="
          group flex items-center gap-3
          bg-[#1877F2] text-white
          pl-3.5 pr-5 py-2.5 rounded-full
          shadow-[0_8px_24px_rgba(24,119,242,0.3)]
          hover:shadow-[0_12px_28px_rgba(24,119,242,0.55)]
          hover:scale-[1.04] active:scale-[0.98]
          transition-all duration-300 relative
        "
      >
        {/* Soft background brand pulse */}
        <span className="absolute -inset-1 rounded-full bg-[#1877F2]/45 blur-md opacity-0 group-hover:opacity-100 group-hover:animate-ping duration-1000 -z-10 pointer-events-none"></span>

        {/* Facebook SVG Logo */}
        <div className="bg-white rounded-full p-1.5 flex items-center justify-center shadow-sm">
          <svg 
            className="w-4 h-4 text-[#1877F2] fill-current" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </div>

        {/* Dynamic sliding follow text */}
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono tracking-wider font-bold text-white/70 uppercase leading-none mb-0.5">
            Facebook
          </span>
          <span className="text-xs font-headline font-black uppercase tracking-wide leading-none">
            {language === 'fr' ? 'Suivez-nous !' : 'Follow Us!'}
          </span>
        </div>

        {/* Premium Divider & Dismiss Close Button */}
        <div className="border-l border-white/20 h-5 pl-2 ml-1 flex items-center justify-center">
          <button
            onClick={handleDismiss}
            className="
              text-white/60 hover:text-white
              hover:bg-white/10 rounded-full p-0.5
              transition-colors duration-200
            "
            aria-label="Fermer le widget Facebook"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </a>
    </div>
  );
}
