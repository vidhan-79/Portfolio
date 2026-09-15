import React from 'react';
import { 
  Code2, 
  Database, 
  Bot, 
  Lightbulb, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Check, 
  Zap,
  ArrowRight
} from 'lucide-react';

export function AiEngineeringSection() {
  const pillars = [
    {
      title: 'AI for Development',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      tag: 'Speed & Code Quality',
      items: [
        'Rapid scaffolding and prototyping',
        'Boilerplate & schema code generation',
        'Deep debugging & stack-trace resolution',
        'Modular refactoring & performance auditing',
        'Comprehensive documentation & setup specs',
        'Quickly mastering unfamiliar libraries & SDKs'
      ]
    },
    {
      title: 'AI for Data',
      icon: <Database className="w-5 h-5 text-teal-400" />,
      tag: 'Analytics & Pipelines',
      items: [
        'Exploratory data analysis & pattern discovery',
        'Complex SQL query generation & optimization',
        'Formulating statistical hypotheses & tests',
        'Vectorized Pandas data transformation logic',
        'Anomaly & outlier identification heuristics',
        'Cleaning dirty unstandardized date/number strings'
      ]
    },
    {
      title: 'AI for Automation',
      icon: <Bot className="w-5 h-5 text-blue-400" />,
      tag: 'Zero Friction Workflows',
      items: [
        'Designing end-to-end automation architectures',
        'Complex REST API integration mapping',
        'Generating robust regex for scraping extraction',
        'Dynamic web scraper resilience planning',
        'Eliminating repetitive spreadsheet tasks',
        'Self-healing fallback strategies for broken selectors'
      ]
    },
    {
      title: 'AI for Problem Solving',
      icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
      tag: 'Strategy & Architecture',
      items: [
        'Domain research & industry edge-case analysis',
        'Multi-alternative architectural brainstorming',
        'Stress-testing trade-offs before implementation',
        'Translating business pain points into technical specs',
        'Compressing research cycles from days to minutes',
        'Rapid iteration on interface usability patterns'
      ]
    }
  ];

  return (
    <section id="ai-engineering" className="py-20 bg-slate-950/60 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Signature Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI is my Copilot. Engineering is my Skill.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            I don’t blindly copy generated code. I use AI to explore possibilities, test assumptions, and compress turnaround times—while engineering robust architectures.
          </p>
        </div>

        {/* Visually Standout Quote Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-teal-500/10 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase block mb-2">
              Non-Negotiable Stance
            </span>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              “I don't use AI to replace engineering. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                I use AI to accelerate engineering.
              </span>”
            </blockquote>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                
                <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider block mb-1">
                  {p.tag}
                </span>
                
                <h3 className="text-lg font-bold text-white mb-4">
                  {p.title}
                </h3>

                <ul className="space-y-2.5">
                  {p.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Human-validated & tested</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
