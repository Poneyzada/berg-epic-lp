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
  pass: {
    title: 'Single Leg X: Conceitos',
    desc: 'O protocolo base para dominar a guarda e as raspagens modernas.',
    link: 'https://sun.eduzz.com/1441320?cupom=SLE100'
  },
  sub: {
    title: 'Pressão faz Diamantes',
    desc: 'A metodologia definitiva de controle deadweight e passagens de pressão.',
    link: 'https://sun.eduzz.com/1818927'
  },
  comp: {
    title: 'Anulando a 50/50 & Lapelas',
    desc: 'O nível avançado para neutralizar amarrações e sobrar tecnicamente.',
    link: 'https://sun.eduzz.com/1351752'
  }
};

export const SmartFilter = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: string, answerId: string) => {
    const newAnswers = { ...answers, [questionId]: answerId };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const result = recommendations[answers.goal as keyof typeof recommendations] || recommendations.comp;

  return (
    <div className="py-12 px-4 bg-[#080808]">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!showResult ? (
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
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 py-8"
              >
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] mb-4 font-data">Sugestão de Protocolo</h2>
                <h3 className="text-3xl md:text-5xl font-black uppercase italic mb-6 leading-none">
                  {result.title}
                </h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-12 max-w-sm mx-auto leading-relaxed">
                   {result.desc}
                </p>
                
                <div className="flex flex-col items-center justify-center gap-6">
                  <a href={result.link} className="btn-magnetic btn-primary w-full">
                    Acessar Conteúdo
                  </a>
                  <button 
                    onClick={() => {
                      setStep(0);
                      setShowResult(false);
                    }}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                  >
                    <RefreshCcw className="w-3 h-3" />
                    Reiniciar Protocolo
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
