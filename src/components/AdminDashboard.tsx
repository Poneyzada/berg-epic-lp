import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Search, 
  Filter, 
  ArrowUpRight,
  Shield,
  Calendar,
  ExternalLink,
  ChevronRight,
  Clock
} from 'lucide-react';

interface Lead {
  id: number;
  nome: string;
  whatsapp: string;
  interesse: string;
  origem: string;
  created_at: string;
  suggested_remarketing: string;
  metadata?: any;
}

export const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'ICP' | 'Seminar'>('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads
    .filter(l => filter === 'all' || l.origem === filter)
    .filter(l => l.nome.toLowerCase().includes(searchTerm.toLowerCase()) || l.interesse.toLowerCase().includes(searchTerm.toLowerCase()));

  const stats = {
    total: leads.length,
    icp: leads.filter(l => l.origem === 'ICP').length,
    seminars: leads.filter(l => l.origem === 'Seminar').length,
    growth: '+12%'
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-white selection:text-black">
      {/* Sidebar / Nav */}
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-black italic shadow-[0_0_20px_rgba(255,255,255,0.2)]">B</div>
          <div>
            <h1 className="text-[10px] font-black uppercase tracking-[0.4em]">Berg CRM</h1>
            <p className="text-[8px] text-white/40 uppercase tracking-widest">Protocol Intelligence Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Sincronizado</span>
          </div>
          <Shield size={18} className="text-white/20" />
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.6em] mb-4">Command Center</h2>
            <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              LEAD <span className="text-white/20">CONTROL.</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:flex gap-4">
            <StatCard label="Total Leads" value={stats.total} icon={Users} color="white" />
            <StatCard label="ICP Conversion" value={stats.icp} icon={Target} color="white" />
            <StatCard label="Seminários" value={stats.seminars} icon={Calendar} color="white" />
            <StatCard label="Projeção" value={stats.growth} icon={TrendingUp} color="emerald-500" />
          </div>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="PESQUISAR LEADS POR NOME OU INTERESSE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-5 focus:border-white/40 outline-none transition-all font-data text-xs"
            />
          </div>
          <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl">
            {(['all', 'ICP', 'Seminar'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  filter === t ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                }`}
              >
                {t === 'all' ? 'Tudo' : t === 'ICP' ? 'Protocolos' : 'Seminários'}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Lead / Contato</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Interesse Primário</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Origem</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Remarketing Sugerido</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {filteredLeads.map((lead) => (
                    <motion.tr 
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group hover:bg-white/5 transition-colors"
                    >
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:scale-110">
                            <span className="text-[10px] font-black uppercase">{lead.nome.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-bold uppercase tracking-tighter mb-1">{lead.nome}</div>
                            <div className="text-[10px] text-white/40 font-data tracking-widest">{lead.whatsapp}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-2 mb-1">
                          <Target size={12} className="text-rose-500" />
                          <span className="text-[11px] font-black uppercase tracking-widest">{lead.interesse}</span>
                        </div>
                        <div className="text-[9px] text-white/20 uppercase tracking-widest flex items-center gap-2">
                           <Clock size={10} />
                           {new Date(lead.created_at).toLocaleDateString('pt-BR')} às {new Date(lead.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                          lead.origem === 'ICP' 
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        }`}>
                          {lead.origem === 'ICP' ? 'Protocolo' : 'Seminário'}
                        </span>
                      </td>
                      <td className="px-8 py-8 max-w-sm">
                        <div className="p-4 bg-black/40 border border-white/5 rounded-2xl italic text-[10px] text-white/60 leading-relaxed group-hover:border-white/20 transition-all">
                          "{lead.suggested_remarketing}"
                        </div>
                      </td>
                      <td className="px-8 py-8 text-right">
                        <a 
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(lead.suggested_remarketing)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#ff0033] hover:text-white transition-all shadow-xl active:scale-95"
                        >
                          Ativar
                          <MessageSquare size={12} />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {loading && (
              <div className="py-20 text-center text-white/20 uppercase tracking-[0.5em] text-[10px] animate-pulse">
                Carregando Leads...
              </div>
            )}

            {!loading && filteredLeads.length === 0 && (
              <div className="py-20 text-center text-white/20 uppercase tracking-[0.5em] text-[10px]">
                Nenhum lead encontrado
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="px-8 py-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center gap-6 min-w-[200px]">
    <div className={`w-12 h-12 rounded-2xl bg-${color}/10 flex items-center justify-center border border-${color}/20`}>
      <Icon size={20} className={`text-${color}`} />
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{label}</div>
      <div className="text-2xl font-black uppercase italic tracking-tighter">{value}</div>
    </div>
  </div>
);
