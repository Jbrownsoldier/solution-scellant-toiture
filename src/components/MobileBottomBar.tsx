import { Phone, ArrowRight } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteContext';
import { useTranslation } from '../context/LanguageContext';

export function MobileBottomBar() {
  const { openQuoteModal } = useQuoteModal();
  const { t } = useTranslation();
  
  return (
    <div
      className="
        md:hidden
        fixed bottom-0 inset-x-0 z-40
        bg-[#09101A]/95 backdrop-blur-xl
        border-t border-white/10
        px-4 pt-3
        pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]
        shadow-[0_-10px_40px_rgba(0,0,0,0.5)]
      "
    >
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        <a
          href="tel:+15146136904"
          className="
            flex items-center justify-center gap-2
            bg-transparent hover:bg-white/5 active:bg-white/10
            border border-secondary/30
            text-secondary font-headline font-bold uppercase tracking-widest text-xs
            rounded-md py-3.5
            transition-all duration-200
          "
        >
          <Phone className="w-4 h-4 shrink-0" strokeWidth={2} />
          {t('mobile_bar.call')}
        </a>
        <button
          onClick={openQuoteModal}
          className="
            flex items-center justify-center gap-2
            bg-secondary hover:brightness-110 active:scale-95
            text-primary font-headline font-bold uppercase tracking-widest text-xs
            rounded-md py-3.5
            shadow-[0_0_15px_rgba(26,158,143,0.2)]
            transition-all duration-200
          "
          aria-label="Get a free quote"
        >
          {t('mobile_bar.quote')}
          <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

