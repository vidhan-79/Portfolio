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
  BarChart3, 
  Bot, 
  Database,
  Code2,
  CheckCircle2,
  Edit
} from 'lucide-react';
import { motion } from 'motion/react';
import { themes } from '../theme';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  key?: React.Key;
}

export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const { setSelectedProject, isAdmin, setIsAdminDashboardOpen, theme } = usePortfolio();
  const currentTheme = themes[theme] || themes.violet;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Python Automation':
        return <Bot className="w-4 h-4" style={{ color: currentTheme.primary }} />;
      case 'Web Applications':
      case 'AI-Assisted Tools':
        return <Code2 className="w-4 h-4 text-blue-400" />;
      default:
        return <Database className="w-4 h-4" style={{ color: currentTheme.accent }} />;
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -7, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group relative rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl overflow-hidden"
      style={{
        boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.4)'
      }}
    >
      {/* Top subtle highlight line on hover matching theme */}
      <div 
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.primary}, transparent)` }}
      />

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:rotate-6 transition-transform">
              {getCategoryIcon(project.category)}
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {project.featured && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${currentTheme.badgeBg} ${currentTheme.badgeText} ${currentTheme.badgeBorder}`}>
                Flagship
              </span>
            )}

            {isAdmin && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onEdit) onEdit(project);
                  else setIsAdminDashboardOpen(true);
                }}
                className="p-1.5 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                title="Edit this project in Admin"
              >
                <Edit className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">
          {project.title}
        </h4>

        {/* Tagline / Summary */}
        <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed group-hover:text-slate-300 transition-colors">
          {project.summary}
        </p>

        {/* Engineering Highlights Accordion / Badges */}
        <div className="space-y-2 mb-4 text-[11px]">
          {project.problem && (
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="font-mono font-bold text-rose-400 block mb-0.5">Problem:</span>
              <span className="text-slate-300 line-clamp-2">{project.problem}</span>
            </div>
          )}

          {project.whereAiHelped && (
            <div className="p-2 rounded-lg bg-amber-950/10 border border-amber-500/20">
              <span className="font-mono font-bold text-amber-300 flex items-center gap-1 mb-0.5">
                <Sparkles className="w-3 h-3" />
                <span>AI Multiplier:</span>
              </span>
              <span className="text-slate-300 line-clamp-2">{project.whereAiHelped}</span>
            </div>
          )}
        </div>

        {/* Metric Snippets */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.02 }}
                className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <span className="text-[10px] text-slate-400 block truncate">{m.label}</span>
                <span className="text-xs font-bold font-mono text-slate-200">{m.value}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <div>
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <motion.span 
              key={idx}
              whileHover={{ scale: 1.06, y: -1 }}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/40 hover:border-slate-600 transition-all cursor-default"
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-slate-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 text-xs font-medium transition-colors"
                title="Open Live Preview"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </motion.a>
            )}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-xs font-medium transition-colors"
              title="Open Source Code"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source</span>
            </motion.a>
          </div>

          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedProject(project)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
