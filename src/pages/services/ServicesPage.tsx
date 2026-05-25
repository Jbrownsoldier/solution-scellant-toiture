import { Factory, Zap, ShieldCheck, Cpu, HardDrive, Lightbulb } from 'lucide-react';

export function ServicesPage() {
  return (
    <main className="pt-24 min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-20" 
            alt="Cinematic abstract electrical grid" 
            src="/hero-abstract-grid.png"
            loading="lazy"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/30 text-secondary rounded-full text-xs font-headline font-bold tracking-[0.2em] uppercase mb-6">
              <Zap className="w-3 h-3 animate-pulse" />
              Symmetric_Electric
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-8 uppercase">
              PRECISION <br/><span className="text-secondary">INFRASTRUCTURE.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed">
              Engineering the invisible conduits that power your future. From high-voltage commercial grids to sophisticated smart home ecosystems, we deliver absolute reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Industrial / Commercial Systems */}
      <section className="px-6 lg:px-8 py-24 bg-primary relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-4 bg-secondary/10 rounded-xl blur-2xl group-hover:bg-secondary/20 transition-all duration-500"></div>
            <img 
              className="relative rounded-xl w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 border border-white/10 transition-all duration-700" 
              alt="High tech industrial electrical system" 
              src="/service-industrial.png"
              loading="lazy"
            />
            <div className="absolute top-8 right-8 bg-surface border border-secondary/30 text-secondary font-headline font-black p-4 rounded-lg text-4xl shadow-ambient">01</div>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start lg:pl-12">
            <h2 className="font-headline text-4xl font-bold text-white mb-6 uppercase tracking-tight">Commercial & Industrial</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              High-capacity electrical architecture designed for heavy manufacturing, retail processing, and high-rise developments. We provide robust solutions that minimize downtime and maximize throughput.
            </p>
            <ul className="space-y-4 mb-10 w-full">
              <li className="flex items-center gap-4 p-4 bg-surface/50 border border-white/5 rounded-lg hover:border-secondary/30 hover:bg-surface transition-colors group">
                <Factory className="text-slate-500 group-hover:text-secondary transition-colors w-6 h-6" />
                <span className="font-headline font-bold tracking-wide uppercase text-sm text-slate-300 group-hover:text-white">Substation Engineering</span>
              </li>
              <li className="flex items-center gap-4 p-4 bg-surface/50 border border-white/5 rounded-lg hover:border-secondary/30 hover:bg-surface transition-colors group">
                <HardDrive className="text-slate-500 group-hover:text-secondary transition-colors w-6 h-6" />
                <span className="font-headline font-bold tracking-wide uppercase text-sm text-slate-300 group-hover:text-white">Server & Data Center UPS</span>
              </li>
              <li className="flex items-center gap-4 p-4 bg-surface/50 border border-white/5 rounded-lg hover:border-secondary/30 hover:bg-surface transition-colors group">
                <ShieldCheck className="text-slate-500 group-hover:text-secondary transition-colors w-6 h-6" />
                <span className="font-headline font-bold tracking-wide uppercase text-sm text-slate-300 group-hover:text-white">Compliance & Safety Audits</span>
              </li>
            </ul>
            <a href="#contact-form" className="bg-secondary text-primary px-8 py-3 rounded text-xs font-headline font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,184,0,0.2)]">
              Initiate Commercial Protocol
            </a>
          </div>
        </div>
      </section>

      {/* Smart Home Ecosystems */}
      <section className="px-6 lg:px-8 py-24 bg-[#0A0F1A] border-y border-white/5 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 relative z-10">
            <div className="max-w-xl">
              <h2 className="font-headline text-4xl lg:text-5xl font-black text-white mb-4 uppercase tracking-tighter">Smart Ecosystems</h2>
              <p className="text-slate-400 text-lg">The next evolution of residential living. Integrated automation for lighting, climate, security, and entertainment, programmed seamlessly into your home's neural network.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <div className="text-secondary font-headline font-bold tracking-[0.2em] uppercase text-xs">Residential Core</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-surface/80 border border-white/5 p-8 rounded-xl hover:bg-surface hover:border-secondary/30 transition-colors group">
              <Cpu className="text-slate-500 group-hover:text-secondary mb-6 w-10 h-10 transition-colors" />
              <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Centralized Hubs</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Unified control panels that manage every aspect of the modern residence with one-touch precision.</p>
            </div>
            <div className="bg-surface/80 border border-white/5 p-8 rounded-xl hover:bg-surface hover:border-secondary/30 transition-colors group">
              <ShieldCheck className="text-slate-500 group-hover:text-secondary mb-6 w-10 h-10 transition-colors" />
              <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Biometric Security</h3>
              <p className="text-sm text-slate-400 leading-relaxed">AI-enhanced surveillance and entrance systems integrated directly into your home's energy grid.</p>
            </div>
            <div className="bg-surface/80 border border-white/5 p-8 rounded-xl hover:bg-surface hover:border-secondary/30 transition-colors group">
              <Lightbulb className="text-slate-500 group-hover:text-secondary mb-6 w-10 h-10 transition-colors" />
              <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-4">Adaptive Lighting</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Circadian lighting solutions that evolve throughout the day to match your biological rhythm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Maintenance */}
      <section className="px-6 lg:px-8 py-24 bg-primary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <img 
              className="rounded-xl w-full aspect-square object-cover grayscale opacity-60 border border-white/10" 
              alt="Professional engineer inspecting circuit architecture" 
              src="/service-maintenance.png"
              loading="lazy"
            />
            <div className="absolute -bottom-8 -right-8 bg-secondary p-12 rounded-xl hidden md:flex flex-col items-center justify-center shadow-ambient border border-secondary/50">
              <span className="block text-primary font-headline font-black text-6xl leading-none mb-1">24/7</span>
              <span className="text-primary font-headline font-bold uppercase tracking-widest text-xs">Response Unit</span>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="font-headline text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Technical Maintenance</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Precision doesn't end at installation. Our maintenance programs use thermal imaging and predictive analytics to solve failures before they occur.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <span className="text-secondary font-headline font-black text-xl group-hover:scale-110 transition-transform">/</span>
                <div>
                  <h4 className="text-white font-headline font-bold uppercase text-sm mb-2 tracking-widest">Predictive Monitoring</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">IoT sensors track heat and load variations in real-time to alert us of incoming grid instability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <span className="text-secondary font-headline font-black text-xl group-hover:scale-110 transition-transform">/</span>
                <div>
                  <h4 className="text-white font-headline font-bold uppercase text-sm mb-2 tracking-widest">Thermal Imaging</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Advanced infrared scans executed to identify micro-stress in high-capacity circuit frameworks.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <span className="text-secondary font-headline font-black text-xl group-hover:scale-110 transition-transform">/</span>
                <div>
                  <h4 className="text-white font-headline font-bold uppercase text-sm mb-2 tracking-widest">Compliance Audits</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Ensuring all systems meet or exceed current ESA and local municipal safety standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
