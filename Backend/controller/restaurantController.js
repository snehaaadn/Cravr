import nodeGeocoder from 'node-geocoder';
import Restaurant from '../models/restaurantModel.js';

const geocoder = nodeGeocoder({ provider: 'openstreetmap' });

async function getRestaurantsByLocationName(req, res) {
    try {
        const { locationName } = req.query; // e.g., "Kengeri, Bengaluru"
        const radiusInMeters = parseFloat(req.query.radius) || 5000;

        if (!locationName) {
            return res.status(400).json({ success: false, message: "Location name is required" });
        }

        // STEP 1: Convert name to coordinates
        const geoResults = await geocoder.geocode(locationName);
        if (!geoResults.length) {
            return res.status(404).json({ success: false, message: "Location not found" });
        }

        const { latitude, longitude } = geoResults[0];

        // STEP 2: Use those coordinates for a proximity search
        const restaurants = await Restaurant.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [longitude, latitude] }, // [Long, Lat]
                    distanceField: "distance",
                    maxDistance: radiusInMeters,
                    spherical: true
                }
            },
            { $limit: 30 },
            {
                $project: {
                    name: 1,
                    address: 1,
                    distance: 1,
                    rating: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            center: { latitude, longitude },
            restaurants: restaurants
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getRestaurantsDetailsbyID(req, res) {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id).populate('menu');

        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        res.status(200).json({ success: true, restaurant });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { getRestaurantsByLocationName, getRestaurantsDetailsbyID };