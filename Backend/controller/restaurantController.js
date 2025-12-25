import nodeGeocoder from 'node-geocoder';
import Restaurant from '../models/restaurantModel.js';

const geocoder = nodeGeocoder({ provider: 'openstreetmap' });
async function getRestaurantsByLocationName(req, res) {
    try {
        const { locationName, page = 1, limit = 12 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        if (!locationName) {
            return res.status(400).json({ success: false, message: "Location name is required" });
        }

        // Convert name to coordinates
        const geoResults = await geocoder.geocode(locationName);
        if (!geoResults.length) {
            return res.status(404).json({ success: false, message: "Location not found" });
        }

        const { latitude, longitude } = geoResults[0];

        // Use Aggregation with Facets for optimized data + count fetching
        const result = await Restaurant.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [longitude, latitude] },
                    distanceField: "distance",
                    maxDistance: 10000, // 10km radius
                    spherical: true
                }
            },
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: parseInt(limit) },
                        {
                            $project: {
                                name: 1,
                                address: 1,
                                distance: 1,
                                rating: 1
                            }
                        }
                    ],
                    metadata: [{ $count: "total" }]
                }
            }
        ]);

        const restaurants = result[0].data;
        const totalCount = result[0].metadata[0]?.total || 0;

        res.status(200).json({
            success: true,
            center: { latitude, longitude },
            restaurants: restaurants,
            totalCount: totalCount
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

async function getRestaurantsByName (req, res) {
    try {
        const { name } = req.params;
        const restaurants = await Restaurant.find({ name: new RegExp(name, 'i') });

        if (!restaurants.length) {
            return res.status(404).json({ success: false, message: "No restaurants found with that name" });
        }

        res.status(200).json({ success: true, restaurants });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }           
}

export { getRestaurantsByLocationName, getRestaurantsDetailsbyID, getRestaurantsByName };