import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from 'lucide-react';
import React from 'react';
import { useTranslation } from '../../context/LanguageContext';

export function ContactPage() {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1000);
    };

    return (
        <main className="pt-24 min-h-screen bg-white">
            {/* Header Section */}
            <section className="relative overflow-hidden py-24 mb-16 px-6 lg:px-8 text-center bg-slate-50 border-b border-slate-200/60">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,102,204,0.04),transparent_70%)] pointer-events-none"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="font-headline text-5xl md:text-7xl font-black text-primary leading-none tracking-tighter mb-6 uppercase">
                        {t('contact_page.title').split(' ')[0]} <span className="text-secondary block md:inline">{t('contact_page.title').split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        {t('contact_page.desc')}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-6 lg:px-8 pb-32">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">

                    {/* Vertical Separator */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

                    {/* Contact Details */}
                    <div className="lg:pr-12">
                        <h2 className="font-headline text-3xl font-black text-primary uppercase tracking-tight mb-12">{t('nav.contact')}</h2>

                        <div className="space-y-12">
                            <div className="flex flex-col gap-4">
                                <span className="text-secondary text-xs font-headline font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Global Positioning
                                </span>
                                <div className="border border-slate-200 bg-slate-50 p-6 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300">
                                    <p className="text-primary font-sans text-sm leading-relaxed font-semibold">
                                        Primary Hub: Montréal, Québec <br />
                                        <span className="text-slate-500 mt-2 block font-medium">{t('trust.montreal')}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <span className="text-secondary text-xs font-headline font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> {t('contact_cta.phone_label')}
                                </span>
                                <div className="border border-slate-200 bg-slate-50 p-6 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300 flex justify-between items-center group">
                                    <a href="tel:+14383926208" className="text-primary text-2xl font-headline font-black tracking-tight group-hover:text-secondary transition-colors">(438) 392-6208</a>
                                    <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-secondary group-hover:translate-x-2 transition-all" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <span className="text-secondary text-xs font-headline font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Digital Dispatch
                                </span>
                                <div className="border border-slate-200 bg-slate-50 p-6 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300 flex justify-between items-center group">
                                    <a href="mailto:info@solutionscellanttoiture.com" className="text-primary font-sans font-bold text-sm group-hover:text-secondary transition-colors truncate pr-4">info@solutionscellanttoiture.com</a>
                                    <Send className="w-5 h-5 text-slate-400 group-hover:text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 pt-8 border-t border-slate-100">
                                <span className="text-primary text-xs font-headline font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-secondary" /> {t('footer.hours')}
                                </span>
                                <div className="bg-gradient-to-r from-secondary/5 to-transparent p-6 rounded-lg border-l-4 border-secondary">
                                    <p className="font-headline font-black text-primary uppercase text-xl mb-1">{t('footer.hours_val')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg relative lg:-mt-32">
                        <h3 className="font-headline text-2xl font-black text-primary uppercase mb-8 border-b border-slate-100 pb-4">{t('contact_page.subtitle')}</h3>

                        {submitted ? (
                            <div className="flex flex-col flex-1 h-full items-center justify-center text-center py-24 animate-fade-in-up">
                                <div className="w-20 h-20 bg-secondary/10 border border-secondary/50 rounded-full flex items-center justify-center mb-6 relative">
                                    <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full animate-pulse"></div>
                                    <Send className="w-10 h-10 text-secondary translate-x-1 relative z-10" />
                                </div>
                                <h4 className="font-headline font-black text-2xl text-primary uppercase tracking-tighter mb-2">{t('contact_page.success')}</h4>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-secondary font-headline font-bold uppercase text-xs tracking-widest border-b border-transparent hover:border-secondary pb-1 transition-colors"
                                >
                                    Re-Initiate Protocol
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-headline font-bold text-slate-500 uppercase tracking-widest block">{t('contact_page.form_name')}</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all font-sans text-sm"
                                        placeholder="Jean Tremblay"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-headline font-bold text-slate-500 uppercase tracking-widest block">{t('contact_page.form_email')}</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all font-sans text-sm"
                                        placeholder="jean.tremblay@exemple.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-headline font-bold text-slate-500 uppercase tracking-widest block">{t('contact_page.form_message')}</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-800 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all font-sans text-sm resize-none"
                                        placeholder="Detail your requirements..."
                                    ></textarea>
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    className={`w-full ${isSubmitting ? 'bg-secondary/50 text-white animate-pulse' : 'bg-secondary text-white hover:brightness-110 active:scale-[0.98]'} font-headline font-black uppercase tracking-widest p-4 rounded-lg flex items-center justify-center gap-3 transition-all`}
                                >
                                    {isSubmitting ? 'Sending...' : t('contact_page.form_send')}
                                    {!isSubmitting && <ChevronRight className="w-5 h-5" />}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </section>
        </main>
    );
}
