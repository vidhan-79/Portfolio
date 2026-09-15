import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCard } from './ProjectCard';
import { FeaturedProjectSpotlight } from './FeaturedProjectSpotlight';
import { 
  Filter, 
  Search, 
  Sparkles, 
  PlusCircle, 
  BarChart2, 
  Bot, 
  Database,
  Layers,
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { themes } from '../theme';

export function ProjectsSection() {
  const { projects, isAdmin, setIsAdminDashboardOpen, theme } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentTheme = themes[theme] || themes.violet;

  const categories = ['All', 'Data & Analytics', 'Python Automation', 'Web Applications'];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchQuery = 
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.problem && p.problem.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Featured flagship project (Superstore)
  const flagshipProject = projects.find(p => p.featured) || projects[0];

  return (
    <section id="projects" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <div 
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: currentTheme.primary }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Systems & Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects & Engineering Case Studies
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Every project is an engineering story: Problem → Approach → Where AI Helped → Engineering → Concrete Result.
            </p>
          </div>

          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsAdminDashboardOpen(true)}
              id="admin-add-project-banner-btn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm shadow-md transition-all self-start md:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Upload New Project (Admin)</span>
            </motion.button>
          )}
        </motion.div>

        {/* Spotlight Showcase for Superstore */}
        {flagshipProject && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-14"
          >
            <FeaturedProjectSpotlight project={flagshipProject} />
          </motion.div>
        )}

        {/* Filter and Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  style={isSelected ? {
                    backgroundColor: currentTheme.primary,
                    color: '#020617',
                    boxShadow: `0 4px 14px ${currentTheme.glow}`
                  } : undefined}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'font-bold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-100 hover:border-slate-700 border border-slate-800'
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>

          {/* Search input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by keyword, tool, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
            <p className="text-slate-400 text-sm">No projects matched your criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs hover:underline"
              style={{ color: currentTheme.primary }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={proj} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
