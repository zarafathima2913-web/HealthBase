import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await api.get('/admin/metrics', token);
        setMetrics(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch server metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, [token]);

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-slate-500 dark:text-slate-400">Loading server metrics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Administrator</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Welcome back, {user?.name}. Monitor real-time server health and user activity.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            System Online
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
            Manage Users
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg border border-red-100 dark:border-red-800/50">
          {error}
        </div>
      )}

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">CPU Load</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-4">{metrics.cpuLoad}%</p>
            <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">{metrics.cpuCores} Cores Active</div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Memory Usage</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-4">{metrics.memoryUsagePercent}%</p>
            <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${metrics.memoryUsagePercent}%` }}></div>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-right">{metrics.usedMemoryGB}GB / {metrics.totalMemoryGB}GB</div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Server Uptime</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-4">{metrics.uptimeHours}</p>
            <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">Hours without interruption</div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Active Sessions</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-4">24</p>
            <div className="mt-4 text-sm text-green-600 dark:text-green-400 font-medium">↑ 12% from yesterday</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent System Logs</h3>
            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { time: '10:42 AM', type: 'INFO', msg: 'Database backup completed successfully' },
              { time: '09:15 AM', type: 'WARN', msg: 'High latency detected on API /records' },
              { time: '08:30 AM', type: 'INFO', msg: 'Server restarted for maintenance patch' },
              { time: '07:22 AM', type: 'ERROR', msg: 'Failed login attempt from IP 192.168.1.104' },
            ].map((log, i) => (
              <div key={i} className="flex items-start text-sm">
                <span className="text-slate-400 dark:text-slate-500 w-20 flex-shrink-0">{log.time}</span>
                <span className={`w-16 font-medium ${
                  log.type === 'INFO' ? 'text-blue-600 dark:text-blue-400' : 
                  log.type === 'WARN' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                }`}>{log.type}</span>
                <span className="text-slate-700 dark:text-slate-300 ml-2 truncate">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all text-sm font-medium text-slate-700 dark:text-slate-200 group">
              <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Restart Node API</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all text-sm font-medium text-slate-700 dark:text-slate-200 group">
              <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Clear Redis Cache</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all text-sm font-medium text-slate-700 dark:text-slate-200 group">
              <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Generate Health Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
