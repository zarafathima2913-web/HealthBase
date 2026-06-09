import Telemetry from '../models/Telemetry.js';

// @desc    Simulate and save new telemetry data (Mock IoT endpoint)
// @route   POST /api/telemetry/simulate
// @access  Private/Athlete
export const simulateTelemetry = async (req, res) => {
  try {
    const athleteId = req.user._id;

    // Generate random mock data
    const hrData = {
      patientId: athleteId,
      type: 'heart_rate',
      value: Math.floor(Math.random() * (160 - 50 + 1) + 50), // Random HR between 50-160
      timestamp: new Date()
    };

    const recoveryData = {
      patientId: athleteId,
      type: 'recovery',
      value: Math.floor(Math.random() * (100 - 60 + 1) + 60), // Random recovery 60-100%
      timestamp: new Date()
    };

    // In a real app we'd save this to DB, but for MVP we just return it
    // await Telemetry.insertMany([hrData, recoveryData]);

    res.status(201).json({
      message: 'Telemetry simulated successfully',
      data: [hrData, recoveryData]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get athlete telemetry data
// @route   GET /api/telemetry/:athleteId
// @access  Private
export const getTelemetry = async (req, res) => {
  try {
    // Generate an array of historical mock data for charts
    const historicalHR = Array.from({ length: 10 }).map((_, i) => ({
      time: `${i}:00`,
      value: Math.floor(Math.random() * (120 - 60 + 1) + 60)
    }));

    res.json({
      heartRateHistory: historicalHR,
      currentRecovery: 87,
      sleepScore: 92
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
