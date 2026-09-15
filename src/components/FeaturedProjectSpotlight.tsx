import React from 'react';
import { Project } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ExternalLink, 
  Github, 
  ArrowRight, 
  Sparkles, 
  FileCode2, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowDown, 
  Cpu, 
  Bot, 
  BarChart3,
  TrendingDown,
  ShieldCheck,
  Zap,
  Edit
} from 'lucide-react';

import { motion } from 'motion/react';
import { themes } from '../theme';

interface FeaturedSpotlightProps {
  project: Project;
}

export function FeaturedProjectSpotlight({ project }: FeaturedSpotlightProps) {
  const { setSelectedProject, isAdmin, setIsAdminDashboardOpen, theme } = usePortfolio();
  const currentTheme = themes[theme] || themes.violet;

  const workflowSteps = [
    { label: 'Raw Data', sub: '9,994 retail rows' },
    { label: 'Data Cleaning', sub: 'Python & Pandas' },
    { label: 'Analysis', sub: '14 Inquiries & Elasticity' },
    { label: 'Business Insights', sub: 'Margin Drains & SKUs' },
    { label: 'Interactive Dashboard', sub: 'Live Netlify Web App' }
  ];

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden mb-16">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Top Header Tag */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>FLAGSHIP CASE STUDY</span>
          </span>
          <span className="text-xs font-mono text-slate-400">
            {project.category}
          </span>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsAdminDashboardOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/60 transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Case Study</span>
          </button>
        )}
      </div>

      {/* Title & Tagline */}
      <div className="max-w-3xl mb-8">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
          {project.title}
        </h3>
        <p className="text-base sm:text-lg text-cyan-400 font-medium">
          "{project.tagline || 'Turning raw sales data into actionable business insights.'}"
        </p>
        <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
          {project.summary}
        </p>
      </div>

      {/* Visual Workflow Pipeline: Raw Data ↓ Cleaning ↓ Analysis ↓ Insights ↓ Dashboard */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
        <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider block mb-3">
          End-to-End Intelligence Pipeline
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center">
          {workflowSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 relative">
              <span className="text-xs font-bold text-white mb-0.5">{step.label}</span>
              <span className="text-[10px] text-slate-400 font-mono">{step.sub}</span>
              {idx < workflowSteps.length - 1 && (
                <span className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-cyan-400 font-bold z-10">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5-Part Engineering Story Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-10 text-xs">
        
        {/* The Problem */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
            01 • The Problem
          </span>
          <p className="text-slate-300 leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* The Approach */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
            02 • The Approach
          </span>
          <p className="text-slate-300 leading-relaxed">
            {project.approach}
          </p>
        </div>

        {/* Where AI Helped */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/20 bg-amber-950/5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 mb-1">
            <Sparkles className="w-3 h-3" />
            <span>03 • Where AI Helped</span>
          </span>
          <p className="text-slate-300 leading-relaxed">
            {project.whereAiHelped}
          </p>
        </div>

        {/* The Engineering */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-teal-500/20 bg-teal-950/5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 block mb-1">
            04 • The Engineering
          </span>
          <p className="text-slate-300 leading-relaxed">
            {project.engineering}
          </p>
        </div>

        {/* The Result (Full Span) */}
        <div className="md:col-span-2 p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/20">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>05 • The Result & Commercial ROI</span>
          </span>
          <p className="text-slate-200 leading-relaxed">
            {project.result}
          </p>
        </div>

      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {project.metrics.map((metric, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">{metric.label}</span>
            <div className="text-xl font-bold font-mono text-white mt-1">{metric.value}</div>
            <span className={`text-[10px] font-semibold ${metric.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {metric.positive ? 'Net Gain' : 'Deficit Identified'}
            </span>
          </div>
        ))}
      </div>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-mono text-slate-500 mr-2">Technologies:</span>
        {project.tags.map((tag, idx) => (
          <motion.span 
            key={idx} 
            whileHover={{ scale: 1.08, y: -2 }}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-600 transition-colors cursor-default"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Prominent Action Buttons */}
      <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedProject(project)}
            id="spotlight-case-study-btn"
            className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${currentTheme.buttonGradient} text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all group`}
            style={{ boxShadow: `0 8px 20px -4px ${currentTheme.glow}` }}
          >
            <span>View Full Case Study</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {project.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="spotlight-live-dashboard-btn"
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-cyan-300 border border-cyan-700/50 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm group"
            >
              <span>Open Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
            </motion.a>
          )}

          <motion.a
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="spotlight-github-btn"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm group"
          >
            <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>View GitHub</span>
          </motion.a>
        </div>

        <span className="text-[11px] text-slate-500 font-mono">
          Interactive Live Dashboard Deployed on Netlify
        </span>
      </div>

    </div>
  );
}
