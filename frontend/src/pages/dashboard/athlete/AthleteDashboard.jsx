import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const AthleteDashboard = () => {
  const { user } = useAuth();
  const [telemetry, setTelemetry] = useState(null);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    // Mock initial data fetch
    setTelemetry({
      currentRecovery: 84,
      restingHR: 48,
      sleepScore: 92,
      history: [60, 65, 80, 110, 140, 155, 130, 90, 70, 62] // Mock HR trend
    });
  }, []);

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      setTelemetry(prev => ({
        ...prev,
        currentRecovery: Math.floor(Math.random() * 20) + 70, // 70-90
        restingHR: Math.floor(Math.random() * 10) + 45, // 45-55
        history: [...prev.history.slice(1), Math.floor(Math.random() * 60) + 80] // Shift and add new HR
      }));
      setSimulating(false);
    }, 1000);
  };

  if (!telemetry) return <div className="p-6">Loading telemetry...</div>;

  // Simple SVG Line Chart generator
  const maxHR = 180;
  const points = telemetry.history.map((val, i) => {
    const x = (i / (telemetry.history.length - 1)) * 100;
    const y = 100 - (val / maxHR) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Performance Analytics</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Real-time telemetry and recovery tracking for {user?.name}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={handleSimulate}
            disabled={simulating}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${simulating ? 'bg-slate-400 dark:bg-slate-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {simulating ? 'Syncing Wearable...' : 'Sync Wearable Data'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Recovery Score</h3>
          <div className="relative w-32 h-32 mt-4">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path className="text-slate-200 dark:text-slate-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-green-500 dark:text-green-400" strokeDasharray={`${telemetry.currentRecovery}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{telemetry.currentRecovery}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Resting HR</h3>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-4">{telemetry.restingHR} <span className="text-lg font-normal text-slate-400 dark:text-slate-500">bpm</span></p>
          <div className="mt-4 text-sm text-green-600 dark:text-green-400 font-medium">↓ 2 bpm from last week</div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Sleep Score</h3>
          <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-4">{telemetry.sleepScore} <span className="text-lg font-normal text-slate-400 dark:text-slate-500">/ 100</span></p>
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">7h 42m total sleep</div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Heart Rate Trend (Last Session)</h3>
        <div className="h-48 w-full relative">
          {/* Simulated Line Chart using SVG */}
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
            {/* Gradient Fill under line */}
            <polygon 
              fill="url(#gradient)" 
              points={`0,100 ${points} 100,100`}
            />
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AthleteDashboard;
