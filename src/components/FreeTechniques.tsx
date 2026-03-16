import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, PlayCircle, X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FreeTechniques = () => {
  const [selectedVideo, setSelectedVideo] = useState<{title: string, vimeo_url: string} | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const techniques = [
    { title: "Raspagem da Laçada com X", vimeo_id: "801469119", image: "/images/berg-piramide.jpg" },
    { title: "Laçada com X (variações)", vimeo_id: "801465244", image: "/images/berg-rosto.jpg" },
    { title: "Worm guard raspagem de quadrilzada", vimeo_id: "801463480", image: "/images/berg-blur.jpg" },
    { title: "worm guard ida para as costas", vimeo_id: "801461288", image: "/images/berg-rosto.jpg" },
    { title: "controle e ida para as costas (4 apoios)", vimeo_id: "801457731", image: "/images/berg-piramide.jpg" },
    { title: "controle e ida para as costas 2 (4 apoios)", vimeo_id: "801454947", image: "/images/berg-blur.jpg" },
    { title: "Ataques da guarda fechada 1", vimeo_id: "801452292", image: "/images/berg-rosto.jpg" },
    { title: "Ataques da guarda fechada 2", vimeo_id: "801450379", image: "/images/berg-piramide.jpg" },
    { title: "Controle do 4 apoios com finalizacao", vimeo_id: "801445532", image: "/images/berg-blur.jpg" },
    { title: "Long Step", vimeo_id: "801442111", image: "/images/berg-rosto.jpg" }
  ];

  const featured = techniques.slice(0, 3);
  const others = techniques.slice(3);

  return (
    <section id="free" className="py-32 px-4 bg-black overflow-hidden relative">
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
              <h2 className="text-blue-500 font-bold tracking-widest uppercase text-xs font-data">{t('free.badge')}</h2>
            </div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
              {t('free.title1')} <br />{t('free.title2')}
            </h3>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors font-data"
          >
            {isExpanded ? t('free.collapse') : t('free.expand')}
            <ArrowRight className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>
        </div>

        {/* FEATURED GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedVideo({title: tech.title, vimeo_url: `https://player.vimeo.com/video/${tech.vimeo_id}`})}
              className="group relative aspect-[16/10] bg-muted/20 rounded-3xl overflow-hidden border border-white/5 cursor-pointer"
            >
              <img 
                src={tech.image} 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500 group-hover:scale-110 shadow-xl">
                  <Play className="fill-white text-white w-5 h-5 ml-1" />
                </div>
                <h4 className="text-2xl font-black uppercase italic tracking-tight mb-1 group-hover:translate-x-2 transition-transform duration-500">
                  {tech.title}
                </h4>
                <div className="flex gap-1">
                  <div className="h-[1px] w-4 bg-blue-500" />
                  <div className="h-[1px] w-8 bg-white/20" />
                </div>
              </div>

              <div className="absolute top-4 right-4 px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {t('free.quality')}
              </div>
            </motion.div>
          ))}
        </div>

        {/* EXPANDABLE AREA */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 overflow-hidden"
            >
              {others.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedVideo({title: tech.title, vimeo_url: `https://player.vimeo.com/video/${tech.vimeo_id}`})}
                  className="group cursor-pointer p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all">
                    <img src={tech.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <PlayCircle size={24} className="text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                    </div>
                  </div>
                  <h4 className="text-[11px] font-black uppercase italic leading-tight mb-2 line-clamp-2">{tech.title}</h4>
                  <div className="h-[1px] w-4 bg-blue-500/50" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* VIDEO LIGHTBOX */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-[110]"
            >
              <X size={24} />
            </button>
            <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl rounded-2xl overflow-hidden relative">
               <iframe
                  src={`${selectedVideo.vimeo_url}?autoplay=1&title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
