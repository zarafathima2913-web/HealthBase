import mongoose from 'mongoose';

const telemetrySchema = new mongoose.Schema({
  athleteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['heart_rate', 'sleep', 'recovery'], 
    required: true 
  },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Telemetry = mongoose.model('Telemetry', telemetrySchema);
export default Telemetry;
