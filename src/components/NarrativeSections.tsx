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
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-black relative overflow-hidden">
      {/* Background Texture */}
      <div 
        className="absolute inset-0 opacity-10 grayscale pointer-events-none"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1550537677-c990eb23badb?q=80&w=2574&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <div ref={textRef}>
          <p className="manifesto-reveal text-sm font-data font-bold text-white/40 uppercase tracking-[0.4em] mb-12">
            Nossa Filosofia
          </p>
          
          <h2 className="manifesto-reveal text-3xl md:text-5xl font-black uppercase mb-12 leading-tight">
            A maioria foca em <span className="text-white/20">repetição.</span> <br />
            Nós focamos em <span className="font-drama text-[#C9A84C]">Soberania Técnica.</span>
          </h2>

          <div className="manifesto-reveal h-px w-24 bg-[#C9A84C]/50 mx-auto mb-12" />

          <p className="manifesto-reveal text-lg md:text-2xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed italic">
            "O Jiu-Jitsu não é sobre quem é o mais forte, mas sobre quem tem o protocolo mais eficiente e a pressão mais conectada."
          </p>
        </div>
      </div>
    </section>
  );
};

// Section E: Protocol Stacking Cards
export const ProtocolStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: '01',
      title: 'Desconstrução',
      desc: 'Analisamos cada elo da sua técnica para encontrar fraquezas invisíveis no seu controle.',
      mood: 'Scanning Protocol'
    },
    {
      id: '02',
      title: 'Reconexão',
      desc: 'Aplicamos os conceitos de pressão deadweight e alavancas dinâmicas para máxima eficiência.',
      mood: 'Neural Connection'
    },
    {
      id: '03',
      title: 'Domínio',
      desc: 'O resultado final: um jogo fluido, pesado e tecnicamente superior em qualquer cenário.',
      mood: 'Final Execution'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card: any, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 10%',
          pin: true,
          pinSpacing: false,
          snap: 1 / (cards.length - 1),
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(card, {
              scale: 1 - progress * 0.05,
              opacity: 1 - progress * 0.5,
              filter: `blur(${progress * 10}px)`
            });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0D0D12] pb-40 px-4">
      <div className="max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div 
            key={step.id} 
            className="protocol-card glass-card min-h-[600px] mb-20 p-12 md:p-20 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            {/* Geometric Background SVG */}
            <div className="absolute right-[-10%] top-[-10%] opacity-5 group-hover:opacity-10 transition-opacity duration-1000 rotate-12">
               <svg width="600" height="600" viewBox="0 0 100 100" className="animate-spin-slow">
                  <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="white" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.1" />
               </svg>
            </div>

            <div className="flex-1 z-10">
               <span className="text-4xl md:text-8xl font-black text-white/5 font-data block mb-4">{step.id}</span>
               <h3 className="text-4xl md:text-6xl font-black uppercase italic mb-8 tracking-tighter">
                  {step.title}
               </h3>
               <p className="text-white/40 text-lg uppercase tracking-widest leading-relaxed mb-12 max-w-md">
                  {step.desc}
               </p>
               <div className="flex items-center gap-4 text-[#C9A84C] font-data text-xs font-bold uppercase tracking-[0.3em]">
                  <div className="w-12 h-px bg-[#C9A84C]/50" />
                  {step.mood}
               </div>
            </div>

            <div className="flex-1 w-full aspect-square md:aspect-auto h-full flex items-center justify-center relative">
               {/* Procedural SVG Animation Based on step */}
               {i === 0 && (
                 <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                    <motion.rect 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 4, repeat: Infinity }}
                      x="10" y="10" width="80" height="80" stroke="#C9A84C" strokeWidth="0.5" fill="none" 
                    />
                    <motion.path 
                       initial={{ y: 0 }}
                       animate={{ y: 80 }}
                       transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                       d="M10 10 L90 10" stroke="#C9A84C" strokeWidth="1" 
                    />
                 </svg>
               )}
               {i === 1 && (
                 <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                    <motion.circle 
                      initial={{ r: 0 }}
                      animate={{ r: 40 }}
                      transition={{ duration: 3, repeat: Infinity }}
                      cx="50" cy="50" r="40" stroke="#C9A84C" strokeWidth="0.5" fill="none" 
                    />
                    <motion.path 
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 1 }}
                       transition={{ duration: 5, repeat: Infinity }}
                       d="M20 20 L80 80 M80 20 L20 80" stroke="#C9A84C" strokeWidth="0.5" 
                    />
                 </svg>
               )}
               {i === 2 && (
                 <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                    <motion.path 
                       animate={{ strokeDashoffset: [0, 100] }}
                       transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                       strokeDasharray="10 5"
                       d="M10 50 Q 50 10 90 50 Q 50 90 10 50" stroke="#C9A84C" strokeWidth="0.5" fill="none" 
                    />
                 </svg>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
