import express from 'express';
import multer from 'multer';
import { handleChat } from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.single('attachment'), handleChat);

export default router;
