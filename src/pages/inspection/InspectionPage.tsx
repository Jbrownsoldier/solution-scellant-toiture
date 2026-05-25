import { ArrowRight, Search, ClipboardCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useQuoteModal } from '../../context/QuoteContext';
import { ScrollReveal, ScrollRevealItem } from '../../components/ScrollReveal';

export function InspectionPage() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 grid-pulse pointer-events-none opacity-20" />
        <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
          <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-6 block">Diagnostic Service</span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">
            Roof <span className="text-secondary">Inspection</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            A comprehensive, no-obligation assessment of your roof's condition. We identify problems early so you can make informed decisions — before small issues become expensive repairs.
          </p>
          <button onClick={openQuoteModal} className="hero-cta-primary btn-magnetic">
            <span>BOOK FREE INSPECTION</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-24 bg-surface border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-16">
            <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">What We <span className="text-secondary">Inspect</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Our certified technicians check every critical element of your roofing system.</p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Shingle condition & granule loss',
              'Flashing & sealant integrity',
              'Ventilation & soffit airflow',
              'Gutter & drainage systems',
              'Signs of moisture & water damage',
              'Structural sagging or warping',
              'Ice dam vulnerability',
              'Overall roof age assessment',
            ].map((item) => (
              <ScrollRevealItem key={item}>
                <div className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-secondary/30 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-white font-headline font-bold text-sm uppercase tracking-wide">{item}</span>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-16">
            <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">The <span className="text-secondary">Process</span></h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollRevealItem>
              <div className="service-card group h-full text-center">
                <Search className="card-icon mb-6 w-10 h-10 mx-auto" />
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">On-Site Assessment</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Our technician visits your property and performs a detailed visual and structural inspection of your entire roofing system.</p>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <div className="service-card group h-full text-center">
                <ClipboardCheck className="card-icon mb-6 w-10 h-10 mx-auto" />
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Detailed Report</h3>
                <p className="text-sm text-slate-400 leading-relaxed">You receive a clear, documented report outlining findings, risk areas, and recommended next steps — with photos.</p>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <div className="service-card group h-full text-center">
                <FileText className="card-icon mb-6 w-10 h-10 mx-auto" />
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Transparent Estimate</h3>
                <p className="text-sm text-slate-400 leading-relaxed">If treatment is recommended, we provide a no-obligation GoNano estimate — typically saving you up to 75% vs. replacement.</p>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            Book Your <span className="text-secondary">Free Inspection</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">No commitment. No pressure. Just honest answers about the state of your roof.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openQuoteModal} className="hero-cta-primary btn-magnetic">
              <span>SCHEDULE NOW</span>
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
