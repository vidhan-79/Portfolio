import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Key, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  CheckCheck,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface PasscodeSecurityTabProps {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export function PasscodeSecurityTab({ onSuccess, onError }: PasscodeSecurityTabProps) {
  const { 
    adminPasscode, 
    changeAdminPasscode, 
    resetToDefault 
  } = usePortfolio();

  const [oldPasscode, setOldPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Compute password strength
  const computeStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-700', text: 'text-slate-400' };
    let score = 0;
    if (pass.length >= 4) score += 25;
    if (pass.length >= 8) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;

    if (score <= 25) return { score, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400' };
    if (score <= 50) return { score, label: 'Moderate', color: 'bg-amber-500', text: 'text-amber-400' };
    if (score <= 75) return { score, label: 'Good', color: 'bg-cyan-500', text: 'text-cyan-400' };
    return { score: 100, label: 'Very Strong', color: 'bg-emerald-500', text: 'text-emerald-400' };
  };

  const strength = computeStrength(newPasscode);
  const isMatch = newPasscode.length > 0 && confirmPasscode.length > 0 && newPasscode === confirmPasscode;
  const hasMismatch = confirmPasscode.length > 0 && newPasscode !== confirmPasscode;

  // Generate a friendly, memorable, highly secure passcode
  const handleGenerateSecurePasscode = () => {
    const words = ['vidhan', 'cyber', 'neural', 'quantum', 'matrix', 'stream', 'hyper', 'pulse'];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomNum = Math.floor(100 + Math.random() * 900);
    const symbols = ['!', '@', '#', '$', '%', '&'];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const generated = `${randomWord}-${randomNum}${randomSymbol}`;

    setNewPasscode(generated);
    setConfirmPasscode(generated);
    setShowNew(true);
    setShowConfirm(true);

    navigator.clipboard?.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    onSuccess(`Generated secure passcode: ${generated} (copied to clipboard)`);
  };

  const handleChangePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPasscode.trim()) {
      onError('Please enter your current admin passcode.');
      return;
    }

    if (newPasscode.trim().length < 4) {
      onError('New passcode must be at least 4 characters long.');
      return;
    }

    if (newPasscode !== confirmPasscode) {
      onError('New passcode and confirmation passcode do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await changeAdminPasscode(oldPasscode.trim(), newPasscode.trim());

      if (res.success) {
        onSuccess('Master passcode successfully updated! You can now use this to log in.');
        setOldPasscode('');
        setNewPasscode('');
        setConfirmPasscode('');

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.5 }
          });
        } catch (e) {}
      } else {
        onError(res.message);
      }
    } catch (err) {
      onError('An error occurred while updating passcode.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all data and passcodes to default? Any custom added projects will be reset to initial seed.')) {
      setResetting(true);
      await resetToDefault();
      setResetting(false);
      onSuccess('Portfolio and passcode reset to initial default state (vidhan2026).');
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/10">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Admin Passcode & Security</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                ACTIVE
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Change the secret passphrase used to access this Admin Control Center.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerateSecurePasscode}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 hover:border-cyan-500/40 transition-all shrink-0"
          title="Generate a secure random passcode"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Generate Secure Passcode</span>
        </button>
      </div>

      {/* Main Passcode Form */}
      <form onSubmit={handleChangePasscodeSubmit} className="space-y-5 p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">Update Passcode</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Default passcode: <code className="text-cyan-400 font-mono">vidhan2026</code></span>
          </div>
        </div>

        {/* Current Passcode */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Current Passcode *
          </label>
          <div className="relative">
            <input
              type={showOld ? 'text' : 'password'}
              required
              placeholder="Enter current passcode (e.g. vidhan2026)"
              value={oldPasscode}
              onChange={(e) => setOldPasscode(e.target.value)}
              className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              title={showOld ? "Hide passcode" : "Show passcode"}
            >
              {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Passcode */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">
              New Passcode *
            </label>
            {newPasscode && (
              <span className={`text-[11px] font-semibold ${strength.text}`}>
                Strength: {strength.label}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              required
              placeholder="Enter new master passcode (at least 4 characters)"
              value={newPasscode}
              onChange={(e) => setNewPasscode(e.target.value)}
              className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              title={showNew ? "Hide passcode" : "Show passcode"}
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Strength Bar */}
          {newPasscode && (
            <div className="mt-2 space-y-1">
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${strength.score}%` }}
                  transition={{ duration: 0.3 }}
                  className={`h-full ${strength.color}`}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Must be at least 4 characters</span>
                <span>Letters, numbers & symbols recommended</span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Passcode */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Confirm New Passcode *
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              required
              placeholder="Re-enter your new passcode"
              value={confirmPasscode}
              onChange={(e) => setConfirmPasscode(e.target.value)}
              className={`w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border ${
                hasMismatch 
                  ? 'border-rose-500/70 focus:border-rose-400' 
                  : isMatch 
                  ? 'border-emerald-500/70 focus:border-emerald-400' 
                  : 'border-slate-800 focus:border-cyan-500'
              } text-white placeholder-slate-500 focus:outline-none font-mono transition-colors`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              title={showConfirm ? "Hide passcode" : "Show passcode"}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Real-time Match Feedback */}
          {confirmPasscode && (
            <div className="mt-1.5">
              {isMatch ? (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Passcodes match! Ready to save.</span>
                </div>
              ) : hasMismatch ? (
                <div className="text-[11px] text-rose-400 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Passcodes do not match yet.</span>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Saved securely in browser local storage & server state</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || hasMismatch || !newPasscode || !oldPasscode}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Key className="w-4 h-4" />
            <span>{isSubmitting ? 'Updating Passcode...' : 'Save New Passcode'}</span>
          </motion.button>
        </div>
      </form>

      {/* Seed Data Reset */}
      <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">
              Reset Portfolio to Seed State
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Restore the original verified data and reset the passcode to default (<code className="text-cyan-400 font-mono">vidhan2026</code>).
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleReset}
            disabled={resetting}
            className="px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-xs font-semibold text-rose-300 flex items-center gap-1.5 transition-colors shrink-0 disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
            <span>{resetting ? 'Resetting...' : 'Reset to Seed'}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
