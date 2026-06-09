import MedicalRecord from '../models/MedicalRecord.js';

// @desc    Create new medical record
// @route   POST /api/records
// @access  Private/Doctor
export const createRecord = async (req, res) => {
  try {
    const { patientId, type, title, description, attachments } = req.body;

    const record = await MedicalRecord.create({
      patientId,
      doctorId: req.user._id,
      type,
      title,
      description,
      attachments
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all records for a specific patient
// @route   GET /api/records/patient/:patientId
// @access  Private
export const getPatientRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patientId: req.params.patientId })
      .populate('doctorId', 'name')
      .sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
