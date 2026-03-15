import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Target, Activity, Send, MousePointer2, CheckCircle2 } from 'lucide-react';

// Card 1: Technical Shuffler (BJJ Focus)
export const DiagnosticShuffler = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Pressão Deadweight', subtitle: 'Conceito de Gravidade Zero' },
    { id: 2, title: 'Leg Drag Protocol', subtitle: 'Conexão em Cadeia' },
    { id: 3, title: 'Controle de Quadril', subtitle: 'Anulando o Escapismo' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) => {
        const newArr = [...prev];
        const last = newArr.pop();
        if (last) newArr.unshift(last);
        return newArr;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-48 w-full flex items-center justify-center perspective-1000">
      {items.map((item, index) => (
        <motion.div
           key={item.id}
           layout
           initial={false}
           animate={{
             y: index * -15,
             scale: 1 - index * 0.05,
             zIndex: items.length - index,
             opacity: 1 - index * 0.3,
           }}
           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
           className="absolute w-full bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Target size={18} className="text-white" />
             </div>
             <div>
               <div className="text-[10px] font-data text-white/30 uppercase tracking-widest">{item.subtitle}</div>
               <div className="text-sm font-bold uppercase">{item.title}</div>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Card 2: Pressure Telemetry (BJJ Focus)
export const TelemetryTypewriter = () => {
  const data = [
    { label: 'PRESSÃO', value: '98%', color: 'white' },
    { label: 'CONTATO', value: '100%', color: 'white' },
    { label: 'EQUILÍBRIO', value: 'ESTÁVEL', color: 'white' },
  ];

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 h-40 flex flex-col justify-between">
       <div className="flex items-center justify-between mb-4">
         <div className="flex items-center gap-2">
           <Activity size={14} className="text-white/40" />
           <span className="text-[10px] font-data text-white/40 uppercase tracking-widest">Technical Analysis</span>
         </div>
         <div className="text-[10px] font-data text-white/10 uppercase tracking-[0.2em]">Protocol v2.0</div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
         {data.map((item) => (
           <div key={item.label} className="flex flex-col gap-1">
              <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest">{item.label}</span>
              <span className="text-xl font-black italic">{item.value}</span>
           </div>
         ))}
      </div>
      
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-4">
         <motion.div 
           animate={{ x: ['-100%', '100%'] }}
           transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
           className="h-full w-24 bg-white/40"
         />
      </div>
    </div>
  );
};

// Card 3: Seminar Slot Scheduler (BJJ Focus)
export const CursorProtocolScheduler = () => {
  const slots = [
    { city: 'London', status: 'Full' },
    { city: 'New York', status: 'Book Now' },
    { city: 'Tokyo', status: 'Confirmed' },
  ];

  return (
    <div className="relative bg-white/5 rounded-2xl p-6 border border-white/5 h-52 flex flex-col justify-between overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="space-y-4 w-full">
           {slots.map((slot, i) => (
             <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-bold uppercase tracking-widest">{slot.city}</span>
                <span className={`text-[8px] font-data uppercase tracking-widest ${slot.status === 'Full' ? 'text-white/10' : 'text-white'}`}>
                   {slot.status === 'Full' ? 'Reserved' : slot.status === 'Confirmed' ? 'Live' : 'Open'}
                </span>
             </div>
           ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
         <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest">
            <CheckCircle2 size={12} />
            Seminar Protocol Active
         </div>
         <div className="p-2 bg-white text-black rounded-lg">
            <Send size={12} />
         </div>
      </div>

      {/* Aesthetic Side Polish */}
      <div className="absolute -right-4 -bottom-4 opacity-5">
         <Target size={120} />
      </div>
    </div>
  );
};
