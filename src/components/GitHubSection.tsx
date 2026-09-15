import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Github, 
  ExternalLink, 
  Code2, 
  GitBranch, 
  Star, 
  FolderGit2, 
  Terminal, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function GitHubSection() {
  const { profile, projects } = usePortfolio();

  return (
    <section className="py-20 bg-[#090d16] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400 mb-3">
            <Github className="w-3.5 h-3.5" />
            <span>Open Source & Code Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Inspect My Code on GitHub
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Great engineering is verifiable. Explore my repositories to see how I organize workflows, format clean scripts, write README documentation, and structure modular code.
          </p>
        </div>

        {/* GitHub Hero Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-white shadow-xl">
              <Github className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">vidhan-79</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  Public Repositories
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Python automation scripts, exploratory data analyses, and modern web applications.
              </p>
            </div>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            id="explore-github-profile-btn"
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition-all shrink-0"
          >
            <span>Visit @vidhan-79 on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Featured Repository Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div 
              key={proj.id}
              className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-slate-500 mb-3">
                  <FolderGit2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-[10px] font-mono text-slate-500">Public</span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-1">
                  {proj.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Inspect Repository</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
