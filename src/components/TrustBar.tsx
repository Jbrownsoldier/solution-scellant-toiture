import { ShieldCheck, BadgeCheck, Clock, Leaf, Home, MapPin } from 'lucide-react';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';

const trustItems = [
  { icon: ShieldCheck,    label: 'RBQ Licensed',              microcopy: 'Québec Certified' },
  { icon: BadgeCheck,     label: '15-Year Guarantee',          microcopy: 'GoNano Warranty' },
  { icon: Clock,          label: '< 60 Min Application',       microcopy: 'Rapid Treatment' },
  { icon: Leaf,           label: 'Zero Construction Waste',    microcopy: 'Eco-Friendly' },
  { icon: Home,           label: 'Asphalt Shingle Experts',    microcopy: 'All Roof Types' },
  { icon: MapPin,         label: 'Grand Montréal',             microcopy: 'Local Technicians' },
];

export function TrustBar() {
  return (
    <section className="bg-[#091420] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-10 relative z-10">
        <ScrollReveal stagger className="grid grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-10 lg:gap-8 divide-x divide-white/5">
          {trustItems.map((item) => (
            <ScrollRevealItem key={item.label} variant="fade-up">
              <div className="flex flex-col items-center text-center gap-4 px-4 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-lg bg-surface border border-white/10 flex items-center justify-center hover:bg-secondary/10 hover:border-secondary/30 transition-colors shadow-ambient">
                  <item.icon className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-headline font-bold uppercase tracking-widest text-[#E2E8F0] text-xs leading-snug mb-1">{item.label}</p>
                  <p className="font-mono text-slate-500 text-[10px] uppercase tracking-widest leading-snug">[{item.microcopy}]</p>
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
