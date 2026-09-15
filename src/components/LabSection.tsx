import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { LabItem, LabStatus } from '../types';
import { 
  FlaskConical, 
  Sparkles, 
  Plus, 
  Edit, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Layers, 
  ArrowRight,
  Code2,
  ExternalLink
} from 'lucide-react';

export function LabSection() {
  const { labItems, isAdmin, setIsAdminDashboardOpen } = usePortfolio();
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const statuses: (string | LabStatus)[] = ['All', 'Building', 'Testing', 'Exploring', 'Shipped'];

  const filteredItems = labItems.filter(item => {
    if (selectedStatus === 'All') return true;
    return item.status === selectedStatus;
  });

  const getStatusBadge = (status: LabStatus) => {
    switch (status) {
      case 'Building':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            BUILDING
          </span>
        );
      case 'Testing':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            TESTING
          </span>
        );
      case 'Exploring':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-800/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            EXPLORING
          </span>
        );
      case 'Shipped':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            SHIPPED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="lab" className="py-20 bg-slate-950/50 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400 mb-3">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Active Prototyping</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Lab / Currently Building
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              I’m not just showing you what I’ve done. I’m showing you what I’m experimenting with and engineering right now.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAdminDashboardOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm shadow-md transition-all self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lab Experiment (Admin)</span>
            </button>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === st
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Lab Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {getStatusBadge(item.status)}
                  <span className="text-[10px] font-mono text-slate-500">
                    Updated {item.updatedAt}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <div className="text-xs text-slate-300 leading-relaxed mb-4">
                  <span className="font-mono text-slate-400 block text-[10px] uppercase tracking-wider mb-1 font-semibold">
                    Purpose & Motivation:
                  </span>
                  {item.purpose}
                </div>

                {/* AI Involvement */}
                <div className="p-3 rounded-xl bg-amber-950/15 border border-amber-500/20 text-xs text-slate-300 mb-4">
                  <span className="font-mono text-amber-300 font-bold flex items-center gap-1 mb-1 text-[11px]">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>AI Involvement:</span>
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {item.aiInvolvement}
                  </p>
                </div>

                {item.notes && (
                  <p className="text-[11px] text-slate-400 italic mb-4">
                    Note: {item.notes}
                  </p>
                )}
              </div>

              <div>
                {/* Tech Stack */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {item.technologies.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-300/90"
                    >
                      {tech}
                    </span>
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
