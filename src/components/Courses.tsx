import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Diamond, Infinity, Anchor, ArrowUpRight, Users, Clock, ShieldCheck, MessageCircle } from 'lucide-react';
import { CourseDetailModal } from './CourseDetailModal';

const courses = [
  {
    id: 'slx',
    title: 'Conceitos da "Single Leg X"',
    desc: 'O domínio absoluto da guarda mais eficiente do BJJ moderno.',
    price: 'R$ 197,00',
    checkout: 'https://sun.eduzz.com/1441320?cupom=SLE100',
    icon: Anchor,
    color: 'hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]',
    accent: 'text-blue-500',
    image: '/courses/PRESSÃO FAZ DIAMANTES (1).avif',
    tier: 'Essencial',
    hook: 'Aprenda a minha estratégia pessoal para entrar na guarda e me manter no Jogo da Single Leg X.',
    benefits: [
      { icon: Users, label: 'Todos os Níveis' },
      { icon: ShieldCheck, label: 'Qualidade 4K' },
      { icon: Clock, label: '5 Anos de Acesso' },
      { icon: MessageCircle, label: 'Suporte Direto' }
    ],
    modules: [
      'Módulo 1: 9 Entradas detalhadas e batidas em baixo.',
      'Módulo 2: Desequilíbrios, pegadas certas e antecipação.',
      'Módulo 3: Raspagens Twist, Balão e X Invertido.',
      'Bônus: 20 posições extras de raspagens e entradas.'
    ]
  },
  {
    id: 'pressao',
    title: 'Pressão Faz Diamantes',
    desc: 'A arte de esmagar resistências e evoluir como professor ou competidor.',
    price: 'R$ 247,00',
    checkout: 'https://sun.eduzz.com/1818927',
    icon: Diamond,
    color: 'hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.3)]',
    accent: 'text-white',
    image: '/courses/SINGLE LEG X (1).avif',
    tier: 'Performance',
    hook: 'Incorpore minhas formas favoritas de Leg Weave e passagens de pressão segura e eficiente.',
    benefits: [
      { icon: Users, label: 'Ideal p/ Professores' },
      { icon: ShieldCheck, label: 'Alta Definição' },
      { icon: Clock, label: '12 Meses Acesso' },
      { icon: MessageCircle, label: 'Grupo Telegram VIP' }
    ],
    modules: [
      'Leg Weave: Entradas e variantes favoritas.',
      'Performance: Estudo extra tatame para evolução acelerada.',
      'Planos de Aula: Ideal para professores estruturarem treinos.',
      'Telegram: Estudos semanais e novas variações exclusivas.'
    ]
  },
  {
    id: '5050',
    title: 'Anulando a 50/50 e Lapelas',
    desc: 'Mecanismos por trás da 50/50 e Lapelas para anular o jogo adversário.',
    price: 'R$ 247,00',
    checkout: 'https://sun.eduzz.com/1351752',
    icon: Infinity,
    color: 'hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]',
    accent: 'text-blue-500',
    image: '/courses/5050 E LAPELAS (1).avif',
    tier: 'Avançado / Lapelas',
    hook: '45+ posições (2h30) focadas em entender e destruir o mecanismo das guardas de lapela.',
    benefits: [
      { icon: Users, label: 'Intermed./Avançado' },
      { icon: ShieldCheck, label: 'Aplicação Real' },
      { icon: Clock, label: '12 Meses Acesso' },
      { icon: MessageCircle, label: 'Grupo Telegram VIP' }
    ],
    modules: [
      'Módulo 1: Anulando a 50/50 (antecipação e passagens).',
      'Módulo 2: Guardas de Lapela (Shield e Knee Cut).',
      'Módulo 3: Passando Worm Guard (Partes 1-6).',
      'Módulo 4: Passando Squid Guard e Fio Dental.'
    ]
  }
];

export const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  return (
    <section id="courses" className="py-32 px-4 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="adidas-stripes">
                <div />
                <div className="w-6" />
                <div />
              </div>
              <h2 className="text-blue-500 font-bold tracking-[0.4em] uppercase text-sm">Protocolo Berg</h2>
            </div>
            <h3 className="text-6xl md:text-8xl font-black uppercase leading-none italic tracking-tighter">
              MEUS <br /> CURSOS.
            </h3>
          </div>
          <p className="text-white/70 text-sm uppercase tracking-widest max-w-xs text-right font-data">
            A metodologia que transformou o cenário do Jiu-Jitsu competitivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              id={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              style={{ perspective: '1000px' }}
              className={`scroll-mt-32 group relative p-[1px] rounded-[2rem] overflow-hidden transition-all duration-700 ${course.color}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div 
                onClick={() => setSelectedCourse(course)}
                className="relative bg-[#050505] rounded-[2rem] p-10 h-full flex flex-col border border-white/5 overflow-hidden cursor-pointer"
              >
                {/* Background Pattern / Image Fallback */}
                <div className="absolute inset-0 opacity-10 grayscale group-hover:opacity-20 transition-opacity pointer-events-none flex items-center justify-center">
                   <img src={course.image} className="w-full h-full object-cover object-center" />
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors" />
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${course.accent} group-hover:scale-110 transition-transform duration-500`}>
                    <course.icon className="w-8 h-8" />
                  </div>
                  <ArrowUpRight className="text-white/20 group-hover:text-blue-500 transition-colors" />
                </div>

                <h4 className="text-3xl font-black uppercase mb-4 leading-none tracking-tight group-hover:translate-x-2 transition-transform duration-500 relative z-10">
                  {course.title}
                </h4>
                <p className="text-white/70 text-[10px] uppercase tracking-widest mb-12 font-data relative z-10">
                   {course.desc}
                </p>
                
                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                  <div className="text-3xl font-black uppercase italic tracking-tighter">
                    {course.price.split(',')[0]}
                  </div>
                  <button className="text-[8px] font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors border border-blue-500/20 px-2.5 py-1 rounded-full">
                    Ver Detalhes
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CourseDetailModal 
        isOpen={!!selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
        course={selectedCourse} 
      />
    </section>
  );
};
