import React from 'react';
import { 
  Search, 
  Bot, 
  Database, 
  BarChart, 
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { themes } from '../theme';

export function WorkflowSection() {
  const { theme } = usePortfolio();
  const currentTheme = themes[theme] || themes.violet;

  const steps = [
    {
      step: '01',
      title: 'Problem Framing & Data Discovery',
      description: 'Understanding the commercial objective—whether tracking competitor prices, auditing margin leakages, or consolidating messy legacy records.',
      tools: ['Discovery Inquiries', 'Schema Mapping', 'Scope Specs']
    },
    {
      step: '02',
      title: 'Automated Scraping & Ingestion',
      description: 'Deploying headless bots (Selenium, BeautifulSoup) and API connectors with robust retry policies to pull continuous, structured data streams.',
      tools: ['Selenium', 'BeautifulSoup4', 'REST APIs', 'Cron Automation']
    },
    {
      step: '03',
      title: 'Cleaning, Normalization & ETL',
      description: 'Rectifying anomalies, eliminating missing values, and executing vectorized transformations with Pandas and SQL for 99.8%+ schema integrity.',
      tools: ['Python Pandas', 'SQL / PostgreSQL', 'Data Validation', 'Outlier Filtering']
    },
    {
      step: '04',
      title: 'Interactive BI & Actionable Insights',
      description: 'Translating cleaned datasets into dynamic Power BI / web analytics dashboards that highlight profit drivers, deficit drains, and direct recommendations.',
      tools: ['Power BI', 'Interactive Web BI', 'DAX', 'Executive Reporting']
    }
  ];

  return (
    <section id="workflow" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
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
            <span>Structured Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Turn Raw Data into Profitable Outcomes
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            A battle-tested 4-stage pipeline that guarantees zero guesswork and fully hands-free execution.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group hover:shadow-xl hover:bg-slate-900/70 overflow-hidden"
            >
              {/* Subtle top indicator bar on hover */}
              <div 
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.primary}, transparent)` }}
              />

              <div>
                <span 
                  className="text-3xl font-extrabold font-mono transition-colors duration-300 block"
                  style={{ color: `${currentTheme.primary}50` }}
                >
                  {s.step}
                </span>
                <h3 className="text-base font-bold text-white mt-3 mb-2 group-hover:text-cyan-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 group-hover:text-slate-300 transition-colors">
                  {s.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {s.tools.map((tool, tIdx) => (
                  <motion.span 
                    key={tIdx} 
                    whileHover={{ scale: 1.08, y: -1 }}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 transition-all cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
