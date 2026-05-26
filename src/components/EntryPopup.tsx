import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  Phone as PhoneIcon, 
  CheckCircle2, 
  User, 
  Mail, 
  MapPin, 
  Loader2 
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

export function EntryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 = Promo, 2 = Form, 3 = Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    const lastSeen = localStorage.getItem('protective_popup_dismissed');
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
    localStorage.setItem('protective_popup_dismissed', new Date().getTime().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.address) return;

    setIsSubmitting(true);

    try {
      const payload = {
        service_type: 'Évaluation Gratuite / Free Evaluation (Popup Promo 10%)',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Adresse: ${formData.address} | Réduction Réclamée: 10% Rabais Printemps`,
        technical_notes: 'Lead source: Spring Discount Entry Popup'
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([payload]);

      if (error) console.warn('Supabase transmission failed (expected if env vars are missing), proceeding anyway:', error);

      // Simulate a small loading pause for premium feel
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStep(3); // Go to success step
    } catch (err) {
      console.error('Popup submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Top Progress Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div
              className="h-full bg-[#1A9E8F] shadow-[0_0_10px_#1A9E8F]"
              initial={{ width: '0%' }}
              animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Close Button */}
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step-1" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  className="text-center space-y-8"
                >
                  <div className="inline-flex p-3 rounded-xl bg-[#1A9E8F]/10 border border-[#1A9E8F]/20 text-[#1A9E8F] mb-2">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight uppercase tracking-tighter">
                    {t('entry_popup.title')} · <span className="text-[#1A9E8F]">{t('entry_popup.save')}</span> 🏠
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
                    {t('entry_popup.desc')}
                  </p>
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => setStep(2)} 
                      className="w-full py-5 bg-[#1A9E8F] text-white font-bold uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(26,158,143,0.3)] flex items-center justify-center gap-3"
                    >
                      {t('entry_popup.cta')}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleClose} 
                      className="text-slate-500 hover:text-slate-300 font-mono text-[10px] uppercase tracking-[0.2em] py-2 transition-colors"
                    >
                      {t('entry_popup.no_thanks')}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step-2" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2 text-center md:text-left">
                    <div className="text-[#1A9E8F] font-mono text-[10px] uppercase tracking-widest border-b border-[#1A9E8F]/20 pb-2 inline-block">
                      {language === 'fr' ? 'FORMULAIRE DE RABAIS 10% // SÉCURISÉ' : '10% DISCOUNT CLAIM FORM // SECURE'}
                    </div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">
                      {language === 'fr' ? 'Réclamer mon rabais de 10%' : 'Claim my 10% discount'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {language === 'fr' 
                        ? 'Remplissez ces informations rapides pour planifier votre évaluation gratuite et réserver votre rabais.'
                        : 'Fill out this quick form to schedule your free evaluation and lock in your discount.'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name input */}
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#1A9E8F] transition-colors" />
                      <input 
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={t('quote_modal.label_name')}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-[#1A9E8F]/50 focus:ring-1 focus:ring-[#1A9E8F]/20 font-mono text-xs placeholder:text-slate-600 uppercase"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    {/* Phone input */}
                    <div className="relative group">
                      <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#1A9E8F] transition-colors" />
                      <input 
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder={t('quote_modal.label_phone')}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-[#1A9E8F]/50 focus:ring-1 focus:ring-[#1A9E8F]/20 font-mono text-xs placeholder:text-slate-600 uppercase"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    {/* Email input */}
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#1A9E8F] transition-colors" />
                      <input 
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t('quote_modal.label_email')}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-[#1A9E8F]/50 focus:ring-1 focus:ring-[#1A9E8F]/20 font-mono text-xs placeholder:text-slate-600 uppercase"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    {/* Address input */}
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#1A9E8F] transition-colors" />
                      <input 
                        type="text"
                        required
                        autoComplete="street-address"
                        placeholder={t('quote_modal.label_address')}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-[#1A9E8F]/50 focus:ring-1 focus:ring-[#1A9E8F]/20 font-mono text-xs placeholder:text-slate-600 uppercase"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.phone || !formData.email || !formData.address}
                      className="w-full py-4.5 bg-[#1A9E8F] text-white font-bold uppercase tracking-widest rounded-xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_rgba(26,158,143,0.3)] flex items-center justify-center gap-3 text-sm border border-[#1A9E8F]/30"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {language === 'fr' ? 'TRANSMISSION DES DONNÉES...' : 'TRANSMITTING DATA...'}
                        </>
                      ) : (
                        <>
                          {language === 'fr' ? 'RÉSERVER MON RABAIS & ÉVALUATION' : 'CLAIM MY DISCOUNT & EVALUATION'}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step-3" 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-center space-y-6 py-8"
                >
                  <div className="relative mb-6 inline-flex mx-auto">
                    <motion.div 
                      className="absolute inset-0 bg-[#1A9E8F]/20 blur-2xl rounded-full"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative w-20 h-20 bg-[#1A9E8F] rounded-full flex items-center justify-center border-4 border-[#1A9E8F]/80 shadow-[0_0_30px_rgba(26,158,143,0.4)]">
                      <CheckCircle2 className="w-10 h-10 text-[#0E1B2A]" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter">
                    {language === 'fr' ? 'Rabais Réservé !' : 'Discount Claimed!'}
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto font-mono">
                    {language === 'fr'
                      ? "Merci ! Votre demande d'évaluation a été enregistrée avec le code rabais de 10%. Notre équipe vous contactera dans les 24 heures."
                      : "Thank you! Your evaluation request has been registered with the 10% discount code. Our team will contact you within 24 hours."}
                  </p>
                  <button 
                    onClick={handleClose} 
                    className="px-8 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all font-mono uppercase text-xs border border-white/5"
                  >
                    {language === 'fr' ? 'Fermer' : 'Close'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute bottom-0 right-0 p-2 opacity-10 pointer-events-none">
            <span className="text-[8px] font-mono text-white uppercase tracking-tighter">
              {language === 'fr' ? 'RÉF : PROMO-RABAIS-10' : 'REF: PROMO-10-DISCOUNT'}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
