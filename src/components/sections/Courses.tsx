import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, ArrowUpRight } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Conceitos da Single Leg X',
    titleEn: 'Single Leg X Concepts',
    price: 'R$ 297',
    icon: Target,
    color: 'hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]',
    accent: 'text-blue-500',
    link: '#eduzz-1'
  },
  {
    id: 2,
    title: 'Pressão Faz Diamantes',
    titleEn: 'Pressure Makes Diamonds',
    price: 'R$ 397',
    icon: Shield,
    color: 'hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.3)]',
    accent: 'text-white',
    link: '#eduzz-2'
  },
  {
    id: 3,
    title: 'Berg Style: Competição',
    titleEn: 'Berg Style: Competition',
    price: 'R$ 497',
    icon: Zap,
    color: 'hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]',
    accent: 'text-blue-500',
    link: '#eduzz-3'
  }
];

export const CourseShowcase = () => {
  return (
    <section id="courses" className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="adidas-stripes">
                <div />
                <div className="w-6" />
                <div />
              </div>
              <h2 className="text-blue-500 font-bold tracking-[0.4em] uppercase text-sm">Treinamento de Elite</h2>
            </div>
            <h3 className="text-6xl md:text-8xl font-black uppercase leading-none italic tracking-tighter">
              Domine <br /> o Tatame
            </h3>
          </div>
          <p className="text-white/40 text-sm uppercase tracking-widest max-w-xs text-right">
            A metodologia que transformou o cenário do Jiu-Jitsu competitivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`group relative p-[1px] rounded-[2rem] overflow-hidden transition-all duration-700 ${course.color}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative bg-[#050505] rounded-[2rem] p-10 h-full flex flex-col border border-white/5 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors" />
                
                <div className="flex justify-between items-start mb-12">
                  <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${course.accent} group-hover:scale-110 transition-transform duration-500`}>
                    <course.icon className="w-8 h-8" />
                  </div>
                  <ArrowUpRight className="text-white/20 group-hover:text-blue-500 transition-colors" />
                </div>

                <h4 className="text-3xl font-black uppercase mb-4 leading-none tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {course.title}
                </h4>
                <p className="text-white/40 text-sm uppercase tracking-widest mb-12">Acesso Vitalício</p>
                
                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="text-3xl font-black">{course.price}</div>
                  <button className="text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-white transition-colors">
                    Ver Detalhes
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
