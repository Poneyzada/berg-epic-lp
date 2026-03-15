import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    {
      q: "O acesso ao conteúdo é imediato?",
      a: "Sim! Após a confirmação do pagamento, você recebe imediatamente no seu e-mail os dados de acesso à nossa plataforma exclusiva."
    },
    {
      q: "Posso acessar de qualquer dispositivo?",
      a: "Com certeza. Nossa plataforma é 100% otimizada para tablets, computadores e celulares, permitindo que você estude até mesmo dentro do tatame."
    },
    {
      q: "Qual o prazo de acesso ao curso?",
      a: "O curso de Single Leg X oferece 5 anos de acesso. Os cursos de Pressão e 50/50 e Lapelas oferecem 12 meses de acesso completo."
    },
    {
      q: "Quais as formas de pagamento?",
      a: "Aceitamos Cartão de Crédito (com parcelamento em até 12x), PIX à vista e boleto bancário."
    },
    {
      q: "Existe suporte para dúvidas?",
      a: "Sim. Você terá um canal direto via e-mail para tirar todas as suas dúvidas técnicas sobre as posições ensinadas."
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-black">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6">
            <HelpCircle size={14} className="text-white/40" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Dúvidas Frequentes</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">PROTOCOLO DE <br /> SEGURANÇA.</h3>
        </div>

        <div className="space-y-4">
          {questions.map((item, i) => (
            <div 
              key={i}
              className="border border-white/5 rounded-2xl overflow-hidden bg-zinc-900/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
              >
                <span className="text-sm md:text-base font-black uppercase italic tracking-tight text-white/80">
                  {item.q}
                </span>
                <ChevronDown 
                  size={18} 
                  className={`text-white/20 transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-white/40 font-data leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 border border-white/5 rounded-3xl bg-zinc-900 text-center">
           <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Ainda tem dúvidas?</p>
           <a 
            href="mailto:gupereirabjj@hotmail.com" 
            className="text-white font-black uppercase italic hover:scale-105 transition-transform inline-block"
           >
             gupereirabjj@hotmail.com
           </a>
        </div>
      </div>
    </section>
  );
};
