import express from 'express';
import { getDishesByName, getDishDetailsByID } from '../controller/dishController.js';

const router = express.Router();

// Route to get dishes with optional search and pagination
router.get('/search', getDishesByName);
router.get('/:id', getDishDetailsByID);


export default router;