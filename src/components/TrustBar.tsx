import { ShieldCheck, BadgeCheck, Clock, Leaf, Home, MapPin } from 'lucide-react';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';
import { useTranslation } from '../context/LanguageContext';

export function TrustBar() {
  const { t } = useTranslation();

  const trustItems = [
    { icon: ShieldCheck,    label: t('trust.rbq'),              microcopy: t('trust.rbq_sub') },
    { icon: BadgeCheck,     label: t('trust.guarantee'),        microcopy: t('trust.guarantee_sub') },
    { icon: Clock,          label: t('trust.time'),             microcopy: t('trust.time_sub') },
    { icon: Leaf,           label: t('trust.waste'),            microcopy: t('trust.waste_sub') },
    { icon: Home,           label: t('trust.experts'),          microcopy: t('trust.experts_sub') },
    { icon: MapPin,         label: t('trust.montreal'),         microcopy: t('trust.montreal_sub') },
  ];

  return (
    <section className="bg-slate-50 border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-10 relative z-10">
        <ScrollReveal stagger className="grid grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-10 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/60">
          {trustItems.map((item, idx) => (
            <ScrollRevealItem key={idx} variant="fade-up">
              <div className="flex flex-col items-center text-center gap-4 px-4 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center hover:bg-secondary/10 hover:border-secondary/30 transition-colors shadow-sm">
                  <item.icon className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-headline font-bold uppercase tracking-widest text-primary text-xs leading-snug mb-1">{item.label}</p>
                  <p className="font-sans text-slate-500 text-[10px] uppercase tracking-wider leading-snug font-semibold">{item.microcopy}</p>
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

