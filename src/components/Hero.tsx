import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Bot, 
  Database, 
  Code2, 
  ArrowRight, 
  Github, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Cpu, 
  Workflow, 
  Zap,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { themes } from '../theme';

export function Hero() {
  const { profile, theme } = usePortfolio();
  const currentTheme = themes[theme] || themes.violet;

  const renderHeadline = () => {
    const raw = profile.tagline || 'Engineering Intelligent Systems Powered by AI.';
    if (!raw || raw === 'I Engineer Solutions With AI.' || raw === 'Engineering Intelligent Systems Powered by AI.') {
      return (
        <>
          Engineering Intelligent Systems <br className="hidden sm:inline" />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}>
            Powered by AI.
          </span>
        </>
      );
    }
    const match = raw.match(/^(.*?)((?:Powered by|with|With|Engineered with|Driven by) .*)$/i);
    if (match) {
      return (
        <>
          {match[1]} <br className="hidden sm:inline" />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}>
            {match[2]}
          </span>
        </>
      );
    }
    return (
      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}>
        {raw}
      </span>
    );
  };

  const areas = [
    {
      title: 'AUTOMATE',
      icon: <Bot className="w-5 h-5" style={{ color: currentTheme.primary }} />,
      skills: 'Python • APIs • Web Scraping • Workflow Automation',
      description: 'Turn repetitive manual processes into bulletproof automated systems.'
    },
    {
      title: 'ANALYZE',
      icon: <Database className="w-5 h-5" style={{ color: currentTheme.accent }} />,
      skills: 'Python • Pandas • SQL • Data Visualization • BI',
      description: 'Convert raw, chaotic data into validated schemas and decision models.'
    },
    {
      title: 'BUILD',
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      skills: 'Web Apps • AI-assisted Development • Practical Software',
      description: 'Engineer responsive web tools and dashboards that solve real problems.'
    }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden transition-colors duration-500">
      {/* Subtle background tech grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b14_1px,transparent_1px),linear-gradient(to_bottom,#1e293b14_1px,transparent_1px)] bg-[size:36px_36px] -z-10 pointer-events-none" />
      
      {/* Dynamic ambient lighting orb matching selected theme */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.45, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] blur-[140px] rounded-full pointer-events-none -z-10" 
        style={{ backgroundColor: currentTheme.primary }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges & Positioning */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold shadow-sm border ${currentTheme.badgeBg} ${currentTheme.badgeText} ${currentTheme.badgeBorder}`}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
            <span>AI as an Engineering Multiplier</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Automation, Data & Web App Engineering</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6"
          >
            {renderHeadline()}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl"
          >
            {profile.heroSupportingText || "I use AI as an engineering multiplier to automate workflows, transform data, and build practical web applications — faster, cleaner, and with a focus on quality."}
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="#projects"
              id="hero-view-work-btn"
              className={`px-6 py-3.5 rounded-xl bg-gradient-to-r ${currentTheme.buttonGradient} text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-all group`}
              style={{ boxShadow: `0 10px 25px -5px ${currentTheme.glow}` }}
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-github-btn"
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 font-semibold text-sm flex items-center gap-2 transition-all shadow-sm group"
            >
              <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Explore My GitHub</span>
            </motion.a>

            <motion.a
              whileHover={{ x: 3 }}
              href="#contact"
              className="px-5 py-3.5 rounded-xl text-slate-400 hover:text-slate-100 font-medium text-sm flex items-center gap-1.5 transition-colors group"
            >
              <span>Let's Build Something Useful</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* 3 Core Areas Grid: AUTOMATE • ANALYZE • BUILD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {areas.map((area, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                transition: { duration: 0.25 } 
              }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all group flex flex-col justify-between hover:shadow-xl relative overflow-hidden"
              style={{
                background: `linear-gradient(180deg, rgba(15, 23, 42, 0.7) 0%, rgba(10, 15, 30, 0.9) 100%)`
              }}
            >
              <div 
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.primary}, transparent)` }}
              />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="text-xs font-mono font-bold tracking-widest uppercase transition-colors"
                    style={{ color: currentTheme.primary }}
                  >
                    {area.title}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
                    {area.icon}
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-300 font-semibold mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                  <span>{area.skills}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {area.description}
                </p>
              </div>

              <div 
                className="pt-4 mt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-xs font-medium"
                style={{ color: currentTheme.accent }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Production-ready engineering</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Engineering Rigor Callout Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          whileHover={{ scale: 1.01 }}
          className="mt-8 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-md"
        >
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span>
              <strong className="text-white">Core Principle:</strong> "AI is not my identity. AI is my engineering advantage. I use AI to accelerate engineering, while ensuring architecture, correctness, and clean code."
            </span>
          </div>
          <a 
            href="#how-i-build" 
            className="font-semibold whitespace-nowrap hover:underline flex items-center gap-1 group"
            style={{ color: currentTheme.primary }}
          >
            <span>See How I Build</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
