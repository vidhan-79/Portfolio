import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { themes } from '../theme';
import { ThemeId } from '../types';
import { Palette, Check, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ThemeTogglePill() {
  const { theme, setTheme } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = themes[theme] || themes.violet;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const themeList = Object.values(themes);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all shadow-sm"
        title="Change Portfolio Color Theme"
      >
        <span
          className="w-3 h-3 rounded-full shadow-sm animate-pulse"
          style={{ backgroundColor: currentTheme.primary }}
        />
        <span className="hidden sm:inline text-[11px] font-mono tracking-tight">
          {currentTheme.name.split(' ')[0]}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-64 p-2 rounded-2xl bg-slate-950/95 border border-slate-800 backdrop-blur-xl shadow-2xl z-50 space-y-1"
          >
            <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-800/70 mb-1">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3 h-3 text-cyan-400" />
                Color Theme
              </span>
              <span className="text-[9px] text-slate-500">Live Switch</span>
            </div>

            {themeList.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center justify-between gap-3 text-xs transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 text-white font-bold border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full ring-2 ring-slate-800 shrink-0"
                      style={{ backgroundColor: t.primary }}
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold">{t.name}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0"
                    >
                      <Check className="w-3 h-3" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
