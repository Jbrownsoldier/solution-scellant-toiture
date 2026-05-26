import { ArrowRight, Search, ClipboardCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useQuoteModal } from '../../context/QuoteContext';
import { ScrollReveal, ScrollRevealItem } from '../../components/ScrollReveal';
import { useTranslation } from '../../context/LanguageContext';

export function InspectionPage() {
  const { openQuoteModal } = useQuoteModal();
  const { t } = useTranslation();

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 grid-pulse pointer-events-none opacity-20" />
        <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
          <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-6 block">{t('inspection_page.badge')}</span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">
            {t('inspection_page.title').split(' ')[0]} <span className="text-secondary">{t('inspection_page.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            {t('inspection_page.desc')}
          </p>
          <button onClick={openQuoteModal} className="hero-cta-primary btn-magnetic">
            <span>{t('hero.cta_primary')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-24 bg-surface border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-16">
            <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">{t('inspection_page.steps_title')}</h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollRevealItem>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-secondary/30 transition-all">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-headline font-bold text-base uppercase tracking-wide mb-2">{t('inspection_page.step1_t')}</h4>
                  <p className="text-sm text-slate-450 leading-relaxed">{t('inspection_page.step1_d')}</p>
                </div>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-secondary/30 transition-all">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-headline font-bold text-base uppercase tracking-wide mb-2">{t('inspection_page.step2_t')}</h4>
                  <p className="text-sm text-slate-450 leading-relaxed">{t('inspection_page.step2_d')}</p>
                </div>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-secondary/30 transition-all">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-headline font-bold text-base uppercase tracking-wide mb-2">{t('inspection_page.step3_t')}</h4>
                  <p className="text-sm text-slate-450 leading-relaxed">{t('inspection_page.step3_d')}</p>
                </div>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-secondary/30 transition-all">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-headline font-bold text-base uppercase tracking-wide mb-2">{t('inspection_page.step4_t')}</h4>
                  <p className="text-sm text-slate-450 leading-relaxed">{t('inspection_page.step4_d')}</p>
                </div>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-16">
            <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">Inspection <span className="text-secondary">Process</span></h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollRevealItem>
              <div className="service-card group h-full text-center">
                <Search className="card-icon mb-6 w-10 h-10 mx-auto" />
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Diagnostic</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t('inspection_page.step1_d')}</p>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <div className="service-card group h-full text-center">
                <ClipboardCheck className="card-icon mb-6 w-10 h-10 mx-auto" />
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Thermique</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t('inspection_page.step2_d')}</p>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <div className="service-card group h-full text-center">
                <FileText className="card-icon mb-6 w-10 h-10 mx-auto" />
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Rapport</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t('inspection_page.step4_d')}</p>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            {t('contact_cta.title_1')} <span className="text-secondary">{t('contact_cta.title_highlight')}</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">{t('contact_cta.desc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openQuoteModal} className="hero-cta-primary btn-magnetic">
              <span>{t('hero.cta_primary')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a href="tel:+15146136904" className="hero-cta-secondary">
              <span>(514) 613-6904</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

