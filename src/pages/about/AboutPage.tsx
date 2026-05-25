import { Hexagon, CheckCircle2, Award, ArrowRight } from 'lucide-react';

export function AboutPage() {
  return (
    <main className="pt-24 min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-6 lg:px-8 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-10" 
            alt="Cinematic technical architecture grid" 
            src="/hero-abstract-grid.png"
            loading="lazy"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-transparent"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10text-center flex flex-col items-center">
          <Hexagon className="w-16 h-16 text-secondary mb-8 animate-[spin_10s_linear_infinite] opacity-80" />
          <h1 className="font-headline text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-8 uppercase text-center">
            Precision <br/><span className="text-secondary bg-clip-text text-transparent bg-gradient-to-r from-secondary to-yellow-600">Engineering.</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed text-center">
            Next Step Electric was forged to modernize infrastructure. We don't just run wire; we design, calculate, and deploy highly resilient electrical systems for operations where failure is not an option.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="px-6 lg:px-8 py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full aspect-square max-w-[500px]">
              <div className="absolute inset-0 border-2 border-secondary/20 rounded-xl transform rotate-3 scale-105 transition-transform hover:rotate-6"></div>
              <img 
                src="/branded-service-van.png" 
                alt="Next Step Electric branded service van fleet" 
                className="rounded-xl w-full h-full object-cover grayscale mix-blend-luminosity border border-white/10"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-primary border text-white text-xs border-secondary/30 p-2 font-mono rounded">
                SEC-ORIGIN // 2018
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-headline text-3xl font-black text-white mb-6 uppercase tracking-tight">Our Directives</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Founded on the principle that modern infrastructure requires exact mathematical symmetry. The days of disorganized panels and "good enough" wiring are obsolete. We brought clean, architectural logic to the electrical trade.
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Based in Montreal, Quebec, our operational mandate is to provide commercial, industrial, and high-tier residential clients with systems that are robust, scalable, and inherently beautiful in their organization.
            </p>
            
            <ul className="space-y-4 font-headline uppercase tracking-widest text-sm font-bold">
              <li className="flex items-center gap-3 text-white">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                Zero-tolerance for chaotic layouts
              </li>
              <li className="flex items-center gap-3 text-white">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                Calculated load balancing
              </li>
              <li className="flex items-center gap-3 text-white">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                Integration readiness
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership / Authority */}
      <section className="px-6 lg:px-8 py-24 bg-primary relative overflow-hidden border-t border-white/5">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[120%] bg-surface transform -skew-x-12 hidden lg:block border-l border-white/5"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="flex-1 lg:pr-12">
                <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-4 block">System Architect</span>
                <h2 className="font-headline text-4xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tighter">The Leadership</h2>
                <div className="h-1 w-24 bg-secondary mb-8"></div>
                <p className="text-lg text-slate-300 mb-8 italic border-l-4 border-white/10 pl-6 py-2">
                  "Every panel we build, every conduit run we bend, is a testament to the order we bring to chaos. Electricity is raw power; our job is to domesticate it with absolute precision."
                </p>
                <div className="flex items-center gap-6">
                    <div className="bg-surface/50 border border-white/10 rounded-lg p-4 flex-1">
                        <Award className="w-6 h-6 text-secondary mb-2" />
                        <div className="font-headline font-bold text-white uppercase text-xs mb-1">Master Electrician</div>
                        <div className="text-slate-500 text-xs">Certified</div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[400px] shrink-0">
                <div className="bg-surface border border-secondary/30 p-8 rounded-xl shadow-[0_0_30px_rgba(255,184,0,0.05)] relative">
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-secondary/50 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-secondary/50 rounded-bl-xl"></div>

                    <h3 className="font-headline font-bold text-white text-xl mb-4 uppercase tracking-widest border-b border-white/10 pb-4">Core Competencies</h3>
                    <ul className="space-y-4 font-mono text-sm text-slate-400">
                        <li className="flex justify-between items-center group">
                            <span>High-Voltage Switching</span>
                            <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">100%</span>
                        </li>
                        <li className="flex justify-between items-center group">
                            <span>Data Center UPS</span>
                            <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">100%</span>
                        </li>
                        <li className="flex justify-between items-center group">
                            <span>Smart Home Protocols</span>
                            <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">100%</span>
                        </li>
                        <li className="flex justify-between items-center group">
                            <span>Thermal Analysis</span>
                            <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">100%</span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/10 py-16 border-y border-secondary/20">
        <div className="max-w-4xl mx-auto text-center px-6">
            <h3 className="font-headline font-black text-2xl text-white uppercase tracking-widest mb-6">Require Architectural Grade Electrical?</h3>
            <a href="/contact" className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded text-xs font-headline font-black uppercase tracking-[0.2em] shadow-ambient hover:bg-white hover:text-black transition-colors">
                Connect with our team
                <ArrowRight className="w-4 h-4" />
            </a>
        </div>
      </section>

    </main>
  );
}
