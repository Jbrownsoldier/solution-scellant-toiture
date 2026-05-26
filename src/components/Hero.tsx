/**
 * Hero.tsx — Premium Pinned Video Hero Section
 *
 * Scroll timeline (desktop ≥ 768 px):
 *   0 % – 20 % : Headline + CTA fully opaque, pinned.
 *  20 % – 60 % : Headline scales to 1.05 and fades out.
 *  60 % – 85 % : Secondary (sub) text fades in from below.
 *  85 % – 100 %: Section unpins; next section slides up naturally.
 *
 * Mobile (< 768 px): No pinning, no scroll animations — static hero.
 *
 * Video asset: /public/electric-video.mp4
 */

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useQuoteModal } from '../context/QuoteContext';
import { useTranslation } from '../context/LanguageContext';

// Register the plugin once at module level
gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const { openQuoteModal } = useQuoteModal();
  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState(false);

  /* ── Refs ─────────────────────────────────────────────────────────── */
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const subTextRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP (≥ 768 px) ──────────────────────────────────────────
      mm.add('(min-width: 768px)', () => {
        const section  = sectionRef.current!;
        const headline = headlineRef.current!;
        const cta      = ctaRef.current!;
        const sub      = subTextRef.current!;

        gsap.set(sub, { autoAlpha: 0, y: 40 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        tl.addLabel('hold-start', 0)
          .addLabel('hold-end', 0.2);

        tl.to(
          headline,
          { scale: 1.05, autoAlpha: 0, ease: 'power2.inOut' },
          0.2
        )
          .to(cta, { autoAlpha: 0, ease: 'power2.inOut' }, 0.2)
          .addLabel('headline-gone', 0.6);

        tl.to(
          sub,
          { autoAlpha: 1, y: 0, ease: 'power3.out' },
          0.6
        )
          .addLabel('sub-visible', 0.85);
      });

      // ── MOBILE (< 768 px) ───────────────────────────────────────────
      mm.add('(max-width: 767px)', () => {
        gsap.set([headlineRef.current, ctaRef.current, subTextRef.current], {
          clearProps: 'all',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="hero-video-section relative w-full h-screen overflow-hidden"
    >
      {/* ── Background visual ─────────────────────────────────────────── */}
      <video
        className="hero-video-bg bg-[#0E1B2A] bg-[radial-gradient(ellipse_at_center,rgba(26,158,143,0.15),transparent)]"
        src="/hero-roof-sealing.mp4"
        poster="/roof-after.png"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        aria-hidden="true"
      />

      {/* ── Gradient overlay ── */}
      <div className="hero-video-overlay" aria-hidden="true" />

      {/* ── Decorative ambient grid ──────── */}
      <div className="absolute inset-0 grid-pulse pointer-events-none opacity-30" />

      {/* ── Content container ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 text-center">

        {/* ── Badge ────────────────────────────────────────────────────── */}
        <span className="text-[#1A9E8F] font-headline font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-6 bg-[#1A9E8F]/10 px-4 py-1.5 rounded-full border border-[#1A9E8F]/20 inline-block">
          {t('hero.badge')}
        </span>

        {/* ── Headline (fades out on scroll) ───────────────────────────── */}
        <div ref={headlineRef} className="will-change-transform will-change-opacity">
          <h1 className="hero-headline">
            {t('hero.headline_1')}{' '}
            <span className="text-[#1A9E8F]">{t('hero.headline_highlight').split(' ')[0]}</span>{' '}
            <span className="text-[#1A9E8F]">{t('hero.headline_highlight').split(' ').slice(1).join(' ')}</span>
          </h1>
        </div>

        {/* ── CTA buttons (fades out with headline) ────────────────────── */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 items-center mt-10 will-change-opacity"
        >
          <button
            onClick={openQuoteModal}
            className="hero-cta-primary btn-magnetic"
            aria-label="Get a free roof estimate"
          >
            <span>{t('hero.cta_primary')}</span>
            <ArrowRight className="w-5 h-5 flex-shrink-0" />
          </button>

          <a
            href="tel:+14383926208"
            className="hero-cta-secondary"
            aria-label="Call Solution Scellant Toiture"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>(438) 392-6208</span>
          </a>
        </div>

        {/* ── Sub-text (fades IN once headline fades out) ───────────────── */}
        <div
          ref={subTextRef}
          className="max-w-3xl mt-0 will-change-opacity"
        >
          <p className="hero-sub-text">
            {t('hero.subtext')}
          </p>

          <button
            onClick={openQuoteModal}
            className="hidden md:flex hero-cta-primary btn-magnetic mt-8"
            aria-label="Get a free roof estimate"
          >
            <span>{t('hero.cta_primary')}</span>
            <ArrowRight className="w-5 h-5 flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* ── Bottom fade into next section ────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(14,27,42,0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Scroll nudge indicator (desktop) ─────────────────────────── */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="hero-scroll-pill" />
      </div>
    </section>
  );
}

