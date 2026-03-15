import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { OptimizedVideo } from '../lib/utils';

const tips = [
  { id: 1, title: 'Pressão no Diamante', titleEn: 'Pressure Passing', video: '/videos/passagem-pressao.mp4' },
  { id: 2, title: 'Wave Leg Entry', titleEn: 'Leg Wave Entry', video: '/videos/berg-legwave.mp4' },
  { id: 3, title: 'War Mindset', titleEn: 'War Mindset', video: '/videos/berg-war.mp4' },
];

export const FreeArea = () => {
  return (
    <section className="py-32 px-4 bg-background overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="adidas-stripes">
                <div className="!w-4" />
                <div className="!w-2" />
                <div className="!w-4" />
              </div>
              <h2 className="text-blue-500 font-bold tracking-widest uppercase text-xs">Conteúdo Gratuito</h2>
            </div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">Biblioteca <br />de Elite</h3>
          </div>
          <button className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
            Ver Todos os Vídeos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, idx) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-[16/10] bg-muted/20 rounded-3xl overflow-hidden border border-white/5 cursor-pointer"
            >
              <OptimizedVideo src={tip.video} className="opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <div className="w-14 h-14 rounded-full glass flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500 group-hover:scale-110 shadow-xl">
                  <Play className="fill-white text-white w-5 h-5 ml-1" />
                </div>
                <h4 className="text-2xl font-black uppercase italic tracking-tight mb-1 group-hover:translate-x-2 transition-transform duration-500">
                  {tip.title}
                </h4>
                <div className="flex gap-1">
                  <div className="h-[1px] w-4 bg-blue-500" />
                  <div className="h-[1px] w-8 bg-white/20" />
                </div>
              </div>

              <div className="absolute top-4 right-4 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                4K Quality
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
