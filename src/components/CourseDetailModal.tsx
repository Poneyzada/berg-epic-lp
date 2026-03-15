import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Play, Users, Clock, ShieldCheck, MessageCircle, Target, ArrowUpRight } from 'lucide-react';

interface CourseDetail {
  title: string;
  hook: string;
  description: string;
  modules: string[];
  benefits: { icon: any; label: string }[];
  price: string;
  checkout: string;
}

interface CourseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseDetail | null;
}

export const CourseDetailModal = ({ isOpen, onClose, course }: CourseDetailModalProps) => {
  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
        >
          {/* Shimmer Animation Style */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            .shimmer-btn::after {
              content: '';
              position: absolute;
              top: 0; left: 0; width: 100%; height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
              animation: shimmer 2s infinite;
            }
          `}} />

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(255,255,255,0.05)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all"
            >
              <X size={20} />
            </button>

            {/* Left Side: Animated Image (Desktop Only) */}
            <div className="hidden md:flex md:w-2/5 relative bg-black/40 items-center justify-center p-12 overflow-hidden border-r border-white/5">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotateY: [10, 15, 10],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 w-full"
                  style={{ perspective: '1200px' }}
                >
                  <img 
                    src={(course as any).image} 
                    className="w-full rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 transform-gpu"
                    alt={course.title}
                  />
                  <div className="absolute -inset-4 bg-blue-500/5 blur-[60px] -z-10" />
                </motion.div>
            </div>

            {/* Content Side */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 lg:p-16">
              <div className="mb-10">
                <span className="inline-block px-4 py-1.5 bg-blue-500/10 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-500 mb-6 border border-blue-500/20">
                  Estudo Estratégico
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
                  {course.title}
                </h2>
                <p className="text-white/60 text-sm md:text-lg font-data leading-relaxed max-w-2xl">
                  {course.hook}
                </p>
              </div>

              {/* Benefits Bento */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {course.benefits.map((benefit, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-3 group hover:border-white/10 transition-colors">
                    <benefit.icon size={20} className="text-white/40 group-hover:text-blue-500 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80 leading-tight">
                      {benefit.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Curriculum Summary */}
              <div className="space-y-12 mb-12">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-8 flex items-center gap-4">
                    Módulos Estratégicos
                    <div className="h-px flex-1 bg-white/5" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {course.modules.map((module, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                        <CheckCircle2 size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-[11px] md:text-xs text-white/70 font-data leading-relaxed">{module}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="p-8 md:p-10 bg-white/5 border border-white/5 rounded-[2rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Target size={120} />
                </div>
                
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 flex items-center gap-2">
                   <ShieldCheck size={12} className="text-blue-500" />
                   Compra 100% Segura & Acesso Imediato
                </p>
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl md:text-6xl font-black italic tracking-tighter">
                        {course.price}
                      </span>
                      <span className="text-white/20 text-xs uppercase font-bold tracking-widest">à vista</span>
                    </div>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-2">ou em até 12x no cartão via Eduzz</p>
                  </div>
                  
                  <a
                    href={course.checkout}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shimmer-btn relative px-8 py-4 md:px-12 md:py-5 bg-white text-black font-black uppercase italic tracking-tighter hover:bg-white/90 transition-all rounded-full flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(255,255,255,0.1)] group overflow-hidden"
                  >
                    <span className="relative z-10 text-sm md:text-base">Começar Agora</span>
                    <ArrowUpRight className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
