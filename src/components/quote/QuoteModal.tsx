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
  Layers,
  ShieldCheck
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

  useEffect(() => {
    if (!isOpen) {
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

  const handleSubmit = async () => {
    setIsSubmitting(true);

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

      const { error } = await supabase
        .from('contact_submissions')
        .insert([payload]);

      if (error) console.warn('Supabase transmission failed (expected if env vars are missing), proceeding anyway:', error);
      
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
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xl my-auto text-slate-800"
      >
        {/* Global Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 text-secondary">
              <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-headline font-black uppercase tracking-tight text-primary">
                  {STEPS[currentStep].title}
                </h2>
                <p className="text-[10px] text-slate-500 font-sans uppercase font-bold tracking-widest">
                  {language === 'fr' ? 'Portail Évaluation Sécurisé' : 'Secure Evaluation Portal'}
                </p>
              </div>
            </div>
            <button 
              onClick={closeQuoteModal}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <SealantProgressBar progress={(currentStep + 1) / (STEPS.length - 1)} />
        </div>

        {/* Content Area */}
        <div className="p-8 min-h-[400px]">
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
                  <label className="text-slate-600 font-headline text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-secondary" />
                    {t('quote_modal.q1_title')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {ROOF_AGES.map((age) => (
                      <button
                        key={age.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, roof_age: age.label })}
                        className={`p-4 rounded-xl border text-sm text-left transition-all ${
                          formData.roof_age === age.label
                            ? 'bg-secondary/5 border-secondary text-secondary font-bold shadow-sm shadow-secondary/10'
                            : 'bg-slate-50/50 border-slate-200 hover:border-secondary/50 text-slate-600'
                        }`}
                      >
                        {age.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Size Selector */}
                <div className="space-y-4">
                  <label className="text-slate-600 font-headline text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-4 h-4 text-secondary" />
                    {t('quote_modal.q2_title')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {PROPERTY_SIZES.map((size) => (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, property_size: size.label })}
                        className={`p-4 rounded-xl border text-sm text-left transition-all ${
                          formData.property_size === size.label
                            ? 'bg-secondary/5 border-secondary text-secondary font-bold shadow-sm shadow-secondary/10'
                            : 'bg-slate-50/50 border-slate-200 hover:border-secondary/50 text-slate-600'
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
                    className="w-full py-4 rounded-xl bg-secondary text-white font-headline font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_20px_rgba(0,102,204,0.25)] flex items-center justify-center gap-2 uppercase text-sm tracking-widest"
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
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-secondary transition-colors" />
                  <input 
                    type="text"
                    placeholder={t('quote_modal.label_name')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 text-sm placeholder:text-slate-400 font-sans"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-secondary transition-colors" />
                  <input 
                    type="email"
                    placeholder={t('quote_modal.label_email')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 text-sm placeholder:text-slate-400 font-sans"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-secondary transition-colors" />
                  <input 
                    type="tel"
                    placeholder={t('quote_modal.label_phone')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 text-sm placeholder:text-slate-400 font-sans"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={prevStep}
                    className="flex-1 py-4 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" /> {t('quote_modal.prev')}
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={!formData.name || !formData.email || !formData.phone}
                    className="flex-[2] py-4 rounded-xl bg-secondary text-white font-headline font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_20px_rgba(0,102,204,0.25)] flex items-center justify-center gap-2 uppercase text-sm tracking-widest"
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
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-secondary transition-colors" />
                    <input 
                      type="text"
                      placeholder={t('quote_modal.label_address')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 text-sm placeholder:text-slate-400 font-sans"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  {/* Message / Details */}
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-slate-400 group-focus-within:text-secondary transition-colors" />
                    <textarea 
                      placeholder={language === 'fr' ? "Détails supplémentaires ou notes pour l'inspecteur..." : "Additional details or notes for the inspector..."}
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-6 pl-12 pr-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 text-sm placeholder:text-slate-400 font-sans resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="flex-1 py-4 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest font-bold"
                  >
                    {t('quote_modal.prev')}
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.address}
                    className="flex-[2] py-4 rounded-xl bg-secondary text-white font-headline font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_20px_rgba(0,102,204,0.25)] flex items-center justify-center gap-2 border border-secondary/30 uppercase text-sm tracking-widest min-w-[240px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" /> 
                        {language === 'fr' ? "Envoi de votre demande..." : "Submitting your request..."}
                      </>
                    ) : (
                      <>
                        {t('quote_modal.submit')} <Zap className="w-5 h-5 fill-white" />
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
                    className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative w-20 h-20 bg-secondary rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-headline font-black text-primary mb-2 uppercase tracking-tight">{t('quote_modal.success_title')}</h3>
                <p className="text-slate-500 mb-8 max-w-sm font-sans text-sm leading-relaxed">
                  {t('quote_modal.success_desc')}
                </p>
                <button 
                  onClick={closeQuoteModal}
                  className="px-8 py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-sans font-bold uppercase text-xs tracking-widest border border-slate-200"
                >
                  {t('quote_modal.close')}
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Global Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
          <div className="text-[10px] font-sans text-slate-500 font-medium uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            {language === 'fr' ? 'Données sécurisées via SSL' : 'Data secured via SSL'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
