import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Trophy, Users, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const testimonialsPt = [
  { name: "Aluno Graduado", text: "O curso de Single Leg X mudou meu jogo. Os detalhes 4K fazem toda a diferença." },
  { name: "Professor BJJ", text: "Uso os planos de aula do curso de Pressão em minha academia. Conteúdo de altíssimo nível." },
  { name: "Competidor", text: "Anular a 50/50 era meu maior problema. Berg explicou o mecanismo de forma clara." },
  { name: "Faixa Azul", text: "Didática impecável. Parece que ele está do seu lado no tatame corrigindo a pegada." },
  { name: "Faixa Preta", text: "Refinei detalhes que nem imaginava que existiam. O nível de estudo do Berg é absurdo." },
  { name: "Praticante", text: "Melhor investimento que fiz no meu Jiu-Jitsu. Recomendo a todos que querem evoluir." }
];

const testimonialsEn = [
  { name: "Graduated Student", text: "The Single Leg X course changed my game. The 4K details make all the difference." },
  { name: "BJJ Professor", text: "I use the lesson plans from the Pressure course at my academy. Outstanding content." },
  { name: "Competitor", text: "Shutting down 50/50 was my biggest problem. Berg explained the mechanism clearly." },
  { name: "Blue Belt", text: "Impeccable teaching. It feels like he's right next to you on the mat correcting your grip." },
  { name: "Black Belt", text: "I refined details I never knew existed. Berg's level of study is incredible." },
  { name: "Practitioner", text: "Best investment I made in my Jiu-Jitsu. I recommend it to everyone who wants to evolve." }
];

export const SocialProof = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const testimonials = isEn ? testimonialsEn : testimonialsPt;

  const stats = [
    { icon: Users, value: "769+", label: t('social.stats.students') },
    { icon: Globe, value: "20+", label: t('social.stats.countries') },
    { icon: Trophy, value: "BJJ", label: t('social.stats.method') },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Authority Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <img 
                src="/images/berg-piramide.jpg" 
                alt="Gutemberg Bio" 
                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-32 left-6 md:bottom-10 md:left-10 z-10">
                <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">Gutemberg Pereira</h4>
                <p className="text-white/70 text-[10px] uppercase font-bold tracking-[0.4em] mt-2">{t('social.champion')}</p>
              </div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute bottom-2 right-2 md:-right-10 md:bottom-20 bg-white text-black p-4 md:p-8 rounded-[2rem] flex flex-col gap-3 md:gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-30">
               {stats.map((stat, i) => (
                 <div key={i} className="flex items-center gap-3 md:gap-4 border-b border-black/5 pb-2 md:pb-4 last:border-0 last:pb-0">
                    <stat.icon size={14} className="md:w-5 md:h-5" />
                    <div>
                      <p className="text-base md:text-2xl font-black leading-none">{stat.value}</p>
                      <p className="text-[6px] md:text-[8px] font-bold uppercase tracking-widest opacity-40">{stat.label}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-sm font-data font-black uppercase tracking-[0.5em] text-white/65 mb-4">
                {t('social.journey')}
              </h2>
              <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-8">
                {t('social.title').split('\n')[0]} <br /> {t('social.title').split('\n')[1]}
              </h3>
            </div>
            
            <div className="space-y-6 text-white/80 text-sm md:text-lg font-data leading-relaxed">
              <p>{t('social.bio1')}</p>
              <p>{t('social.bio2')}</p>
              <p>{t('social.bio3')}</p>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="space-y-16">
          <div className="text-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/55 mb-4">{t('social.proof')}</h3>
            <h4 className="text-3xl md:text-5xl font-black uppercase italic">{t('social.proofTitle')}</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-zinc-900/50 border border-white/5 rounded-3xl hover:border-white/20 transition-all flex flex-col gap-6"
              >
                <div className="flex gap-1 text-white/80">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <div className="relative">
                  <Quote size={24} className="absolute -top-4 -left-4 text-white/5" />
                  <p className="text-white/85 font-data italic leading-relaxed text-sm">"{testimonial.text}"</p>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/65 mt-auto">— {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
