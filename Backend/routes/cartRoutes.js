import express from 'express';
const router = express.Router();

import { authCheck } from '../middleware/authCheck.js';

import { addDishToCart, getCart, removeDishFromCart, updateDishQuantityInCart } from '../controller/cartController.js';

router.post('/', authCheck, addDishToCart) // Add dish to cart
router.get('/',authCheck, getCart) // Get cart items
router.delete('/',authCheck, removeDishFromCart) // Remove dish from cart
router.patch('/',authCheck, updateDishQuantityInCart) // Update dish quantity in cart

export default router;