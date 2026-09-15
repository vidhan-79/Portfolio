import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Github, 
  Code2, 
  CheckCircle, 
  Sparkles, 
  Edit,
  ArrowRight
} from 'lucide-react';

export function AboutSection() {
  const { profile, isAdmin, setIsAdminDashboardOpen } = usePortfolio();

  return (
    <section id="about" className="py-20 relative bg-slate-950/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-xl">
              
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-0.5 shadow-lg shadow-cyan-500/20">
                  <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center font-mono font-bold text-xl text-cyan-400">
                    VR
                  </div>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => setIsAdminDashboardOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/60 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">
                {profile.name}
              </h3>
              <p className="text-sm font-medium text-cyan-400 mb-4">
                {profile.role}
              </p>

              <div className="space-y-3 py-4 border-y border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{profile.education}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <a href={`mailto:${profile.email}`} className="hover:text-cyan-300 transition-colors">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">
                    github.com/vidhan-79
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="#contact"
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Bio Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Vidhan</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Eliminating Manual Hours & Empowering Confident Decisions
            </h2>

            <div className="text-slate-300 text-base leading-relaxed space-y-4 font-normal">
              <p>
                {profile.about}
              </p>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-sm font-medium italic">
                "{profile.bioNote}"
              </div>
            </div>

            {/* Core Skills Checklist */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Professional Competencies
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {profile.coreSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900/40 border border-slate-850">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
