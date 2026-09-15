import React from 'react';
import { 
  Bot, 
  Database, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  FileCode,
  Layers,
  BarChart3,
  Server
} from 'lucide-react';

export function WhatIBuildSection() {
  const categories = [
    {
      num: '01',
      title: 'Python Automation',
      headline: 'I eliminate repetitive work by turning manual processes into automated workflows.',
      icon: <Bot className="w-6 h-6 text-cyan-400" />,
      tag: 'Hands-Free Execution',
      examples: [
        'Resilient web scraping (Selenium, BeautifulSoup, Playwright)',
        'REST API connectors & multi-service webhooks',
        'Bulk file, PDF & spreadsheet data normalization',
        'Automated scheduled reporting pipelines (Cron/Task Scheduler)',
        'Custom workflow orchestrations saving 15+ hours/week',
        'Anti-blocking, user-agent rotation & proxy management'
      ]
    },
    {
      num: '02',
      title: 'Data & Intelligence',
      headline: 'I turn messy data into information people can actually use.',
      icon: <Database className="w-6 h-6 text-teal-400" />,
      tag: 'Clarity & Verification',
      examples: [
        'Pandas-driven data cleaning, typecasting & null recovery',
        'High-integrity ETL pipelines feeding relational SQL databases',
        'Exploratory Data Analysis (EDA) uncovering margin & cost anomalies',
        'Executive business dashboards (Power BI, Tableau, Advanced Excel)',
        'Cohort retention, elasticity & transaction breakdown models',
        'Automated audit reports with zero human calculation drift'
      ]
    },
    {
      num: '03',
      title: 'Web Applications',
      headline: 'I build practical web applications that solve specific problems.',
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      tag: 'Practical Usability',
      examples: [
        'Internal data consoles & scraper orchestration portals',
        'Interactive analytics dashboards deployed for stakeholder access',
        'Lightweight tools connecting frontends with Python microservices',
        'AI-assisted development delivering clean TypeScript/React code',
        'Responsive, fast web applications with modular architecture',
        'Custom automation interfaces with secure authentication'
      ]
    }
  ];

  return (
    <section id="what-i-build" className="py-20 bg-[#090d16] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capability Spectrum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What I Build
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            More than static charts. I build practical automation engines, end-to-end data systems, and usable web software.
          </p>
        </div>

        {/* 3 Major Pillars */}
        <div className="space-y-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all grid lg:grid-cols-12 gap-8 items-center"
            >
              {/* Category Info */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-mono font-black text-cyan-400/80">
                    {cat.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {cat.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {cat.title}
                </h3>

                <p className="text-sm text-cyan-300/90 font-medium leading-relaxed">
                  "{cat.headline}"
                </p>

                <div className="pt-2">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <span>View associated case studies</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Examples Grid */}
              <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 sm:p-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-4">
                  Representative Deliverables
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {cat.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
