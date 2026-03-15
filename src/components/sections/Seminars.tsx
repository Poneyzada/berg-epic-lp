import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Landmark, Send, CheckCircle } from 'lucide-react';

export const Seminars = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="seminars" className="relative py-32 px-4 bg-black overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="adidas-stripes">
                <div />
                <div className="w-6" />
                <div />
              </div>
              <h2 className="text-blue-500 font-bold tracking-[0.4em] uppercase text-sm">International</h2>
            </div>
            
            <h3 className="text-5xl md:text-8xl font-black uppercase mb-8 leading-[0.9] italic tracking-tighter">
              World Tour <br /> Seminars
            </h3>
            
            <p className="text-white/40 text-lg mb-12 max-w-md leading-relaxed uppercase tracking-widest text-sm">
              Leve a metodologia de um campeão mundial para sua academia. Disponibilidade para seminários em todo o mundo.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Landmark className="w-5 h-5 text-blue-500 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs">Metodologia Adidas</h4>
                  <p className="text-white/30 text-xs uppercase">Excelência técnica comprovada</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Mail className="w-5 h-5 text-blue-500 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs">Suporte Global</h4>
                  <p className="text-white/30 text-xs uppercase">Planejamento logístico completo</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Capture Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 glass rounded-[3rem] shadow-2xl relative"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 ml-1">Seu Nome</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium"
                      placeholder="G. Pereira"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 ml-1">Sua Academia</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium"
                      placeholder="Pereira Academy HQ"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 ml-1">E-mail de Contato</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium"
                      placeholder="atleta@adidas.com"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full btn-epic group"
                  >
                    <span>Solicitar Disponibilidade</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(37,99,235,0.5)]">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-3xl font-black uppercase mb-4">Solicitação Enviada</h4>
                  <p className="text-white/40 uppercase tracking-widest text-xs">Entraremos em contato em breve.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-12 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                  >
                    Enviar Outra
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
