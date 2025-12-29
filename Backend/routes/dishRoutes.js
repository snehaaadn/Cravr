import express from 'express';
import { getDishesByName, getDishDetailsByID } from '../controller/dishController.js';
import { addReview } from '../controller/reviewController.js';
import { authCheck } from '../middleware/authCheck.js';

const router = express.Router();

router.get('/search', getDishesByName);
router.get('/:id', getDishDetailsByID);
router.post('/review', authCheck, addReview);

export default router;