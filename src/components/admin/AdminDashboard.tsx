import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, ProfileData, LabItem, LabStatus } from '../../types';
import { 
  X, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Github, 
  Eye, 
  Layers, 
  User, 
  Key, 
  Sparkles, 
  RotateCcw,
  Check,
  ShieldCheck,
  Search,
  ArrowRight,
  Database,
  FlaskConical,
  Palette,
  Lock,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { PasscodeSecurityTab } from './PasscodeSecurityTab';
import { AppearanceThemeTab } from './AppearanceThemeTab';
import { themes } from '../../theme';

export function AdminDashboard() {
  const { 
    projects, 
    labItems,
    profile, 
    theme,
    updateProfile, 
    addProject, 
    updateProject, 
    deleteProject, 
    addLabItem,
    updateLabItem, 
    deleteLabItem,
    resetToDefault, 
    changeAdminPasscode, 
    logoutAdmin, 
    isAdminDashboardOpen, 
    setIsAdminDashboardOpen 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'projects' | 'lab' | 'profile' | 'appearance' | 'security'>('projects');
  const [successToast, setSuccessToast] = useState<string>('');
  const [errorToast, setErrorToast] = useState<string>('');

  // Project Editor State
  const [isEditingProject, setIsEditingProject] = useState<boolean>(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    tagline: '',
    category: 'Data & Analytics' as Project['category'],
    summary: '',
    featured: false,
    githubUrl: '',
    liveUrl: '',
    tags: '',
    problem: '',
    approach: '',
    whereAiHelped: '',
    engineering: '',
    result: '',
    metric1Label: 'Analyzed Volume',
    metric1Value: '10K+ Records',
    metric2Label: 'Profit / Margin Impact',
    metric2Value: '+15.2%',
    overview: '',
    problemStatement: '',
    businessQuestionsText: '',
    keyFindingsText: '',
    recommendationsText: '',
    techStackText: '',
    lossMakersText: ''
  });

  // Lab Experiment Editor State
  const [isEditingLab, setIsEditingLab] = useState<boolean>(false);
  const [editingLabId, setEditingLabId] = useState<string | null>(null);
  const [labForm, setLabForm] = useState({
    title: '',
    purpose: '',
    technologies: '',
    aiInvolvement: '',
    status: 'Building' as LabStatus,
    notes: ''
  });

  // Pre-upload Verification State
  const [showPrecheckModal, setShowPrecheckModal] = useState<boolean>(false);
  const [precheckResults, setPrecheckResults] = useState<{
    validUrl: boolean;
    hasProblemAndApproach: boolean;
    hasAiHelped: boolean;
    hasResult: boolean;
    summaryLength: number;
    ready: boolean;
  } | null>(null);

  // Profile Editor State
  const [profileForm, setProfileForm] = useState<ProfileData>({ ...profile });

  // Security State
  const [oldPasscode, setOldPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');

  if (!isAdminDashboardOpen) return null;

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorToast(msg);
      setTimeout(() => setErrorToast(''), 4000);
    } else {
      setSuccessToast(msg);
      setTimeout(() => setSuccessToast(''), 3000);
    }
  };

  const handleStartAddProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      tagline: '',
      category: 'Data & Analytics',
      summary: '',
      featured: false,
      githubUrl: 'https://github.com/vidhan-79',
      liveUrl: '',
      tags: 'Python, Automation, Data',
      problem: '',
      approach: '',
      whereAiHelped: '',
      engineering: '',
      result: '',
      metric1Label: 'Analyzed Volume',
      metric1Value: '25,000+ Records',
      metric2Label: 'Efficiency Gain',
      metric2Value: '99.8%',
      overview: '',
      problemStatement: '',
      businessQuestionsText: '1. What were the primary bottlenecks?\n2. What was the net ROI?',
      keyFindingsText: 'Discovered automated schema validation reduced error rates by 80%.\nOptimized query execution time from 15s to 200ms.',
      recommendationsText: 'Deploy nightly scheduled cron job for automated extraction.\nEnforce strict null-check validations prior to ingestion.',
      techStackText: 'Python, Pandas, SQL, BeautifulSoup, REST APIs',
      lossMakersText: ''
    });
    setIsEditingProject(true);
  };

  const handleStartEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      tagline: proj.tagline || '',
      category: proj.category,
      summary: proj.summary,
      featured: proj.featured,
      githubUrl: proj.githubUrl,
      liveUrl: proj.liveUrl || '',
      tags: proj.tags.join(', '),
      problem: proj.problem || '',
      approach: proj.approach || '',
      whereAiHelped: proj.whereAiHelped || '',
      engineering: proj.engineering || '',
      result: proj.result || '',
      metric1Label: proj.metrics[0]?.label || 'Metric 1',
      metric1Value: proj.metrics[0]?.value || '',
      metric2Label: proj.metrics[1]?.label || 'Metric 2',
      metric2Value: proj.metrics[1]?.value || '',
      overview: proj.details.overview || '',
      problemStatement: proj.details.problemStatement || '',
      businessQuestionsText: proj.details.businessQuestions?.join('\n') || '',
      keyFindingsText: proj.details.keyFindings?.join('\n') || '',
      recommendationsText: proj.details.recommendations?.join('\n') || '',
      techStackText: proj.details.techStack?.join(', ') || '',
      lossMakersText: proj.details.lossMakingProducts?.map(l => `${l.product} | ${l.loss} | ${l.category || ''}`).join('\n') || ''
    });
    setIsEditingProject(true);
  };

  // Pre-upload Verification Check
  const runPreUploadVerification = () => {
    const isUrlValid = projectForm.githubUrl.startsWith('http://') || projectForm.githubUrl.startsWith('https://');
    const hasProblemAndApproach = projectForm.problem.trim().length > 10 && projectForm.approach.trim().length > 10;
    const hasAiHelped = projectForm.whereAiHelped.trim().length > 10;
    const hasResult = projectForm.result.trim().length > 10;
    const summaryLen = projectForm.summary.trim().length;
    const isReady = isUrlValid && hasProblemAndApproach && hasAiHelped && hasResult && summaryLen >= 20 && projectForm.title.trim().length > 3;

    setPrecheckResults({
      validUrl: isUrlValid,
      hasProblemAndApproach,
      hasAiHelped,
      hasResult,
      summaryLength: summaryLen,
      ready: isReady
    });
    setShowPrecheckModal(true);
  };

  const handleSaveProject = async () => {
    if (!projectForm.title.trim()) {
      showNotification('Project title is required', true);
      return;
    }

    const tagsArray = projectForm.tags.split(',').map(t => t.trim()).filter(Boolean);
    const techArray = projectForm.techStackText.split(',').map(t => t.trim()).filter(Boolean);
    const questionsArray = projectForm.businessQuestionsText.split('\n').map(q => q.trim()).filter(Boolean);
    const findingsArray = projectForm.keyFindingsText.split('\n').map(f => f.trim()).filter(Boolean);
    const recsArray = projectForm.recommendationsText.split('\n').map(r => r.trim()).filter(Boolean);

    // Parse loss-makers
    const lossMakersArray = projectForm.lossMakersText.split('\n').map(line => {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 2) {
        return {
          product: parts[0],
          loss: parts[1],
          category: parts[2] || 'Uncategorized'
        };
      }
      return null;
    }).filter(Boolean) as Array<{ product: string; loss: string; category?: string }>;

    const projectData = {
      title: projectForm.title.trim(),
      tagline: projectForm.tagline.trim(),
      category: projectForm.category,
      summary: projectForm.summary.trim(),
      featured: projectForm.featured,
      githubUrl: projectForm.githubUrl.trim(),
      liveUrl: projectForm.liveUrl.trim() || undefined,
      tags: tagsArray,
      problem: projectForm.problem.trim(),
      approach: projectForm.approach.trim(),
      whereAiHelped: projectForm.whereAiHelped.trim(),
      engineering: projectForm.engineering.trim(),
      result: projectForm.result.trim(),
      metrics: [
        { label: projectForm.metric1Label, value: projectForm.metric1Value, positive: true },
        { label: projectForm.metric2Label, value: projectForm.metric2Value, positive: true }
      ],
      details: {
        overview: projectForm.overview.trim() || projectForm.summary.trim(),
        problemStatement: projectForm.problemStatement.trim() || projectForm.problem.trim(),
        businessQuestions: questionsArray,
        keyFindings: findingsArray,
        problemAreas: [],
        lossMakingProducts: lossMakersArray,
        recommendations: recsArray,
        techStack: techArray
      }
    };

    if (editingProjectId) {
      await updateProject(editingProjectId, projectData);
      showNotification('Project updated successfully!');
    } else {
      await addProject(projectData);
      showNotification('New project uploaded successfully!');
      try {
        confetti({ particleCount: 35, spread: 60 });
      } catch (e) {}
    }

    setIsEditingProject(false);
    setShowPrecheckModal(false);
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove project "${title}"?`)) {
      await deleteProject(id);
      showNotification(`Deleted "${title}"`);
    }
  };

  // Lab handlers
  const handleStartAddLab = () => {
    setEditingLabId(null);
    setLabForm({
      title: '',
      purpose: '',
      technologies: 'Python, FastAPI, Gemini API',
      aiInvolvement: '',
      status: 'Building',
      notes: ''
    });
    setIsEditingLab(true);
  };

  const handleStartEditLab = (item: LabItem) => {
    setEditingLabId(item.id);
    setLabForm({
      title: item.title,
      purpose: item.purpose,
      technologies: item.technologies.join(', '),
      aiInvolvement: item.aiInvolvement,
      status: item.status,
      notes: item.notes || ''
    });
    setIsEditingLab(true);
  };

  const handleSaveLab = async () => {
    if (!labForm.title.trim()) {
      showNotification('Experiment title is required', true);
      return;
    }

    const techArray = labForm.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const labData = {
      title: labForm.title.trim(),
      purpose: labForm.purpose.trim(),
      technologies: techArray,
      aiInvolvement: labForm.aiInvolvement.trim(),
      status: labForm.status,
      notes: labForm.notes.trim() || undefined
    };

    if (editingLabId) {
      await updateLabItem(editingLabId, labData);
      showNotification('Lab experiment updated!');
    } else {
      await addLabItem(labData);
      showNotification('New experiment added to The Lab!');
    }

    setIsEditingLab(false);
  };

  const handleDeleteLab = async (id: string, title: string) => {
    if (window.confirm(`Delete lab item "${title}"?`)) {
      await deleteLabItem(id);
      showNotification(`Removed "${title}" from Lab`);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
    showNotification('Profile and About texts updated live!');
  };

  const handleChangePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasscode !== confirmPasscode) {
      showNotification('New passcode and confirmation do not match', true);
      return;
    }
    const res = await changeAdminPasscode(oldPasscode, newPasscode);
    if (res.success) {
      showNotification(res.message);
      setOldPasscode('');
      setNewPasscode('');
      setConfirmPasscode('');
    } else {
      showNotification(res.message, true);
    }
  };

  const handleResetData = async () => {
    if (window.confirm('Reset all projects, lab items, and profile back to the initial default seed? Any custom projects will be reset.')) {
      await resetToDefault();
      showNotification('Restored initial default portfolio state');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col"
      >
        
        {/* Admin Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/10 border border-emerald-500/40 bg-emerald-950/80 text-emerald-400"
            >
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Admin Control Center
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage projects, 5-part engineering stories, The Lab, passcode, and color themes
              </p>
            </div>
          </div>

          {/* Header Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('security')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                activeTab === 'security'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-amber-300 border-slate-700 hover:border-amber-500/40'
              }`}
              title="Change Admin Passcode"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Change Passcode</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('appearance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                activeTab === 'appearance'
                  ? 'bg-violet-500/20 text-violet-300 border-violet-500/50 shadow-sm'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-violet-300 border-slate-700 hover:border-violet-500/40'
              }`}
              title="Change Portfolio Color Theme"
            >
              <Palette className="w-3.5 h-3.5 text-violet-400" />
              <span>Theme: {themes[theme]?.name.split(' ')[0]}</span>
            </motion.button>

            <button
              onClick={() => setIsAdminDashboardOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              View Site
            </button>
            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800 text-xs font-semibold text-rose-300 hover:bg-rose-900/60 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {successToast && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-950/95 border-b border-emerald-600/50 text-emerald-200 text-xs px-6 py-2.5 flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{successToast}</span>
            </motion.div>
          )}
          {errorToast && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-rose-950/95 border-b border-rose-600/50 text-rose-200 text-xs px-6 py-2.5 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="font-medium">{errorToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 overflow-x-auto gap-1">
          <button
            onClick={() => { setActiveTab('projects'); setIsEditingProject(false); }}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('lab'); setIsEditingLab(false); }}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'lab'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>The Lab ({labItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'appearance'
                ? 'border-violet-400 text-violet-300 bg-violet-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Color Theme</span>
            <span className="w-2 h-2 rounded-full ml-0.5" style={{ backgroundColor: themes[theme]?.primary }} />
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-amber-400 text-amber-300 bg-amber-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Passcode & Security</span>
          </button>
        </div>

        {/* Scrollable Main Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/60">
          
          {/* TAB 1: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              {!isEditingProject ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Case Studies & Project Catalog
                      </h3>
                      <p className="text-xs text-slate-400">
                        Upload new case studies or adjust existing project details & 5-part engineering stories.
                      </p>
                    </div>

                    <button
                      onClick={handleStartAddProject}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload New Project</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-cyan-300">
                              {proj.category}
                            </span>
                            {proj.featured && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                                FLAGSHIP
                              </span>
                            )}
                            <h4 className="text-sm font-bold text-white">
                              {proj.title}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-400 max-w-xl line-clamp-1">
                            {proj.summary}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                            <span>Questions: {proj.details.businessQuestions?.length || 0}</span>
                            <span>•</span>
                            <span>Findings: {proj.details.keyFindings?.length || 0}</span>
                            <span>•</span>
                            <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
                              Repo Link ↗
                            </a>
                            {proj.liveUrl && (
                              <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
                                Live Dashboard ↗
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleStartEditProject(proj)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
                            title="Edit project details"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs transition-colors"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Edit / Add Project Form */
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {editingProjectId ? 'Adjust Project & Engineering Story' : 'Upload New Project'}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Check your findings, verify URLs, and document the 5-part engineering story before publishing.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsEditingProject(false)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g. Superstore Sales & Profit Intelligence"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="Data & Analytics">Data & Analytics</option>
                        <option value="Python Automation">Python Automation</option>
                        <option value="Web Applications">Web Applications</option>
                        <option value="AI-Assisted Tools">AI-Assisted Tools</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tagline / Subheading
                      </label>
                      <input
                        type="text"
                        value={projectForm.tagline}
                        onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                        placeholder="e.g. Turning raw sales data into actionable business insights."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Summary Paragraph *
                      </label>
                      <textarea
                        rows={3}
                        value={projectForm.summary}
                        onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                        placeholder="High-level commercial impact and methodology..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    {/* 5-Part Engineering Story Inputs */}
                    <div className="sm:col-span-2 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                        5-Part Engineering Story
                      </span>

                      <div>
                        <label className="block text-xs font-semibold text-rose-300 mb-1">
                          01 • The Problem *
                        </label>
                        <textarea
                          rows={2}
                          value={projectForm.problem}
                          onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                          placeholder="What was broken, inefficient, or leaking money?"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-cyan-300 mb-1">
                          02 • The Approach *
                        </label>
                        <textarea
                          rows={2}
                          value={projectForm.approach}
                          onChange={(e) => setProjectForm({ ...projectForm, approach: e.target.value })}
                          placeholder="How did you break down the system and design the solution?"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-amber-300 mb-1">
                          03 • Where AI Helped *
                        </label>
                        <textarea
                          rows={2}
                          value={projectForm.whereAiHelped}
                          onChange={(e) => setProjectForm({ ...projectForm, whereAiHelped: e.target.value })}
                          placeholder="How was AI used as a multiplier (syntax generation, data exploration, regex, test cases)?"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-teal-300 mb-1">
                          04 • The Engineering *
                        </label>
                        <textarea
                          rows={2}
                          value={projectForm.engineering}
                          onChange={(e) => setProjectForm({ ...projectForm, engineering: e.target.value })}
                          placeholder="The human engineering, testing, validation, and architecture that made it reliable."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-emerald-300 mb-1">
                          05 • The Result *
                        </label>
                        <textarea
                          rows={2}
                          value={projectForm.result}
                          onChange={(e) => setProjectForm({ ...projectForm, result: e.target.value })}
                          placeholder="Measurable business or technical outcome."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        GitHub Repository URL *
                      </label>
                      <input
                        type="url"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/vidhan-79/..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Live Dashboard URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={projectForm.liveUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                        placeholder="https://analysis-dashboardproject.netlify.app/"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={projectForm.tags}
                        onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                        placeholder="Python, Pandas, Power BI, Selenium"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200">
                        <input
                          type="checkbox"
                          checked={projectForm.featured}
                          onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                          className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-800"
                        />
                        <span>Feature in Top Flagship Spotlight</span>
                      </label>
                    </div>

                    {/* Metric 1 and 2 */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Metric 1 (Label & Value)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={projectForm.metric1Label}
                          onChange={(e) => setProjectForm({ ...projectForm, metric1Label: e.target.value })}
                          className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                        />
                        <input
                          type="text"
                          value={projectForm.metric1Value}
                          onChange={(e) => setProjectForm({ ...projectForm, metric1Value: e.target.value })}
                          className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Metric 2 (Label & Value)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={projectForm.metric2Label}
                          onChange={(e) => setProjectForm({ ...projectForm, metric2Label: e.target.value })}
                          className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                        />
                        <input
                          type="text"
                          value={projectForm.metric2Value}
                          onChange={(e) => setProjectForm({ ...projectForm, metric2Value: e.target.value })}
                          className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white font-mono"
                        />
                      </div>
                    </div>

                    {/* Detailed Business Inquiries & Findings */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Business Questions Answered (one question per line)
                      </label>
                      <textarea
                        rows={3}
                        value={projectForm.businessQuestionsText}
                        onChange={(e) => setProjectForm({ ...projectForm, businessQuestionsText: e.target.value })}
                        placeholder="1. Total sales analyzed ($2.3M)\n2. Which subcategory led in profit?"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Key Data Findings (one finding per line)
                      </label>
                      <textarea
                        rows={3}
                        value={projectForm.keyFindingsText}
                        onChange={(e) => setProjectForm({ ...projectForm, keyFindingsText: e.target.value })}
                        placeholder="Technology delivered highest profit ($145k)\nDiscounts > 20% destroy margin..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Deficit / Loss-Making Products (Format: Name | Loss Amount | Category)
                      </label>
                      <textarea
                        rows={2}
                        value={projectForm.lossMakersText}
                        onChange={(e) => setProjectForm({ ...projectForm, lossMakersText: e.target.value })}
                        placeholder="Cubify 3D Printer | -$8,879.97 | Technology&#10;Conference Table | -$2,876.12 | Furniture"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Pre-upload Check & Save Buttons */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={runPreUploadVerification}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Pre-Upload Audit & Story Inspector</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingProject(false)}
                        className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveProject}
                        id="admin-save-project-btn"
                        className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Publish Project</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: THE LAB / EXPERIMENTS */}
          {activeTab === 'lab' && (
            <div>
              {!isEditingLab ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        The Lab / Active Prototyping
                      </h3>
                      <p className="text-xs text-slate-400">
                        Show visitors what you are experimenting with, testing, and building now.
                      </p>
                    </div>

                    <button
                      onClick={handleStartAddLab}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Experiment</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {labItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                              {item.status.toUpperCase()}
                            </span>
                            <h4 className="text-sm font-bold text-white">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-400 max-w-xl line-clamp-1">
                            {item.purpose}
                          </p>
                          <div className="text-[11px] text-amber-300/80">
                            AI: {item.aiInvolvement}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleStartEditLab(item)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteLab(item.id, item.title)}
                            className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Edit / Add Lab Form */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-base font-bold text-white">
                      {editingLabId ? 'Edit Lab Experiment' : 'New Lab Experiment'}
                    </h3>
                    <button
                      onClick={() => setIsEditingLab(false)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Experiment Title *
                    </label>
                    <input
                      type="text"
                      value={labForm.title}
                      onChange={(e) => setLabForm({ ...labForm, title: e.target.value })}
                      placeholder="e.g. Agentic Web Scraper with Self-Healing DOM Selectors"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Why I'm Building It (Purpose) *
                    </label>
                    <textarea
                      rows={2}
                      value={labForm.purpose}
                      onChange={(e) => setLabForm({ ...labForm, purpose: e.target.value })}
                      placeholder="Solving brittle CSS classes when target websites redesign..."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      AI Involvement (The Multiplier) *
                    </label>
                    <textarea
                      rows={2}
                      value={labForm.aiInvolvement}
                      onChange={(e) => setLabForm({ ...labForm, aiInvolvement: e.target.value })}
                      placeholder="Using multimodal LLM embeddings to semantically locate table headers..."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Status
                      </label>
                      <select
                        value={labForm.status}
                        onChange={(e) => setLabForm({ ...labForm, status: e.target.value as LabStatus })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="Building">Building</option>
                        <option value="Testing">Testing</option>
                        <option value="Exploring">Exploring</option>
                        <option value="Shipped">Shipped</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Technologies (comma separated)
                      </label>
                      <input
                        type="text"
                        value={labForm.technologies}
                        onChange={(e) => setLabForm({ ...labForm, technologies: e.target.value })}
                        placeholder="Python, Playwright, FastAPI, Gemini API"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingLab(false)}
                      className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveLab}
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
                    >
                      Save Experiment
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE & BRAND TEXTS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">
                  Adjust Profile, Headline & About Text
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time updates directly reflected on hero, about, and footer sections.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Professional Role
                  </label>
                  <input
                    type="text"
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={profileForm.tagline}
                    onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hero Supporting Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={profileForm.heroSupportingText || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, heroSupportingText: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    About Bio Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={profileForm.about}
                    onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    GitHub Profile Link
                  </label>
                  <input
                    type="url"
                    value={profileForm.github}
                    onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  id="admin-save-profile-btn"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Updates</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: APPEARANCE & THEMES */}
          {activeTab === 'appearance' && (
            <AppearanceThemeTab onSuccess={(msg) => showNotification(msg)} />
          )}

          {/* TAB 5: PASSCODE & SECURITY */}
          {activeTab === 'security' && (
            <PasscodeSecurityTab 
              onSuccess={(msg) => showNotification(msg)} 
              onError={(msg) => showNotification(msg, true)} 
            />
          )}

        </div>

      </motion.div>

      {/* Pre-upload Audit & Live Inspector Modal */}
      {showPrecheckModal && precheckResults && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Pre-Upload Engineering Audit
                </h3>
              </div>
              <button
                onClick={() => setShowPrecheckModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Auditing project specs and 5-part engineering story before publishing live:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>GitHub Repository Protocol</span>
                {precheckResults.validUrl ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Valid HTTPS URL
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" /> Missing http:// or https://
                  </span>
                )}
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>01 & 02: Problem & Approach</span>
                {precheckResults.hasProblemAndApproach ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Documented
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" /> Incomplete
                  </span>
                )}
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>03: Where AI Helped</span>
                {precheckResults.hasAiHelped ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Multiplier Detailed
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" /> Missing AI narrative
                  </span>
                )}
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>05: Concrete Results</span>
                {precheckResults.hasResult ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Result Documented
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" /> Outcome empty
                  </span>
                )}
              </div>
            </div>

            {/* Quick Preview of Card */}
            <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Live Card Preview
              </span>
              <div className="text-sm font-bold text-white">{projectForm.title || 'Untitled Project'}</div>
              <div className="text-xs text-slate-400 mt-1 line-clamp-2">{projectForm.summary || 'No summary text'}</div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setShowPrecheckModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back to editing
              </button>
              <button
                onClick={handleSaveProject}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
              >
                Confirm & Publish Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
