import express from 'express';
const router = express.Router();
import { authCheck } from '../middleware/authCheck.js';

import { signup, login, getUserProfile } from '../controller/userController.js';
import { registerValidationRules, validate } from '../middleware/validator.js';

// User routes
router.post('/signup', registerValidationRules(), validate, signup);

router.post('/login', login);

router.get('/profile', authCheck, getUserProfile);



export default router;