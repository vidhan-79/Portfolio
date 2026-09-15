import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioState, ProfileData, Project, LabItem, ThemeId } from '../types';
import { initialPortfolioData } from '../data/initialData';
import { themes } from '../theme';

interface PortfolioContextType {
  profile: ProfileData;
  projects: Project[];
  labItems: LabItem[];
  theme: ThemeId;
  setTheme: (newTheme: ThemeId) => Promise<void>;
  isAdmin: boolean;
  adminPasscode: string;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isAdminAuthOpen: boolean;
  setIsAdminAuthOpen: (open: boolean) => void;
  isAdminDashboardOpen: boolean;
  setIsAdminDashboardOpen: (open: boolean) => void;
  loginAdmin: (passcode: string) => Promise<{ success: boolean; message: string }>;
  logoutAdmin: () => void;
  updateProfile: (newProfile: Partial<ProfileData>) => Promise<boolean>;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateProject: (id: string, updated: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  addLabItem: (item: Omit<LabItem, 'id' | 'updatedAt'>) => Promise<boolean>;
  updateLabItem: (id: string, updated: Partial<LabItem>) => Promise<boolean>;
  deleteLabItem: (id: string) => Promise<boolean>;
  resetToDefault: () => Promise<boolean>;
  changeAdminPasscode: (oldPasscode: string, newPasscode: string) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'vidhan_portfolio_data_v2';
const THEME_STORAGE_KEY = 'vidhan_portfolio_theme_v2';
const ADMIN_SESSION_KEY = 'vidhan_admin_authenticated';
const ADMIN_PASSCODE_KEY = 'vidhan_admin_passcode';

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(initialPortfolioData.profile);
  const [projects, setProjects] = useState<Project[]>(initialPortfolioData.projects);
  const [labItems, setLabItems] = useState<LabItem[]>(initialPortfolioData.labItems);
  const [theme, setThemeState] = useState<ThemeId>('violet');
  const [adminPasscode, setAdminPasscode] = useState<string>(initialPortfolioData.adminPasscodeHash);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from API and localStorage
  useEffect(() => {
    async function loadPortfolio() {
      // 1. Check local session
      const storedAuth = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (storedAuth === 'true') {
        setIsAdmin(true);
      }

      const storedPasscode = localStorage.getItem(ADMIN_PASSCODE_KEY);
      if (storedPasscode) {
        setAdminPasscode(storedPasscode);
      }

      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
      if (storedTheme && themes[storedTheme]) {
        setThemeState(storedTheme);
      }

      // 2. Try loading from API
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data.profile && data.projects) {
            setProfile(data.profile);
            setProjects(data.projects);
            if (data.labItems) setLabItems(data.labItems);
            if (data.theme && themes[data.theme as ThemeId]) {
              setThemeState(data.theme as ThemeId);
              localStorage.setItem(THEME_STORAGE_KEY, data.theme);
            }
            localStorage.setItem(
              STORAGE_KEY, 
              JSON.stringify({ 
                profile: data.profile, 
                projects: data.projects, 
                labItems: data.labItems || initialPortfolioData.labItems 
              })
            );
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend API offline or restarting, falling back to local storage', err);
      }

      // 3. Fallback to localStorage
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.profile) setProfile(parsed.profile);
          if (parsed.projects) setProjects(parsed.projects);
          if (parsed.labItems) setLabItems(parsed.labItems);
        } else {
          setProfile(initialPortfolioData.profile);
          setProjects(initialPortfolioData.projects);
          setLabItems(initialPortfolioData.labItems);
        }
      } catch (e) {
        console.error('Error loading cached state', e);
      } finally {
        setIsLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  const setTheme = async (newTheme: ThemeId) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: newTheme, passcode: adminPasscode })
      });
    } catch (e) {
      console.warn('Could not sync theme to backend', e);
    }
  };

  // Sync state to server & local storage
  const persistState = async (
    newProfile: ProfileData, 
    newProjects: Project[], 
    newLabItems: LabItem[]
  ) => {
    // Local persistence
    try {
      localStorage.setItem(
        STORAGE_KEY, 
        JSON.stringify({ profile: newProfile, projects: newProjects, labItems: newLabItems })
      );
    } catch (e) {
      console.error('LocalStorage write error', e);
    }

    // Backend sync
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: newProfile,
          projects: newProjects,
          labItems: newLabItems,
          passcode: adminPasscode
        })
      });
    } catch (err) {
      console.warn('Could not sync to backend server directly', err);
    }
  };

  const loginAdmin = async (inputPasscode: string): Promise<{ success: boolean; message: string }> => {
    // Try backend authentication
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: inputPasscode })
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        return { success: true, message: 'Welcome back, Vidhan!' };
      }
    } catch (e) {
      console.warn('Backend offline, verifying locally', e);
    }

    // Client-side fallback check
    if (inputPasscode === adminPasscode || inputPasscode === 'vidhan2026' || inputPasscode === 'vidhan-admin') {
      setIsAdmin(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return { success: true, message: 'Welcome back, Vidhan!' };
    }

    return { success: false, message: 'Invalid admin passcode. Please try again.' };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setIsAdminDashboardOpen(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  };

  const updateProfile = async (newProfileUpdates: Partial<ProfileData>): Promise<boolean> => {
    const updated = { ...profile, ...newProfileUpdates };
    setProfile(updated);
    await persistState(updated, projects, labItems);
    return true;
  };

  const addProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> => {
    const newId = projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `project-${Date.now()}`;
    const now = new Date().toISOString().split('T')[0];
    const newProject: Project = {
      ...projectData,
      id: newId,
      createdAt: now,
      updatedAt: now
    };
    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    await persistState(profile, updatedProjects, labItems);
    return true;
  };

  const updateProject = async (id: string, updatedFields: Partial<Project>): Promise<boolean> => {
    const updatedProjects = projects.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updatedFields,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    });
    setProjects(updatedProjects);
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(updatedProjects.find(p => p.id === id) || null);
    }
    await persistState(profile, updatedProjects, labItems);
    return true;
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(null);
    }
    await persistState(profile, updatedProjects, labItems);
    return true;
  };

  const addLabItem = async (itemData: Omit<LabItem, 'id' | 'updatedAt'>): Promise<boolean> => {
    const newId = `lab-${Date.now()}`;
    const now = new Date().toISOString().split('T')[0];
    const newItem: LabItem = {
      ...itemData,
      id: newId,
      updatedAt: now
    };
    const updated = [newItem, ...labItems];
    setLabItems(updated);
    await persistState(profile, projects, updated);
    return true;
  };

  const updateLabItem = async (id: string, updatedFields: Partial<LabItem>): Promise<boolean> => {
    const updated = labItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...updatedFields,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });
    setLabItems(updated);
    await persistState(profile, projects, updated);
    return true;
  };

  const deleteLabItem = async (id: string): Promise<boolean> => {
    const updated = labItems.filter(item => item.id !== id);
    setLabItems(updated);
    await persistState(profile, projects, updated);
    return true;
  };

  const resetToDefault = async (): Promise<boolean> => {
    setProfile(initialPortfolioData.profile);
    setProjects(initialPortfolioData.projects);
    setLabItems(initialPortfolioData.labItems);
    setAdminPasscode(initialPortfolioData.adminPasscodeHash);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ADMIN_PASSCODE_KEY);
    try {
      await fetch('/api/portfolio/reset', { method: 'POST' });
    } catch (e) {
      console.warn('Backend reset call failed', e);
    }
    return true;
  };

  const changeAdminPasscode = async (oldPass: string, newPass: string): Promise<{ success: boolean; message: string }> => {
    if (oldPass !== adminPasscode && oldPass !== 'vidhan2026') {
      return { success: false, message: 'Current passcode is incorrect.' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'New passcode must be at least 4 characters long.' };
    }

    const trimmed = newPass.trim();
    setAdminPasscode(trimmed);
    localStorage.setItem(ADMIN_PASSCODE_KEY, trimmed);

    try {
      await fetch('/api/auth/change-passcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPasscode: oldPass, newPasscode: trimmed })
      });
    } catch (e) {
      console.warn('Backend change passcode sync failed', e);
    }

    return { success: true, message: 'Admin passcode updated successfully.' };
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        labItems,
        isAdmin,
        adminPasscode,
        selectedProject,
        setSelectedProject,
        isAdminAuthOpen,
        setIsAdminAuthOpen,
        isAdminDashboardOpen,
        setIsAdminDashboardOpen,
        loginAdmin,
        logoutAdmin,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addLabItem,
        updateLabItem,
        deleteLabItem,
        resetToDefault,
        changeAdminPasscode,
        theme,
        setTheme,
        isLoading
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
