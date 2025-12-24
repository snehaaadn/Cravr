import express from 'express';
const router = express.Router();
import { getRestaurantsByLocationName, getRestaurantsDetailsbyID } from '../controller/restaurantController.js';

router.get('/', getRestaurantsByLocationName);
router.get('/:id', getRestaurantsDetailsbyID);

export default router;