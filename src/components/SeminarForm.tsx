import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, User, MapPin, CheckCircle, Users, Calendar, Target } from 'lucide-react';

export const SeminarForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    local: '',
    publico: '',
    data: '',
    foco: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          whatsapp: formData.whatsapp,
          interesse: `Seminário: ${formData.foco}`,
          origem: 'Seminar',
          metadata: {
            local: formData.local,
            publico: formData.publico,
            data: formData.data
          }
        })
      });
      localStorage.setItem('last_lead_wa', formData.whatsapp);
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
    }

    const message = `Olá Berg! Gostaria de agendar um seminário oficial.
Nome do Organizador/Academia: ${formData.nome}
Localização do Evento: ${formData.local}
Público Estimado: ${formData.publico}
Período Previsto: ${formData.data}
Foco Técnico Desejado: ${formData.foco}
WhatsApp de Contato: ${formData.whatsapp}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5521999999999?text=${encodedMessage}`; 
    
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-3xl font-black uppercase italic mb-4">Protocolo Ativado</h3>
        <p className="text-white/40 uppercase tracking-widest text-[10px]">Redirecionando para o seu WhatsApp pessoal...</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-12 text-[10px] text-white/20 hover:text-white uppercase tracking-widest transition-colors font-bold"
        >
          Novo Formulário
        </button>
      </motion.div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-12">
        <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-4">Booking Authority</h2>
        <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">CONTRATAR <span className="text-white/20">SEMINÁRIO.</span></h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Nome do Organizador ou Academia</label>
          <div className="relative">
            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              required
              type="text" 
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-4 focus:border-white/40 outline-none transition-all font-data text-white"
              placeholder="Ex: Alliance SP / João Silva"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Telefone / WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                required
                type="tel" 
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-4 focus:border-white/40 outline-none transition-all font-data text-white"
                placeholder="(00) 99999-9999"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Localização (Cidade/Estado)</label>
            <div className="relative">
              <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                required
                type="text" 
                value={formData.local}
                onChange={(e) => setFormData({...formData, local: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-4 focus:border-white/40 outline-none transition-all font-data text-white"
                placeholder="Ex: Curitiba, PR"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Users size={12} /> Público Estimado
            </label>
            <input 
              required
              type="text" 
              value={formData.publico}
              onChange={(e) => setFormData({...formData, publico: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-white/40 outline-none transition-all font-data text-white"
              placeholder="Ex: 40-60 alunos"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Calendar size={12} /> Data Pretendida
            </label>
            <input 
              required
              type="text" 
              value={formData.data}
              onChange={(e) => setFormData({...formData, data: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-white/40 outline-none transition-all font-data text-white"
              placeholder="Ex: Dezembro / 2024"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
            <Target size={12} /> Foco Técnico Desejado
          </label>
          <textarea 
            required
            value={formData.foco}
            onChange={(e) => setFormData({...formData, foco: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-white/40 outline-none transition-all font-data text-white h-24 resize-none"
            placeholder="Ex: Passagem de Guarda, Single Leg X, Pressão..."
          />
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter hover:bg-white/90 transition-all rounded-full flex items-center justify-center gap-3 mt-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          <span>Solicitar Reserva no WhatsApp</span>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
