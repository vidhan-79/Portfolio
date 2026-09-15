import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { WorkflowSection } from './components/WorkflowSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Shield, Sparkles, Terminal } from 'lucide-react';
import { themes } from './theme';

function PortfolioMain() {
  const { isLoading, isAdmin, setIsAdminDashboardOpen, theme } = usePortfolio();
  const currentTheme = themes[theme] || themes.violet;

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: currentTheme.bgDark }}
      >
        <div className="flex flex-col items-center gap-3" style={{ color: currentTheme.primary }}>
          <Terminal className="w-8 h-8 animate-pulse" />
          <span className="text-xs font-mono text-slate-400">Loading portfolio pipelines...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen text-slate-100 relative transition-colors duration-500 ${currentTheme.selectionClass}`}
      style={{ backgroundColor: currentTheme.bgDark }}
    >
      {/* Subtle dynamic ambient atmospheric aura */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-30 transition-all duration-700 -z-10"
        style={{ background: `radial-gradient(circle, ${currentTheme.primary} 0%, ${currentTheme.accent} 50%, transparent 80%)` }}
      />
      
      {/* Admin Quick Floater if logged in */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsAdminDashboardOpen(true)}
            id="floating-admin-quick-btn"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 hover:scale-105 transition-all"
            title="Open Admin Management"
          >
            <Shield className="w-4 h-4" />
            <span>Admin Active</span>
          </button>
        </div>
      )}

      {/* Main sections */}
      <Navbar />
      
      <main>
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <WorkflowSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Overlays & Modals */}
      <ProjectDetailModal />
      <AdminAuthModal />
      <AdminDashboard />

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}
