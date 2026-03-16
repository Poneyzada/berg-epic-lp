import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Section D: Philosophy Manifesto
export const Philosophy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const video = containerRef.current?.querySelector('video');
    
    const ctx = gsap.context(() => {
      gsap.from('.manifesto-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        }
      });

      if (video) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 80%',
          onEnter: () => {
            video.currentTime = 0;
            video.play();
            gsap.delayedCall(3.5, () => { video.pause(); });
          },
          onEnterBack: () => {
            video.currentTime = 0;
            video.play();
            gsap.delayedCall(3.5, () => { video.pause(); });
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="py-60 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          muted
          playsInline
          className="w-full h-full object-cover object-[center_25%] md:object-[center_45%] grayscale opacity-30"
        >
          <source src="/videos/berg-adidas.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={textRef} className="text-center">
          <p className="manifesto-reveal text-[10px] font-data font-bold text-white/70 uppercase tracking-[0.6em] mb-16">
            {t('philosophy.label')}
          </p>
          
          <h2 className="manifesto-reveal text-4xl md:text-7xl font-black uppercase mb-16 leading-[0.9] tracking-tighter italic">
            {t('philosophy.title1')} <span className="text-white/20">{t('philosophy.title2')}</span> <br />
            {t('philosophy.title3')} <span className="font-drama text-white italic">{t('philosophy.title4')}</span>
          </h2>

          <div className="manifesto-reveal h-px w-32 bg-white/20 mx-auto mb-16" />

          <p className="manifesto-reveal text-xl md:text-3xl text-white/80 font-medium max-w-4xl mx-auto leading-relaxed italic uppercase tracking-tight">
            {t('philosophy.quote')}
          </p>
        </div>
      </div>
    </section>
  );
};

// Section E: Protocol Stacking Cards
export const ProtocolStack = ({ onAction }: { onAction: (type: 'filter' | 'seminar') => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const stepTargets = ['#slx', '#pressao', '#5050'];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card: any, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: '+=100%', 
          pin: true,
          pinSpacing: false, 
          onUpdate: (self) => {
            const progress = self.progress;
            const exitProgress = Math.max(0, (progress - 0.5) * 2); 
            gsap.set(card, {
              scale: 1 - exitProgress * 0.03,
              opacity: 1 - exitProgress * 0.8,
              filter: `blur(${exitProgress * (isMobile ? 5 : 10)}px)`
            });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = t('protocol.steps', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
    mood: string;
    cta: string;
  }>;

  const ids = ['01', '02', '03'];

  return (
    <div ref={containerRef} className="bg-black pb-60 px-4">
      <div className="max-w-7xl mx-auto">
        {steps.map((step, i) => (
          <div 
            key={i} 
            className="protocol-card glass-card min-h-screen mb-[80vh] p-12 md:p-32 flex flex-col md:flex-row gap-20 items-center relative overflow-hidden group border-white/5"
          >
            {/* Background Video */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale">
                 <source src={['/videos/berg-legwave.mp4', '/videos/passagem-pressao.mp4', '/videos/berg-war.mp4'][i]} type="video/mp4" />
               </video>
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="flex-1 z-10 relative">
               <span className="text-6xl md:text-[14rem] font-black text-white/[0.03] font-data absolute -top-20 -left-10 leading-none">
                  {ids[i]}
               </span>
               <h3 className="text-white text-5xl md:text-8xl font-black uppercase italic mb-8 tracking-tighter leading-[0.8]">
                  {step.title.split(' ')[0]} <br />
                  <span className="font-drama text-white italic">{step.title.split(' ').slice(1).join(' ')}</span>
               </h3>
                <p className="text-white/80 text-sm md:text-lg uppercase tracking-widest leading-relaxed mb-12 max-w-xl font-data">
                  {step.desc}
                </p>
                <div className="mb-16">
                   <a 
                     href={stepTargets[i]}
                     className="inline-block px-6 py-3 border border-white/50 hover:border-white text-[9px] font-bold uppercase tracking-[0.4em] text-white transition-all rounded-full"
                   >
                     {step.cta}
                   </a>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-px bg-white/20" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80 mb-1">{step.mood}</span>
                    <span className="text-[8px] font-data text-white/50 uppercase tracking-[0.3em]">{t('protocol.verified')}</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 z-10 relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors shadow-2xl">
                <div className="w-full h-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 transition-opacity">
                      <source src={['/videos/berg-legwave.mp4', '/videos/passagem-pressao.mp4', '/videos/berg-war.mp4'][i]} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
