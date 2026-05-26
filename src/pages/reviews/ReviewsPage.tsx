import { useEffect, useRef } from 'react';
import { Star, ShieldCheck, Zap, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS_BY_LANG: Record<string, Array<{ name: string; stars: number; date: string; text: string; initials: string }>> = {
  fr: [
    {
      name: "Marie Lefebvre",
      stars: 5,
      date: "Mai 2026",
      text: "Nous avons économisé plus de 14 000 $ en optant pour le traitement scellant protecteur au lieu de remplacer notre toiture complète. L'équipe a été fantastique et ultra rapide !",
      initials: "ML"
    },
    {
      name: "Jean Tremblay",
      stars: 5,
      date: "Avril 2026",
      text: "Une inspection très honnête et méticuleuse. Ils m'ont montré des photos de l'état de mes bardeaux avant d'appliquer le traitement. Je recommande fortement !",
      initials: "JT"
    },
    {
      name: "Sophie Girard",
      stars: 5,
      date: "Avril 2026",
      text: "Le traitement a été complété en 45 minutes. L'effet perlant lors de la première pluie après l'application est tout simplement magique. Plus aucun déchet de bardeaux dans mes gouttières.",
      initials: "SG"
    },
    {
      name: "Pierre Bouchard",
      stars: 5,
      date: "Mars 2026",
      text: "Excellent service à la clientèle. La garantie transférable de 15 ans ajoute une valeur importante pour ma maison. Solution écologique formidable !",
      initials: "PB"
    }
  ],
  en: [
    {
      name: "Marie Lefebvre",
      stars: 5,
      date: "May 2026",
      text: "We saved over $14,000 by choosing the protective sealing treatment instead of a full roof replacement. The team was fantastic and super fast!",
      initials: "ML"
    },
    {
      name: "Jean Tremblay",
      stars: 5,
      date: "April 2026",
      text: "A very honest and meticulous roof inspection. They showed me photos of my shingles' condition before applying the treatment. Highly recommend!",
      initials: "JT"
    },
    {
      name: "Sophie Girard",
      stars: 5,
      date: "April 2026",
      text: "The treatment was done in 45 minutes. The water-beading effect during the first rain was magical. No more shingle granules falling into my gutters.",
      initials: "SG"
    },
    {
      name: "Pierre Bouchard",
      stars: 5,
      date: "March 2026",
      text: "Outstanding customer service. The 15-year transferable warranty adds great value to my home. Wonderful eco-friendly solution!",
      initials: "PB"
    }
  ]
};

export function ReviewsPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { language, t } = useTranslation();

  const reviews = REVIEWS_BY_LANG[language] || REVIEWS_BY_LANG['fr'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = scrollContainerRef.current;
      
      if (!track || !container) return;

      const totalScroll = track.scrollWidth - container.offsetWidth;
      if (totalScroll <= 0) return;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => ctx.revert();
  }, [reviews]);

  return (
    <main className="min-h-screen bg-primary pt-24 overflow-x-hidden">
      {/* Header Section */}
      <section className="relative py-20 px-6 lg:px-8 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-slate-500/10 rounded-full blur-[80px]"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-white/5 text-slate-400 rounded-full text-xs font-headline font-bold tracking-[0.2em] uppercase mb-6">
            <Zap className="w-3 h-3 animate-pulse text-secondary" />
            {t('reviews.proven')}
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-6 uppercase">
            {t('reviews_page.title').split(' ')[0]} <span className="text-secondary">{t('reviews_page.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            {t('reviews_page.desc')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12 mb-4">
             <div className="flex flex-col items-center">
                <div className="text-4xl font-headline font-black text-white italic">5.0</div>
                <div className="flex gap-1 my-2">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-secondary text-secondary" />)}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Google Rating</div>
             </div>
             <div className="w-px h-16 bg-white/10 hidden sm:block"></div>
             <div className="flex flex-col items-center">
                <div className="text-4xl font-headline font-black text-white">100%</div>
                <div className="flex gap-1 my-2 text-secondary font-headline font-bold text-xs uppercase tracking-tighter">
                  {t('trust.rbq')}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{t('trust.rbq_sub')}</div>
             </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Testimonial Section */}
      <section ref={scrollContainerRef} className="relative h-[80vh] flex items-center bg-primary overflow-hidden">
        <div className="w-full">
            <div 
              ref={trackRef} 
              className="flex gap-8 px-[10vw] w-max will-change-transform py-10"
            >
                {reviews.map((review, idx) => (
                    <div 
                        key={idx}
                        className="w-[85vw] md:w-[450px] flex-shrink-0 bg-surface border border-white/5 p-8 md:p-10 rounded-2xl relative group hover:border-secondary/30 transition-all duration-500 shadow-2xl glass-card backdrop-blur-md"
                    >
                        <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 group-hover:text-secondary/10 transition-colors" />
                        
                        <div className="flex gap-1 mb-8">
                            {[...Array(review.stars)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                            ))}
                        </div>

                        <p className="text-white text-lg md:text-xl leading-relaxed mb-10 font-medium italic relative z-10">
                            "{review.text}"
                        </p>

                        <div className="mt-auto flex items-center gap-4 border-t border-white/10 pt-8">
                            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary font-headline font-black text-lg shadow-lg shadow-secondary/20">
                                {review.initials}
                            </div>
                            <div>
                                <h4 className="text-white font-headline font-bold uppercase tracking-tight text-base">{review.name}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-500 font-mono italic">{review.date}</span>
                                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                  <span className="text-[10px] text-secondary font-headline uppercase font-bold tracking-widest">Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <style>{`
        .glass-card {
          background: rgba(10, 25, 47, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
    </main>
  );
}
