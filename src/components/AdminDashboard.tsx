import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Search, 
  Filter, 
  Trophy,
  ArrowUpRight,
  Shield,
  Calendar,
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle,
  LayoutDashboard,
  MapPin,
  Settings,
  HelpCircle,
  Menu,
  X,
  CreditCard,
  PieChart,
  ShieldAlert
} from 'lucide-react';

interface Lead {
  id: number;
  nome: string;
  whatsapp: string;
  interesse: string;
  origem: string;
  status: string;
  created_at: string;
  suggested_remarketing: string;
  metadata?: any;
}

type Tab = 'leads' | 'seminars' | 'courses' | 'support';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [dbStatus, setDbStatus] = useState<'connected' | 'pending' | 'error'>('pending');
  const [isDemo, setIsDemo] = useState(false);

  const mockLeads: Lead[] = [
    { id: 1, nome: "Demo: Berg (Teste)", whatsapp: "(21) 99999-9999", interesse: "ICP: Pressão", status: "Lead", origem: "ICP", created_at: new Date().toISOString(), suggested_remarketing: "Oi Berg! Demo mode ativo." },
    { id: 2, nome: "Demo: Alliance SP", whatsapp: "(11) 98888-8888", interesse: "Seminário: Passagem", status: "Solicitado", origem: "Seminar", created_at: new Date().toISOString(), suggested_remarketing: "Oi Alliance!", metadata: { local: "São Paulo, SP", data: "Junho/2024", publico: "100+ Alunos" } },
    { id: 3, nome: "Demo: Carrinho Abandonado", whatsapp: "(31) 97777-7777", interesse: "Curso: Pressão faz Diamantes", status: "Abandonado", origem: "Checkout", created_at: new Date(Date.now() - 3600000).toISOString(), suggested_remarketing: "Oi! Notamos seu interesse..." }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'berg-epic-2024') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const enterDemoMode = () => {
    setIsDemo(true);
    setIsAuthenticated(true);
    setLeads(mockLeads);
    setDbStatus('pending');
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated && !isDemo) fetchLeads();
  }, [isAuthenticated, isDemo]);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (!response.ok) throw new Error('API unreachable');
      const data = await response.json();
      
      if (data.error === "Database not configured") {
        setDbStatus('pending');
        // No Vercel, se não tiver chaves, mostramos vazio OU forçamos demo se o user quiser
      } else {
        setLeads(Array.isArray(data) ? data : []);
        setDbStatus('connected');
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
      setDbStatus('error');
      if (window.location.hostname === 'localhost') {
        enterDemoMode();
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, wa: string, status: string) => {
    if (isDemo) {
      setLeads(prev => prev.map(l => l.whatsapp === wa ? { ...l, status } : l));
      return;
    }
    try {
      await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp: wa, status })
      });
      fetchLeads();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0D12] flex items-center justify-center p-6 selection:bg-rose-500 selection:text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <ShieldAlert className="text-rose-500" size={32} />
            </div>
            <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.6em] mb-4">Security Protocol</h2>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white text-balance">ACESSO <span className="text-rose-500">RESTRITO.</span></h3>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <input 
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="TOKEN DE ACESSO"
                className={`w-full bg-white/5 border ${authError ? 'border-rose-500/50' : 'border-white/10'} rounded-2xl px-6 py-5 text-center text-sm font-black uppercase tracking-[0.3em] outline-none focus:border-white/40 transition-all text-white placeholder:text-white/10`}
              />
              {authError && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-[8px] font-black uppercase tracking-widest text-rose-500 text-center mt-4"
                >
                  Protocolo de segurança: Acesso Negado.
                </motion.p>
              )}
            </div>
            <button 
              type="submit"
              className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter hover:bg-rose-500 hover:text-white transition-all rounded-2xl shadow-2xl active:scale-95"
            >
              AUTENTICAR SISTEMA
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <button 
              onClick={enterDemoMode}
              className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-emerald-500 transition-colors"
            >
              ENTRAR EM MODO DEMONSTRATIVO (OFFLINE)
            </button>
          </div>

          <p className="mt-8 text-[8px] text-center text-white/10 uppercase tracking-widest font-bold">
            Authorized Personnel Only • Berg Official Platform v2.1
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#080808] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 border-r border-white/5 bg-black/40 backdrop-blur-2xl flex flex-col z-50`}>
        <div className="p-8 flex items-center gap-4">
          <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-black italic shadow-[0_0_20px_rgba(255,255,255,0.2)]">B</div>
          {isSidebarOpen && <span className="font-black uppercase italic tracking-tighter">Berg CRM Pro</span>}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <NavItem 
            icon={LayoutDashboard} 
            label="Leads & Funil" 
            isActive={activeTab === 'leads'} 
            onClick={() => setActiveTab('leads')} 
            isOpen={isSidebarOpen} 
          />
          <NavItem 
            icon={Calendar} 
            label="Seminários" 
            isActive={activeTab === 'seminars'} 
            onClick={() => setActiveTab('seminars')} 
            isOpen={isSidebarOpen} 
          />
          <NavItem 
            icon={PieChart} 
            label="Performance Cursos" 
            isActive={activeTab === 'courses'} 
            onClick={() => setActiveTab('courses')} 
            isOpen={isSidebarOpen} 
          />
          <NavItem 
            icon={HelpCircle} 
            label="Central de Suporte" 
            isActive={activeTab === 'support'} 
            onClick={() => setActiveTab('support')} 
            isOpen={isSidebarOpen} 
            badge={leads.filter(l => l.status === 'Abandonado').length}
          />
        </nav>

        <div className="p-8 border-t border-white/5">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="flex items-center gap-3 text-white/20 hover:text-white transition-colors">
            {isSidebarOpen ? <ChevronRight className="rotate-180" size={18} /> : <ChevronRight size={18} />}
            {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Recolher</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl z-40 flex items-center justify-between px-12">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              {activeTab === 'leads' ? 'Lead Control' : 
               activeTab === 'seminars' ? 'Booking Authority' : 
               activeTab === 'courses' ? 'Product Analytics' : 'Shield Support'}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            {isDemo ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-orange-500">Modo Demo</span>
              </div>
            ) : dbStatus === 'pending' ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 rounded-full border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                <ShieldAlert className="text-rose-500" size={12} />
                <span className="text-[9px] font-bold uppercase tracking-widest text-rose-500">DB Offline: Configuração Pendente</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">Live Sync Ativo</span>
              </div>
            )}
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Shield size={18} className="text-white/20" />
            </div>
          </div>
        </header>

        <div className="p-12 max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'leads' && <LeadsModule leads={leads} refresh={fetchLeads} />}
              {activeTab === 'seminars' && <SeminarsModule seminars={leads.filter(l => l.origem === 'Seminar')} updateStatus={updateStatus} />}
              {activeTab === 'courses' && <CoursesModule leads={leads} />}
              {activeTab === 'support' && <SupportModule tickets={leads.filter(l => l.status === 'Abandonado')} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, isActive, onClick, isOpen, badge }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
      isActive ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'text-white/40 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon size={20} className={isActive ? 'text-black' : 'text-current'} />
    {isOpen && (
      <div className="flex-1 flex items-center justify-between">
        <span className="text-[11px] font-black uppercase italic tracking-tight">{label}</span>
        {badge > 0 && (
          <span className="w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[9px] font-black border border-black italic">
            {badge}
          </span>
        )}
      </div>
    )}
  </button>
);

const LeadsModule = ({ leads, refresh }: { leads: Lead[], refresh: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = leads
    .filter(l => statusFilter === 'all' || l.status === statusFilter)
    .filter(l => l.nome.toLowerCase().includes(searchTerm.toLowerCase()) || l.interesse.toLowerCase().includes(searchTerm.toLowerCase()));

  const stats = {
    total: leads.length,
    checkout: leads.filter(l => l.status === 'No Checkout').length,
    paid: leads.filter(l => l.status === 'Pago').length,
    abandoned: leads.filter(l => l.status === 'Abandonado').length
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:flex gap-4 mb-12">
        <StatCard label="Total Leads" value={stats.total} icon={Users} color="white" />
        <StatCard label="No Checkout" value={stats.checkout} icon={Target} color="blue-500" />
        <StatCard label="Vendas (Pago)" value={stats.paid} icon={Trophy} color="emerald-500" />
        <StatCard label="Abandono" value={stats.abandoned} icon={Clock} color="orange-500" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="PESQUISAR NOMES OU CURSOS..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-5 focus:border-white/40 outline-none transition-all font-data text-xs uppercase"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-[9px] font-black uppercase tracking-widest outline-none focus:border-white/40 cursor-pointer text-white appearance-none min-w-[180px]"
        >
          <option value="all" className="bg-[#121217] text-white">FILTRO: TODOS</option>
          <option value="Lead" className="bg-[#121217] text-white">APENAS LEADS</option>
          <option value="No Checkout" className="bg-[#121217] text-white">NO CHECKOUT</option>
          <option value="Pago" className="bg-[#121217] text-white">VENDAS (PAGAS)</option>
          <option value="Abandonado" className="bg-[#121217] text-white">ABANDONOS</option>
        </select>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Lead</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Interesse</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-white/20 font-black uppercase tracking-[0.3em] text-[10px]">
                    Nenhum lead encontrado com estes filtros
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-8 py-8">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                        lead.status === 'Pago' ? 'bg-emerald-500 text-black border-emerald-500' :
                        lead.status === 'Abandonado' ? 'bg-rose-500 text-white border-rose-500' :
                        lead.status === 'No Checkout' ? 'bg-blue-600 text-white border-blue-600' :
                        'bg-white/10 border-white/20 text-white/60'
                      }`}>
                        {lead.status || 'Lead'}
                      </span>
                    </td>
                    <td className="px-8 py-8">
                      <div className="text-sm font-bold uppercase italic tracking-tighter text-white">{lead.nome}</div>
                      <div className="text-[10px] text-white/40 font-data tracking-widest">{lead.whatsapp}</div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="text-[11px] font-black uppercase tracking-widest text-white/80">{lead.interesse}</div>
                      <div className="text-[9px] text-white/20 uppercase tracking-widest">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</div>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <a 
                        href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(lead.suggested_remarketing)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-[9px] font-black uppercase italic tracking-widest hover:bg-[#ff0033] hover:text-white transition-all shadow-xl active:scale-95"
                      >
                        Ativar <MessageSquare size={12} />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-white/5">
          {filteredLeads.length === 0 ? (
            <div className="px-8 py-20 text-center text-white/20 font-black uppercase tracking-[0.3em] text-[10px]">
              Nenhum lead encontrado
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div key={lead.id} className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-black uppercase italic tracking-tighter text-white mb-1">{lead.nome}</div>
                    <div className="text-[10px] text-white/40 font-data tracking-widest">{lead.whatsapp}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    lead.status === 'Pago' ? 'bg-emerald-500 text-black border-emerald-500' :
                    lead.status === 'Abandonado' ? 'bg-rose-500 text-white border-rose-500' :
                    lead.status === 'No Checkout' ? 'bg-blue-600 text-white border-blue-600' :
                    'bg-white/10 border-white/20 text-white/60'
                  }`}>
                    {lead.status || 'Lead'}
                  </span>
                </div>
                
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Interesse</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/80">{lead.interesse}</div>
                </div>

                <a 
                  href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(lead.suggested_remarketing)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase italic tracking-tighter shadow-2xl active:scale-95 transition-all"
                >
                  ACESSAR VIA WHATSAPP <MessageSquare size={14} />
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const SeminarsModule = ({ seminars, updateStatus }: { seminars: Lead[], updateStatus: (id: string, wa: string, status: string) => void }) => {
  const [selectedSeminar, setSelectedSeminar] = useState<Lead | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seminars.length === 0 ? (
          <div className="col-span-full py-20 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4">
            <Calendar className="text-white/20" size={48} />
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Nenhuma solicitação de seminário</div>
          </div>
        ) : (
          seminars.map(s => (
            <div 
              key={s.id} 
              onClick={() => setSelectedSeminar(s)}
              className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] group hover:border-white/20 transition-all cursor-pointer relative overflow-hidden"
            >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                s.status === 'Concluído' ? 'bg-emerald-500/10 border-emerald-500/20' :
                s.status === 'Confirmado' ? 'bg-blue-500/10 border-blue-500/20' :
                'bg-rose-500/10 border-rose-500/20'
              }`}>
                <MapPin className={
                  s.status === 'Concluído' ? 'text-emerald-500' :
                  s.status === 'Confirmado' ? 'text-blue-500' :
                  'text-rose-500'
                } />
              </div>
              <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                s.status === 'Concluído' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                s.status === 'Confirmado' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                'bg-rose-500/10 border-rose-500/20 text-rose-500'
              }`}>
                {s.status || 'Solicitado'}
              </span>
            </div>
            <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-2">{s.nome}</h4>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <MapPin size={14} className="text-white/20" /> {s.metadata?.local || 'A definir'}
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <Calendar size={14} className="text-white/20" /> {s.metadata?.data || 'A definir'}
              </div>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors">
              Clique para ver detalhes técnicos →
            </div>
          </div>
        ))
      )}
    </div>

      {/* Seminar Detail Modal */}
      <AnimatePresence>
        {selectedSeminar && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSeminar(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0D0D12] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.6em] mb-4">Seminar Details</h2>
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{selectedSeminar.nome}</h3>
                  </div>
                  <button onClick={() => setSelectedSeminar(null)} className="p-4 bg-white/5 rounded-full hover:bg-white/10 text-white/20 hover:text-white transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <DetailItem icon={MapPin} label="Localização" value={selectedSeminar.metadata?.local} />
                  <DetailItem icon={Calendar} label="Data Prevista" value={selectedSeminar.metadata?.data} />
                  <DetailItem icon={Users} label="Público" value={selectedSeminar.metadata?.publico} />
                  <DetailItem icon={Shield} label="WhatsApp" value={selectedSeminar.whatsapp} />
                </div>

                <div className="p-8 bg-white/5 border border-white/5 rounded-3xl mb-12">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                    <Target size={14} /> Foco Técnico Desejado
                  </h4>
                  <p className="text-sm font-medium text-white/80 leading-relaxed italic">
                    "{selectedSeminar.interesse.replace('Seminário: ', '')}"
                  </p>
                </div>

                {/* Lifecycle Actions */}
                <div className="flex flex-wrap gap-4">
                  {selectedSeminar.status !== 'Confirmado' && selectedSeminar.status !== 'Concluído' && (
                    <button 
                      onClick={() => {
                        updateStatus(selectedSeminar.id.toString(), selectedSeminar.whatsapp, 'Confirmado');
                        setSelectedSeminar(null);
                      }}
                      className="px-8 py-4 bg-blue-600 text-white rounded-full font-black uppercase italic text-[10px] tracking-widest hover:bg-blue-500 transition-all flex items-center gap-2"
                    >
                      Confirmar Evento <CheckCircle size={14} />
                    </button>
                  )}
                  {selectedSeminar.status === 'Confirmado' && (
                    <button 
                      onClick={() => {
                        updateStatus(selectedSeminar.id.toString(), selectedSeminar.whatsapp, 'Concluído');
                        setSelectedSeminar(null);
                      }}
                      className="px-8 py-4 bg-emerald-600 text-white rounded-full font-black uppercase italic text-[10px] tracking-widest hover:bg-emerald-500 transition-all flex items-center gap-2"
                    >
                      Finalizar/Concluir <Trophy size={14} />
                    </button>
                  )}
                  <a 
                    href={`https://wa.me/${selectedSeminar.whatsapp.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-black uppercase italic text-[10px] tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    Falar via WhatsApp <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const DetailItem = ({ icon: Icon, label, value }: any) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
      <Icon size={12} /> {label}
    </div>
    <div className="text-lg font-black uppercase italic tracking-tighter">{value || 'Não informado'}</div>
  </div>
);

const CoursesModule = ({ leads }: { leads: Lead[] }) => {
  const products = Array.from(new Set(leads.map(l => l.interesse.replace('ICP: ', '').replace('Seminário: ', ''))));
  
  // Rankeia produtos por vendas
  const performanceData = products.map(p => {
    const productLeads = leads.filter(l => l.interesse.includes(p));
    const sales = productLeads.filter(l => l.status === 'Pago').length;
    const checkouts = productLeads.filter(l => l.status === 'No Checkout' || l.status === 'Pago' || l.status === 'Abandonado').length;
    const abandoned = productLeads.filter(l => l.status === 'Abandonado').length;
    const convRate = checkouts ? Math.round((sales/checkouts)*100) : 0;
    return { name: p, total: productLeads.length, checkouts, sales, abandoned, convRate };
  }).sort((a, b) => b.sales - a.sales);

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-white/5 bg-white/[0.02]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-2">Performance Analytics</h3>
            <p className="text-sm font-bold uppercase italic tracking-tighter text-white/40">Métricas de Conversão por Técnica/Curso</p>
          </div>
          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-white/30"># Rank</th>
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-white/30">Produto / Técnica</th>
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-white/30 text-center">Leads</th>
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-white/30 text-center">Checkouts</th>
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-white/30 text-center">Vendas</th>
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-white/30 text-right">Conversão</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-data">
            {performanceData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center text-white/10 font-black uppercase tracking-[0.3em] text-[10px]">
                  Sem dados de performance disponíveis
                </td>
              </tr>
            ) : (
              performanceData.map((p, idx) => (
                <tr key={p.name} className="group hover:bg-white/5 transition-colors">
                  <td className="px-8 py-8 w-16">
                    <span className="text-xl font-black italic tracking-tighter text-white/20">0{idx + 1}</span>
                  </td>
                  <td className="px-8 py-8">
                    <div className="text-lg font-black uppercase italic tracking-tighter text-white group-hover:text-emerald-400 transition-colors">{p.name}</div>
                    <div className="flex gap-2 mt-2">
                       <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500/60 bg-emerald-500/5 px-2 py-0.5 rounded-sm">Hot</span>
                    </div>
                  </td>
                  <td className="px-8 py-8 text-center text-lg font-black italic text-white/60">{p.total}</td>
                  <td className="px-8 py-8 text-center">
                    <div className="text-lg font-black italic text-white/60">{p.checkouts}</div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-rose-500/40">-{p.abandoned} abandonos</div>
                  </td>
                  <td className="px-8 py-8 text-center text-lg font-black italic text-emerald-400">{p.sales}</td>
                  <td className="px-8 py-8 text-right">
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xl font-black italic tracking-tighter ${p.convRate > 20 ? 'text-emerald-500' : 'text-white'}`}>
                        {p.convRate}%
                      </span>
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${p.convRate}%` }}
                          className={`h-full ${p.convRate > 20 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-white/20'}`}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SupportModule = ({ tickets }: { tickets: Lead[] }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="p-10 bg-rose-500/10 border border-rose-500/20 rounded-[3rem] relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
        <ShieldAlert size={80} className="text-rose-500" />
      </div>
      <div className="relative">
        <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-4 text-rose-500">Centro de Recuperação de Vendas</h4>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500/60 leading-relaxed max-w-xl">
          Identificamos <span className="text-rose-500 font-data text-sm">{tickets.length}</span> potenciais vendas perdidas. 
          Use as ferramentas abaixo para reverter o abandono e oferecer condições especiais.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6">
      {tickets.length === 0 ? (
        <div className="py-20 bg-white/5 border border-white/10 rounded-[3rem] flex flex-col items-center justify-center gap-4">
          <CheckCircle className="text-emerald-500/20" size={64} />
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Nenhum alerta de suporte pendente</div>
        </div>
      ) : (
        tickets.map(t => (
          <div key={t.id} className="p-8 bg-black border border-white/5 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-8 group hover:border-rose-500/30 transition-all">
            <div className="flex items-center gap-8 w-full">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center relative">
                <Users className="text-rose-500" size={24} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 rounded-full animate-pulse border-2 border-black" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h5 className="text-xl font-black uppercase italic tracking-tighter text-white">{t.nome}</h5>
                  <span className="text-[8px] font-black uppercase tracking-widest bg-rose-500 text-white px-2 py-0.5 rounded-sm">Abandono</span>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <CreditCard size={12} /> {t.interesse}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Clock size={12} /> {new Date(t.created_at).toLocaleTimeString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <a 
                href={`https://wa.me/${t.whatsapp.replace(/\D/g, '')}?text=Olá ${t.nome}, aqui é o suporte do Berg! Notei que você teve um problema no checkout do ${t.interesse}. Posso te ajudar a concluir sua inscrição?`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 lg:flex-none px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
              >
                Suporte Técnico <MessageSquare size={14} />
              </a>
              <a 
                href={`https://wa.me/${t.whatsapp.replace(/\D/g, '')}?text=Olá ${t.nome}, notei que você quase garantiu o ${t.interesse}! O Berg pediu para eu te liberar uma condição especial exclusiva. Se fecharmos agora, consigo uma facilidade no pagamento. Topa conversar?`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 lg:flex-none px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
              >
                Oferta Especial <Trophy size={14} />
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="px-8 py-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center gap-6 min-w-[240px]">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border`} 
         style={{ backgroundColor: `${color}1A`, borderColor: `${color}33` }}>
      <Icon size={20} style={{ color: color === 'white' ? '#fff' : color }} />
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{label}</div>
      <div className="text-2xl font-black uppercase italic tracking-tighter">{value}</div>
    </div>
  </div>
);

const MiniStat = ({ label, value, color }: any) => (
  <div>
    <div className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-1">{label}</div>
    <div className="text-lg font-black uppercase italic tracking-tighter" style={{ color: color || '#fff' }}>{value}</div>
  </div>
);
