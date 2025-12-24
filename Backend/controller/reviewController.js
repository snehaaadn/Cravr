import Dish from "../models/dishModel.js";

async function addReview(req, res) {
    const {dishID, rating, comment } = req.body;
    const userID = req.user._id;

    // Validate required fields
    if (!userID || !dishID || rating == null) {
        return res.status(400).json({ success: false, message: "User ID, Dish ID and rating are required" });
    }

    // Check if dish exists
    const dish = await Dish.findById(dishID);
    if (!dish) {
        return res.status(404).json({ success: false, message: "Dish not found" });
    }

    // Add review to dish
    dish.reviews.push({ userID, rating, comment });
    
    // Update dish rating and rating count
    const totalRating = dish.reviews.reduce((acc, review) => acc + review.rating, 0);
    dish.ratingCount = dish.reviews.length;
    if (dish.ratingCount > 0) {
        dish.rating = totalRating / dish.ratingCount;
    } else {
        dish.rating = 0;
    }

    await dish.save();

    return res.status(200).json({ success: true, message: "Review added successfully", dish: dish });
}


export { addReview };