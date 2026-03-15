import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Crown } from 'lucide-react';

export const Membership = () => {
  const plans = [
    {
      name: 'Essencial',
      price: 'R$ 97',
      period: '/mês',
      icon: Shield,
      features: ['Acesso à Biblioteca Base', 'Metodologia Primal', 'Suporte via Comunidade'],
      accent: false
    },
    {
      name: 'Performance',
      price: 'R$ 197',
      period: '/mês',
      icon: Zap,
      features: ['Tudo no Essencial', 'Análise de Lutas Reais', 'Aulas ao Vivo Mensais', 'Protocolos de Competição'],
      accent: true
    },
    {
      name: 'Enterprise',
      price: 'Sob Consulta',
      period: '',
      icon: Crown,
      features: ['Treinamento Individual', 'Consultoria de Carreira', 'Acesso VIP Presencial'],
      accent: false
    }
  ];

  return (
    <section id="membership" className="py-40 bg-[#0D0D12] relative z-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-sm font-data font-bold text-[#C9A84C] uppercase tracking-[0.4em] mb-4">Escolha seu Nível</h2>
        <h3 className="text-4xl md:text-6xl font-black uppercase italic italic tracking-tighter mb-20">Acesso <span className="font-drama text-white">Elite</span>.</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-12 flex flex-col items-center relative overflow-hidden group transition-all duration-500 ${plan.accent ? 'border-[#C9A84C]/50 bg-[#C9A84C]/5 scale-105 z-10' : 'hover:border-white/10'}`}
            >
              {plan.accent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#C9A84C] shadow-[0_0_20px_#C9A84C]" />
              )}
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${plan.accent ? 'bg-[#C9A84C] text-[#0D0D12]' : 'bg-white/5 text-[#C9A84C]'}`}>
                <plan.icon size={32} />
              </div>

              <h4 className="text-2xl font-black uppercase mb-2 italic">{plan.name}</h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-xs text-white/30 uppercase font-bold tracking-widest">{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-4 text-left w-full mb-12">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/60">
                    <Check size={14} className="text-[#C9A84C]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`btn-magnetic w-full py-4 ${plan.accent ? 'btn-primary' : 'btn-secondary'}`}>
                Selecionar Plano
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
