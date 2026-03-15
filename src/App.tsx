import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SmartFilter } from './components/SmartFilter';
import { Courses } from './components/Courses';
import { FreeTechniques } from './components/FreeTechniques';
import { SocialProof } from './components/SocialProof';
import { FAQ } from './components/FAQ';
import { Philosophy, ProtocolStack } from './components/NarrativeSections';
import { Footer } from './components/Footer';
import { SeminarModal } from './components/SeminarModal';

function App() {
  const [modalType, setModalType] = useState<'filter' | 'seminar' | null>(null);

  return (
    <div className="bg-[#0D0D12] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <Navbar 
        onSeminarClick={() => setModalType('seminar')} 
        onFilterClick={() => setModalType('filter')}
      />
      
      <main>
        <Hero />
        <Philosophy />
        <ProtocolStack onAction={(type) => setModalType(type)} />
        <Courses />
        <FreeTechniques />
        <SocialProof />
        <FAQ />
      </main>

      <Footer />

      {/* Modals */}
      <SeminarModal 
        isOpen={modalType === 'seminar'} 
        onClose={() => setModalType(null)} 
      />
      
      <SmartFilter 
        isOpen={modalType === 'filter'} 
        onClose={() => setModalType(null)} 
      />
    </div>
  );
}

export default App;
