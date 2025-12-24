import express from 'express';
import { getDishes } from '../controller/dishController.js';

const router = express.Router();

// Route to get dishes with optional search and pagination
router.get('/search', getDishes);

export default router;