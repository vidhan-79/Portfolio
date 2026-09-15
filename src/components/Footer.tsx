import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Terminal, 
  Github, 
  Mail, 
  Lock, 
  Unlock, 
  ArrowUp,
  Settings,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { themes } from '../theme';

export function Footer() {
  const { profile, isAdmin, setIsAdminAuthOpen, setIsAdminDashboardOpen, logoutAdmin, theme } = usePortfolio();
  const currentTheme = themes[theme] || themes.violet;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform"
              style={{ backgroundColor: `${currentTheme.primary}20`, color: currentTheme.primary }}
            >
              <Terminal className="w-4 h-4" />
            </motion.div>
            <div>
              <span className="font-bold text-slate-200 text-sm">
                {profile.name}
              </span>
              <span className="block text-[11px] font-mono" style={{ color: currentTheme.primary }}>
                AI-Powered Engineer • Python, Data & Web Applications
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <a href="#projects" className="hover:text-white transition-colors">Work</a>
            <a href="#skills" className="hover:text-white transition-colors">Toolchain</a>
            <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <motion.button 
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop} 
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </motion.button>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${profile.email}`}
              className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Bottom subtle bar with hidden Admin Access */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-[11px] text-center sm:text-left">
            <span>© {new Date().getFullYear()} Vidhan Rathod. Built with AI-assisted development and human-validated engineering.</span>
          </div>

          {/* Hidden Admin Entry */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-600 font-mono hidden sm:inline">
              Shortcut: <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">Ctrl+Shift+A</kbd>
            </span>

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAdminDashboardOpen(true)}
                  id="footer-admin-btn"
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 py-1 px-2.5 rounded bg-emerald-950/40 border border-emerald-800/60"
                >
                  <Settings className="w-3 h-3" />
                  <span>Admin Dashboard</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={logoutAdmin}
                  className="text-[10px] text-slate-500 hover:text-rose-400"
                  title="Logout Admin"
                >
                  <Unlock className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAdminAuthOpen(true)}
                id="footer-secret-admin-trigger"
                className="text-slate-700 hover:text-slate-400 transition-colors p-1"
                title="Admin Authentication"
                aria-label="Admin Portal"
              >
                <Lock className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
