import React from 'react';
import { 
  FileCode2, 
  Layers, 
  Bot, 
  ShieldCheck, 
  FileText, 
  Users, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export function EngineeringMindsetSection() {
  const principles = [
    {
      title: 'Clean Code',
      icon: <FileCode2 className="w-5 h-5 text-cyan-400" />,
      detail: 'Readable, modular, and idiomatic code with explicit variable names and separation of concerns rather than clever one-liners.'
    },
    {
      title: 'Practical Architecture',
      icon: <Layers className="w-5 h-5 text-teal-400" />,
      detail: 'Choosing the simplest architecture that completely solves the problem. No needless over-engineering or premature microservices.'
    },
    {
      title: 'Automation First',
      icon: <Bot className="w-5 h-5 text-blue-400" />,
      detail: 'If a workflow repeats more than twice, engineer a headless script or pipeline to execute it reliably without human fatigue.'
    },
    {
      title: 'AI-Assisted + Human-Validated',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      detail: 'AI accelerates generation and exploration, but human engineering audits correctness, security boundaries, and edge cases.'
    },
    {
      title: 'Documentation',
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      detail: 'Every repository includes concise setup commands, architecture schematics, and clear explanation of data contracts.'
    },
    {
      title: 'User-Focused',
      icon: <Users className="w-5 h-5 text-purple-400" />,
      detail: 'Software and dashboards only succeed if the stakeholders can effortlessly understand, navigate, and make decisions with them.'
    }
  ];

  return (
    <section id="mindset" className="py-20 bg-slate-950/60 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Philosophy & Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Engineering Mindset
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            How I think about building software, pipelines, and data tools that teams can actually rely on.
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4 group-hover:border-cyan-500/40 transition-colors">
                  {item.icon}
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
