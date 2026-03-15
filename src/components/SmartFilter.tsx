import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Target, Flame, Trophy, CheckCircle, RefreshCcw } from 'lucide-react';

const questions = [
  {
    id: 'goal',
    text: 'Qual seu principal objetivo hoje?',
    textEn: 'What is your main goal today?',
    options: [
      { id: 'pass', label: 'Passagem de Guarda', labelEn: 'Guard Passing', icon: Target },
      { id: 'sub', label: 'Finalizações', labelEn: 'Submissions', icon: Flame },
      { id: 'comp', label: 'Competição', labelEn: 'Competition', icon: Trophy },
    ]
  },
  {
    id: 'level',
    text: 'Qual seu nível de Jiu-Jitsu?',
    textEn: 'What is your BJJ level?',
    options: [
      { id: 'white', label: 'Iniciante (Branca/Azul)', labelEn: 'Beginner', icon: ChevronRight },
      { id: 'purple', label: 'Intermediário (Roxa/Marrom)', labelEn: 'Intermediate', icon: ChevronRight },
      { id: 'black', label: 'Avançado (Preta)', labelEn: 'Advanced', icon: ChevronRight },
    ]
  }
];

const recommendations = {
  pass: {
    title: 'Conceitos da Single Leg X',
    desc: 'O curso perfeito para quem quer dominar a passagem e o controle.',
    link: '#courses'
  },
  sub: {
    title: 'Pressão Faz Diamantes',
    desc: 'Aprenda a finalizar com pressão absoluta e técnica refinada.',
    link: '#courses'
  },
  comp: {
    title: 'Berg Style: Competição',
    desc: 'O mindset e as técnicas que me levaram ao topo do mundo.',
    link: '#courses'
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
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-muted/30 border border-white/5 p-12 rounded-[2rem] backdrop-blur-xl relative overflow-hidden"
        >
          <div className="grid-background opacity-10" />
          
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10"
              >
                <p className="text-accent-blue font-bold tracking-widest uppercase mb-4">
                  Pergunta {step + 1} de {questions.length}
                </p>
                <h2 className="text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter">
                  {questions[step].text}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(questions[step].id, opt.id)}
                      className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all duration-500 text-left"
                    >
                      <opt.icon className="w-8 h-8 text-accent-blue mb-4 transition-transform group-hover:scale-110" />
                      <span className="text-xl font-bold uppercase">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 py-8"
              >
                <div className="w-20 h-20 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(0,102,255,0.4)]">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-sm font-bold text-accent-blue uppercase tracking-[0.4em] mb-4">Recomendação Ideal</h2>
                <h3 className="text-4xl md:text-6xl font-black uppercase italic mb-6 leading-none">
                  {result.title}
                </h3>
                <p className="text-white/40 text-sm uppercase tracking-widest mb-12 max-w-md mx-auto">
                  {result.desc}
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <a href={result.link} className="btn-epic">
                    Acessar Agora
                  </a>
                  <button 
                    onClick={() => {
                      setStep(0);
                      setShowResult(false);
                    }}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                  >
                    <RefreshCcw className="w-3 h-3" />
                    Refazer Teste
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showResult && step > 0 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="mt-8 text-white/40 hover:text-white transition-colors uppercase tracking-widest text-xs"
            >
              Voltar
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};
