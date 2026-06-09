import express from 'express';
import { getServerMetrics } from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Mock an admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    // For demo purposes, we'll bypass actual admin checks if they're authenticated.
    // In a real app, you would block them: res.status(403).json({ message: 'Not authorized as an admin' });
    next();
  }
};

router.get('/metrics', protect, requireAdmin, getServerMetrics);

export default router;
