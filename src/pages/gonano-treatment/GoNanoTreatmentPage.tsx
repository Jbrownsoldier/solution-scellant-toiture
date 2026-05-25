import { ArrowRight, ShieldCheck, Clock, Leaf, Droplets, CheckCircle2 } from 'lucide-react';
import { useQuoteModal } from '../../context/QuoteContext';
import { ScrollReveal, ScrollRevealItem } from '../../components/ScrollReveal';

export function GoNanoTreatmentPage() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 grid-pulse pointer-events-none opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
          <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-6 block">Our Flagship Solution</span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">
            GoNano <span className="text-secondary">Sealant Treatment</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Patented nanotechnological molecular sealant that restores and protects asphalt shingle roofs — without the cost, waste, or disruption of a full replacement.
          </p>
          <button onClick={openQuoteModal} className="hero-cta-primary btn-magnetic">
            <span>GET A FREE ESTIMATE</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-surface border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-16">
            <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-4 block">The Science</span>
            <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">How GoNano <span className="text-secondary">Works</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Three simple steps to a roof that's protected for 15 years.</p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollRevealItem>
              <div className="service-card group h-full text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-secondary font-headline font-black text-2xl">1</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Inspect</h3>
                <p className="text-sm text-slate-400 leading-relaxed">We assess your roof's condition, identifying areas of wear, granule loss, and vulnerability to determine treatment suitability.</p>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <div className="service-card group h-full text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-secondary font-headline font-black text-2xl">2</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Apply</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Our certified technicians apply the GoNano molecular sealant. Nanoscopic silica particles penetrate shingle layers and bond internally.</p>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <div className="service-card group h-full text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-secondary font-headline font-black text-2xl">3</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Protect</h3>
                <p className="text-sm text-slate-400 leading-relaxed">A permanent hydrophobic shield forms, repelling water and preventing further degradation. Your roof is restored and guaranteed for 15 years.</p>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-16">
            <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">Why Choose <span className="text-secondary">GoNano?</span></h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Droplets, title: 'Save 75%', desc: 'Fraction of the cost of a full roof replacement ($10K–$20K).' },
              { icon: ShieldCheck, title: '15-Year Warranty', desc: 'Permanent molecular bond backed by a written guarantee.' },
              { icon: Clock, title: '< 60 Minutes', desc: 'Applied in under an hour with zero disruption to your day.' },
              { icon: Leaf, title: 'Zero Waste', desc: 'No tear-off, no debris, no landfill — 100% eco-friendly.' },
            ].map((item) => (
              <ScrollRevealItem key={item.title}>
                <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-secondary/30 transition-all">
                  <item.icon className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="text-lg font-headline font-bold text-white uppercase mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            Ready to <span className="text-secondary">Protect Your Roof?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">Schedule a free inspection and get a no-obligation GoNano estimate today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openQuoteModal} className="hero-cta-primary btn-magnetic">
              <span>FREE ESTIMATE</span>
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
