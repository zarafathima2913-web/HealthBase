import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user',
    age: '', gender: 'Male', bloodGroup: 'O+', nationality: '', phone: '',
    emergencyContact: '', verificationId: '', allergies: '', existingConditions: '',
    medications: '', reports: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const u = await register(formData);
      navigate(`/${u.role}`);
    } catch (err) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19] overflow-hidden selection:bg-blue-500/30 py-12 px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xIDE5aDE4VjFIMXoiIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xIDE5aDE4VjFIMXoiIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl z-10"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"></div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              Create Account & Profile
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Complete your profile in one single step.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-3 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border border-red-200 dark:border-red-800/30 rounded-xl text-sm text-red-600 dark:text-red-400 text-center">
                {error}
              </motion.div>
            )}

            {/* Account Info Section */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Account Type</label>
                  <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none">
                    <option value="user">User / Patient</option>
                    <option value="doctor">Medical Professional</option>
                    <option value="athlete">Competitive Athlete</option>
                    <option value="admin">System Administrator</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Password</label>
                  <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-sm text-slate-500 hover:text-slate-300">
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>

            {/* General Info Section */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Age</label>
                  <input type="number" name="age" required value={formData.age} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Blood Group</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none">
                    <option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Nationality</label>
                  <select name="nationality" required value={formData.nationality} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none">
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
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Emergency Contact</label>
                  <input type="tel" name="emergencyContact" required value={formData.emergencyContact} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
              </div>
            </div>

            {/* Verification Section */}
            {formData.role !== 'admin' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {formData.role === 'doctor' ? 'Medical License Number (Verification)' : 'Aadhar Number (Identity Verification)'}
                </label>
                <input type="text" name="verificationId" required value={formData.verificationId} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
              </div>
            )}

            {/* Medical Info Section */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Medical History & Records</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Allergies</label>
                  <textarea name="allergies" rows="2" value={formData.allergies} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="E.g. Peanuts, Penicillin"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Existing Conditions</label>
                  <textarea name="existingConditions" rows="2" value={formData.existingConditions} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="E.g. Asthma, Diabetes"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Medications (Tablets/Pills)</label>
                  <textarea name="medications" rows="2" value={formData.medications} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="E.g. Metformin 500mg daily"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Upload Initial Reports (Links/Text)</label>
                  <textarea name="reports" rows="2" value={formData.reports} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="Paste links to reports or describe them"></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {loading ? 'Creating Profile...' : 'Complete Registration →'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-slate-900 dark:text-white hover:underline transition-all">
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
