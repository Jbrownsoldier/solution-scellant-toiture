import { ArrowRight, ShieldCheck, Clock, Leaf, Droplets, AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { useQuoteModal } from '../../context/QuoteContext';
import { ScrollReveal, ScrollRevealItem } from '../../components/ScrollReveal';
import { useTranslation } from '../../context/LanguageContext';

export function ShingleTreatmentPage() {
  const { openQuoteModal } = useQuoteModal();
  const { t } = useTranslation();

  const PROBLEMS = [
    { key: 'dryout', title: t('problems.dryout_title'), desc: t('problems.dryout_desc') },
    { key: 'uv', title: t('problems.uv_title'), desc: t('problems.uv_desc') },
    { key: 'granules', title: t('problems.granules_title'), desc: t('problems.granules_desc') },
    { key: 'leaks', title: t('problems.leaks_title'), desc: t('problems.leaks_desc') },
    { key: 'moss', title: t('problems.moss_title'), desc: t('problems.moss_desc') },
    { key: 'replace', title: t('problems.replace_title'), desc: t('problems.replace_desc') },
  ];

  const BENEFITS = [
    { id: 1, title: t('gonano_page.benefit1_t'), desc: t('gonano_page.benefit1_d'), icon: Droplets },
    { id: 2, title: t('gonano_page.benefit2_t'), desc: t('gonano_page.benefit2_d'), icon: Clock },
    { id: 3, title: t('gonano_page.benefit3_t'), desc: t('gonano_page.benefit3_d'), icon: Shield },
    { id: 4, title: t('gonano_page.benefit4_t'), desc: t('gonano_page.benefit4_d'), icon: Leaf }
  ];

  const OUR_HOW = [
    { key: 'flex', title: t('solutions.flexibility_title'), desc: t('solutions.flexibility_desc') },
    { key: 'hydro', title: t('solutions.hydrophobic_title'), desc: t('solutions.hydrophobic_desc') },
    { key: 'uv_b', title: t('solutions.uv_block_title'), desc: t('solutions.uv_block_desc') },
    { key: 'granule_l', title: t('solutions.lock_granules_title'), desc: t('solutions.lock_granules_desc') },
    { key: 'life', title: t('solutions.extend_life_title'), desc: t('solutions.extend_life_desc') },
    { key: 'save', title: t('solutions.savings_title'), desc: t('solutions.savings_desc') }
  ];

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 grid-pulse pointer-events-none opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
          <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-6 block">
            {t('gonano_page.badge')}
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
            {t('gonano_page.title').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-secondary">
              {t('gonano_page.title').split(' ').slice(-1).join(' ')}
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            {t('gonano_page.desc')}
          </p>
          <button onClick={openQuoteModal} className="hero-cta-primary btn-magnetic mx-auto">
            <span>{t('hero.cta_primary')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* The Problems Section */}
      <section className="py-24 bg-surface border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0E1B2A]/50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <ScrollReveal variant="fade-up" className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[#e93d3d] font-headline uppercase font-black tracking-widest text-sm mb-4 block flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {t('problems.title').split(' ').slice(0, 2).join(' ')}
            </span>
            <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              {t('problems.title')}
            </h2>
            <p className="text-slate-400">{t('problems.desc')}</p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROBLEMS.map((prob) => (
              <ScrollRevealItem key={prob.key}>
                <div className="bg-slate-900/60 border border-white/5 p-8 rounded-xl h-full flex flex-col justify-between hover:border-[#e93d3d]/30 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#e93d3d]/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform" />
                  <div>
                    <span className="text-[#e93d3d] font-headline font-bold text-xs uppercase tracking-widest block mb-4">
                      Danger Area
                    </span>
                    <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4 group-hover:text-[#e93d3d] transition-colors">
                      {prob.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {prob.desc}
                    </p>
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* How Our Sealant Helps */}
      <section className="py-24 bg-primary relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <ScrollReveal variant="fade-up" className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-4 block flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {t('solutions.title').split(' ').slice(0, 2).join(' ')}
            </span>
            <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              {t('solutions.title')}
            </h2>
            <p className="text-slate-400">{t('solutions.desc')}</p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OUR_HOW.map((sol) => (
              <ScrollRevealItem key={sol.key}>
                <div className="bg-surface/50 border border-white/5 p-8 rounded-xl h-full flex flex-col justify-between hover:border-secondary/40 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform" />
                  <div>
                    <span className="text-secondary font-headline font-bold text-xs uppercase tracking-widest block mb-4">
                      Active Defense
                    </span>
                    <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4 group-hover:text-secondary transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Core Technical Benefits */}
      <section className="py-24 bg-surface border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-16">
            <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-4 block">
              Specifications
            </span>
            <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              {t('gonano_page.benefits_title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((item) => (
              <ScrollRevealItem key={item.id}>
                <div className="service-card group h-full text-center hover:border-secondary/30 transition-all">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                    <item.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0E1B2A]/40 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-8 relative z-10">
          <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            {t('contact_cta.title_1')} <span className="text-secondary">{t('contact_cta.title_highlight')}</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">{t('contact_cta.desc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openQuoteModal} className="hero-cta-primary btn-magnetic">
              <span>{t('hero.cta_primary')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a href="tel:+15146136904" className="hero-cta-secondary flex items-center justify-center gap-2">
              <span>(514) 613-6904</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
