import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { themes } from '../../theme';
import { ThemeId } from '../../types';
import { Palette, Check, Sparkles, Wand2, Eye, Layout } from 'lucide-react';
import { motion } from 'motion/react';

interface AppearanceThemeTabProps {
  onSuccess: (msg: string) => void;
}

export function AppearanceThemeTab({ onSuccess }: AppearanceThemeTabProps) {
  const { theme, setTheme } = usePortfolio();

  const handleSelectTheme = (themeId: ThemeId) => {
    setTheme(themeId);
    onSuccess(`Switched active theme to ${themes[themeId].name}! Changes applied live across the entire portfolio.`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            <span>Theme & Color System</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Choose the color theme and visual atmosphere for your portfolio. Updates apply in real-time.
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center gap-2 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themes[theme].primary }} />
          <span>Active: <strong>{themes[theme].name}</strong></span>
        </div>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(themes) as ThemeId[]).map((tId) => {
          const t = themes[tId];
          const isCurrent = theme === tId;

          return (
            <motion.div
              key={tId}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              onClick={() => handleSelectTheme(tId)}
              className={`p-5 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between relative overflow-hidden ${
                isCurrent
                  ? 'bg-slate-900 border-2 shadow-xl'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
              style={{
                borderColor: isCurrent ? t.primary : undefined,
                boxShadow: isCurrent ? `0 10px 30px -10px ${t.glow}` : undefined
              }}
            >
              {/* Subtle top color bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5" 
                style={{ backgroundColor: t.primary }}
              />

              <div>
                <div className="flex items-center justify-between mb-3 mt-1">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-4 h-4 rounded-full ring-2 ring-slate-800 shadow-sm"
                      style={{ backgroundColor: t.primary }}
                    />
                    <h4 className="text-sm font-bold text-white">
                      {t.name}
                    </h4>
                  </div>

                  {isCurrent && (
                    <span 
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-950 flex items-center gap-1 shadow-sm"
                      style={{ backgroundColor: t.primary }}
                    >
                      <Check className="w-3 h-3" />
                      ACTIVE
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {t.subtitle}
                </p>

                {/* Color Swatch Preview */}
                <div className="flex items-center gap-2 mb-4 p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div 
                    className="w-6 h-6 rounded-lg shadow-inner" 
                    style={{ backgroundColor: t.primary }} 
                    title="Primary"
                  />
                  <div 
                    className="w-6 h-6 rounded-lg shadow-inner" 
                    style={{ backgroundColor: t.accent }} 
                    title="Accent"
                  />
                  <div 
                    className="w-6 h-6 rounded-lg shadow-inner border border-slate-800" 
                    style={{ backgroundColor: t.bgDark }} 
                    title="Canvas Dark"
                  />
                  <div 
                    className="w-6 h-6 rounded-lg shadow-inner border border-slate-800" 
                    style={{ backgroundColor: t.bgSurface }} 
                    title="Surface Card"
                  />
                </div>

                {/* Live Sample Pill & Button Preview */}
                <div className="space-y-2 pt-2 border-t border-slate-800/60 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">Sample Pill</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${t.badgeBg} ${t.badgeText} border ${t.badgeBorder}`}>
                      Engineering
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">Headline</span>
                    <span className={`text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r ${t.textGradient}`}>
                      Intelligent Systems
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isCurrent ? 'Currently applied' : 'Click to apply'}
                </span>
                <span className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-slate-500'}`}>
                  {isCurrent ? 'Selected' : 'Select'} &rarr;
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
