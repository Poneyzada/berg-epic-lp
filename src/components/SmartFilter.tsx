import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Target, Flame, Trophy, CheckCircle, RefreshCcw, ExternalLink } from 'lucide-react';

const questions = [
  {
    id: 'goal',
    text: 'Qual o maior gap no seu jogo hoje?',
    options: [
      { id: 'pass', label: 'Passagem & Pressão', icon: Target },
      { id: 'sub', label: 'Finalização Estrutural', icon: Flame },
      { id: 'base', label: 'Base & Conexão Inabalável', icon: Trophy },
    ]
  },
  {
    id: 'level',
    text: 'Frequência de Treino / Nível',
    options: [
      { id: 'white', label: 'Atleta em Formação (Branca/Azul)', icon: ChevronRight },
      { id: 'purple', label: 'Praticante Avançado (Roxa/Preta)', icon: ChevronRight },
      { id: 'black', label: 'Competidor', icon: ChevronRight },
    ]
  }
];

const recommendations = {
  'pass-white': {
    title: 'Single Leg X: Conceitos',
    desc: 'O protocolo base para dominar a guarda e as raspagens modernas, ideal para quem está construindo a base.',
    link: 'https://sun.eduzz.com/1441320?cupom=SLE100'
  },
  'pass-purple': {
    title: 'Pressão faz Diamantes',
    desc: 'A metodologia definitiva de controle deadweight e passagens de pressão para avançados.',
    link: 'https://sun.eduzz.com/1818927'
  },
  'sub-all': {
    title: 'A Arte da Finalização',
    desc: 'Como ajustar e concluir ataques com 100% de eficiência mecânica.',
    link: 'https://sun.eduzz.com/1818927'
  },
  'base-all': {
    title: 'Conexão Inabalável',
    desc: 'Domine o equilíbrio e a distribuição de peso para nunca mais ser raspado.',
    link: 'https://sun.eduzz.com/1351752'
  },
  'comp-all': {
    title: 'Anulando a 50/50 & Lapelas',
    desc: 'O nível avançado para neutralizar amarrações e sobrar tecnicamente em torneios.',
    link: 'https://sun.eduzz.com/1351752'
  }
};

const getRecommendation = (goal: string, level: string) => {
  if (goal === 'pass') {
    return level === 'white' ? recommendations['pass-white'] : recommendations['pass-purple'];
  }
  if (goal === 'sub') return recommendations['sub-all'];
  if (goal === 'base') return recommendations['base-all'];
  return recommendations['comp-all'];
};

export const SmartFilter = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ nome: '', whatsapp: '' });

  const handleAnswer = (questionId: string, answerId: string) => {
    const newAnswers = { ...answers, [questionId]: answerId };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowLeadForm(true);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send to Python Backend
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: leadInfo.nome,
          whatsapp: leadInfo.whatsapp,
          interesse: result.title,
          origem: 'ICP',
          metadata: { ...answers }
        })
      });
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
    }

    localStorage.setItem('last_lead_wa', leadInfo.whatsapp);
    setShowLeadForm(false);
    setShowResult(true);
  };

  const result = getRecommendation(answers.goal, answers.level);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-30"
            >
              <RefreshCcw className="w-6 h-6 rotate-45" />
            </button>

            <div className="p-8 md:p-16">
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!showLeadForm && !showResult ? (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative z-10"
                    >
                      <p className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 font-data">
                        ETAPA {step + 1} DE {questions.length}
                      </p>
                      <h2 className="text-2xl md:text-4xl font-black uppercase mb-12 italic tracking-tighter">
                         {questions[step].text}
                      </h2>

                      <div className="grid grid-cols-1 gap-4">
                        {questions[step].options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleAnswer(questions[step].id, opt.id)}
                            className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-500 text-left flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                               <opt.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                               <span className="text-xs font-bold uppercase tracking-widest">{opt.label}</span>
                            </div>
                            <ChevronRight size={16} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : showLeadForm ? (
                    <motion.div
                      key="lead-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative z-10"
                    >
                      <div className="text-center mb-8">
                         <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-6 h-6 text-white" />
                         </div>
                         <h3 className="text-2xl font-black uppercase italic tracking-tighter">LIBERAR PROTOCOLO.</h3>
                         <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2">Informe para onde enviamos seu estudo clínico.</p>
                      </div>

                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <input 
                          required
                          type="text" 
                          placeholder="SEU NOME"
                          value={leadInfo.nome}
                          onChange={(e) => setLeadInfo({...leadInfo, nome: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-white/40 outline-none transition-all font-data text-white text-xs"
                        />
                        <input 
                          required
                          type="tel" 
                          placeholder="SEU WHATSAPP"
                          value={leadInfo.whatsapp}
                          onChange={(e) => setLeadInfo({...leadInfo, whatsapp: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-white/40 outline-none transition-all font-data text-white text-xs"
                        />
                        <button 
                          type="submit"
                          className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter hover:bg-white/90 transition-all rounded-full flex items-center justify-center gap-3 mt-4"
                        >
                          <span>VER MEU PROTOCOLO</span>
                          <ChevronRight size={16} />
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10 py-8 text-center"
                    >
                      <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h2 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] mb-4 font-data">Sugestão de Protocolo</h2>
                      <h3 className="text-3xl md:text-5xl font-black uppercase italic mb-6 leading-none">
                        {result.title}
                      </h3>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4 max-w-sm mx-auto leading-relaxed">
                         {result.desc}
                      </p>
                      <p className="text-[8px] text-white/20 uppercase tracking-widest mb-12 italic">
                        Análise baseada no seu gap em {answers.goal === 'pass' ? 'PASSAGEM' : answers.goal === 'sub' ? 'FINALIZAÇÃO' : 'BASE'} e nível {answers.level === 'white' ? 'INICIANTE' : 'AVANÇADO'}.
                      </p>
                      
                      <div className="flex flex-col items-center justify-center gap-6">
                        <a 
                          href={result.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            const wa = leadInfo.whatsapp || localStorage.getItem('last_lead_wa');
                            if (wa) {
                              fetch('/api/leads', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ whatsapp: wa, status: 'No Checkout' })
                              });
                            }
                          }}
                          className="btn-magnetic btn-primary w-full text-center py-4 bg-white text-black rounded-full font-black uppercase italic text-sm"
                        >
                          Acessar Conteúdo
                        </a>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => {
                              setStep(0);
                              setShowResult(false);
                              setShowLeadForm(false);
                            }}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                          >
                            <RefreshCcw className="w-3 h-3" />
                            Refazer Teste
                          </button>
                          <a 
                            href="#courses" 
                            onClick={onClose}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors border-l border-white/10 pl-4"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Ver todos os Cursos
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
