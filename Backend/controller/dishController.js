import Dish from "../models/dishModel.js";

async function getDishesByName(req, res) {
    try {
        const { name, category, page = 1, limit = 20 } = req.query;
        let query = {};

        // If name is provided, use regex for partial matching
        if (name) {
            query.name = { $regex: name, $options: 'i' }; 
        }

        // If category is provided, filter by category
        if (category) {
            query.category = category;
        }

        const totalCount = await Dish.countDocuments(query);

        const dishes = await Dish.find(query)
            .populate('restaurantID', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        res.status(200).json({
            success: true,
            count: totalCount,
            dishes: dishes
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getDishDetailsByID(req, res) {
    try {
        const { id } = req.params;
        const dish = await Dish.findById(id).populate('restaurantID', 'name');

        if (!dish) {
            return res.status(404).json({ success: false, message: "Dish not found" });
        }

        return res.status(200).json({ success: true, dish });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


export { getDishesByName, getDishDetailsByID};