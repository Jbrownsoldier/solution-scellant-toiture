import { Phone, Shield, Clock, Zap, ArrowRight, Activity, Terminal } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteContext';
import { useTranslation } from '../context/LanguageContext';

export function ContactCTA() {
  const { openQuoteModal } = useQuoteModal();
  const { t } = useTranslation();

  return (
    <section id="contact-form" className="py-24 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-12">
          <header>
            <h2 className="font-headline text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-6 uppercase">
              {t('contact_cta.title_1')} <br/><span className="text-secondary text-glow">{t('contact_cta.title_highlight')}</span>
            </h2>
            <p className="text-on-primary-container text-lg max-w-md leading-relaxed">
              {t('contact_cta.desc')}
            </p>
          </header>

          <div className="space-y-6">
            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-secondary/30 transition-all group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <span className="text-secondary font-headline font-bold text-[10px] uppercase tracking-[0.2em] block mb-1">{t('contact_cta.phone_label')}</span>
                <p className="text-white text-xl font-bold font-headline">(514) 613-6904</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-secondary/30 transition-all group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <span className="text-secondary font-headline font-bold text-[10px] uppercase tracking-[0.2em] block mb-1">{t('trust.rbq')}</span>
                <p className="text-white text-xl font-bold font-headline">{t('trust.rbq_sub')}</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-secondary/30 transition-all group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <span className="text-secondary font-headline font-bold text-[10px] uppercase tracking-[0.2em] block mb-1">{t('contact_cta.response_label')}</span>
                <p className="text-white text-xl font-bold font-headline">{t('contact_cta.response_time')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel Container */}
        <div className="lg:col-span-7">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-secondary/40 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-slate-900 border border-white/5 rounded-2xl p-8 md:p-12 overflow-hidden min-h-[500px] flex flex-col justify-center text-center">
              {/* Decorative scanline and grid */}
              <div className="absolute inset-0 grid-pulse opacity-10 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-8 p-4 rounded-full bg-secondary/10 border border-secondary/20 shadow-[0_0_30px_rgba(26,158,143,0.2)]">
                  <Terminal className="w-12 h-12 text-secondary animate-pulse" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter uppercase font-headline">
                  {t('contact_cta.online_label')}
                </h3>
                
                <p className="text-slate-400 mb-10 max-w-sm leading-relaxed">
                  {t('contact_cta.online_desc')}
                </p>

                <button 
                  onClick={openQuoteModal}
                  className="relative px-12 py-5 bg-secondary text-primary font-headline font-black text-xl uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(26,158,143,0.4)] hover:shadow-[0_0_40px_rgba(26,158,143,0.6)] transform hover:-translate-y-1 transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {t('contact_cta.cta_btn')} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  
                  <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full overflow-hidden">
                    <div className="h-full bg-white w-1/3 animate-[shimmer_2s_infinite]" />
                  </div>
                </button>

                <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-secondary" />
                    <span className="text-[10px] font-mono text-white uppercase tracking-widest">{t('contact_cta.feature_1')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-secondary" />
                    <span className="text-[10px] font-mono text-white uppercase tracking-widest">{t('contact_cta.feature_2')}</span>
                  </div>
                </div>
              </div>

              {/* Decorative side text */}
              <div className="absolute bottom-4 right-6 text-[8px] font-mono text-slate-700 pointer-events-none uppercase tracking-[0.4em] rotate-90 origin-right">
                {t('contact_cta.footer_tag')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
