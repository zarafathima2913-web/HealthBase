import os from 'os';

// Simulated uptime start for more realistic metrics
const START_TIME = Date.now() - (1000 * 60 * 60 * 12); // 12 hours ago

export const getServerMetrics = async (req, res) => {
  try {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercent = Math.round((usedMemory / totalMemory) * 100);

    const cpus = os.cpus();
    const cpuCores = cpus.length;
    
    // Simulate CPU load between 10% and 40%
    const cpuLoad = Math.floor(Math.random() * 30) + 10;
    
    const uptimeSeconds = Math.floor((Date.now() - START_TIME) / 1000);
    const uptimeHours = (uptimeSeconds / 3600).toFixed(1);

    res.status(200).json({
      totalMemoryGB: (totalMemory / 1e9).toFixed(1),
      usedMemoryGB: (usedMemory / 1e9).toFixed(1),
      memoryUsagePercent,
      cpuCores,
      cpuLoad,
      uptimeHours
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching server metrics', error: error.message });
  }
};
