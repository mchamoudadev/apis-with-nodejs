
import express from 'express'
import { protect } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import { uploadFile } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/profile-picture', protect, upload.single('file'), uploadFile)

// export the router
export default router;