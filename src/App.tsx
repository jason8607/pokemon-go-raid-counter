import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Minus, 
  Sparkles, 
  Image as ImageIcon, 
  ChevronDown, 
  ChevronUp, 
  History,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RAID_BOSSES, PokemonRaidData } from './data/pokemon';

import { POKEMON_TYPE_COLORS } from './constants';
import { useTranslation } from 'react-i18next';

// --- Types ---

interface RaidCounts {
  total: number;
  shiny: number;
  hundo: number;
  background: number;
  shinyHundo: number;
  shinyBackground: number;
  hundoBackground: number;
  shinyHundoBackground: number;
}

interface RaidState {
  [pokemonId: string]: RaidCounts;
}

// --- Components ---

const CounterButton = ({ 
  label, 
  icon: Icon, 
  value, 
  onIncrement, 
  onDecrement, 
  colorClass,
  subIcon,
  subIcon2
}: { 
  label?: string; 
  icon?: any; 
  value: number; 
  onIncrement: () => void; 
  onDecrement: () => void; 
  colorClass: string;
  subIcon?: any;
  subIcon2?: any;
}) => (
  <div className={`flex flex-col items-center justify-between p-2 sm:p-3 rounded-xl sm:rounded-2xl ${colorClass} transition-all active:scale-95`}>
    <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
      {Icon && <Icon size={14} className="opacity-80 sm:w-4 sm:h-4" />}
      {subIcon && <span className="text-[10px] sm:text-xs font-bold leading-none">{subIcon}</span>}
      {subIcon2 && <span className="text-[10px] sm:text-xs font-bold leading-none">{subIcon2}</span>}
    </div>
    {label && <span className="text-[9px] sm:text-[10px] font-bold opacity-70 mb-1">{label}</span>}
    <div className="flex items-center justify-between w-full gap-1 sm:gap-2">
      <button 
        onClick={(e) => { e.stopPropagation(); onDecrement(); }}
        className="p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
      >
        <Minus size={12} className="sm:w-3.5 sm:h-3.5" />
      </button>
      <span className="text-base sm:text-lg font-bold min-w-[1rem] sm:min-w-[1.5rem] text-center">{value}</span>
      <button 
        onClick={(e) => { e.stopPropagation(); onIncrement(); }}
        className="p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
      >
        <Plus size={12} className="sm:w-3.5 sm:h-3.5" />
      </button>
    </div>
  </div>
);

const PokemonCard = ({ 
  pokemon, 
  counts, 
  onUpdate 
}: { 
  pokemon: PokemonRaidData; 
  counts: RaidCounts; 
  onUpdate: (newCounts: RaidCounts) => void;
  key?: string;
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const updateCount = (key: keyof RaidCounts, delta: number) => {
    const newCounts = { ...counts, [key]: Math.max(0, counts[key] + delta) };
    
    // If we are updating any category other than 'total'
    if (key !== 'total') {
      // If the value actually changed (e.g. didn't stay at 0 when decrementing)
      if (newCounts[key] !== counts[key]) {
        newCounts.total = Math.max(0, (newCounts.total || 0) + delta);
      }
    }
    
    onUpdate(newCounts);
  };

  return (
    <div className="bg-[#1C1C1E] rounded-3xl mb-4 overflow-hidden border border-white/5 shadow-xl">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`relative w-16 h-16 rounded-full flex items-center justify-center p-2 ${
            pokemon.category === 'shadow' 
              ? 'bg-purple-950/80 shadow-[0_0_12px_4px_rgba(168,85,247,0.4)]' 
              : 'bg-[#2C2C2E]'
          }`}>
            <img 
              src={pokemon.imageUrl} 
              alt={pokemon.name} 
              className={`w-full h-full object-contain ${
                pokemon.category === 'shadow' ? 'drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]' : ''
              }`}
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">
                {t(`pkmn_${pokemon.id.replace(/-/g, '_')}`)}
              </h3>
            </div>
            <div className="flex gap-1 mt-1">
              {pokemon.types.map(type => {
                const typeInfo = POKEMON_TYPE_COLORS[type] || { name: type, color: '#777' };
                return (
                  <span 
                    key={type} 
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white border border-white/10"
                    style={{ backgroundColor: typeInfo.color }}
                  >
                    {t(`type_${type}`)}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-3">
            <div className="text-center">
              <div className="text-[10px] text-zinc-500 font-bold uppercase">LV 20</div>
              <div className="text-emerald-400 font-mono font-bold">{pokemon.maxCP20}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-zinc-500 font-bold uppercase">LV 25</div>
              <div className="text-orange-400 font-mono font-bold">{pokemon.maxCP25}</div>
            </div>
          </div>
          {isExpanded ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
          >
            <div className="flex items-center justify-between bg-[#2C2C2E] p-3 rounded-2xl mb-4">
              <span className="text-sm font-bold text-zinc-400">{t('totalRaids')}</span>
              <div className="flex items-center gap-4">
                <button onClick={() => updateCount('total', -1)} className="p-1.5 rounded-full bg-zinc-700 hover:bg-zinc-600"><Minus size={16}/></button>
                <span className="text-xl font-black text-white w-8 text-center">{counts.total}</span>
                <button onClick={() => updateCount('total', 1)} className="p-1.5 rounded-full bg-zinc-700 hover:bg-zinc-600"><Plus size={16}/></button>
              </div>
            </div>

            <div className="grid grid-cols-2 min-[420px]:grid-cols-3 gap-2 sm:gap-3">
              <CounterButton 
                label={t('shiny')}
                icon={Sparkles}
                value={counts.shiny}
                onIncrement={() => updateCount('shiny', 1)}
                onDecrement={() => updateCount('shiny', -1)}
                colorClass="bg-yellow-900/40 text-yellow-400 border border-yellow-500/20"
              />
              <CounterButton 
                label={t('hundo')}
                subIcon="💯"
                value={counts.hundo}
                onIncrement={() => updateCount('hundo', 1)}
                onDecrement={() => updateCount('hundo', -1)}
                colorClass="bg-rose-900/40 text-rose-400 border border-rose-500/20"
              />
              <CounterButton 
                label={t('background')}
                icon={ImageIcon}
                value={counts.background}
                onIncrement={() => updateCount('background', 1)}
                onDecrement={() => updateCount('background', -1)}
                colorClass="bg-blue-900/40 text-blue-400 border border-blue-500/20"
              />
              <CounterButton 
                label={t('shinyHundo')}
                icon={Sparkles}
                subIcon="💯"
                value={counts.shinyHundo}
                onIncrement={() => updateCount('shinyHundo', 1)}
                onDecrement={() => updateCount('shinyHundo', -1)}
                colorClass="bg-orange-900/40 text-orange-400 border border-orange-500/20"
              />
              <CounterButton 
                label={t('shinyBackground')}
                icon={Sparkles}
                subIcon={<ImageIcon size={12}/>}
                value={counts.shinyBackground}
                onIncrement={() => updateCount('shinyBackground', 1)}
                onDecrement={() => updateCount('shinyBackground', -1)}
                colorClass="bg-emerald-900/40 text-emerald-400 border border-emerald-500/20"
              />
              <CounterButton 
                label={t('hundoBackground')}
                subIcon="💯"
                subIcon2={<ImageIcon size={12}/>}
                value={counts.hundoBackground}
                onIncrement={() => updateCount('hundoBackground', 1)}
                onDecrement={() => updateCount('hundoBackground', -1)}
                colorClass="bg-purple-900/40 text-purple-400 border border-purple-500/20"
              />
              <CounterButton 
                label={t('shundoBackground')}
                icon={Sparkles}
                subIcon="💯"
                subIcon2={<ImageIcon size={12}/>}
                value={counts.shinyHundoBackground}
                onIncrement={() => updateCount('shinyHundoBackground', 1)}
                onDecrement={() => updateCount('shinyHundoBackground', -1)}
                colorClass="bg-fuchsia-900/40 text-fuchsia-400 border border-fuchsia-500/20"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4 bg-[#2C2C2E] p-3 rounded-2xl">
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold text-zinc-500 uppercase">{t('totalRaids')}</span>
                <span className="text-lg font-black text-white leading-tight">{counts.total}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold text-zinc-500 uppercase">{t('shiny')}</span>
                <span className="text-lg font-black text-yellow-400 leading-tight">
                  {counts.shiny + counts.shinyHundo + counts.shinyBackground + counts.shinyHundoBackground}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold text-zinc-500 uppercase">{t('hundo')}</span>
                <span className="text-lg font-black text-rose-400 leading-tight">
                  {counts.hundo + counts.shinyHundo + counts.hundoBackground + counts.shinyHundoBackground}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold text-zinc-500 uppercase">{t('background')}</span>
                <span className="text-lg font-black text-blue-400 leading-tight">
                  {counts.background + counts.shinyBackground + counts.hundoBackground + counts.shinyHundoBackground}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SummaryView = ({ state }: { state: RaidState }) => {
  const { t } = useTranslation();
  const totals = Object.values(state).reduce((acc, curr) => {
    Object.keys(curr).forEach(key => {
      acc[key as keyof RaidCounts] = (acc[key as keyof RaidCounts] || 0) + curr[key as keyof RaidCounts];
    });
    return acc;
  }, {} as RaidCounts);

  // Calculate aggregated totals (Summing up all occurrences of each trait)
  const aggregateShiny = (totals.shiny || 0) + (totals.shinyHundo || 0) + (totals.shinyBackground || 0) + (totals.shinyHundoBackground || 0);
  const aggregateHundo = (totals.hundo || 0) + (totals.shinyHundo || 0) + (totals.hundoBackground || 0) + (totals.shinyHundoBackground || 0);
  const aggregateBackground = (totals.background || 0) + (totals.shinyBackground || 0) + (totals.hundoBackground || 0) + (totals.shinyHundoBackground || 0);

  const stats = [
    { label: t('totalRaids'), value: totals.total || 0, icons: [{ type: 'icon' as const, Icon: History }], color: 'text-white' },
    { label: t('shiny'), value: aggregateShiny, icons: [{ type: 'icon' as const, Icon: Sparkles }], color: 'text-yellow-400' },
    { label: t('hundo'), value: aggregateHundo, icons: [{ type: 'emoji' as const, emoji: '💯' }], color: 'text-rose-400' },
    { label: t('background'), value: aggregateBackground, icons: [{ type: 'icon' as const, Icon: ImageIcon }], color: 'text-blue-400' },
    { label: t('shinyHundo'), value: totals.shinyHundo || 0, icons: [{ type: 'icon' as const, Icon: Sparkles }, { type: 'emoji' as const, emoji: '💯' }], color: 'text-orange-400' },
    { label: t('shinyBackground'), value: totals.shinyBackground || 0, icons: [{ type: 'icon' as const, Icon: Sparkles }, { type: 'icon' as const, Icon: ImageIcon }], color: 'text-emerald-400' },
    { label: t('hundoBackground'), value: totals.hundoBackground || 0, icons: [{ type: 'emoji' as const, emoji: '💯' }, { type: 'icon' as const, Icon: ImageIcon }], color: 'text-purple-400' },
    { label: t('shundoBackground'), value: totals.shinyHundoBackground || 0, icons: [{ type: 'icon' as const, Icon: Sparkles }, { type: 'emoji' as const, emoji: '💯' }, { type: 'icon' as const, Icon: ImageIcon }], color: 'text-fuchsia-400' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map(stat => (
        <div key={stat.label} className="bg-[#1C1C1E] p-4 rounded-3xl border border-white/5 shadow-lg">
          <div className="flex items-center gap-1.5 mb-1">
            {stat.icons.map((item, i) =>
              item.type === 'icon'
                ? <item.Icon key={i} size={14} className={stat.color} />
                : <span key={i} className="text-xs leading-none">{item.emoji}</span>
            )}
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{stat.label}</span>
          </div>
          <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'raids' | 'summary'>('raids');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'legendary' | 'primal' | 'shadow'>('all');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [state, setState] = useState<RaidState>(() => {
    const saved = localStorage.getItem('raid_state');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('raid_state', JSON.stringify(state));
  }, [state]);

  const updatePokemonCounts = (id: string, newCounts: RaidCounts) => {
    setState(prev => ({ ...prev, [id]: newCounts }));
  };

  const resetAll = () => {
    setState({});
    setShowResetConfirm(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  // Calculate global aggregate totals for the footer
  const globalTotals = (Object.values(state) as RaidCounts[]).reduce((acc, curr) => {
    acc.total += (curr.total || 0);
    acc.shiny += (curr.shiny || 0) + (curr.shinyHundo || 0) + (curr.shinyBackground || 0) + (curr.shinyHundoBackground || 0);
    acc.hundo += (curr.hundo || 0) + (curr.shinyHundo || 0) + (curr.hundoBackground || 0) + (curr.shinyHundoBackground || 0);
    acc.background += (curr.background || 0) + (curr.shinyBackground || 0) + (curr.hundoBackground || 0) + (curr.shinyHundoBackground || 0);
    return acc;
  }, { total: 0, shiny: 0, hundo: 0, background: 0 });

  const initialCounts: RaidCounts = {
    total: 0,
    shiny: 0,
    hundo: 0,
    background: 0,
    shinyHundo: 0,
    shinyBackground: 0,
    hundoBackground: 0,
    shinyHundoBackground: 0
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
      {/* --- Header --- */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-bottom border-white/5 px-6 py-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-black tracking-tight">{t('appTitle')}</h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1">
              2026 GO Fest 🇯🇵 Tokyo
            </p>
          </div>
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold hover:bg-white/10 transition-colors uppercase tracking-wider"
          >
            {i18n.language === 'zh' ? 'EN' : '中文'}
          </button>
        </div>

        {/* --- Tabs --- */}
        <div className="flex gap-2 mt-6 bg-[#1C1C1E] p-1 rounded-2xl max-w-lg mx-auto">
          <button 
            onClick={() => setActiveTab('raids')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'raids' ? 'bg-[#3A3A3C] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {t('raidsTab')}
          </button>
          <button 
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'summary' ? 'bg-[#3A3A3C] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {t('summaryTab')}
          </button>
        </div>

        {/* --- Category Filters --- */}
        {activeTab === 'raids' && (
          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1 max-w-lg mx-auto">
            {[
              { id: 'all', label: t('all') },
              { id: 'legendary', label: t('legendary') },
              { id: 'primal', label: t('primal') },
              { id: 'shadow', label: t('shadow') }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id as any)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  categoryFilter === cat.id 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* --- Main Content --- */}
      <main className="p-6 pb-32 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'raids' ? (
            <motion.div 
              key="raids"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {RAID_BOSSES
                .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
                .map(pokemon => (
                <PokemonCard 
                  key={pokemon.id} 
                  pokemon={pokemon} 
                  counts={state[pokemon.id] || initialCounts}
                  onUpdate={(newCounts) => updatePokemonCounts(pokemon.id, newCounts)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <SummaryView state={state} />
              
              <div className="mt-8 p-6 bg-[#1C1C1E] rounded-3xl border border-white/5">
                <h4 className="text-sm font-bold text-zinc-400 mb-4">{t('dangerZone')}</h4>
                <button 
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-rose-500/10 text-rose-500 font-bold hover:bg-rose-500/20 transition-colors"
                >
                  <Trash2 size={18} />
                  {t('resetAll')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- Reset Confirmation Modal --- */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xs bg-[#2C2C2E] rounded-[2.5rem] p-8 shadow-2xl border border-white/10 text-center"
            >
              <div className="w-16 h-16 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('resetConfirmTitle')}</h3>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                {t('resetConfirmDesc')}
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={resetAll}
                  className="w-full py-4 rounded-2xl bg-rose-500 text-white font-bold active:scale-95 transition-transform"
                >
                  {t('confirmReset')}
                </button>
                <button 
                  onClick={() => setShowResetConfirm(false)}
                  className="w-full py-4 rounded-2xl bg-zinc-800 text-zinc-400 font-bold active:scale-95 transition-transform"
                >
                  {t('cancel')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Footer Stats (Floating) --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
        <div className="bg-[#2C2C2E]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-3 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-3 px-2 overflow-x-auto no-scrollbar">
            <div className="flex flex-col min-w-fit">
              <span className="text-[9px] font-bold text-zinc-500 uppercase">{t('totalRaids')}</span>
              <span className="text-lg font-black text-white leading-none">{globalTotals.total}</span>
            </div>
            <div className="h-6 w-px bg-white/10 shrink-0" />
            <div className="flex flex-col min-w-fit">
              <span className="text-[9px] font-bold text-zinc-500 uppercase">{t('shiny')}</span>
              <span className="text-lg font-black text-yellow-400 leading-none">{globalTotals.shiny}</span>
            </div>
            <div className="h-6 w-px bg-white/10 shrink-0" />
            <div className="flex flex-col min-w-fit">
              <span className="text-[9px] font-bold text-zinc-500 uppercase">{t('hundo')}</span>
              <span className="text-lg font-black text-rose-400 leading-none">{globalTotals.hundo}</span>
            </div>
            <div className="h-6 w-px bg-white/10 shrink-0" />
            <div className="flex flex-col min-w-fit">
              <span className="text-[9px] font-bold text-zinc-500 uppercase">{t('background')}</span>
              <span className="text-lg font-black text-blue-400 leading-none">{globalTotals.background}</span>
            </div>
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 shrink-0 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform ml-2"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
