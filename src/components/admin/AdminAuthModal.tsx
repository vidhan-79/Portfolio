import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Lock, 
  Key, 
  X, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { themes } from '../../theme';

export function AdminAuthModal() {
  const { isAdminAuthOpen, setIsAdminAuthOpen, loginAdmin, setIsAdminDashboardOpen, theme } = usePortfolio();
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const activeTheme = themes[theme] || themes.violet;

  if (!isAdminAuthOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Please enter the admin passcode.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const res = await loginAdmin(passcode.trim());
    setLoading(false);

    if (res.success) {
      setIsAdminAuthOpen(false);
      setIsAdminDashboardOpen(true);
      setPasscode('');
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleQuickFill = () => {
    setPasscode('vidhan2026');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="fixed inset-0 -z-10" 
        onClick={() => setIsAdminAuthOpen(false)} 
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.93, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 12 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Top subtle theme glow line */}
        <div 
          className="absolute top-0 left-0 right-0 h-1" 
          style={{ backgroundColor: activeTheme.primary }} 
        />
        
        {/* Close */}
        <button
          onClick={() => setIsAdminAuthOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg border"
          style={{ 
            backgroundColor: `${activeTheme.primary}18`, 
            borderColor: `${activeTheme.primary}55`, 
            color: activeTheme.primary 
          }}
        >
          <Lock className="w-6 h-6" />
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Admin Authentication
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Access the management portal to upload projects, manage passcode, and customize color themes.
          </p>
        </div>

        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Admin Passcode
            </label>
            <div className="relative">
              <input
                type={showPasscode ? 'text' : 'password'}
                autoFocus
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between gap-2 flex-wrap">
              <span>Default: <code className="text-cyan-400 font-mono">vidhan2026</code></span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-0.5"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Fill Default</span>
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            id="admin-login-submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span>Verifying credentials...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock Admin Portal</span>
              </>
            )}
          </motion.button>
        </form>

      </motion.div>
    </div>
  );
}
