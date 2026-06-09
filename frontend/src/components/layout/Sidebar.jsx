import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const getNavItems = () => {
    const baseItems = [
      { name: 'Overview', path: `/${user?.role || 'user'}` }
    ];

    if (user?.role === 'admin') {
      baseItems.push({ name: 'System Logs', path: '/admin/logs' });
    } else {
      baseItems.push(
        { name: 'Medical Records', path: `/${user?.role}/records` },
        { name: 'Upload Record', path: `/${user?.role}/upload` }
      );
    }
    
    baseItems.push({ name: 'Settings', path: '/settings' });
    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
      <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
        <span className="text-xl font-bold text-slate-900 dark:text-white">HealthBase</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-slate-100 dark:bg-slate-800 text-primary dark:text-blue-400' 
                  : 'text-secondaryText dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-primary dark:text-blue-300 flex items-center justify-center font-bold text-sm mr-3">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">{user?.role}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-700 shadow-sm text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
