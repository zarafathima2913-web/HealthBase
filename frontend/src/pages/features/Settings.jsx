import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your preferences, security, and data privacy.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Security Preferences</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Ensure your medical data stays strictly confidential.</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-white">Two-Factor Authentication</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Require an SMS code or Authenticator app to log in.</p>
            </div>
            <button 
              onClick={() => setTwoFactor(!twoFactor)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${twoFactor ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${twoFactor ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white">Change Password</h4>
            <div className="mt-4 space-y-4 max-w-sm">
              <input type="password" placeholder="Current Password" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              <input type="password" placeholder="New Password" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">Update Password</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Notifications</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-white">Email Alerts</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Receive emails when new records are added or updated.</p>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${notifications ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notifications ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">Danger Zone</h3>
        <p className="text-sm text-red-600 dark:text-red-300 mt-1 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="px-4 py-2 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 font-medium rounded-lg text-sm transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
