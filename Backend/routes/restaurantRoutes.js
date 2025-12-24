import express from 'express';
const router = express.Router();
import { getRestaurantsByLocationName, getRestaurantsDetailsbyID, getRestaurantsByName } from '../controller/restaurantController.js';

router.get('/', getRestaurantsByLocationName);
router.get('/:id', getRestaurantsDetailsbyID);
router.get('/name/:name', getRestaurantsByName);

export default router;