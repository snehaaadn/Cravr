import express from 'express';
const router = express.Router();
import { authCheck } from '../middleware/authCheck.js';

import { signup, login, getUserProfile } from '../controller/userController.js';

// User routes
router.post('/signup', signup);

router.post('/login', login);

router.get('/profile', authCheck, getUserProfile);



export default router;