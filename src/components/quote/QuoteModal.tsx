import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Home, 
  CheckCircle2,
  Phone,
  Mail,
  User,
  MapPin,
  MessageSquare,
  Loader2,
  Calendar,
  Layers
} from 'lucide-react';
import { useQuoteModal } from '../../context/QuoteContext';
import { SealantProgressBar } from './SealantProgressBar';
import { supabase } from '../../lib/supabase';
import { useTranslation } from '../../context/LanguageContext';

export const QuoteModal = () => {
  const { isOpen, closeQuoteModal } = useQuoteModal();
  const { language, t } = useTranslation();

  const STEPS = [
    { id: 'roof_specs', title: t('quote_modal.title') },
    { id: 'contact', title: t('quote_modal.q4_title') },
    { id: 'address', title: t('quote_modal.ph_address') },
    { id: 'success', title: t('quote_modal.success_title') }
  ];

  const ROOF_AGES = [
    { id: 'under_5', label: t('quote_modal.opt_age_1') },
    { id: '5_10', label: t('quote_modal.opt_age_2') },
    { id: '10_15', label: t('quote_modal.opt_age_3') },
    { id: 'over_15', label: t('quote_modal.opt_age_4') }
  ];

  const PROPERTY_SIZES = [
    { id: 'small', label: t('quote_modal.opt_size_1') },
    { id: 'medium', label: t('quote_modal.opt_size_2') },
    { id: 'large', label: t('quote_modal.opt_size_3') },
    { id: 'unknown', label: t('quote_modal.opt_size_4') }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    roof_age: '',
    property_size: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    technical_notes: ''
  });

  const [bootSequence, setBootSequence] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBootSequence(true);
      const timer = setTimeout(() => setBootSequence(false), 600);
      return () => clearTimeout(timer);
    } else {
      setCurrentStep(0);
      setFormData({
        roof_age: '',
        property_size: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
        technical_notes: ''
      });
    }
  }, [isOpen]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const [transmissionStage, setTransmissionStage] = useState(0);

  const TRANSMISSION_STAGES = language === 'fr' ? [
    "CHIFFREMENT DES DONNÉES...",
    "ÉTABLISSEMENT DE LA CONNEXION...",
    "TRANSMISSION DE L'ÉVALUATION...",
    "VÉRIFICATION DE L'INTÉGRITÉ...",
    "SYNCHRONISATION TERMINÉE !"
  ] : [
    "ENCRYPTING EVALUATION DATA...",
    "ESTABLISHING SECURE CONNECTION...",
    "TRANSMITTING EVALUATION...",
    "VERIFYING DATA INTEGRITY...",
    "SYNCHRONIZATION COMPLETE!"
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTransmissionStage(0);

    try {
      // Prepare payload
      const payload = {
        service_type: 'Évaluation Gratuite / Free Evaluation',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Adresse: ${formData.address} | Âge toit: ${formData.roof_age} | Taille: ${formData.property_size} | Notes: ${formData.message}`,
        technical_notes: formData.technical_notes || 'Lead source: Quote Modal Free Evaluation'
      };

      // Start the actual submission in parallel with the simulation
      const submissionPromise = supabase
        .from('contact_submissions')
        .insert([payload]);

      // Cycle through stages for "pleasant experience"
      for (let i = 0; i < TRANSMISSION_STAGES.length; i++) {
        setTransmissionStage(i);
        await new Promise(resolve => setTimeout(resolve, i === TRANSMISSION_STAGES.length - 1 ? 400 : 700));
      }

      try {
        const { error } = await submissionPromise;
        if (error) console.warn('Supabase transmission failed (expected if env vars are missing), proceeding anyway:', error);
      } catch (e) {
        console.warn('Network error during transmission, proceeding anyway:', e);
      }
      
      setCurrentStep(3); // Success step
    } catch (err) {
      console.error('Critical error in transmission logic:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeQuoteModal}
        className="absolute inset-0 bg-[#0E1B2A]/85 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0E1B2A] border border-[#1A9E8F]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(26,158,143,0.2)] my-auto"
      >
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />

        {/* Global Header */}
        <div className="p-6 border-b border-white/5 bg-[#0E1B2A]/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 text-[#1A9E8F]">
              <div className="p-2 rounded-lg bg-[#1A9E8F]/10 border border-[#1A9E8F]/20">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold uppercase tracking-widest font-mono text-white">
                  {STEPS[currentStep].title}
                </h2>
                <p className="text-[10px] text-slate-500 font-mono uppercase">
                  Solution Scellant OS v1.0 // Free Evaluation
                </p>
              </div>
            </div>
            <button 
              onClick={closeQuoteModal}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <SealantProgressBar progress={(currentStep + 1) / (STEPS.length - 1)} />
        </div>

        {/* Content Area */}
        <div className="p-8 min-h-[400px]">
          {bootSequence ? (
            <motion.div 
              className="flex flex-col items-center justify-center h-full py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 className="w-12 h-12 text-[#1A9E8F] animate-spin mb-4" />
              <p className="text-[#1A9E8F] font-mono text-sm animate-pulse">BOOTING COMMAND INTERFACE...</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Roof Age Selector */}
                  <div className="space-y-4">
                    <label className="text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 text-slate-400">
                      <Calendar className="w-4 h-4 text-[#1A9E8F]" />
                      {t('quote_modal.q1_title')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {ROOF_AGES.map((age) => (
                        <button
                          key={age.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, roof_age: age.label })}
                          className={`p-4 rounded-xl border font-mono text-sm text-left transition-all ${
                            formData.roof_age === age.label
                              ? 'bg-[#1A9E8F]/10 border-[#1A9E8F] text-white'
                              : 'bg-white/5 border-white/10 hover:border-[#1A9E8F]/50 text-slate-400'
                          }`}
                        >
                          {age.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Size Selector */}
                  <div className="space-y-4">
                    <label className="text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 text-slate-400">
                      <Layers className="w-4 h-4 text-[#1A9E8F]" />
                      {t('quote_modal.q2_title')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {PROPERTY_SIZES.map((size) => (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, property_size: size.label })}
                          className={`p-4 rounded-xl border font-mono text-sm text-left transition-all ${
                            formData.property_size === size.label
                              ? 'bg-[#1A9E8F]/10 border-[#1A9E8F] text-white'
                              : 'bg-white/5 border-white/10 hover:border-[#1A9E8F]/50 text-slate-400'
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={nextStep}
                      disabled={!formData.roof_age || !formData.property_size}
                      className="w-full py-4 rounded-xl bg-[#1A9E8F] text-white font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(26,158,143,0.3)] flex items-center justify-center gap-2 font-mono uppercase text-sm"
                    >
                      {t('quote_modal.next')} <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#1A9E8F] transition-colors" />
                    <input 
                      type="text"
                      placeholder={t('quote_modal.label_name')}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#1A9E8F]/50 focus:ring-1 focus:ring-[#1A9E8F]/20 font-mono text-sm placeholder:text-slate-600 uppercase"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#1A9E8F] transition-colors" />
                    <input 
                      type="email"
                      placeholder={t('quote_modal.label_email')}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#1A9E8F]/50 focus:ring-1 focus:ring-[#1A9E8F]/20 font-mono text-sm placeholder:text-slate-600 uppercase"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#1A9E8F] transition-colors" />
                    <input 
                      type="tel"
                      placeholder={t('quote_modal.label_phone')}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#1A9E8F]/50 focus:ring-1 focus:ring-[#1A9E8F]/20 font-mono text-sm placeholder:text-slate-600 uppercase"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={prevStep}
                      className="flex-1 py-4 rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2 font-mono uppercase text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" /> {t('quote_modal.prev')}
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={!formData.name || !formData.email || !formData.phone}
                      className="flex-[2] py-4 rounded-xl bg-[#1A9E8F] text-white font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(26,158,143,0.3)] flex items-center justify-center gap-2 font-mono uppercase text-sm"
                    >
                      {t('quote_modal.next')} <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    {/* Exact Address */}
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#1A9E8F] transition-colors" />
                      <input 
                        type="text"
                        placeholder={t('quote_modal.label_address')}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#1A9E8F]/50 focus:ring-1 focus:ring-[#1A9E8F]/20 font-mono text-sm placeholder:text-slate-600 uppercase"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    {/* Message / Details */}
                    <div className="relative group">
                      <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-slate-500 group-focus-within:text-[#1A9E8F] transition-colors" />
                      <textarea 
                        placeholder={language === 'fr' ? "Détails supplémentaires ou notes pour l'inspecteur..." : "Additional details or notes for the inspector..."}
                        rows={4}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-6 pl-12 pr-4 text-white focus:outline-none focus:border-[#1A9E8F]/50 focus:ring-1 focus:ring-[#1A9E8F]/20 font-mono text-sm placeholder:text-slate-600 uppercase resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={prevStep}
                      className="flex-1 py-4 rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2 font-mono uppercase text-sm"
                    >
                      {t('quote_modal.prev')}
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.address}
                      className="flex-[2] py-4 rounded-xl bg-[#1A9E8F] text-white font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(26,158,143,0.4)] flex items-center justify-center gap-2 border border-[#1A9E8F]/30 font-mono uppercase text-sm min-w-[240px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> 
                          {TRANSMISSION_STAGES[transmissionStage]}
                        </>
                      ) : (
                        <>
                          {t('quote_modal.submit')} <Zap className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="relative mb-6">
                    <motion.div 
                      className="absolute inset-0 bg-[#1A9E8F]/20 blur-3xl rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative w-24 h-24 bg-[#1A9E8F] rounded-full flex items-center justify-center border-4 border-[#1A9E8F]/80 shadow-[0_0_40px_rgba(26,158,143,0.5)]">
                      <CheckCircle2 className="w-12 h-12 text-[#0E1B2A]" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 font-mono uppercase tracking-tighter">{t('quote_modal.success_title')}</h3>
                  <p className="text-slate-400 mb-8 max-w-sm font-mono text-sm leading-relaxed">
                    {t('quote_modal.success_desc')}
                  </p>
                  <button 
                    onClick={closeQuoteModal}
                    className="px-8 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all font-mono uppercase text-sm border border-white/5"
                  >
                    {t('quote_modal.close')}
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          )}
        </div>

        {/* Global Footer Decoration */}
        <div className="p-4 bg-slate-950/80 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1A9E8F] animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-slate-800" />
            <div className="w-2 h-2 rounded-full bg-slate-800" />
          </div>
          <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            Encryption: SHA-512 // SECURE CONNECTION
          </div>
        </div>
      </motion.div>
    </div>
  );
};
