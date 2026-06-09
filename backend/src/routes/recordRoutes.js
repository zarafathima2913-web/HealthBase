import express from 'express';
import { createRecord, getPatientRecords } from '../controllers/recordController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('doctor'), createRecord);
router.get('/patient/:patientId', protect, getPatientRecords);

export default router;
