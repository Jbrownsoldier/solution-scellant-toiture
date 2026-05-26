import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteContext';
import { ArrowRight, ShieldAlert, Droplet, Flame, Layers, Sparkles } from 'lucide-react';

export function HiggsfieldExtendedSections() {
  const { t } = useTranslation();
  const { openQuoteModal } = useQuoteModal();

  /* ── Interactive Before/After Slider State ────────────────────────── */
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  /* ── Scroll Animations (Intersection Observer) ────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const animElements = document.querySelectorAll('.scroll-animate-sequential');
    animElements.forEach((el) => observer.observe(el));

    return () => {
      animElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-[#FFFFFF] text-[#1F2421] font-sans">
      
      {/* ═══════════════════════════════════════════════════════════════════
         2. INTERACTIVE AVANT/APRÈS (Before/After Slider)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-headline uppercase font-black tracking-widest text-xs mb-3 block">
            {t('extended.slider_badge')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#1F2421] uppercase tracking-tighter mb-6">
            {t('extended.slider_title')}
            <span className="text-secondary">{t('extended.slider_title_highlight')}</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            {t('extended.slider_desc')}
          </p>
        </div>

        {/* Comparison Slider Widget */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/10] md:aspect-[21/9] min-h-[300px] md:min-h-[350px] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none border border-slate-200 touch-none"
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0 w-full h-full bg-[#F4F7F6]">
            <img 
              src="/roof-after-v3.webp" 
              alt="Roof after treatment" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
            <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 z-10 bg-secondary text-white text-[9px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 md:px-4 md:py-2 rounded shadow-lg whitespace-nowrap">
              {t('extended.slider_after')}
            </div>
          </div>

          {/* Before Image (Foreground overlay) */}
          <div 
            className="absolute inset-y-0 left-0 w-full h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || '100vw' }}>
              <img 
                src="/roof-before-v3.webp" 
                alt="Roof before treatment" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 z-10 bg-[#1F2421] text-white text-[9px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 md:px-4 md:py-2 rounded shadow-lg whitespace-nowrap">
                {t('extended.slider_before')}
              </div>
            </div>
          </div>

          {/* Slider Handle Line & Circle */}
          <div 
            className="absolute inset-y-0 w-1 bg-white z-20 cursor-ew-resize shadow-md"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border-4 border-secondary rounded-full shadow-2xl flex items-center justify-center">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
         3. VALUE PROPOSITIONS & STORYTELLING BARS
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F4F7F6] py-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Benefit Anchors List */}
          <div>
            <span className="text-secondary font-headline uppercase font-black tracking-widest text-xs mb-3 block">
              {t('extended.benefits_badge')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#1F2421] uppercase tracking-tighter mb-6 leading-[0.95]">
              {t('extended.benefits_title')}
              <span className="text-secondary">{t('extended.benefits_title_highlight')}</span>
            </h2>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              {t('extended.benefits_desc')}
            </p>

            {/* List cards (01 to 03) */}
            <div className="space-y-6">
              {[
                { id: '01', title: t('extended.benefit_1_title'), desc: t('extended.benefit_1_desc'), icon: Layers },
                { id: '02', title: t('extended.benefit_2_title'), desc: t('extended.benefit_2_desc'), icon: Flame },
                { id: '03', title: t('extended.benefit_3_title'), desc: t('extended.benefit_3_desc'), icon: Droplet }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className="scroll-animate-sequential opacity-0 translate-y-8 transition-all duration-700 ease-out flex gap-6 bg-[#FFFFFF] p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer overflow-hidden relative"
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Expandable Fluid hover swell */}
                    <div className="absolute inset-0 bg-secondary/5 rounded-xl scale-0 group-hover:scale-100 origin-center transition-transform duration-500 ease-out pointer-events-none" />
                    
                    <div className="w-12 h-12 bg-[#F4F7F6] group-hover:bg-secondary/10 text-secondary rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-secondary font-mono text-xs font-bold">{item.id}</span>
                        <h4 className="font-display font-bold text-[#1F2421] text-lg uppercase tracking-tight">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Closeup Asset Panel */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col bg-white group cursor-pointer lg:aspect-[4/3]">
            {/* Glistening Shingles Closeup Image */}
            <img 
              src="/shingles-beading.png" 
              alt="Glistening shingles close up with water drops" 
              className="w-full h-48 sm:h-64 lg:h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Cost of Inaction overlay box */}
            <div className="relative lg:absolute lg:bottom-6 lg:left-6 lg:right-6 bg-[#1F2421]/95 text-white p-6 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md mt-0 lg:mt-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-red-400 font-headline uppercase font-black tracking-widest text-[10px] mb-1.5 block">
                    {t('extended.inaction_badge')}
                  </span>
                  <h4 className="font-display font-black text-md uppercase tracking-tight text-white mb-2">
                    {t('extended.inaction_title')}
                    <span className="text-red-400"> {t('extended.inaction_title_highlight')}</span>
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {t('extended.inaction_desc')}
                  </p>
                  <ul className="text-xs text-slate-300 space-y-2 border-t border-white/10 pt-3">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      {t('extended.inaction_risk_1')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      {t('extended.inaction_risk_2')}
                    </li>
                    <li className="flex items-center gap-2 font-bold text-white">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
                      {t('extended.inaction_risk_3')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
         4. THE SEALING PROTOCOL (Step-by-Step spraymist)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Circular Inset with Spraymist Image */}
          <div className="relative flex justify-center items-center">
            {/* Outer dotted circle animation overlay */}
            <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-secondary/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[95%] h-[95%] rounded-full border border-secondary/10 animate-pulse" />
            
            {/* The circular mist spraymist image */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white aspect-square bg-[#F4F7F6] group cursor-pointer">
              <img 
                src="/technician-spray.png" 
                alt="Friendly technician spraying protective mist shield" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2421]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Sealing Steps Details */}
          <div>
            <span className="text-secondary font-headline uppercase font-black tracking-widest text-xs mb-3 block">
              {t('extended.protocol_badge')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#1F2421] uppercase tracking-tighter mb-6 leading-[0.95]">
              {t('extended.protocol_title')}
              <span className="text-secondary">{t('extended.protocol_title_highlight')}</span>
            </h2>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              {t('extended.protocol_desc')}
            </p>

            {/* Step Grid Cards */}
            <div className="space-y-6">
              {[
                { title: t('extended.step_1_title'), desc: t('extended.step_1_desc') },
                { title: t('extended.step_2_title'), desc: t('extended.step_2_desc') },
                { title: t('extended.step_3_title'), desc: t('extended.step_3_desc') }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="scroll-animate-sequential opacity-0 translate-y-8 transition-all duration-700 ease-out p-6 rounded-xl border border-slate-100 bg-[#F4F7F6] hover:bg-[#FFFFFF] hover:shadow-lg transition-all group"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <h4 className="font-display font-black text-lg text-[#1F2421] group-hover:text-secondary transition-colors uppercase tracking-tight mb-2">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
         5. HIGH-CONVERTING CTA BLOCK (Fluid expand animation)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-primary text-white py-32 px-6 md:px-8 relative overflow-hidden">
        {/* Decorative Grid Pulse background */}
        <div className="absolute inset-0 grid-pulse pointer-events-none opacity-20" />
        
        {/* Subtle decorative glowing orbs */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none translate-y-[-50%]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none translate-x-[20%]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 bg-secondary/20 text-secondary font-headline text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6 border border-secondary/30">
            <Sparkles className="w-3.5 h-3.5" />
            {t('extended.cta_badge')}
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[0.95] mb-6 text-white">
            {t('extended.cta_title')}
            <span className="text-secondary block md:inline"> {t('extended.cta_title_highlight')}</span>
          </h2>
          <p className="text-slate-400 text-md md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            {t('extended.cta_desc')}
          </p>

          {/* Sarcelle Teal CTA with Horizontal Expand Effect */}
          <button
            onClick={openQuoteModal}
            className="group relative overflow-hidden inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-headline text-xs md:text-sm font-bold tracking-widest uppercase py-5 px-10 rounded-lg shadow-xl border-none transition-all duration-300 hover:shadow-2xl hover:translate-y-[-2px] active:translate-y-[0px] active:scale-[0.98]"
            aria-label="Book a free evaluation"
          >
            {/* Expandable Fluid swell layer */}
            <div className="absolute inset-0 bg-secondary group-hover:scale-x-105 transition-transform duration-300 origin-center pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none z-0" />
            
            <span className="relative z-10 flex items-center gap-3 group-hover:px-1 transition-all duration-300">
              {t('extended.cta_button')}
              <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* ── Scroll Observer Custom Classes injection ── */}
      <style>{`
        .scroll-animate-sequential {
          will-change: transform, opacity;
        }
        .scroll-animate-sequential.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

    </div>
  );
}
