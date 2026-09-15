import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Bot, 
  Database, 
  Code2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { themes } from '../theme';

export function ContactSection() {
  const { profile, theme } = usePortfolio();
  const currentTheme = themes[theme] || themes.violet;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Python Automation',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      const mailtoSubject = encodeURIComponent(`Inquiry regarding ${formData.category} from ${formData.name}`);
      const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nNeed: ${formData.category}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    }, 800);
  };

  const hooks = [
    {
      title: 'Repetitive Workflow?',
      action: "Let's automate it.",
      icon: <Bot className="w-5 h-5" style={{ color: currentTheme.primary }} />,
      sub: 'Save hours every week with Python & API automation.'
    },
    {
      title: 'Messy Data?',
      action: "Let's turn it into something useful.",
      icon: <Database className="w-5 h-5" style={{ color: currentTheme.accent }} />,
      sub: 'Clean schemas, SQL pipelines, and actionable executive BI dashboards.'
    },
    {
      title: 'Web Application Idea?',
      action: "Let's build it.",
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      sub: 'Practical web tools and interactive interfaces that solve real problems.'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 border shadow-sm"
            style={{ 
              backgroundColor: currentTheme.badgeBg ? undefined : 'rgba(2, 6, 23, 0.8)',
              borderColor: `${currentTheme.primary}40`,
              color: currentTheme.primary 
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collaboration & Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something Useful.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Whether you need to eliminate manual friction, analyze high-volume data, or prototype a fast web application—let’s engineer it.
          </p>
        </motion.div>

        {/* 3 Action Hooks */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {hooks.map((hook, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col justify-between group hover:shadow-xl hover:bg-slate-900/80 transition-all overflow-hidden relative"
            >
              <div 
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.primary}, transparent)` }}
              />
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
                  {hook.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-400 mb-1 group-hover:text-slate-300 transition-colors">
                  {hook.title}
                </h3>
                <div 
                  className="text-lg font-bold text-white mb-2 group-hover:translate-x-0.5 transition-transform"
                >
                  {hook.action}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {hook.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Form & Direct Connections */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2">Direct Contact</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Always open to discussing freelance projects, automation engineering contracts, or full-time opportunities.
              </p>

              <div className="space-y-4">
                <motion.a
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${currentTheme.primary}20`, color: currentTheme.primary }}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-mono">Email Address</span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {profile.email}
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-mono">LinkedIn Profile</span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
                      Connect on LinkedIn
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 group-hover:scale-110 transition-transform">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-mono">GitHub Repository</span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                      github.com/vidhan-79
                    </span>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right: Message Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors shadow-lg"
          >
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Opening Email Client...</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out! A pre-filled email to {profile.email} is being dispatched.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 text-xs font-semibold hover:underline"
                  style={{ color: currentTheme.primary }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-medium text-slate-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-medium text-slate-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-medium text-slate-300 mb-1">
                    What are you looking to build?
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all"
                  >
                    <option value="Python Automation">Python Automation / Web Scraping</option>
                    <option value="Data Cleaning & Analysis">Data Cleaning, SQL & Analytics</option>
                    <option value="BI Dashboard">Executive BI Dashboard</option>
                    <option value="Web Application">Custom Web Application / Tool</option>
                    <option value="Other">General Engineering Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-medium text-slate-300 mb-1">
                    Project Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the problem, manual bottlenecks, or what you'd like to build..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  id="submit-contact-btn"
                  className={`w-full py-3 rounded-xl bg-gradient-to-r ${currentTheme.buttonGradient} text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer group`}
                  style={{ boxShadow: `0 8px 20px -4px ${currentTheme.glow}` }}
                >
                  <span>Let's Build Something Useful</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
