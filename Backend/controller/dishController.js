import Dish from "../models/dishModel";

async function getDishes(req, res) {
    try {
        const { name, category, page = 1, limit = 20 } = req.query;
        let query = {};

        // Logical search: If name is provided, use regex for partial matching
        if (name) {
            query.name = { $regex: name, $options: 'i' }; 
        }

        // If category is provided, filter by category
        if (category) {
            query.category = category;
        }

        // Use skip/limit for O(1) style paging
        const dishes = await Dish.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        res.status(200).json({
            success: true,
            count: dishes.length,
            dishes: dishes
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { getDishes };