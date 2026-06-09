import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/forgot-password', { emailOrPhone });
      setSuccessMsg(`OTP Generated! (Mock SMS/Email): ${res.mockOtp}`);
      // In a real app, we wouldn't show the mockOtp on screen, it would go to their phone.
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to request OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/verify-otp', { emailOrPhone, otp });
      setResetToken(res.resetToken);
      setSuccessMsg('');
      setStep(3);
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/reset-password', { emailOrPhone, resetToken, newPassword });
      setSuccessMsg('Password updated successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0B0F19] overflow-hidden selection:bg-blue-500/30">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xIDE5aDE4VjFIMXoiIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md z-10 px-6"
      >
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800/50 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              {step === 1 && 'Reset Password'}
              {step === 2 && 'Verify OTP'}
              {step === 3 && 'New Password'}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {step === 1 && 'Enter your email or phone number to receive a secure OTP.'}
              {step === 2 && 'Enter the 6-digit code sent to your device.'}
              {step === 3 && 'Enter your new secure password.'}
            </p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 bg-red-900/20 border border-red-800/30 rounded-xl text-sm text-red-400 text-center">
              {error}
            </motion.div>
          )}

          {successMsg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-green-900/20 border border-green-800/30 rounded-xl text-sm text-green-400 text-center font-mono">
              {successMsg}
            </motion.div>
          )}

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleRequestOTP} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email or Phone</label>
                    <input
                      type="text"
                      required
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="admin@healthbase.com"
                      className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-3 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 transition-all transform hover:-translate-y-0.5">
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.form key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleVerifyOTP} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">6-Digit OTP</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="••••••"
                      className="w-full px-4 py-3 text-center tracking-[1em] font-mono text-xl bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                  <button type="submit" disabled={loading || otp.length !== 6} className="w-full py-3 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 transition-all transform hover:-translate-y-0.5">
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </motion.form>
              )}

              {step === 3 && (
                <motion.form key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleResetPassword} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-3 px-4 rounded-xl shadow-lg text-sm font-bold text-slate-900 bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 transition-all transform hover:-translate-y-0.5">
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
            <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
