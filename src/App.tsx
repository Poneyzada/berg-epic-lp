import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SmartFilter } from './components/SmartFilter';
import { DiagnosticShuffler, TelemetryTypewriter, CursorProtocolScheduler } from './components/FeatureArtifacts';
import { Philosophy, ProtocolStack } from './components/NarrativeSections';
import { Membership } from './components/Membership';

export const App = () => {
  return (
    <div className="relative min-h-screen bg-[#0D0D12] overflow-x-hidden">
      <Navbar />
      
      <main>
        {/* Entry Scene */}
        <Hero />

        {/* Feature Artifacts Section */}
        <section id="features" className="py-20 md:py-40 bg-[#0D0D12] relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-sm font-data font-bold text-[#C9A84C] uppercase tracking-[0.4em] mb-4">
              Protocolo Técnico
            </h2>
            <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-20 max-w-2xl">
              A Arte da <span className="font-drama text-white">Pressão</span> e o <br />
              Controle <span className="font-drama text-white">Absoluto</span>.
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Diagnostic Shuffler */}
               <div className="glass-card p-10 flex flex-col justify-between group cursor-pointer hover:border-[#C9A84C]/30 transition-all duration-500 min-h-[500px]">
                  <DiagnosticShuffler />
                  <div className="mt-12">
                    <h4 className="text-2xl font-black uppercase mb-4 italic">Metodologia</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed">
                      Transforme seu jogo de passagens com um sistema baseado em conceitos, não apenas repetição mecânica.
                    </p>
                  </div>
               </div>

               {/* Telemetry Typewriter */}
               <div className="glass-card p-10 flex flex-col justify-between group cursor-pointer hover:border-[#C9A84C]/30 transition-all duration-500 min-h-[500px]">
                  <TelemetryTypewriter />
                  <div className="mt-12">
                    <h4 className="text-2xl font-black uppercase mb-4 italic">Elite Library</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed">
                      Acesso instantâneo aos detalhes que decidem campeonatos mundiais. Estudo de caso em tempo real.
                    </p>
                  </div>
               </div>

               {/* Cursor Protocol Scheduler */}
               <div className="glass-card p-10 flex flex-col justify-between group cursor-pointer hover:border-[#C9A84C]/30 transition-all duration-500 min-h-[500px]">
                  <CursorProtocolScheduler />
                  <div className="mt-12">
                    <h4 className="text-2xl font-black uppercase mb-4 italic">Seminários</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed">
                      Agende a experiência definitiva de treinamento presencial. Protocolos de elite aplicados globalmente.
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Narrative Layers */}
        <Philosophy />
        <ProtocolStack />

        {/* Smart Filter as a "Consultation" tool before final CTA */}
        <div id="filter" className="relative z-20 py-20 bg-black">
          <SmartFilter />
        </div>

        {/* Membership Section */}
        <Membership />

      </main>

      {/* Cinematic Footer Indicator */}
      <footer className="py-12 border-t border-white/5 bg-[#0D0D12] relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-data text-white/40 uppercase tracking-[0.3em]">System Operational: 1.0.1</span>
           </div>
           <div className="text-[10px] font-data text-white/20 uppercase tracking-[0.5em]">
             © 2026 BERG EPIC // PIXEL PERFECT ENGINE
           </div>
        </div>
      </footer>
    </div>
  );
};
