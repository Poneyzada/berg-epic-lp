import React from 'react';
import { Instagram, Youtube, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Gutemberg Pereira</h3>
            <p className="text-white/70 text-xs md:text-sm font-data leading-relaxed max-w-sm mb-8">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
               <a href="https://www.instagram.com/euberg10?igsh=MmNveG9qdTZja3Zp" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white text-white hover:text-black transition-all">
                  <Instagram size={18} />
               </a>
               <a href="https://www.youtube.com/@GuPereira" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white text-white hover:text-black transition-all">
                  <Youtube size={18} />
               </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-8">{t('footer.links')}</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-white/75">
              <li><a href="#courses" className="hover:text-white transition-colors">{t('footer.courses')}</a></li>
              <li><a href="#free" className="hover:text-white transition-colors">{t('footer.techniques')}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t('footer.about')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-8">{t('footer.support')}</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-white/75">
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-white/50" />
                <a href="mailto:gupereirabjj@hotmail.com" className="hover:text-white transition-colors lowercase">gupereirabjj@hotmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={14} className="text-white/50" />
                <span>{t('footer.location')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] uppercase font-black tracking-[0.3em] text-white/50">
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-8 grayscale opacity-20 hover:opacity-100 transition-all">
             <a href="#admin" className="text-[8px] uppercase font-black tracking-widest text-white/40 hover:text-white transition-colors">Acesso Admin</a>
             <div className="flex items-center gap-4">
                <span className="text-[8px] uppercase font-black tracking-widest text-white/60">DESIGN & DEV</span>
                <span className="text-xs font-black tracking-tighter hover:text-white transition-colors cursor-default">TRÍADE STUDIO</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
