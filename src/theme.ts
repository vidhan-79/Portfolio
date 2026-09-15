import { ThemeId } from './types';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  primary: string;       // hex or color class
  accent: string;
  glow: string;
  bgDark: string;
  bgSurface: string;
  bgCard: string;
  borderSubtle: string;
  borderHighlight: string;
  textPrimary: string;
  textAccent: string;
  textGradient: string;
  buttonGradient: string;
  buttonHoverGradient: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  selectionClass: string;
  dotColor: string;
}

export const themes: Record<ThemeId, ThemeConfig> = {
  violet: {
    id: 'violet',
    name: 'Cosmic Violet & Indigo',
    subtitle: 'Deep obsidian canvas with glowing electric violet & neon cyan nebula',
    primary: '#8b5cf6',
    accent: '#a855f7',
    glow: 'rgba(139, 92, 246, 0.22)',
    bgDark: '#080915',
    bgSurface: '#0d1024',
    bgCard: 'rgba(15, 18, 38, 0.75)',
    borderSubtle: 'rgba(99, 102, 241, 0.18)',
    borderHighlight: 'rgba(168, 85, 247, 0.5)',
    textPrimary: 'text-violet-300',
    textAccent: 'text-indigo-400',
    textGradient: 'from-violet-400 via-fuchsia-300 to-cyan-300',
    buttonGradient: 'from-violet-600 via-indigo-600 to-purple-600',
    buttonHoverGradient: 'from-violet-500 via-indigo-500 to-purple-500',
    badgeBg: 'bg-violet-950/70',
    badgeText: 'text-violet-300',
    badgeBorder: 'border-violet-700/50',
    selectionClass: 'selection:bg-violet-500/30 selection:text-violet-200',
    dotColor: '#6366f115'
  },
  cyan: {
    id: 'cyan',
    name: 'Quantum Cyber Cyan',
    subtitle: 'Cybernetic matrix with electric cyan, neon teal & emerald accents',
    primary: '#06b6d4',
    accent: '#14b8a6',
    glow: 'rgba(6, 182, 212, 0.22)',
    bgDark: '#070c14',
    bgSurface: '#0b1320',
    bgCard: 'rgba(11, 19, 32, 0.75)',
    borderSubtle: 'rgba(6, 182, 212, 0.18)',
    borderHighlight: 'rgba(20, 184, 166, 0.5)',
    textPrimary: 'text-cyan-300',
    textAccent: 'text-teal-400',
    textGradient: 'from-cyan-400 via-teal-300 to-emerald-400',
    buttonGradient: 'from-cyan-500 via-teal-500 to-emerald-500',
    buttonHoverGradient: 'from-cyan-400 via-teal-400 to-emerald-400',
    badgeBg: 'bg-cyan-950/70',
    badgeText: 'text-cyan-300',
    badgeBorder: 'border-cyan-700/50',
    selectionClass: 'selection:bg-cyan-500/30 selection:text-cyan-200',
    dotColor: '#06b6d415'
  },
  amber: {
    id: 'amber',
    name: 'Titanium Solar Amber',
    subtitle: 'High-performance engineering with radiant amber & molten gold',
    primary: '#f59e0b',
    accent: '#fbbf24',
    glow: 'rgba(245, 158, 11, 0.22)',
    bgDark: '#0e0c0a',
    bgSurface: '#171410',
    bgCard: 'rgba(23, 20, 16, 0.75)',
    borderSubtle: 'rgba(245, 158, 11, 0.18)',
    borderHighlight: 'rgba(251, 191, 36, 0.5)',
    textPrimary: 'text-amber-300',
    textAccent: 'text-yellow-400',
    textGradient: 'from-amber-400 via-orange-300 to-yellow-200',
    buttonGradient: 'from-amber-500 via-orange-500 to-yellow-500',
    buttonHoverGradient: 'from-amber-400 via-orange-400 to-yellow-400',
    badgeBg: 'bg-amber-950/70',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-700/50',
    selectionClass: 'selection:bg-amber-500/30 selection:text-amber-200',
    dotColor: '#f59e0b15'
  },
  emerald: {
    id: 'emerald',
    name: 'Matrix Hacker Emerald',
    subtitle: 'Terminal intelligence with digital emerald & crisp bio-mint highlights',
    primary: '#10b981',
    accent: '#34d399',
    glow: 'rgba(16, 185, 129, 0.22)',
    bgDark: '#060f0b',
    bgSurface: '#0a1711',
    bgCard: 'rgba(10, 23, 17, 0.75)',
    borderSubtle: 'rgba(16, 185, 129, 0.18)',
    borderHighlight: 'rgba(52, 211, 153, 0.5)',
    textPrimary: 'text-emerald-300',
    textAccent: 'text-teal-300',
    textGradient: 'from-emerald-400 via-teal-300 to-green-300',
    buttonGradient: 'from-emerald-500 via-teal-600 to-green-600',
    buttonHoverGradient: 'from-emerald-400 via-teal-500 to-green-500',
    badgeBg: 'bg-emerald-950/70',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-700/50',
    selectionClass: 'selection:bg-emerald-500/30 selection:text-emerald-200',
    dotColor: '#10b98115'
  },
  crimson: {
    id: 'crimson',
    name: 'Hyper Cyber Rose',
    subtitle: 'Futuristic dark synth with vivid rose, magenta & ruby neon glow',
    primary: '#f43f5e',
    accent: '#fb7185',
    glow: 'rgba(244, 63, 94, 0.22)',
    bgDark: '#0f080b',
    bgSurface: '#190d13',
    bgCard: 'rgba(25, 13, 19, 0.75)',
    borderSubtle: 'rgba(244, 63, 94, 0.18)',
    borderHighlight: 'rgba(251, 113, 133, 0.5)',
    textPrimary: 'text-rose-300',
    textAccent: 'text-pink-400',
    textGradient: 'from-rose-400 via-pink-300 to-purple-300',
    buttonGradient: 'from-rose-600 via-pink-600 to-purple-600',
    buttonHoverGradient: 'from-rose-500 via-pink-500 to-purple-500',
    badgeBg: 'bg-rose-950/70',
    badgeText: 'text-rose-300',
    badgeBorder: 'border-rose-700/50',
    selectionClass: 'selection:bg-rose-500/30 selection:text-rose-200',
    dotColor: '#f43f5e15'
  }
};
