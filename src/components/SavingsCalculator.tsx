import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Trash2, Calendar, ShieldAlert, BadgeInfo } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteContext';

export function SavingsCalculator() {
  const { language } = useTranslation();
  const { openQuoteModal } = useQuoteModal();
  const [roofSize, setRoofSize] = useState(2000); // sq ft
  const [roofAge, setRoofAge] = useState(10); // years

  // Constants representing typical Quebec market values (2026 stats)
  const COST_REPLACEMENT_PER_SQFT = 9.5; // Average $9.50/sqft including labor/disposal
  const COST_TREATMENT_PER_SQFT = 1.9;    // Average $1.90/sqft

  // Calculations
  const replacementCost = Math.round(roofSize * COST_REPLACEMENT_PER_SQFT);
  const treatmentCost = Math.round(roofSize * COST_TREATMENT_PER_SQFT);
  const netSavings = replacementCost - treatmentCost;
  
  // Waste diverted: asphalt shingles weigh approx 2.8 lbs per sqft
  const landfillWasteDivertedLbs = Math.round(roofSize * 2.8);
  const landfillWasteDivertedTons = (landfillWasteDivertedLbs / 2204.62).toFixed(1); // Metric tons

  // Lifespan extension description
  const lifeExtensionYears = roofAge <= 15 ? '10 - 15' : '5 - 10';

  return (
    <section className="py-24 bg-surface border-t border-white/5 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[#0E1B2A]/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-secondary font-headline uppercase font-black tracking-widest text-xs md:text-sm mb-4 block flex items-center justify-center gap-2">
            <DollarSign className="w-4 h-4 text-secondary" />
            {language === 'fr' ? 'CALCULATEUR FINANCIER & ÉCO' : 'FINANCIAL & ECO CALCULATOR'}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            {language === 'fr' ? 'SIMULEZ VOS ÉCONOMIES IMMÉDIATES' : 'CALCULATE YOUR INSTANT SAVINGS'}
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            {language === 'fr' 
              ? "Découvrez combien vous économisez par rapport à un remplacement de toiture complet et l'impact écologique positif de votre choix." 
              : "Discover how much you save compared to a full roof replacement and the positive ecological impact of your choice."
            }
          </p>
        </div>

        {/* Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls (Left side - 5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
            <div className="space-y-8">
              
              {/* Size Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-white font-mono text-xs uppercase tracking-widest text-slate-300">
                    {language === 'fr' ? 'Superficie du toit' : 'Roof Area'}
                  </label>
                  <span className="text-secondary font-mono font-bold text-sm">
                    {roofSize.toLocaleString()} sq. ft. ({Math.round(roofSize * 0.0929)} m²)
                  </span>
                </div>
                <input 
                  type="range"
                  min="1000"
                  max="5000"
                  step="100"
                  value={roofSize}
                  onChange={(e) => setRoofSize(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1A9E8F] transition-all"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1,000 sq ft</span>
                  <span>5,000 sq ft</span>
                </div>
              </div>

              {/* Age Selector */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-white font-mono text-xs uppercase tracking-widest text-slate-300">
                    {language === 'fr' ? 'Âge des bardeaux' : 'Shingle Age'}
                  </label>
                  <span className="text-slate-300 font-mono font-bold text-sm">
                    {roofAge} {language === 'fr' ? 'ans' : 'years'}
                  </span>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={roofAge}
                  onChange={(e) => setRoofAge(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1A9E8F] transition-all"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5 {language === 'fr' ? 'ans' : 'years'}</span>
                  <span>25 {language === 'fr' ? 'ans' : 'years'}</span>
                </div>
              </div>

            </div>

            {/* Note banner */}
            <div className="mt-8 bg-slate-950/50 rounded-xl p-4 border border-white/5 flex items-start gap-3">
              <BadgeInfo className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {language === 'fr'
                  ? "Calculs fondés sur le tarif moyen de remplacement de toiture au Québec en 2026. L'inspection technique gratuite valide l'admissibilité du bardeau."
                  : "Estimates based on average 2026 Quebec roof replacement contract values. Free technical inspection validates actual shingle qualification."
                }
              </p>
            </div>
          </div>

          {/* Results (Right side - 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Primary Net Savings Card (Full Span inside right side) */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-[#0F2D33]/40 border border-[#1A9E8F]/30 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_15px_30px_rgba(26,158,143,0.1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
              <div>
                <span className="text-secondary font-headline text-xs font-bold uppercase tracking-widest block mb-2">
                  {language === 'fr' ? 'ÉCONOMIES NETTES ESTIMÉES' : 'ESTIMATED NET SAVINGS'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-6xl font-headline font-black text-white leading-none">
                    ${netSavings.toLocaleString()}
                  </span>
                  <span className="text-secondary font-mono font-bold text-xs uppercase tracking-wider bg-secondary/15 px-2.5 py-1 rounded-full border border-secondary/20">
                    {language === 'fr' ? 'Épargne de 80 %' : '80% Saved'}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                    {language === 'fr' ? 'Coût Remplacement complet' : 'Full Replacement Cost'}
                  </p>
                  <p className="text-slate-400 font-mono text-sm font-bold line-through">${replacementCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-secondary font-mono uppercase tracking-wider">
                    {language === 'fr' ? 'Coût de notre scellant' : 'Our Sealing Treatment Cost'}
                  </p>
                  <button 
                    onClick={openQuoteModal}
                    className="text-white font-headline text-xs font-black uppercase tracking-wider bg-[#00A896]/20 border border-[#00A896]/40 px-3 py-1.5 rounded-lg hover:bg-[#00A896] hover:text-white transition-all animate-pulse mt-1.5 cursor-pointer block text-left"
                  >
                    {language === 'fr' 
                      ? 'ÉVALUATION GRATUITE REQUISE (Économisez des milliers $)' 
                      : 'FREE EVALUATION REQUIRED (Save thousands $)'
                    }
                  </button>
                </div>
              </div>
            </div>

            {/* Ecological Impact Card */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/20 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-emerald-400 font-headline text-[10px] font-bold uppercase tracking-widest block mb-1">
                    {language === 'fr' ? 'IMPACT ÉCOLOGIQUE' : 'ECOLOGICAL IMPACT'}
                  </span>
                  <h3 className="text-2xl font-headline font-black text-white uppercase tracking-tight">
                    {landfillWasteDivertedTons} {language === 'fr' ? 'tonnes' : 'tons'}
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Trash2 className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                {language === 'fr'
                  ? "Quantité de résidus de bardeaux d'asphalte pétroliers toxiques détournée des dépotoirs québécois."
                  : "Amount of petroleum-based, toxic asphalt shingle landfill debris prevented from entering local waste yards."
                }
              </p>
            </div>

            {/* Life Extension Card */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/20 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-cyan-400 font-headline text-[10px] font-bold uppercase tracking-widest block mb-1">
                    {language === 'fr' ? 'GARANTIE PROLONGÉE' : 'GUARANTEED LIFE'}
                  </span>
                  <h3 className="text-2xl font-headline font-black text-white uppercase tracking-tight">
                    +{lifeExtensionYears} {language === 'fr' ? 'ans' : 'years'}
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                {language === 'fr'
                  ? "Prolongation directe de la vie de vos bardeaux. Réduit l'empreinte carbone globale de votre bâtiment."
                  : "Direct lifespan extension added to your shingles. Reduces the overall carbon footprint of your property."
                }
              </p>
            </div>

          </div>
        </div>

        {/* Warning Indicator */}
        {roofAge > 18 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex items-start gap-4"
          >
            <ShieldAlert className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-amber-500 font-headline font-bold text-sm uppercase tracking-wide mb-1">
                {language === 'fr' ? 'AVIS D\'INSPECTION TECHNIQUE REQUIS' : 'TECHNICAL INSPECTION REQUIRED'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'fr'
                  ? "À plus de 18 ans d'âge, les bardeaux d'asphalte atteignent leur limite structurelle. Notre technicien qualifié devra confirmer si la fibre est encore assez intègre pour absorber le scellant, ou s'il faut procéder à un remplacement partiel au préalable."
                  : "At over 18 years of age, asphalt shingles reach their structural limit. A free on-site physical inspection is required to verify if the fiberglass layer is elastic enough to absorb the sealing solution."
                }
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
