import express from 'express';
const router = express.Router();

import paymentCheck from '../middlewares/mockPaymentCheck.js';

import { signup, login, makeOrder, getCart, removeDishFromCart, updateDishQuantityInCart } from '../controller/userController.js';

// User routes
router.post('/signup', signup);

router.post('/login', login);

router.route('/cart') // /api/user/cart
    .post('/', paymentCheck, makeOrder) // Make order from cart
    .get('/', getCart) // Get cart items
    .delete('/', removeDishFromCart) // Remove dish from cart
    .patch('/', updateDishQuantityInCart) // Update dish quantity in cart

export default router;