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

      // Signature Adidas Flash Animation
      if (video) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 80%',
          onEnter: () => {
            video.currentTime = 0;
            video.play();
            // Stop after 3 seconds (Adidas logo flash)
            gsap.delayedCall(3.5, () => {
              video.pause();
            });
          },
          onEnterBack: () => {
            video.currentTime = 0;
            video.play();
            gsap.delayedCall(3.5, () => {
              video.pause();
            });
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="py-60 bg-black relative overflow-hidden">
      {/* Cinematic Video Background with High Blur */}
      <div className="absolute inset-0 z-0">
        <video
          muted
          playsInline
          className="w-full h-full object-cover grayscale opacity-30"
        >
          <source src="/videos/berg-adidas.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[40px]" />
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
          start: 'top top',
          end: '+=100%', 
          pin: true,
          pinSpacing: false, 
          onUpdate: (self) => {
            const progress = self.progress;
            // Linear and smooth exit starting from 50%
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

  return (
    <div ref={containerRef} className="bg-black pb-60 px-4">
      <div className="max-w-7xl mx-auto">
        {steps.map((step, i) => (
          <div 
            key={step.id} 
            className="protocol-card glass-card min-h-screen mb-[80vh] p-12 md:p-32 flex flex-col md:flex-row gap-20 items-center relative overflow-hidden group border-white/5"
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
               {/* Social Action Buttons - PC (Shoulder) & Mobile (Side) */}
        <div className="absolute top-40 md:top-1/2 md:-translate-y-1/2 right-6 z-30 flex flex-col gap-4">
            <a 
              href="https://www.youtube.com/@GuPereira"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group backdrop-blur-sm text-white/40"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform w-5 h-5 md:w-6 md:h-6"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0 2 2 0 0 1 1.4 1.4 24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0 2 2 0 0 1-1.4-1.4z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
            <a 
              href="https://www.instagram.com/gupereirabjj/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group backdrop-blur-sm text-white/40"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform w-5 h-5 md:w-6 md:h-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
        </div>
                <p className="text-white/40 text-sm md:text-lg uppercase tracking-widest leading-relaxed mb-12 max-w-xl font-data">
                  {step.desc}
                </p>
                <div className="mb-16">
                   <a 
                     href={step.target}
                     className="inline-block px-6 py-3 border border-white/20 hover:border-white text-[9px] font-bold uppercase tracking-[0.4em] transition-all rounded-full"
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
