import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Section D: Philosophy Manifesto
export const Philosophy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="py-60 bg-black relative overflow-hidden">
      {/* Cinematic Video Background with High Blur */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale opacity-30"
        >
          <source src="/videos/berg-adidas.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[100px]" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={textRef} className="text-center">
          <p className="manifesto-reveal text-[10px] font-data font-bold text-white/40 uppercase tracking-[0.6em] mb-16">
            O Protocolo Inabalável
          </p>
          
          <h2 className="manifesto-reveal text-4xl md:text-7xl font-black uppercase mb-16 leading-[0.9] tracking-tighter italic">
            A maioria tenta <span className="text-white/20">sobreviver.</span> <br />
            Nós buscamos <span className="font-drama text-white italic">Soberania.</span>
          </h2>

          <div className="manifesto-reveal h-px w-32 bg-white/20 mx-auto mb-16" />

          <p className="manifesto-reveal text-xl md:text-3xl text-white/60 font-medium max-w-4xl mx-auto leading-relaxed italic uppercase tracking-tight">
            "Não é sobre força bruta. É sobre a <span className="text-white">conexão invisível</span> entre gravidade, alavanca e o colapso estrutural do oponente."
          </p>
        </div>
      </div>
    </section>
  );
};

// Section E: Protocol Stacking Cards
export const ProtocolStack = ({ onAction }: { onAction: (type: 'filter' | 'seminar') => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: '01',
      title: 'Structural Breakdown',
      desc: 'Desconstruímos cada centímetro de contato. Protocolos baseados em gravidade e precisão matemática. (Single Leg X Focus)',
      video: '/videos/berg-legwave.mp4',
      mood: 'Escaneamento de Protocolo',
      cta: 'Ver Protocolo Essencial',
      target: '#slx'
    },
    {
      id: '02',
      title: 'Elite Connection',
      desc: 'A ciência da pressão deadweight aplicada à passagem de guarda. Onde o equilíbrio do oponente desmorona. (Foco em Pressão)',
      video: '/videos/passagem-pressao.mp4',
      mood: 'Conexão Neural',
      cta: 'Dominar a Pressão',
      target: '#pressao'
    },
    {
      id: '03',
      title: 'Full Sovereignty',
      desc: 'O ápice do protocolo. Onde a técnica absoluta se traduz em domínio inquestionável no tatame.',
      video: '/videos/berg-war.mp4',
      mood: 'Execução Final',
      cta: 'Acessar Elite Sovereignty',
      target: '#5050'
    }
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card: any, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: isMobile ? 'top 15%' : 'top 10%',
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(card, {
              scale: 1 - progress * 0.05,
              opacity: 1 - progress * 0.6,
              filter: `blur(${progress * (isMobile ? 2 : 5)}px)`
            });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black pb-60 px-4">
      <div className="max-w-7xl mx-auto">
        {steps.map((step, i) => (
          <div 
            key={step.id} 
            className="protocol-card glass-card min-h-[70vh] mb-40 p-12 md:p-32 flex flex-col md:flex-row gap-20 items-center relative overflow-hidden group border-white/5"
          >
            {/* Background Content */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000">
               {step.video && (
                 <video
                   autoPlay
                   loop
                   muted
                   playsInline
                   className="w-full h-full object-cover grayscale"
                 >
                   <source src={step.video} type="video/mp4" />
                 </video>
               )}
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="flex-1 z-10 relative">
               <span className="text-6xl md:text-[14rem] font-black text-white/[0.03] font-data absolute -top-20 -left-10 leading-none">
                  {step.id}
               </span>
               <h3 className="text-5xl md:text-8xl font-black uppercase italic mb-8 tracking-tighter leading-[0.8]">
                  {step.title.split(' ')[0]} <br />
                  <span className="font-drama text-white italic">{step.title.split(' ')[1]}</span>
               </h3>
                <p className="text-white/40 text-sm md:text-lg uppercase tracking-widest leading-relaxed mb-12 max-w-xl font-data">
                  {step.desc}
                </p>
                <div className="mb-16">
                   <a 
                     href={step.target}
                     className="inline-block px-8 py-4 border border-white/20 hover:border-white text-[10px] font-bold uppercase tracking-[0.4em] transition-all rounded-full"
                   >
                     {step.cta}
                   </a>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-px bg-white/20" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 mb-1">{step.mood}</span>
                    <span className="text-[8px] font-data text-white/20 uppercase tracking-[0.3em]">Protocolo Verificado</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 z-10 relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors shadow-2xl">
                <div className="w-full h-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 transition-opacity"
                    >
                      <source src={step.video} type="video/mp4" />
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
