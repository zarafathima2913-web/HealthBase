import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['prescription', 'note', 'lab_result', 'vaccination'], 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String },
  attachments: [{ type: String }], // Cloudinary URLs
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const MedicalRecord = mongoose.model('MedicalRecord', recordSchema);
export default MedicalRecord;
