import React from 'react';
import { Instagram, Youtube, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Gutemberg Pereira</h3>
            <p className="text-white/40 text-xs md:text-sm font-data leading-relaxed max-w-sm mb-8">
              Levando o Jiu-Jitsu de Salvador para o mundo. Técnica, precisão e mentalidade campeã em cada detalhe.
            </p>
            <div className="flex gap-4">
               <a href="https://www.instagram.com/gupereirabjj/" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white text-white hover:text-black transition-all">
                  <Instagram size={18} />
               </a>
               <a href="https://www.youtube.com/@GuPereira" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white text-white hover:text-black transition-all">
                  <Youtube size={18} />
               </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Links Rápidos</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-white/60">
              <li><a href="#courses" className="hover:text-white transition-colors">Cursos</a></li>
              <li><a href="#free" className="hover:text-white transition-colors">Técnicas Extras</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Sobre o Berg</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Suporte</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-white/60">
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-white/20" />
                <a href="mailto:gupereirabjj@hotmail.com" className="hover:text-white transition-colors lowercase">gupereirabjj@hotmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={14} className="text-white/20" />
                <span>Mundial / Seminários</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] uppercase font-black tracking-[0.3em] text-white/20">
            © 2025 Gutemberg Pereira. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 grayscale opacity-20 hover:opacity-100 transition-opacity">
             <span className="text-[8px] uppercase font-black tracking-widest">Desenvolvido por</span>
             <span className="text-xs font-black tracking-tighter">TREVO FILMS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
