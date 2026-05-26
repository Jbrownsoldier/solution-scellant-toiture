import { Link } from 'react-router-dom';
import { Star, ArrowRight, Quote } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import { useTranslation } from '../context/LanguageContext';

function AnimatedRating() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.5 });
  // Count from 0 to 49, then display as "4.9"
  const raw = useCountUp(49, 1400, isVisible);
  const display = (raw / 10).toFixed(1);
  return (
    <span ref={ref} className="text-5xl font-headline font-black text-primary tracking-tighter tabular-nums">
      {display}
    </span>
  );
}

export function HomeReviewsPreview() {
  const { t } = useTranslation();

  return (
    <section className="px-6 lg:px-8 py-24 bg-surface relative overflow-hidden">
      {/* Pulsing background grid */}
      <div className="absolute inset-0 grid-pulse pointer-events-none opacity-40" />
      
      {/* Floating ambient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none orb-float" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none orb-float-delayed" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Stats Summary */}
            <ScrollReveal variant="fade-left">
            <div>
                <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-4 block">{t('reviews.proven')}</span>
                <h2 className="font-headline text-4xl lg:text-5xl font-black text-primary uppercase tracking-tighter mb-6">
                    {t('reviews.trusted')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-500">{t('reviews.homeowners')}</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    {t('reviews.desc')}
                </p>

                <div className="flex items-center gap-6 mb-10">
                    <AnimatedRating />
                    <div className="h-12 w-px bg-slate-200"></div>
                    <div>
                        <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-5 h-5 fill-secondary text-secondary" />
                            ))}
                        </div>
                        <div className="text-sm text-slate-500 font-headline tracking-wider uppercase">{t('reviews.avg_rating')}</div>
                    </div>
                </div>

                <Link to="/reviews" className="btn btn-outline inline-flex flex-row items-center justify-center gap-2 group w-full sm:w-auto">
                    {t('reviews.read_all')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
            </ScrollReveal>

            {/* Featured Quote */}
            <ScrollReveal variant="fade-right" delay={0.15}>
            <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-secondary/20 rounded-lg backdrop-blur-sm border border-secondary/30 flex items-center justify-center z-20">
                    <Quote className="w-6 h-6 text-secondary" />
                </div>
                <div className="bg-primary border border-primary-container p-10 rounded-2xl relative z-10 shadow-glow-md">
                    <div className="flex gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-secondary text-secondary" />
                        ))}
                    </div>
                    <p className="text-lg text-white font-medium leading-relaxed mb-8 italic">
                        {t('reviews.quote')}
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-white font-headline font-black shadow-lg shadow-secondary/20 border border-secondary/30">
                            ML
                        </div>
                        <div>
                            <div className="font-headline font-bold text-white uppercase tracking-tight">{t('reviews.author')}</div>
                            <div className="text-sm text-secondary font-mono">{t('reviews.location')}</div>
                        </div>
                    </div>
                </div>
            </div>
            </ScrollReveal>

        </div>
      </div>
    </section>
  );
}

