import React from 'react';
import { 
  Compass, 
  BrainCircuit, 
  Sparkles, 
  CheckCheck, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Code2
} from 'lucide-react';

export function HowIBuildSection() {
  const steps = [
    {
      step: '01',
      title: 'Understand',
      tag: 'Problem Discovery',
      description: 'Digging into the real commercial or user bottleneck—identifying whether the goal is eliminating hours of manual work, finding margin leaks, or creating a new internal tool.',
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      outcome: 'Clear problem definition & measurable objectives'
    },
    {
      step: '02',
      title: 'Think',
      tag: 'System Architecture',
      description: 'Deconstructing the problem into modular systems: data ingestion models, API boundaries, schema requirements, and user interfaces before touching code.',
      icon: <BrainCircuit className="w-5 h-5 text-teal-400" />,
      outcome: 'Scalable blueprints & data contract specifications'
    },
    {
      step: '03',
      title: 'Accelerate with AI',
      tag: 'The Engineering Multiplier',
      description: 'Using AI as a force multiplier for rapid prototyping, syntax generation, exploratory data queries, regex formulations, test cases, and edge-case brainstorming.',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      outcome: '10x faster iteration without architectural shortcuts'
    },
    {
      step: '04',
      title: 'Engineer & Deliver',
      tag: 'Validation & Polish',
      description: 'Reviewing every generated line, refactoring for modularity, writing assertions, stress-testing edge cases, and packaging clean code with complete setup docs.',
      icon: <CheckCheck className="w-5 h-5 text-emerald-400" />,
      outcome: 'Production-ready, reliable, and maintainable software'
    }
  ];

  return (
    <section id="how-i-build" className="py-20 bg-[#090d16] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Build
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            The narrative is always: <strong>Problem → AI + Engineering → Solution → Result</strong>.
          </p>
          
          {/* Central Callout Banner */}
          <div className="mt-6 inline-block p-3 px-6 rounded-xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-teal-950/80 border border-cyan-500/30 shadow-lg">
            <span className="text-xs sm:text-sm font-semibold text-cyan-300">
              "AI helps me move faster. Engineering makes the result reliable."
            </span>
          </div>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-cyan-400/80 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                  {item.tag}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-300 font-medium flex items-center gap-1.5">
                <CheckCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{item.outcome}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
