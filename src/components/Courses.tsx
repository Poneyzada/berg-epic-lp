import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Diamond, Infinity, Anchor, ArrowUpRight, Users, Clock, ShieldCheck, MessageCircle } from 'lucide-react';
import { CourseDetailModal } from './CourseDetailModal';
import { useTranslation } from 'react-i18next';

const courseData = [
  {
    id: 'slx',
    titlePt: 'Conceitos da "Single Leg X"',
    titleEn: 'Single Leg X Concepts',
    descPt: 'O domínio absoluto da guarda mais eficiente do BJJ moderno.',
    descEn: 'Absolute mastery of the most efficient guard in modern BJJ.',
    price: 'R$ 197,00',
    checkout: 'https://sun.eduzz.com/1441320?cupom=SLE100',
    icon: Anchor,
    color: 'hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]',
    accent: 'text-blue-500',
    image: '/courses/PRESSÃO FAZ DIAMANTES (1).avif',
    tier: 'Essencial',
    hookPt: 'Aprenda a minha estratégia pessoal para entrar na guarda e me manter no Jogo da Single Leg X.',
    hookEn: 'Learn my personal strategy to enter the guard and stay in the Single Leg X game.',
    benefitsPt: ['Todos os Níveis', 'Qualidade 4K', '5 Anos de Acesso', 'Suporte Direto'],
    benefitsEn: ['All Levels', '4K Quality', '5 Years Access', 'Direct Support'],
    modulesPt: [
      'Módulo 1: 9 Entradas detalhadas e batidas em baixo.',
      'Módulo 2: Desequilíbrios, pegadas certas e antecipação.',
      'Módulo 3: Raspagens Twist, Balão e X Invertido.',
      'Bônus: 20 posições extras de raspagens e entradas.'
    ],
    modulesEn: [
      'Module 1: 9 detailed entries and low sweeps.',
      'Module 2: Off-balancing, correct grips and anticipation.',
      'Module 3: Twist, Balloon and Inverted X sweeps.',
      'Bonus: 20 extra sweep and entry positions.'
    ]
  },
  {
    id: 'pressao',
    titlePt: 'Pressão Faz Diamantes',
    titleEn: 'Pressure Makes Diamonds',
    descPt: 'A arte de esmagar resistências e evoluir como professor ou competidor.',
    descEn: 'The art of crushing resistance and evolving as a coach or competitor.',
    price: 'R$ 247,00',
    checkout: 'https://sun.eduzz.com/1818927',
    icon: Diamond,
    color: 'hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.3)]',
    accent: 'text-white',
    image: '/courses/SINGLE LEG X (1).avif',
    tier: 'Performance',
    hookPt: 'Incorpore minhas formas favoritas de Leg Weave e passagens de pressão segura e eficiente.',
    hookEn: 'Incorporate my favorite Leg Weave entries and safe, efficient pressure passing.',
    benefitsPt: ['Ideal p/ Professores', 'Alta Definição', '12 Meses Acesso', 'Grupo Telegram VIP'],
    benefitsEn: ['Ideal for Coaches', 'High Definition', '12 Months Access', 'VIP Telegram Group'],
    modulesPt: [
      'Leg Weave: Entradas e variantes favoritas.',
      'Performance: Estudo extra tatame para evolução acelerada.',
      'Planos de Aula: Ideal para professores estruturarem treinos.',
      'Telegram: Estudos semanais e novas variações exclusivas.'
    ],
    modulesEn: [
      'Leg Weave: Favorite entries and variants.',
      'Performance: Off-mat study for accelerated evolution.',
      'Lesson Plans: Ideal for coaches to structure training.',
      'Telegram: Weekly studies and exclusive new variations.'
    ]
  },
  {
    id: '5050',
    titlePt: 'Anulando a 50/50 e Lapelas',
    titleEn: 'Nullifying 50/50 and Lapels',
    descPt: 'Mecanismos por trás da 50/50 e Lapelas para anular o jogo adversário.',
    descEn: 'Mechanisms behind 50/50 and Lapels to shut down your opponent\'s game.',
    price: 'R$ 247,00',
    checkout: 'https://sun.eduzz.com/1351752',
    icon: Infinity,
    color: 'hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]',
    accent: 'text-blue-500',
    image: '/courses/5050 E LAPELAS (1).avif',
    tier: 'Avançado / Lapelas',
    hookPt: '45+ posições (2h30) focadas em entender e destruir o mecanismo das guardas de lapela.',
    hookEn: '45+ positions (2h30) focused on understanding and destroying lapel guard mechanics.',
    benefitsPt: ['Intermed./Avançado', 'Aplicação Real', '12 Meses Acesso', 'Grupo Telegram VIP'],
    benefitsEn: ['Intermediate/Advanced', 'Real Application', '12 Months Access', 'VIP Telegram Group'],
    modulesPt: [
      'Módulo 1: Anulando a 50/50 (antecipação e passagens).',
      'Módulo 2: Guardas de Lapela (Shield e Knee Cut).',
      'Módulo 3: Passando Worm Guard (Partes 1-6).',
      'Módulo 4: Passando Squid Guard e Fio Dental.'
    ],
    modulesEn: [
      'Module 1: Nullifying 50/50 (anticipation and passes).',
      'Module 2: Lapel Guards (Shield and Knee Cut).',
      'Module 3: Passing Worm Guard (Parts 1-6).',
      'Module 4: Passing Squid Guard and Berimbolo Defense.'
    ]
  }
];

export const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const courses = courseData.map(c => ({
    ...c,
    title: isEn ? c.titleEn : c.titlePt,
    desc: isEn ? c.descEn : c.descPt,
    hook: isEn ? c.hookEn : c.hookPt,
    benefits: (isEn ? c.benefitsEn : c.benefitsPt).map((label, i) => ({
      icon: [Users, ShieldCheck, Clock, MessageCircle][i],
      label,
    })),
    modules: isEn ? c.modulesEn : c.modulesPt,
  }));

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
              <h2 className="text-blue-500 font-bold tracking-[0.4em] uppercase text-sm">{t('courses.badge')}</h2>
            </div>
            <h3 className="text-6xl md:text-8xl font-black uppercase leading-none italic tracking-tighter">
              {t('courses.title1')} <br /> {t('courses.title2')}
            </h3>
          </div>
          <p className="text-white/70 text-sm uppercase tracking-widest max-w-xs text-right font-data">
            {t('courses.subtitle')}
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
                <div className="absolute inset-0 opacity-10 grayscale group-hover:opacity-20 transition-opacity pointer-events-none flex items-center justify-center">
                   <img src={course.image} className="w-full h-full object-cover object-center" />
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors" />
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${course.accent} group-hover:scale-110 transition-transform duration-500`}>
                    <course.icon className="w-8 h-8" />
                  </div>
                  <ArrowUpRight className="text-white/40 group-hover:text-blue-500 transition-colors" />
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
                    {t('courses.details')}
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
