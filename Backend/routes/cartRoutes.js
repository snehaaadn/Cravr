import express from 'express';
const router = express.Router();

import { authCheck } from '../middleware/authCheck.js';

import { addDishToCart, getCart, removeDishFromCart, updateDishQuantityInCart } from '../controller/cartController.js';

router.post('/', authCheck, addDishToCart) 
router.get('/',authCheck, getCart) 
router.delete('/',authCheck, removeDishFromCart) 
router.patch('/',authCheck, updateDishQuantityInCart) 

export default router;