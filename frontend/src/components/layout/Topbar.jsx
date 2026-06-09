import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Topbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex-shrink-0 z-10 transition-colors duration-300">
      <div className="flex justify-between items-center px-4 sm:px-6 h-full">
        <div className="flex items-center flex-1">
          <button 
            onClick={onMenuClick}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 lg:hidden mr-4 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Search Bar */}
          <div className="hidden sm:flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 w-96 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-colors">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search patients, records..." 
              className="bg-transparent border-none focus:outline-none text-sm text-slate-900 dark:text-slate-100 w-full placeholder-slate-400 dark:placeholder-slate-500 ml-2"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="text-slate-400 hover:text-blue-500 dark:text-slate-300 transition-colors"
            title="Toggle Theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg py-2 border border-slate-200 dark:border-slate-700 z-50 animate-fade-in-down">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
                  <span className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer">Mark all read</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-100 dark:border-slate-700 transition-colors">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Welcome to HealthBase!</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Your profile was created successfully.</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 text-right">Just now</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Location Services Setup</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Please allow location access to find nearby hospitals.</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 text-right">2 mins ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
