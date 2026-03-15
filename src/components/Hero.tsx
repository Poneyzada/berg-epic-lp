import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5
      });

      gsap.from('.hero-cta', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 1.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#0D0D12]"
    >
      {/* Editorial Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[3s] hover:scale-105"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=2574&auto=format&fit=crop")',
          filter: 'brightness(0.3) contrast(1.1)'
        }}
      />
      
      {/* Voids Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0D0D12] via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0D0D12]/60 via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-32">
        <div ref={textRef} className="max-w-3xl">
          <div className="hero-line overflow-hidden mb-4">
            <span className="inline-block text-[10px] md:text-xs font-data font-black uppercase tracking-[0.5em] text-[#C9A84C]">
              Elite Performance Protocol
            </span>
          </div>
          
          <h1 className="hero-line block text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] mb-6">
            Domínio <br />
            <span className="font-drama text-[#FAF8F5] text-6xl md:text-9xl ml-[-0.05em]">Absoluto.</span>
          </h1>

          <p className="hero-line text-white/40 text-sm md:text-base uppercase tracking-widest max-w-md mb-12 font-medium">
            A metodologia que transformou o Jiu-Jitsu competitivo em uma forma de arte técnica e pressão implacável.
          </p>

          <div className="hero-cta flex flex-wrap gap-4">
            <a href="#courses" className="btn-magnetic btn-primary px-10 py-5">
              <span>Iniciar Jornada</span>
              <ChevronRight size={14} />
            </a>
            <a href="#about" className="btn-magnetic btn-secondary px-8 py-5">
              <span>Ver Manifesto</span>
            </a>
          </div>
        </div>
      </div>

      {/* Aesthetic Side Stripes */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col gap-2 opacity-20">
        <div className="h-[1px] w-24 bg-white" />
        <div className="h-[1px] w-16 bg-white ml-auto" />
        <div className="h-[1px] w-32 bg-white ml-auto" />
      </div>
    </section>
  );
};
