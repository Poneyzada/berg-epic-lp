import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface NavbarProps {
  onSeminarClick: () => void;
  onFilterClick: () => void;
}

export const Navbar = ({ onSeminarClick, onFilterClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [lang, setLang] = useState<'pt' | 'en'>(i18n.language as 'pt' | 'en');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    const next = lang === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(next);
    setLang(next);
  };

  const navLinks = [
    { name: t('navbar.metodologia'), href: '#philosophy' },
    { name: t('navbar.cursos'), href: '#courses' },
    { name: t('navbar.free'), href: '#free' },
  ];

  return (
    <nav className="fixed top-8 left-0 right-0 z-[100] px-4">
      <div 
        className={cn(
          "max-w-5xl mx-auto transition-all duration-700 ease-out",
          isScrolled ? "scale-95" : "scale-100"
        )}
      >
        <div 
          className={cn(
            "glass-pill px-6 py-4 flex items-center justify-between transition-all duration-500",
            isScrolled ? "bg-black/80 backdrop-blur-2xl border-white/5 py-3" : "bg-white/5"
          )}
        >
          {/* Logo */}
          <a href="#" className="text-xl font-black italic tracking-tighter uppercase group">
            EU<span className="text-white group-hover:text-white/70 transition-colors">BERG</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href === '#seminars') {
                    e.preventDefault();
                    onSeminarClick();
                  }
                  if (mobileMenuOpen) setMobileMenuOpen(false);
                }}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions & Toggle */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3 md:gap-4 md:border-r md:border-white/10 md:pr-4 md:mr-1">
              <a 
                href="https://www.instagram.com/euberg10?igsh=MmNveG9qdTZja3Zp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group backdrop-blur-sm text-white/60"
              >
                <Instagram size={13} className="md:w-[14px] md:h-[14px]" />
              </a>
              <a 
                href="https://www.youtube.com/@GuPereira"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group backdrop-blur-sm text-white/60"
              >
                <Youtube size={13} className="md:w-[14px] md:h-[14px]" />
              </a>
            </div>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 hover:border-white/50 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-white"
            >
              <span className={lang === 'pt' ? 'text-white' : 'text-white/30'}>PT</span>
              <span className="text-white/20">|</span>
              <span className={lang === 'en' ? 'text-white' : 'text-white/30'}>EN</span>
            </button>
            
            <button 
              onClick={onSeminarClick}
              className="hidden md:block btn-magnetic btn-primary px-6 py-2"
            >
              {t('navbar.seminarios')}
            </button>

            <button 
              className="md:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 glass-card p-8 md:hidden z-[101]"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.href === '#seminars') {
                      e.preventDefault();
                      onSeminarClick();
                    }
                  }}
                  className="text-lg font-bold uppercase tracking-widest text-center py-2 border-b border-white/5 text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}

              {/* Language Toggle - Mobile */}
              <div className="flex justify-center">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[11px] font-black uppercase tracking-[0.2em]"
                >
                  <span className={lang === 'pt' ? 'text-white' : 'text-white/30'}>Português</span>
                  <span className="text-white/20">|</span>
                  <span className={lang === 'en' ? 'text-white' : 'text-white/30'}>English</span>
                </button>
              </div>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSeminarClick();
                }}
                className="btn-magnetic btn-primary w-full"
              >
                {t('navbar.seminarios')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
