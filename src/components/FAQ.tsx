import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const questions = t('faq.questions', { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <section id="faq" className="py-24 md:py-32 bg-black">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6">
            <HelpCircle size={14} className="text-white/65" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{t('faq.badge')}</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            {t('faq.title').split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
            ))}
          </h3>
        </div>

        <div className="space-y-4">
          {questions.map((item, i) => (
            <div 
              key={i}
              className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-900/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
              >
                <span className="text-sm md:text-base font-black uppercase italic tracking-tight text-white">
                  {item.q}
                </span>
                <ChevronDown 
                  size={18} 
                  className={`text-white/55 transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`}
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
                    <div className="px-6 pb-6 text-xs md:text-sm text-white/75 font-data leading-relaxed border-t border-white/5 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 border border-white/10 rounded-3xl bg-zinc-900 text-center">
           <p className="text-[10px] font-black uppercase tracking-widest text-white/65 mb-4">{t('faq.contact')}</p>
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
