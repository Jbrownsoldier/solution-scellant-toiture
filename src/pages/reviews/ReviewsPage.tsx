import { useEffect, useRef } from 'react';
import { Star, ShieldCheck, Zap, Quote, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: "Jackson Yeung",
    stars: 5,
    date: "March 2026",
    text: "We had Dan of Next Step Electric install a 48A EV charger this week. He was quick to return our initial call, and super detailed over the phone. Booking was fast for our first visit/quote. He was punctual and completed the work exactly as described and quick! Neat and tidy. Thanks for the quick turnaround on our charger!",
    initials: "JY"
  },
  {
    name: "Vicky S",
    stars: 5,
    date: "March 2026",
    text: "I am very impressed by Next Step Electric's work. Dan replied to my initial quote inquiry fast, and scheduled for the diagnostic/repair of some light fixtures very soon after. He was professional, informative, and got the job done quickly. Highly recommend!",
    initials: "VS"
  },
  {
    name: "Daniel Gipps",
    stars: 5,
    date: "March 2026",
    text: "Dan did an excellent job installing two 30amp breakers, an outlet, and a disconnect panel for a dryer and electric heat pump water heater install. He arrived promptly, and was very detailed in explaining several important safety features of the install. Clean and efficient work all around.",
    initials: "DG"
  },
  {
    name: "Arash Karami",
    stars: 5,
    date: "November 2025",
    text: "Dan did an amazing job with our project. He is very knowledgeable and patient. He explained everything in detail and made sure we were comfortable with the results. Highly professional and strongly recommended.",
    initials: "AK"
  },
  {
    name: "E. G.",
    stars: 5,
    date: "December 2025",
    text: "I highly recommend Dan and Next Step Electric. He installed a hardwired level 2 EV charger in our garage. Dan provided a competitive quote and showed up right on time. He was professional, courteous and finished the job according to the plan. He left the garage spotless. Will definitely hire Next Step Electric for any future projects.",
    initials: "EG"
  },
  {
    name: "Carly Steinberg",
    stars: 5,
    date: "February 2026",
    text: "Danny did a great job on a 1-day project at our house! He was efficient, communicative, and tidy, and we are very satisfied with the work. Pricing was also very reasonable. We will definitely hire him again for future needs!",
    initials: "CS"
  },
  {
    name: "Dave Ferguson",
    stars: 5,
    date: "November 2025",
    text: "Based on so many positive reviews, I contacted Dan to install an EV car charger at our home. His great reviews are well deserved! Within an hour of sending him an initial email, he responded. He did extra research on the model of the car I was getting to ensure I bought the right type of charger. We set up an appointment and he arranged the necessary electrical inspection. He is friendly, professional and responsive. Will definitely use him again.",
    initials: "DF"
  },
  {
    name: "Chris S",
    stars: 5,
    date: "November 2025",
    text: "Dan did an excellent job with the panel upgrade and some additional wiring. He was very professional, clearly explained the work that needed to be done and completed it on time and within the quoted price. Highly recommended!",
    initials: "CS"
  },
  {
    name: "Zachary Rubens",
    stars: 5,
    date: "August 2025",
    text: "We had an amazing experience working with Dan. He came in to swap our panel from 100A to a smart 200A panel, hook up the electricity for our heat pump and set up the heater and backyard electricity for a sauna. From first communication, Dan was incredibly informative, professional and prompt. During everything, he clearly communicated the progress and answered every question we had. We can't recommend Dan more! High quality work and incredibly knowledgeable.",
    initials: "ZR"
  },
  {
    name: "G No",
    stars: 5,
    date: "March 2026",
    text: "Next Step Electric replaced a faulty breaker in our panel. Dan was professional, efficient, and clearly explained what the issue was. He arrived on time and the pricing was very fair. Highly recommend!",
    initials: "GN"
  },
  {
    name: "Sarah L",
    stars: 5,
    date: "November 2025",
    text: "Dan did a great job installing our new light fixtures. He was punctual, professional, and very detail-oriented. The fixtures look great and he left the area clean. I would highly recommend Next Step Electric!",
    initials: "SL"
  },
  {
    name: "Mark Thompson",
    stars: 5,
    date: "October 2025",
    text: "I had Next Step Electric install a subpanel in my garage. Dan was very professional and did a great job. He explained everything clearly and the final result was very neat and tidy. I'm very happy with the work and would recommend him to anyone!",
    initials: "MT"
  },
  {
    name: "Julie Miller",
    stars: 5,
    date: "September 2025",
    text: "Dan was very helpful and professional. He fixed several electrical issues in our home quickly and efficiently. His pricing was fair and he took the time to explain what he was doing. I would highly recommend him!",
    initials: "JM"
  },
  {
    name: "Homa Homayoun",
    stars: 5,
    date: "2024",
    text: "Dan provided excellent service. He was on time, very professional, and knowledgeable. He fixed the issue quickly and was very reasonable with his pricing. I would highly recommend him and will definitely be using his services again in the future.",
    initials: "HH"
  },
  {
    name: "G. S.",
    stars: 5,
    date: "October 2025",
    text: "Dan was a pleasure to work with. He was very professional, polite and his work was very clean and methodical. He took the time to explain everything and ensure that we were satisfied before he left. I would definitely recommend Dan for any electrical work you may have.",
    initials: "GS"
  }
];

export function ReviewsPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll Animation
      const track = trackRef.current;
      const container = scrollContainerRef.current;
      
      if (!track || !container) return;

      const totalScroll = track.scrollWidth - container.offsetWidth;

      // Pin the section and scroll the track horizontally
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

      // Mouse-move parallax effect (subtle shift based on mouse position within the view)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40; // Max 40px shift
        gsap.to(track, {
          xPercent: xPos / (track.scrollWidth / window.innerWidth) * 0.5,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    });

    return () => ctx.revert();
  }, []);

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
            Proof of Excellence
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-6 uppercase">
            Customer <span className="text-secondary">Impact</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Real stories from homeowners and businesses across Montreal. Every review is a testament to our safety-first protocols and precise engineering.
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
                 Safety Compliant
               </div>
               <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">ESA Inspected</div>
             </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Testimonial Section */}
      <section ref={scrollContainerRef} className="relative h-screen flex items-center bg-primary overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <div className="font-headline font-black text-[25vw] uppercase leading-none whitespace-nowrap">
            TRUSTED • RELIABLE • PRECISE
          </div>
        </div>

        <div className="w-full">
            <div 
              ref={trackRef} 
              className="flex gap-8 px-[10vw] w-max will-change-transform py-20"
            >
                {REVIEWS.map((review, idx) => (
                    <div 
                        key={idx}
                        className="w-[85vw] md:w-[450px] flex-shrink-0 bg-surface border border-white/5 p-8 md:p-10 rounded-2xl relative group hover:border-secondary/30 transition-all duration-500 shadow-2xl glass-card backdrop-blur-md"
                    >
                        {/* Quote Icon Background */}
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

                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                    </div>
                ))}
            </div>
        </div>

        {/* Scroll Progress Indicator Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <span className="text-[10px] font-headline font-bold text-slate-500 uppercase tracking-widest leading-none">Scroll to Explore</span>
            <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary" 
                style={{ 
                  animation: "scroll-progress-line 3s infinite linear",
                }}
              />
            </div>
        </div>
      </section>

      {/* CTA / Google Link Section */}
      <section className="py-32 px-6 lg:px-8 border-t border-white/5 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
           <div className="inline-flex items-center gap-2 mb-8 bg-surface border border-white/5 px-4 py-2 rounded-full">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span className="text-white text-sm font-headline font-bold uppercase tracking-tight">Verified on Google Maps</span>
           </div>
           
           <h2 className="font-headline text-4xl font-black text-white uppercase mb-8 tracking-tighter">
             Write Your Own <span className="text-secondary italic">Validation</span>
           </h2>
           
           <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
             Just finished a project with us? We'd love to hear your feedback. Your detailed reviews help us maintain the highest standards in Montreal.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://www.google.com/search?sca_esv=59b2ea9ff3a4eeff&sxsrf=ANbL-n5FGLwkPduGdcy5xVMKroIJLhBrVg:1774249325268&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOVKTo1EixGiML4UNoaBkAqrjZM-9nefpkrNIywh_3u0xDDWqhGf4BUbnf9vZOvSPLhQ-fb41kh57WIeIeCrgXV8H7UBnXSa-6w-NswsgEvXknt4Dfw%3D%3D&q=Symmetric+Electric+Ltd.+Reviews&sa=X&ved=2ahUKEwiG-pnmubWTAxUwL9AFHVeBCZAQ0bkNegQIOBAH&biw=1728&bih=996&dpr=2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white text-primary px-8 py-4 rounded font-headline font-black uppercase tracking-widest text-xs hover:bg-secondary transition-colors w-full sm:w-auto justify-center"
              >
                Launch Google Reviews
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              
              <a 
                href="#contact"
                className="btn btn-outline px-8 py-4 w-full sm:w-auto"
              >
                Book Your Project
              </a>
           </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll-progress-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .glass-card {
          background: rgba(10, 25, 47, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
    </main>
  );
}

