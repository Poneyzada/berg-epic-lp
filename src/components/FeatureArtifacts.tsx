import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Terminal, Calendar, Layers, MousePointer2, Check } from 'lucide-react';

// Card 1: Diagnostic Shuffler
export const DiagnosticShuffler = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Pressão Absoluta', subtitle: 'Conceito de Peso Deadweight' },
    { id: 2, title: 'Passagens de Guarda', subtitle: 'Conexão de Cadeias Técnicas' },
    { id: 3, title: 'Finalizações', subtitle: 'Refinamento de Alavancas' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) => {
        const newArr = [...prev];
        const last = newArr.pop();
        if (last) newArr.unshift(last);
        return newArr;
      });
    }, 3000);
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
           className="absolute w-full bg-white/5 border border-white/10 p-6 rounded-2xl glass-pill backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                <Layers size={18} className="text-[#C9A84C]" />
             </div>
             <div>
               <div className="text-[10px] font-data text-white/40 uppercase tracking-widest">{item.subtitle}</div>
               <div className="text-sm font-bold uppercase">{item.title}</div>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Card 2: Telemetry Typewriter
export const TelemetryTypewriter = () => {
  const messages = [
    '> SYSTEM.BOOT: Elite Library initialized...',
    '> SCRAPING: World Championship matches 2024...',
    '> ANALYZING: Berg Style Guard Passing (98.4% efficiency)',
    '> DECODING: Pressure concepts... APPLYING WEIGHT.',
    '> SUCCESS: New technical artifact added to drive.',
  ];
  
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < messages[index].length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + messages[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentText('');
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % messages.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, index]);

  return (
    <div className="bg-black/40 rounded-xl p-4 font-data text-[9px] h-32 overflow-hidden border border-white/5">
      <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
         <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
         <span className="text-white/30 uppercase tracking-[0.2em]">Live Telemetry Feed</span>
      </div>
      <div className="text-[#C9A84C] leading-loose">
        {currentText}
        <span className="w-1.5 h-3 bg-[#C9A84C] inline-block ml-1 animate-pulse align-middle" />
      </div>
    </div>
  );
};

// Card 3: Cursor Protocol Scheduler
export const CursorProtocolScheduler = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(3);
  const cursorRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(cursorRef.current, { x: 0, y: 0, duration: 0 })
      .to(cursorRef.current, { 
        x: (activeDay % 7) * 40 - 20, 
        y: 20, 
        duration: 1.5, 
        ease: 'power3.inOut',
        delay: 1 
      })
      .to(cursorRef.current, { scale: 0.8, duration: 0.2 })
      .call(() => setActiveDay((prev) => (prev + 1) % 7))
      .to(cursorRef.current, { scale: 1, duration: 0.2 })
      .to(cursorRef.current, { opacity: 0, duration: 0.5, delay: 1 });

    return () => { tl.kill(); };
  }, []);

  return (
    <div className="relative bg-white/5 rounded-2xl p-6 border border-white/5 h-40 overflow-hidden">
      <div className="flex justify-between mb-8 relative">
        {days.map((day, i) => (
          <div 
            key={i} 
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors duration-500 ${i === activeDay ? 'bg-[#C9A84C] text-[#0D0D12]' : 'bg-white/5 text-white/20'}`}
          >
            {day}
          </div>
        ))}
        
        {/* Animated Cursor */}
        <div ref={cursorRef} className="absolute pointer-events-none text-[#C9A84C]">
          <MousePointer2 size={16} />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-auto">
         <div className="text-[10px] font-data text-white/30 tracking-widest uppercase">Protocol Status</div>
         <div className="flex items-center gap-2 text-[10px] font-bold text-[#C9A84C] uppercase">
            <Check size={12} />
            Slot Confirmed
         </div>
      </div>
    </div>
  );
};
