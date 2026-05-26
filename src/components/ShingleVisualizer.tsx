import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Droplets, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export function ShingleVisualizer() {
  const { language, t } = useTranslation();
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  // Automated gentle wave animation on load to draw attention to interactive nature
  useEffect(() => {
    const interval = setTimeout(() => {
      // Gentle pulse to show it's interactive if the user hasn't touched it yet
      if (sliderPosition === 50) {
        setSliderPosition(55);
        setTimeout(() => setSliderPosition(45), 400);
        setTimeout(() => setSliderPosition(50), 800);
      }
    }, 1500);
    return () => clearTimeout(interval);
  }, []);

  // Shingle vector definitions (simulating a premium interlocking pattern)
  const rows = 5;
  const columns = 8;
  const shingles = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns + 1; c++) {
      // Stagger rows like real shingles
      const offsetX = r % 2 === 0 ? 0 : -6.25;
      shingles.push({
        id: `${r}-${c}`,
        row: r,
        col: c,
        x: c * 12.5 + offsetX,
        y: r * 20,
        width: 12.5,
        height: 20,
        // Add organic offsets for realistic asphalt texture
        crackSeed: Math.sin(r * 12 + c * 37),
        lichenSeed: Math.cos(r * 29 - c * 14)
      });
    }
  }

  return (
    <section className="py-24 bg-primary relative overflow-hidden border-t border-white/5">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-secondary font-headline uppercase font-black tracking-widest text-xs md:text-sm mb-4 block flex items-center justify-center gap-2">
            <Droplets className="w-4 h-4 text-secondary animate-bounce" />
            {language === 'fr' ? 'SIMULATEUR DE TRAITEMENT' : 'TREATMENT SIMULATOR'}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            {language === 'fr' ? 'CONSTATEZ LA DIFFÉRENCE VISUELLE' : 'SEE THE VISUAL DIFFERENCE'}
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {language === 'fr' 
              ? "Faites glisser le curseur pour simuler l'action de notre scellant sur des bardeaux d'asphalte vieillis. Retrouvez l'élasticité, la couleur d'origine et créez un bouclier hydrophobe permanent." 
              : "Drag the slider to simulate the effect of our protective sealer on aging asphalt shingles. Restore original color, flexibility, and create a permanent water-beading barrier."
            }
          </p>
        </div>

        {/* Visualizer Frame */}
        <div className="relative w-full bg-slate-950/40 border border-white/10 rounded-2xl p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-sm">
          {/* Legend Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3 text-[#e93d3d] bg-[#e93d3d]/10 px-3 py-1.5 rounded-lg border border-[#e93d3d]/20">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">
                {language === 'fr' ? 'AVANT : BARDEAUX FRAGILES ET SECS' : 'BEFORE: BRITTLE, DRY SHINGLES'}
              </span>
            </div>
            <div className="text-xs text-slate-500 font-mono hidden md:block">
              {language === 'fr' ? '<< GLISSER POUR SIMULER >>' : '<< DRAG TO SIMULATE >>'}
            </div>
            <div className="flex items-center gap-3 text-secondary bg-secondary/10 px-3 py-1.5 rounded-lg border border-secondary/20">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">
                {language === 'fr' ? 'APRÈS : PROTECTION ÉLASTIQUE HYDROPHOBE' : 'AFTER: WATERPROOF ACTIVE SHIELD'}
              </span>
            </div>
          </div>

          {/* Interactive Screen area */}
          <div 
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative h-[250px] sm:h-[350px] md:h-[420px] rounded-xl overflow-hidden cursor-ew-resize select-none bg-slate-900 shadow-[inset_0_4px_30px_rgba(0,0,0,0.9)]"
            style={{ perspective: '800px' }}
          >
            {/* 3D angled roof mesh container */}
            <div 
              className="absolute inset-0 origin-center w-full h-full p-2 transition-transform duration-300"
              style={{ 
                transform: 'rotateX(20deg) translateY(-20px)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* === BEFORE VIEW (Background / Base Layer) === */}
              <div className="absolute inset-0 w-full h-full select-none" style={{ backfaceVisibility: 'hidden' }}>
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {/* Row background shadings */}
                  <rect width="100" height="100" fill="#242830" />
                  
                  {/* Weathered Shingles */}
                  {shingles.map((s) => (
                    <g key={`before-${s.id}`}>
                      {/* Weathered Shingle Base */}
                      <rect 
                        x={s.x} 
                        y={s.y} 
                        width={s.width} 
                        height={s.height} 
                        fill={s.crackSeed > 0.3 ? '#41454E' : s.crackSeed < -0.3 ? '#2A2D35' : '#343841'} 
                        stroke="#1C1E24" 
                        strokeWidth="0.3"
                      />
                      
                      {/* Cracking Paths */}
                      {s.crackSeed > 0.1 && (
                        <path 
                          d={`M ${s.x + s.width * 0.3} ${s.y + s.height * 0.2} 
                             Q ${s.x + s.width * 0.4} ${s.y + s.height * 0.5} 
                               ${s.x + s.width * (0.3 + s.crackSeed * 0.2)} ${s.y + s.height * 0.8}`}
                          stroke="#17191E" 
                          strokeWidth="0.25"
                          fill="none"
                          strokeLinecap="round"
                        />
                      )}
                      
                      {/* Moss/Lichen spots */}
                      {s.lichenSeed > 0.6 && (
                        <circle 
                          cx={s.x + s.width * 0.7} 
                          cy={s.y + s.height * 0.6} 
                          r={1 + Math.abs(s.lichenSeed) * 0.8} 
                          fill="#4E5D46" 
                          opacity="0.85"
                          stroke="#3C4835"
                          strokeWidth="0.1"
                        />
                      )}
                    </g>
                  ))}
                </svg>
              </div>

              {/* === AFTER VIEW (Top Layer clipped by width) === */}
              <div 
                className="absolute inset-0 h-full overflow-hidden select-none"
                style={{ 
                  width: `${sliderPosition}%`,
                  borderRight: '1px solid transparent',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* SVG scaled to exact viewport size */}
                <div className="absolute top-0 left-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}>
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {/* Sealed Shingles (Deep Rich Dark Sheen) */}
                    <rect width="100" height="100" fill="#0D1520" />
                    {shingles.map((s) => (
                      <g key={`after-${s.id}`}>
                        {/* Rich Protected Shingle Base */}
                        <rect 
                          x={s.x} 
                          y={s.y} 
                          width={s.width} 
                          height={s.height} 
                          fill={s.crackSeed > 0.3 ? '#162235' : s.crackSeed < -0.3 ? '#0A101A' : '#0F1826'} 
                          stroke="#05080E" 
                          strokeWidth="0.3"
                        />
                        {/* Subtle protective coating highlight sheen */}
                        <rect 
                          x={s.x + 0.5} 
                          y={s.y + 0.5} 
                          width={s.width - 1} 
                          height="1.5" 
                          fill="white" 
                          opacity="0.08"
                        />
                        
                        {/* Water droplets (Glossy beads with reflective highlights) */}
                        {s.lichenSeed > 0.2 && (
                          <g>
                            {/* Outer shadow of droplet */}
                            <circle 
                              cx={s.x + s.width * 0.4} 
                              cy={s.y + s.height * 0.4} 
                              r="0.8" 
                              fill="#020617" 
                              opacity="0.5" 
                              transform="translate(0.1, 0.1)"
                            />
                            {/* Translucent water bead body */}
                            <circle 
                              cx={s.x + s.width * 0.4} 
                              cy={s.y + s.height * 0.4} 
                              r="0.8" 
                              fill="url(#dropletGradient)" 
                            />
                            {/* Inner specular light spot */}
                            <circle 
                              cx={s.x + s.width * 0.36} 
                              cy={s.y + s.height * 0.36} 
                              r="0.2" 
                              fill="white" 
                              opacity="0.9"
                            />
                          </g>
                        )}

                        {s.crackSeed < -0.1 && (
                          <g>
                            <circle 
                              cx={s.x + s.width * 0.75} 
                              cy={s.y + s.height * 0.65} 
                              r="0.6" 
                              fill="#020617" 
                              opacity="0.5" 
                              transform="translate(0.1, 0.1)"
                            />
                            <circle 
                              cx={s.x + s.width * 0.75} 
                              cy={s.y + s.height * 0.65} 
                              r="0.6" 
                              fill="url(#dropletGradient)" 
                            />
                            <circle 
                              cx={s.x + s.width * 0.72} 
                              cy={s.y + s.height * 0.62} 
                              r="0.15" 
                              fill="white" 
                              opacity="0.9"
                            />
                          </g>
                        )}
                      </g>
                    ))}
                    
                    {/* Gradients */}
                    <defs>
                      <radialGradient id="dropletGradient" cx="40%" cy="40%" r="50%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#1e40af" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Glowing drag indicator handle bar */}
            <div 
              className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#1A9E8F] via-cyan-400 to-[#1A9E8F] shadow-[0_0_12px_#1A9E8F,0_0_4px_#38bdf8] z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            />

            {/* Floating Handle Knob */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-secondary flex items-center justify-center shadow-[0_0_20px_rgba(26,158,143,0.6)] z-40 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="flex text-secondary items-center justify-center">
                <ChevronLeft className="w-4 h-4 -mr-1" />
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Float Banners */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none bg-slate-950/70 border border-[#e93d3d]/20 px-3 py-1 rounded font-mono text-[9px] uppercase tracking-widest text-[#e93d3d] backdrop-blur-md">
              {language === 'fr' ? 'Non protégé' : 'Unprotected'}
            </div>
            <div className="absolute top-4 right-4 z-20 pointer-events-none bg-slate-950/70 border border-secondary/20 px-3 py-1 rounded font-mono text-[9px] uppercase tracking-widest text-secondary backdrop-blur-md">
              {language === 'fr' ? 'Protégé' : 'Protected'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
