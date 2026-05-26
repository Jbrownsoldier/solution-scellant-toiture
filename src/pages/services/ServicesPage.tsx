import { ArrowRight, ShieldCheck, Search, Wrench, Leaf, ShieldAlert } from 'lucide-react';
import { useQuoteModal } from '../../context/QuoteContext';
import { ScrollReveal, ScrollRevealItem } from '../../components/ScrollReveal';
import { useTranslation } from '../../context/LanguageContext';
import { SavingsCalculator } from '../../components/SavingsCalculator';

export function ServicesPage() {
  const { openQuoteModal } = useQuoteModal();
  const { t } = useTranslation();

  return (
    <main className="pt-24 min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/30 text-secondary rounded-full text-xs font-headline font-bold tracking-[0.2em] uppercase mb-6">
              {t('services_preview.solutions')}
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-8 uppercase">
              {t('services_page.title').split(' ')[0]} <br/>
              <span className="text-secondary">{t('services_page.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed">
              {t('services_page.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Protective Treatment Section */}
      <section className="px-6 lg:px-8 py-24 bg-primary relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative group flex justify-center">
            <div className="absolute -inset-4 bg-secondary/10 rounded-xl blur-2xl group-hover:bg-secondary/20 transition-all duration-500"></div>
            <div className="w-full h-[350px] bg-slate-900 rounded-xl border border-white/10 flex items-center justify-center p-8">
              <ShieldCheck className="w-32 h-32 text-secondary opacity-30 animate-pulse" />
            </div>
            <div className="absolute top-8 right-8 bg-surface border border-secondary/30 text-secondary font-headline font-black p-4 rounded-lg text-4xl shadow-ambient">01</div>
          </div>
          <div className="lg:col-span-6 flex flex-col items-start lg:pl-12">
            <h2 className="font-headline text-4xl font-bold text-white mb-6 uppercase tracking-tight">{t('services_preview.gonano_title')}</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {t('services_preview.gonano_desc')}
            </p>
            <button onClick={openQuoteModal} className="bg-secondary text-primary px-8 py-3 rounded text-xs font-headline font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(26,158,143,0.2)]">
              {t('hero.cta_primary')}
            </button>
          </div>
        </div>
      </section>

      {/* Inspection & Maintenance Section */}
      <section className="px-6 lg:px-8 py-24 bg-[#0A0F1A] border-y border-white/5 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 relative z-10">
            <div className="max-w-xl">
              <h2 className="font-headline text-4xl lg:text-5xl font-black text-white mb-4 uppercase tracking-tighter">{t('services_preview.precision')} {t('services_preview.roof')}</h2>
              <p className="text-slate-400 text-lg">{t('services_preview.desc')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="bg-surface/80 border border-white/5 p-8 rounded-xl hover:bg-surface hover:border-secondary/30 transition-colors group">
              <Search className="text-slate-500 group-hover:text-secondary mb-6 w-10 h-10 transition-colors" />
              <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">{t('services_preview.inspection_title')}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{t('services_preview.inspection_desc')}</p>
              <a href="/inspection" className="text-secondary inline-flex items-center gap-2 hover:underline text-xs font-bold font-headline uppercase tracking-wider">
                En savoir plus <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-surface/80 border border-white/5 p-8 rounded-xl hover:bg-surface hover:border-secondary/30 transition-colors group">
              <Wrench className="text-slate-500 group-hover:text-secondary mb-6 w-10 h-10 transition-colors" />
              <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">{t('services_preview.maintenance_title')}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{t('services_preview.maintenance_desc')}</p>
              <button onClick={openQuoteModal} className="text-secondary inline-flex items-center gap-2 hover:underline text-xs font-bold font-headline uppercase tracking-wider">
                {t('hero.cta_primary')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator Section */}
      <SavingsCalculator />

      {/* CTA */}
      <section className="py-20 bg-surface border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            {t('contact_cta.title_1')} <span className="text-secondary">{t('contact_cta.title_highlight')}</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">{t('contact_cta.desc')}</p>
          <button onClick={openQuoteModal} className="hero-cta-primary btn-magnetic">
            <span>{t('hero.cta_primary')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
}
