import express from 'express';
import { simulateTelemetry, getTelemetry } from '../controllers/telemetryController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/simulate', protect, authorizeRoles('athlete'), simulateTelemetry);
router.get('/:athleteId', protect, getTelemetry);

export default router;
