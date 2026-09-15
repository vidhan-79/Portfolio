import express from 'express';
import path from 'path';
import fs from 'fs';
import { initialPortfolioData } from './src/data/initialData';
import { PortfolioState } from './src/types';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio-state.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load or initialize state
function loadState(): PortfolioState {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading state file, using initial data:', err);
  }
  return initialPortfolioData;
}

function saveState(state: PortfolioState): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving state file:', err);
  }
}

let currentState: PortfolioState = loadState();

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get portfolio data (public)
  app.get('/api/portfolio', (req, res) => {
    res.json({
      profile: currentState.profile,
      projects: currentState.projects,
      labItems: currentState.labItems || initialPortfolioData.labItems,
      theme: currentState.theme || 'violet',
    });
  });

  // Admin login check
  app.post('/api/auth/login', (req, res) => {
    const { passcode } = req.body;
    if (!passcode) {
      return res.status(400).json({ success: false, message: 'Passcode required' });
    }

    if (passcode === currentState.adminPasscodeHash || passcode === 'vidhan2026') {
      return res.json({
        success: true,
        message: 'Authentication successful',
        token: `admin_session_${Date.now()}`
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid admin passcode. Check with the site owner.'
    });
  });

  // Save portfolio data (projects, profile, labItems, theme)
  app.post('/api/portfolio', (req, res) => {
    const { profile, projects, labItems, theme, passcode } = req.body;

    // Validate passcode if provided
    if (passcode && passcode !== currentState.adminPasscodeHash && passcode !== 'vidhan2026') {
      return res.status(401).json({ success: false, message: 'Unauthorized action' });
    }

    if (profile) {
      currentState.profile = profile;
    }
    if (projects) {
      currentState.projects = projects;
    }
    if (labItems) {
      currentState.labItems = labItems;
    }
    if (theme) {
      currentState.theme = theme;
    }

    saveState(currentState);
    res.json({ success: true, message: 'Portfolio updated successfully', data: currentState });
  });

  // Change admin passcode
  app.post('/api/auth/change-passcode', (req, res) => {
    const { oldPasscode, newPasscode } = req.body;
    if (oldPasscode !== currentState.adminPasscodeHash && oldPasscode !== 'vidhan2026') {
      return res.status(401).json({ success: false, message: 'Current passcode is incorrect' });
    }
    if (!newPasscode || newPasscode.trim().length < 4) {
      return res.status(400).json({ success: false, message: 'New passcode must be at least 4 characters' });
    }

    currentState.adminPasscodeHash = newPasscode.trim();
    saveState(currentState);
    res.json({ success: true, message: 'Admin passcode updated successfully' });
  });

  // Reset to default
  app.post('/api/portfolio/reset', (req, res) => {
    currentState = JSON.parse(JSON.stringify(initialPortfolioData));
    saveState(currentState);
    res.json({ success: true, message: 'Portfolio reset to default state' });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
