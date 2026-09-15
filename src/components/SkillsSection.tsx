import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Bot, 
  Database, 
  BarChart3, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Sparkles, 
  Code2, 
  ShieldCheck, 
  Copy, 
  Check 
} from 'lucide-react';
import { motion } from 'motion/react';
import { themes } from '../theme';

export function SkillsSection() {
  const { profile, theme } = usePortfolio();
  const currentTheme = themes[theme] || themes.violet;
  const [copied, setCopied] = useState(false);

  const samplePythonCode = `# Modular Python Automation & ETL Architecture by Vidhan Rathod
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

class RetailIntelligencePipeline:
    def __init__(self, target_url: str):
        self.target_url = target_url
        self.options = Options()
        self.options.add_argument("--headless=new")
        self.driver = webdriver.Chrome(options=self.options)

    def extract_live_specs(self) -> pd.DataFrame:
        """Automated headless scrape with error recovery"""
        try:
            self.driver.get(self.target_url)
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            # Vectorized schema normalization
            return self._clean_and_validate(soup)
        finally:
            self.driver.quit()

    def _clean_and_validate(self, soup) -> pd.DataFrame:
        # Reconciles null values, caps discounts & outputs clean SQL-ready rows
        pass`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(samplePythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-5 h-5" style={{ color: currentTheme.primary }} />;
      case 'Database':
        return <Database className="w-5 h-5" style={{ color: currentTheme.accent }} />;
      default:
        return <BarChart3 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-slate-950/50 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 border shadow-sm"
            style={{ 
              backgroundColor: currentTheme.badgeBg ? undefined : 'rgba(2, 6, 23, 0.8)',
              borderColor: `${currentTheme.primary}40`,
              color: currentTheme.primary 
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Competencies & Toolchain
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Eliminating repetitive manual labor through bulletproof Python scripts, automated database pipelines, and high-clarity business intelligence.
          </p>
        </motion.div>

        {/* 3 Main Skill Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {profile.skillCategories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.22 } }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group hover:shadow-xl relative overflow-hidden"
            >
              <div 
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.primary}, transparent)` }}
              />
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
                  {getIcon(cat.iconName)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                  {cat.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.span 
                      key={sIdx}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Bottom highlight pill */}
              <div 
                className="pt-4 border-t border-slate-800/80 text-xs font-medium flex items-center gap-1.5"
                style={{ color: currentTheme.primary }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform" />
                <span>{cat.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engineering Rigor & Code Snippet Feature */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-12 gap-6 items-center rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 hover:border-slate-700 transition-all hover:shadow-2xl"
        >
          
          <div className="lg:col-span-5 space-y-4">
            <span 
              className="text-xs font-mono uppercase tracking-wider font-semibold"
              style={{ color: currentTheme.primary }}
            >
              Quality Commitment
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Clean, Modular Python Code with Complete Setup
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every scraper and automation pipeline I engineer is built for longevity—equipped with automated retry logic, error traps, logging, and straightforward documentation.
            </p>
            <div className="space-y-2.5 pt-2">
              <motion.div whileHover={{ x: 3 }} className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Anti-bot evasions & automated user-agent rotation</span>
              </motion.div>
              <motion.div whileHover={{ x: 3 }} className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Deterministic Pandas transformations without data loss</span>
              </motion.div>
              <motion.div whileHover={{ x: 3 }} className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hands-off scheduled automation (Cron / Task Scheduler)</span>
              </motion.div>
            </div>
          </div>

          {/* Interactive Code Preview Terminal */}
          <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-slate-400 text-[11px]">
                  pipeline_engine.py
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                title="Copy snippet"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </motion.button>
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-200/90 overflow-x-auto leading-relaxed selection:bg-cyan-500/30">
              <code>{samplePythonCode}</code>
            </pre>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
