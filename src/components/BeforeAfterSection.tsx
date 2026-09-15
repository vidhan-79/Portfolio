import React from 'react';
import { 
  AlertOctagon, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  FileSpreadsheet, 
  Workflow, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';

export function BeforeAfterSection() {
  const beforePoints = [
    { label: 'Manual Copy-Paste', detail: 'Hours lost navigating browser tabs and copying numbers into desktop files' },
    { label: 'Fragmented Spreadsheets', detail: 'Inconsistent column formats, broken formulas, and missing validation' },
    { label: 'Repetitive Labor', detail: 'Same tedious reports compiled manually every single week' },
    { label: 'High Error Rate', detail: 'Silent human typos leading to flawed business decisions and deficit drains' }
  ];

  const afterPoints = [
    { label: 'Python + APIs + AI', detail: 'Headless scripts and automated pipelines executing in seconds' },
    { label: 'Automated Workflows', detail: 'Idempotent, scheduled extractions with automatic error recovery' },
    { label: 'Structured Validated Data', detail: 'Clean schemas, SQL databases, and outlier-checked datasets' },
    { label: 'Actionable Dashboards', detail: 'Interactive executive interfaces delivering clear, confident decisions' }
  ];

  return (
    <section className="py-20 bg-slate-950/70 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            I Turn Manual Work Into Systems.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Businesses waste hundreds of hours on fragile manual processes. I replace friction with automated code, validated data pipelines, and clear interfaces.
          </p>
        </div>

        {/* Visual Transformation Cards: BEFORE vs. AFTER */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* BEFORE: Fragile & Manual */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-rose-950/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-rose-950/80 border-b border-l border-rose-800/60 text-[10px] font-mono font-bold text-rose-300">
              BEFORE: FRAGILE & MANUAL
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/50 flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-200">The Friction</h3>
                <span className="text-xs text-rose-400/90 font-medium">Prone to fatigue and errors</span>
              </div>
            </div>

            <div className="space-y-4">
              {beforePoints.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-950/80 text-rose-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✕
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{item.label}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Outcome: Lost time & high stress</span>
              <span className="text-rose-400 font-mono">Inefficient</span>
            </div>
          </div>

          {/* Central Arrow / Engineering Bridge */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-4 lg:py-0">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-2">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              Engineered Bridge
            </span>
            <span className="text-[10px] text-slate-400 mt-1 max-w-[130px]">
              Python + APIs + Clean Architecture
            </span>
          </div>

          {/* AFTER: Automated & Reliable */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-emerald-950/60 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-emerald-950/80 border-b border-l border-emerald-800/60 text-[10px] font-mono font-bold text-emerald-300">
              AFTER: AUTOMATED & ROBUST
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The Engineered System</h3>
                <span className="text-xs text-emerald-400/90 font-medium">Reproducible, automated & accurate</span>
              </div>
            </div>

            <div className="space-y-4">
              {afterPoints.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{item.label}</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Outcome: 100% automated & zero fatigue</span>
              <span className="text-emerald-400 font-mono font-semibold">Reliable</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
