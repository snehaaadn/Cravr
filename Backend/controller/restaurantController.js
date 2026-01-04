import { geocodeLocation } from "../utils/geocoder.js";
import Restaurant from "../models/restaurantModel.js";

async function getRestaurantsByLocationName(req, res) {
  try {
    const { locationName, page = 1, limit = 12 } = req.query;

    if (!locationName) {
      return res.status(400).json({
        success: false,
        message: "Location name is required",
      });
    }

    const coords = await geocodeLocation(locationName);
    if (!coords) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    const { latitude, longitude } = coords;
    const skip = (page - 1) * limit;

    const result = await Restaurant.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "distance",
          maxDistance: 10000,
          spherical: true,
        },
      },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: Number(limit) },
            {
              $project: {
                name: 1,
                address: 1,
                rating: 1,
                distance: 1,
              },
            },
          ],
          metadata: [{ $count: "total" }],
        },
      },
    ]);

    res.status(200).json({
      success: true,
      center: coords,
      restaurants: result[0].data,
      totalCount: result[0].metadata[0]?.total || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
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