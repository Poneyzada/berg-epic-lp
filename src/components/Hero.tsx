import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line span', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[90dvh] md:h-[100dvh] w-full overflow-hidden bg-[#0D0D12]"
    >
      {/* Hero Background Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/berg-rosto.jpg"
          alt="Gutemberg Pereira"
          className="w-full h-full object-cover object-[center_15%] md:object-center brightness-[0.45] grayscale"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=2000";
          }}
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24 md:pb-32">
        <div ref={textRef} className="max-w-3xl">
          <div className="hero-line overflow-hidden mb-4">
            <span className="inline-block text-[10px] md:text-xs font-data font-black uppercase tracking-[0.5em] text-white/80">
              {t('hero.label')}
            </span>
          </div>
          <h1 className="hero-line text-5xl md:text-8xl lg:text-9xl font-black uppercase italic leading-[0.85] tracking-tighter mb-8">
            <span className="block">{t('hero.title1')}</span>
            <span className="block text-white/20">{t('hero.title2')}</span>
          </h1>
          <p className="hero-line text-[10px] md:text-sm uppercase tracking-widest text-white/70 max-w-xl leading-relaxed mb-10 md:mb-12 font-data">
            {t('hero.subtitle').split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
            ))}
          </p>
          
          <div className="hero-line flex flex-col md:flex-row gap-4 md:gap-6">
            <a 
              href="#courses"
              className="px-8 py-4 md:px-10 md:py-5 bg-white text-black font-black uppercase italic tracking-tighter hover:bg-white/90 transition-all rounded-full flex items-center justify-center gap-3 text-sm md:text-base"
            >
              <span>{t('hero.cta')}</span>
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Kinetic Footer */}
      <div className="absolute bottom-10 left-6 hidden md:flex items-center gap-4 text-[8px] font-bold uppercase tracking-[0.4em] text-white/40">
        <div className="w-8 h-[1px] bg-white/10" />
        <span>{t('hero.kinetic')}</span>
      </div>
    </section>
  );
};
