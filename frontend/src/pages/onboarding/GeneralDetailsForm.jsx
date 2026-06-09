import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';

const GeneralDetailsForm = () => {
  const { user, token, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    age: '', gender: 'Male', bloodGroup: 'O+', nationality: '', phone: '',
    emergencyContact: '', allergies: '', existingConditions: '',
    isAthlete: false, sport: '', verificationId: ''
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const updatedUser = await api.put('/users/onboard', formData, token);
      updateUser(updatedUser);
      navigate(`/${updatedUser.role}`);
    } catch (err) {
      setError(err.message || 'Failed to save details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19] overflow-hidden selection:bg-blue-500/30 py-12 px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xIDE5aDE4VjFIMXoiIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xIDE5aDE4VjFIMXoiIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-3xl z-10"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              Welcome to HealthBase
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Please complete your medical profile to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-3 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border border-red-200 dark:border-red-800/30 rounded-xl text-sm text-red-600 dark:text-red-400 text-center">
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Age</label>
                <input type="number" name="age" required value={formData.age} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 appearance-none">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Blood Group</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 appearance-none">
                  <option>O+</option><option>O-</option><option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Nationality</label>
                <select name="nationality" required value={formData.nationality} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 appearance-none">
                  <option value="" disabled>Select Country</option>
                  <option value="Indian">India</option>
                  <option value="American">United States</option>
                  <option value="British">United Kingdom</option>
                  <option value="Canadian">Canada</option>
                  <option value="Australian">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Emergency Contact</label>
                <input type="tel" name="emergencyContact" required value={formData.emergencyContact} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
              </div>
              <div className="md:col-span-2">
                {user?.role === 'doctor' ? (
                  <>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Medical License Number (Verification)</label>
                    <input type="text" name="verificationId" required value={formData.verificationId} onChange={handleChange} placeholder="e.g. MED-12345" className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
                  </>
                ) : user?.role === 'admin' ? null : (
                  <>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Aadhar Number (Identity Verification)</label>
                    <input type="text" name="verificationId" required value={formData.verificationId} onChange={handleChange} placeholder="XXXX-XXXX-XXXX" className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Allergies</label>
              <textarea name="allergies" rows="2" value={formData.allergies} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" placeholder="None" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Existing Medical Conditions</label>
              <textarea name="existingConditions" rows="2" value={formData.existingConditions} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" placeholder="None" />
            </div>

            {(user?.role === 'user' || user?.role === 'athlete') && (
              <div className="flex items-center">
                <input type="checkbox" name="isAthlete" id="isAthlete" checked={formData.isAthlete} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                <label htmlFor="isAthlete" className="ml-2 block text-sm font-medium text-slate-700 dark:text-slate-300">I am a competitive athlete</label>
              </div>
            )}

            {formData.isAthlete && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Primary Sport</label>
                <input type="text" name="sport" value={formData.sport} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" placeholder="e.g. Swimming, Marathon Running" />
              </div>
            )}

            <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {loading ? 'Saving Profile...' : 'Complete Setup →'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default GeneralDetailsForm;
