import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedVideo } from '../lib/utils';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video with Magazine Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <OptimizedVideo 
          src="/videos/berg-adidas.mp4" 
          className="scale-105 transition-transform duration-700 hover:scale-100"
        />
      </div>

      {/* Grid Pattern */}
      <div className="grid-background" />

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-accent-blue font-bold tracking-[0.3em] uppercase mb-4 block"
        >
          World Champion
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8"
        >
          Gutemberg <br /> Pereira
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="btn-epic">
            Quero Me Tornar Imbatível
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-12 bg-white/20 relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white" />
        </div>
      </motion.div>
    </section>
  );
};
