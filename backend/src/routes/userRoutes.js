import express from 'express';
import { getPatients, getUserById, onboardUser } from '../controllers/userController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/onboard', protect, onboardUser);

router.get('/patients', protect, authorizeRoles('doctor', 'admin'), getPatients);
router.get('/:id', protect, getUserById);

export default router;
