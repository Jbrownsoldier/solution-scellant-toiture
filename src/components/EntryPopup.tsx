import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';

export function EntryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const lastSeen = localStorage.getItem('gonano_popup_dismissed');
    const now = new Date().getTime();
    if (lastSeen) {
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (now - parseInt(lastSeen) < sevenDays) return;
    }
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('gonano_popup_dismissed', new Date().getTime().toString());
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-[#0E1B2A]/80 backdrop-blur-md"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-xl bg-[#0E1B2A] border border-[#1A9E8F]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(26,158,143,0.15)] my-auto"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div
              className="h-full bg-[#1A9E8F] shadow-[0_0_10px_#1A9E8F]"
              initial={{ width: '0%' }}
              animate={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
          <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors z-10">
            <X className="w-5 h-5" />
          </button>
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center space-y-8">
                  <div className="inline-flex p-3 rounded-xl bg-[#1A9E8F]/10 border border-[#1A9E8F]/20 text-[#1A9E8F] mb-2">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight uppercase tracking-tighter">
                    Save up to <span className="text-[#1A9E8F]">75%</span> on roof restoration with <span className="text-[#1A9E8F]">GoNano</span> 🏠
                  </h2>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => setStep(2)} className="w-full py-5 bg-[#1A9E8F] text-white font-bold uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(26,158,143,0.3)] flex items-center justify-center gap-3">
                      Yes, show me how!
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button onClick={handleClose} className="text-slate-500 hover:text-slate-300 font-mono text-[10px] uppercase tracking-[0.2em] py-2 transition-colors">
                      No thanks, continue to site.
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-[#1A9E8F] font-mono text-[10px] uppercase tracking-widest border-b border-[#1A9E8F]/20 pb-2 inline-block">GoNano Technology</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter">
                      Restore Your Roof <span className="text-[#1A9E8F]">Without Replacing It</span>
                    </h2>
                  </div>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                    Our patented nanoscopic silica sealant penetrates and bonds within your shingles, forming a permanent hydrophobic shield. <span className="text-white italic">No tear-off, no waste, no hassle.</span>
                  </p>
                  <div className="bg-black/20 border border-white/5 rounded-xl p-6 space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Why GoNano?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['Save up to 75%', '15-Year Warranty', '< 60 Min Application', 'Zero Construction Waste'].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-white font-mono text-xs capitalize">
                          <CheckCircle2 className="w-3 h-3 text-[#1A9E8F]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <a href="tel:+15146136904" className="w-full py-5 bg-[#1A9E8F] text-white font-bold uppercase tracking-widest rounded-xl hover:brightness-110 flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(26,158,143,0.3)]">
                    <Phone className="w-5 h-5" />
                    Get a Free Roof Assessment
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute bottom-0 right-0 p-2 opacity-10 pointer-events-none">
            <span className="text-[8px] font-mono text-white uppercase tracking-tighter">REF: GONANO-MTL-1.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
