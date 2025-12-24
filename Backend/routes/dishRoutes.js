import express from 'express';
const router = express.Router();
import { getDishes } from '../controller/dishController';

// Route to get dishes with optional search and pagination
router.get('/search', getDishes);

export default router;