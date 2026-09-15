import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileCode, 
  Layers, 
  Cpu, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Bot
} from 'lucide-react';

export function ProjectDetailModal() {
  const { selectedProject, setSelectedProject } = usePortfolio();

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, setSelectedProject]);

  if (!selectedProject) return null;

  const { 
    title, 
    summary, 
    tagline,
    category, 
    metrics, 
    tags, 
    githubUrl, 
    liveUrl, 
    problem,
    approach,
    whereAiHelped,
    engineering,
    result,
    details 
  } = selectedProject;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Background click to dismiss */}
      <div 
        className="fixed inset-0 -z-10" 
        onClick={() => setSelectedProject(null)} 
      />

      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between gap-4 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                {category}
              </span>
              {selectedProject.featured && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/60 text-amber-300 border border-amber-800/60">
                  FLAGSHIP STUDY
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {title}
            </h2>
            {tagline && (
              <p className="text-xs sm:text-sm text-cyan-400 mt-1 font-medium">
                "{tagline}"
              </p>
            )}
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* Quick links & metrics */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex flex-wrap gap-2">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
                >
                  <span>Launch Live Interactive Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Source & Repository</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* 5-Part Engineering Story */}
          {(problem || approach || whereAiHelped || engineering || result) && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                The Engineering Story
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {problem && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
                      01 • The Problem
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{problem}</p>
                  </div>
                )}

                {approach && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                      02 • The Approach
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{approach}</p>
                  </div>
                )}

                {whereAiHelped && (
                  <div className="p-4 rounded-xl bg-amber-950/10 border border-amber-500/20">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 mb-1">
                      <Sparkles className="w-3 h-3" />
                      <span>03 • Where AI Helped</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{whereAiHelped}</p>
                  </div>
                )}

                {engineering && (
                  <div className="p-4 rounded-xl bg-teal-950/10 border border-teal-500/20">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 block mb-1">
                      04 • The Engineering
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{engineering}</p>
                  </div>
                )}
              </div>

              {result && (
                <div className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/20">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>05 • The Result</span>
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">{result}</p>
                </div>
              )}
            </div>
          )}

          {/* Key Metrics grid */}
          {metrics && metrics.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Performance Indicators (KPIs)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">{m.label}</span>
                    <div className="text-lg font-bold font-mono text-white mt-1">{m.value}</div>
                    {m.change && (
                      <span className={`text-[10px] font-medium ${m.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {m.change}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business Inquiries answered */}
          {details && details.businessQuestions && details.businessQuestions.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Business Inquiries Answered</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {details.businessQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs text-slate-300">
                    {q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loss-making products table */}
          {details && details.lossMakingProducts && details.lossMakingProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-rose-400 mb-3">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Top Loss-Making Deficit Products Isolated
                </h3>
              </div>
              <div className="rounded-xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <th className="py-2.5 px-3 font-semibold">SKU / Product Name</th>
                      <th className="py-2.5 px-3 font-semibold">Category</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Net Loss Incurred</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                    {details.lossMakingProducts.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-slate-200">{item.product}</td>
                        <td className="py-2.5 px-3 text-slate-400">{item.category}</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-400">{item.loss}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Strategic Recommendations */}
          {details && details.recommendations && details.recommendations.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Executive Strategic Recommendations</span>
              </h3>
              <div className="space-y-2.5">
                {details.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-900/50 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {rec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Analyzed & Engineered by Vidhan Rathod
          </span>
          <button
            onClick={() => setSelectedProject(null)}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
