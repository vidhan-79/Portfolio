import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Code2, 
  Lock, 
  Unlock, 
  Settings, 
  Github, 
  Menu, 
  X,
  Sparkles,
  FlaskConical,
  Wrench
} from 'lucide-react';

import { ThemeTogglePill } from './ThemeTogglePill';

export function Navbar() {
  const { 
    profile, 
    isAdmin, 
    setIsAdminAuthOpen, 
    setIsAdminDashboardOpen, 
    logoutAdmin,
    theme
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+Shift+A to trigger Admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdmin) {
          setIsAdminDashboardOpen(true);
        } else {
          setIsAdminAuthOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin, setIsAdminAuthOpen, setIsAdminDashboardOpen]);

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'How I Build', href: '#how-i-build' },
    { label: 'AI + Engineering', href: '#ai-engineering' },
    { label: 'What I Build', href: '#what-i-build' },
    { label: 'The Lab', href: '#lab' },
    { label: 'Toolbox', href: '#toolbox' },
    { label: 'Mindset', href: '#mindset' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Positioning */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/60 group-hover:text-cyan-300 transition-all shadow-sm">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] font-mono text-cyan-400/90 tracking-wide font-medium">
                AI-Powered Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeTogglePill />

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors"
              title="Explore GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20 transition-all"
            >
              Let's Build
            </a>

            {/* Hidden Admin Access Button */}
            {isAdmin ? (
              <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                <button
                  onClick={() => setIsAdminDashboardOpen(true)}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/80 flex items-center gap-1.5 transition-colors"
                  title="Admin Dashboard"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Log out"
                >
                  <Unlock className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdminAuthOpen(true)}
                className="p-2 text-slate-600 hover:text-slate-400 transition-colors rounded-lg hover:bg-slate-900"
                title="Admin Authentication (or press Ctrl+Shift+A)"
                aria-label="Admin Authentication"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 p-4 rounded-2xl bg-slate-900/95 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThemeTogglePill />
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isAdmin) setIsAdminDashboardOpen(true);
                  else setIsAdminAuthOpen(true);
                }}
                className="text-xs text-slate-500 hover:text-cyan-400 flex items-center gap-1"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAdmin ? 'Admin Console' : 'Admin Login'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
