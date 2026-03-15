import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Target, Flame, Trophy } from 'lucide-react';

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

export const SmartFilter = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Logic to show result or scroll to course
      console.log('Filters:', answers);
    }
  };

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
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-10"
            <p className="text-accent-blue font-bold tracking-widest uppercase mb-4">
              Pergunta {step + 1} de {questions.length}
            </p>
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
          </AnimatePresence>

          {step > 0 && (
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
