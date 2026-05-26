import { Link } from 'react-router-dom';
import { ShieldCheck, Search, Wrench, ArrowRight } from 'lucide-react';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';
import { useTranslation } from '../context/LanguageContext';

export function HomeServicesPreview() {
  const { t } = useTranslation();

  return (
    <section className="px-6 lg:px-8 py-24 bg-primary relative border-t border-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
                <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-4 block">{t('services_preview.solutions')}</span>
                <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">{t('services_preview.precision')} <span className="text-secondary">{t('services_preview.roof')}</span></h2>
                <p className="text-slate-400 text-lg leading-relaxed">{t('services_preview.desc')}</p>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-white hover:text-secondary font-headline font-bold uppercase tracking-widest text-xs transition-colors group">
                {t('services_preview.view_all')} 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </ScrollReveal>

        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollRevealItem>
              <div className="service-card group h-full">
                  <ShieldCheck className="card-icon mb-6 w-10 h-10" />
                  <h3 className="text-xl font-headline font-bold text-primary uppercase tracking-tight mb-4">{t('services_preview.gonano_title')}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{t('services_preview.gonano_desc')}</p>
              </div>
            </ScrollRevealItem>
            
            <ScrollRevealItem>
              <div className="service-card group h-full">
                  <Search className="card-icon mb-6 w-10 h-10" />
                  <h3 className="text-xl font-headline font-bold text-primary uppercase tracking-tight mb-4">{t('services_preview.inspection_title')}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{t('services_preview.inspection_desc')}</p>
              </div>
            </ScrollRevealItem>

            <ScrollRevealItem>
              <div className="service-card group h-full">
                  <Wrench className="card-icon mb-6 w-10 h-10" />
                  <h3 className="text-xl font-headline font-bold text-primary uppercase tracking-tight mb-4">{t('services_preview.maintenance_title')}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{t('services_preview.maintenance_desc')}</p>
              </div>
            </ScrollRevealItem>
        </ScrollReveal>

        <div className="mt-8 text-center md:hidden">
            <Link to="/services" className="inline-flex items-center gap-2 text-white hover:text-secondary font-headline font-bold uppercase tracking-widest text-xs transition-colors">
                {t('services_preview.view_all')} 
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </section>
  );
}

