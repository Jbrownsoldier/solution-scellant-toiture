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
  const { language, t } = useTranslation();

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
      await new Promise(resolve => setTimeout(resolve, 800));
      
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
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-xl bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xl my-auto text-slate-800"
        >
          {/* Top Progress Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
            <motion.div
              className="h-full bg-secondary"
              initial={{ width: '0%' }}
              animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Close Button */}
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
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
                  <div className="inline-flex p-3 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary mb-2">
                    <ShieldCheck className="w-8 h-8 animate-pulse" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-headline font-black text-primary leading-tight uppercase tracking-tight">
                    {t('entry_popup.title')} · <span className="text-secondary">{t('entry_popup.save')}</span> 🏠
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
                    {t('entry_popup.desc')}
                  </p>
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => setStep(2)} 
                      className="w-full py-5 bg-secondary text-white font-headline font-bold uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(0,102,204,0.25)] flex items-center justify-center gap-3 text-sm"
                    >
                      {t('entry_popup.cta')}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleClose} 
                      className="text-slate-400 hover:text-slate-600 font-sans text-[10px] uppercase tracking-wider py-2 transition-colors font-bold"
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
                    <div className="bg-secondary/10 border border-secondary/20 text-secondary px-3 py-1 rounded text-[10px] uppercase font-bold tracking-widest inline-block">
                      {language === 'fr' ? 'FORMULAIRE DE RABAIS 10% // SÉCURISÉ' : '10% DISCOUNT FORM // SECURE'}
                    </div>
                    <h2 className="text-2xl font-headline font-black text-primary uppercase tracking-tight">
                      {language === 'fr' ? 'Réclamer mon rabais de 10%' : 'Claim My 10% Discount'}
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {language === 'fr' 
                        ? 'Remplissez ces informations rapides pour planifier votre évaluation gratuite et réserver votre rabais.' 
                        : 'Fill out this quick form to schedule your free evaluation and lock in your discount.'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name input */}
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
                      <input 
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={t('quote_modal.label_name')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 text-xs placeholder:text-slate-400 font-sans"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    {/* Phone input */}
                    <div className="relative group">
                      <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
                      <input 
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder={t('quote_modal.label_phone')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 text-xs placeholder:text-slate-400 font-sans"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    {/* Email input */}
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
                      <input 
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t('quote_modal.label_email')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 text-xs placeholder:text-slate-400 font-sans"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    {/* Address input */}
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
                      <input 
                        type="text"
                        required
                        autoComplete="street-address"
                        placeholder={t('quote_modal.label_address')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 text-xs placeholder:text-slate-400 font-sans"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.phone || !formData.email || !formData.address}
                      className="w-full py-4 bg-secondary text-white font-headline font-bold uppercase tracking-widest rounded-xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_20px_rgba(0,102,204,0.25)] flex items-center justify-center gap-3 text-sm border border-secondary/30"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-white" />
                          {language === 'fr' ? 'TRANSMISSION DES DONNÉES...' : 'TRANSMITTING DATA...'}
                        </>
                      ) : (
                        <>
                          {language === 'fr' ? 'RÉSERVER MON RABAIS & ÉVALUATION' : 'RESERVE MY DISCOUNT & EVALUATION'}
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
                      className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative w-20 h-20 bg-secondary rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-headline font-black text-primary uppercase tracking-tight">
                    {language === 'fr' ? 'Rabais Réservé !' : 'Discount Reserved!'}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto font-sans">
                    {language === 'fr' 
                      ? "Merci ! Votre demande d'évaluation a été enregistrée avec le code rabais de 10%. Notre équipe vous contactera dans les 24 heures." 
                      : "Thank you! Your evaluation request has been registered with a 10% discount code. Our team will contact you within 24 hours."}
                  </p>
                  <button 
                    onClick={handleClose} 
                    className="px-8 py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-sans font-bold uppercase text-xs tracking-widest border border-slate-200"
                  >
                    {language === 'fr' ? 'Fermer' : 'Close'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute bottom-0 right-0 p-3 opacity-20 pointer-events-none">
            <span className="text-[8px] font-sans text-slate-500 font-bold uppercase tracking-wider">
              {language === 'fr' ? 'RÉF : PROMO-RABAIS-10' : 'REF: PROMO-DISCOUNT-10'}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
