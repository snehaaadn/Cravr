import express from 'express';
const router = express.Router();
import { authCheck } from '../middleware/authCheck.js';

import { createOrder ,getUserOrders } from '../controller/orderController.js';

router.post('/create', authCheck, createOrder);
router.get('/user-orders', authCheck, getUserOrders);

export default router;