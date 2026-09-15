export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export interface LossMakerItem {
  product: string;
  loss: string;
  category?: string;
}

export interface ProjectDetails {
  overview: string;
  problemStatement?: string;
  businessQuestions: string[];
  keyFindings: string[];
  problemAreas?: string[];
  lossMakingProducts?: LossMakerItem[];
  recommendations: string[];
  techStack: string[];
  architecture?: string[];
}

export type ProjectCategory = 
  | 'Data & Analytics' 
  | 'Python Automation' 
  | 'Web Applications' 
  | 'AI-Assisted Tools';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  summary: string;
  featured: boolean;
  problem: string;
  approach: string;
  whereAiHelped: string;
  engineering: string;
  result: string;
  githubUrl: string;
  liveUrl?: string;
  metrics: ProjectMetric[];
  tags: string[];
  details: ProjectDetails;
  createdAt: string;
  updatedAt: string;
}

export type LabStatus = 'Exploring' | 'Building' | 'Testing' | 'Shipped';

export interface LabItem {
  id: string;
  title: string;
  purpose: string;
  technologies: string[];
  aiInvolvement: string;
  status: LabStatus;
  notes?: string;
  updatedAt: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: string[];
  highlight: string;
}

export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  heroSupportingText: string;
  about: string;
  education: string;
  location: string;
  email: string;
  github: string;
  availableForHire: boolean;
  statusMessage: string;
  bioNote: string;
  coreSkills: string[];
  skillCategories: SkillCategory[];
  stats: {
    revenueAnalyzed: string;
    questionsAnswered: string;
    automationReliability: string;
    accuracyRate: string;
  };
}

export type ThemeId = 'violet' | 'cyan' | 'amber' | 'emerald' | 'crimson';

export interface PortfolioState {
  profile: ProfileData;
  projects: Project[];
  labItems: LabItem[];
  adminPasscodeHash: string;
  theme?: ThemeId;
}
