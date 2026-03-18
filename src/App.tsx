import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
// v2.1.0-recovery-center-live
import { Hero } from './components/Hero';
import { SmartFilter } from './components/SmartFilter';
import { Courses } from './components/Courses';
import { FreeTechniques } from './components/FreeTechniques';
import { SocialProof } from './components/SocialProof';
import { FAQ } from './components/FAQ';
import { Philosophy, ProtocolStack } from './components/NarrativeSections';
import { Footer } from './components/Footer';
import { SeminarModal } from './components/SeminarModal';

import { AdminDashboard } from './components/AdminDashboard';

function App() {
  const [modalType, setModalType] = useState<'filter' | 'seminar' | null>(null);
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdmin) return <AdminDashboard />;

  return (
    <div className="bg-[#0D0D12] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <Navbar 
        onSeminarClick={() => setModalType('seminar')} 
        onFilterClick={() => setModalType('filter')}
      />
      
      <main>
        <Hero onAction={() => setModalType('filter')} />
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
