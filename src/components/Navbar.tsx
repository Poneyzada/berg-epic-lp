import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  onSeminarClick: () => void;
  onFilterClick: () => void;
}

export const Navbar = ({ onSeminarClick, onFilterClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Metodologia', href: '#philosophy' },
    { name: 'Cursos', href: '#courses' },
    { name: 'Técnicas', href: '#free' },
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
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions & Toggle */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Social Icons - Visible on all screen sizes, subtle on mobile */}
            <div className="flex items-center gap-3 md:gap-4 md:border-r md:border-white/10 md:pr-6 md:mr-2">
              <a 
                href="https://www.instagram.com/euberg10?igsh=MmNveG9qdTZja3Zp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group backdrop-blur-sm text-white/40"
              >
                <Instagram size={14} className="md:w-4 md:h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@GuPereira"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group backdrop-blur-sm text-white/40"
              >
                <Youtube size={14} className="md:w-4 md:h-4" />
              </a>
            </div>
            
            <button 
              onClick={onSeminarClick}
              className="hidden md:block btn-magnetic btn-primary px-6 py-2"
            >
              Seminários
            </button>

            <button 
              className="md:hidden p-2 text-white/60 hover:text-white"
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
                  className="text-lg font-bold uppercase tracking-widest text-center py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSeminarClick();
                }}
                className="btn-magnetic btn-primary w-full"
              >
                Seminários
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
