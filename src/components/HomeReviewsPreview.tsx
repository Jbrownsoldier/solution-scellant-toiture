import { Link } from 'react-router-dom';
import { Star, ArrowRight, Quote } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

function AnimatedRating() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.5 });
  // Count from 0 to 49, then display as "4.9"
  const raw = useCountUp(49, 1400, isVisible);
  const display = (raw / 10).toFixed(1);
  return (
    <span ref={ref} className="text-5xl font-headline font-black text-white tracking-tighter tabular-nums">
      {display}
    </span>
  );
}

export function HomeReviewsPreview() {
  return (
    <section className="px-6 lg:px-8 py-24 bg-surface relative overflow-hidden">
      {/* Pulsing background grid */}
      <div className="absolute inset-0 grid-pulse pointer-events-none" />
      
      {/* Floating ambient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none orb-float" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/6 rounded-full blur-[80px] pointer-events-none orb-float-delayed" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Stats Summary */}
            <ScrollReveal variant="fade-left">
            <div>
                <span className="text-secondary font-headline uppercase font-black tracking-widest text-sm mb-4 block">Proven Results</span>
                <h2 className="font-headline text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                    Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-500">Homeowners</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    Our GoNano roof treatments are backed by a 15-year guarantee and consistently earn 5-star reviews from homeowners across the Greater Montréal area.
                </p>

                <div className="flex items-center gap-6 mb-10">
                    <AnimatedRating />
                    <div className="h-12 w-px bg-white/10"></div>
                    <div>
                        <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-5 h-5 fill-secondary text-secondary" />
                            ))}
                        </div>
                        <div className="text-sm text-slate-400 font-headline tracking-wider uppercase">Average Rating</div>
                    </div>
                </div>

                <Link to="/reviews" className="btn btn-outline inline-flex flex-row items-center justify-center gap-2 group w-full sm:w-auto">
                    Read All Reviews
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
                <div className="glass-card p-10 rounded-2xl relative z-10">
                    <div className="flex gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-secondary text-secondary" />
                        ))}
                    </div>
                    <p className="text-lg text-white font-medium leading-relaxed mb-8">
                        "We were quoted $18,000 for a full roof replacement. Solution Scellant Toiture applied the GoNano treatment in under an hour — our roof looks brand new and we saved over $14,000. The team was professional, clean, and the 15-year warranty gives us total peace of mind."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary font-headline font-black shadow-lg shadow-secondary/20 border border-secondary/30">
                            ML
                        </div>
                        <div>
                            <div className="font-headline font-bold text-white uppercase tracking-tight">Marie Lefebvre</div>
                            <div className="text-sm text-secondary font-mono">GoNano Sealant Treatment · Laval</div>
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
