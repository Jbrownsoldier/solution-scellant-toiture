import { Clock, ShieldCheck, Navigation } from 'lucide-react';
import { InteractiveMap } from '../../components/areas/InteractiveMap';
import { useQuoteModal } from '../../context/QuoteContext';
import { useTranslation } from '../../context/LanguageContext';

export function AreasPage() {
  const { openQuoteModal } = useQuoteModal();
  const { t } = useTranslation();

  return (
    <main className="pt-24 min-h-screen bg-primary">
      {/* Header Section */}
      <section className="relative overflow-hidden py-24 mb-16 px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,158,143,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-3 py-1 bg-surface border border-white/5 text-slate-400 rounded-full text-xs font-headline font-bold tracking-[0.2em] uppercase mb-4">
            {t('trust.montreal')}
          </span>
          <h1 className="font-headline text-5xl md:text-6xl font-black text-white leading-none tracking-tighter mb-6 uppercase">
            {t('areas_page.title').split(' ')[0]} <span className="text-secondary">{t('areas_page.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('areas_page.desc')}
          </p>
        </div>
      </section>

      {/* Map & Metrics */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Tactical Map Container */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl overflow-hidden relative shadow-lg h-[600px] group/map">
            <InteractiveMap />
            
            {/* Map Decorative Overlays */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <div className="flex flex-col gap-2">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/60 p-2 rounded flex items-center gap-3 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                  <span className="text-[9px] font-sans text-slate-500 font-bold uppercase tracking-widest">Montréal, QC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Zones & Speeds */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:border-secondary/30 transition-all group">
              <div className="w-12 h-12 rounded bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-headline font-bold text-primary uppercase tracking-tight mb-2">{t('areas_page.list_title')}</h3>
              <ul className="space-y-3 mt-4 text-sm text-slate-600">
                <li className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="font-headline font-bold uppercase">Montréal</span>
                    <span className="text-secondary font-sans font-bold">HQ</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="font-headline font-bold uppercase">Rive-Sud / Longueuil</span>
                    <span className="text-slate-500 font-sans font-medium">SUD-1</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                    <span className="font-headline font-bold uppercase">Rive-Nord / Repentigny</span>
                    <span className="text-slate-500 font-sans font-medium">NORD-1</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-8 flex-1 flex flex-col shadow-sm text-center items-center justify-center">
                <Clock className="w-12 h-12 text-secondary mb-4 opacity-80" />
                <h4 className="font-headline font-bold text-slate-700 uppercase tracking-widest text-sm mb-2">{t('faq.q2')}</h4>
                <div className="text-4xl font-headline font-black text-primary mb-2 tracking-tighter"><span className="text-secondary">&lt;</span> 60 MIN</div>
                <p className="text-xs text-slate-500 max-w-[200px]">{t('trust.time_sub')}</p>
            </div>

          </div>
        </div>

        {/* Global Banner */}
        <div className="max-w-7xl mx-auto mt-12 bg-secondary/10 border border-secondary/30 rounded-xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-secondary" />
            <div>
              <h4 className="font-headline font-bold text-white uppercase tracking-widest text-sm mb-1">{t('contact_cta.online_label')}</h4>
              <p className="text-xs text-slate-400">{t('contact_cta.online_desc')}</p>
            </div>
          </div>
          <button 
            onClick={openQuoteModal}
            className="bg-surface border border-secondary text-secondary hover:bg-secondary hover:text-primary transition-colors px-6 py-3 rounded text-xs font-headline font-black uppercase tracking-widest shrink-0"
          >
            {t('contact_cta.cta_btn')}
          </button>
        </div>
      </section>
    </main>
  );
}
