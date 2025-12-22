import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    category: { type: String, required: false },
    rating : { type: Number, required: false },
    ratingCount : { type: Number, required: false },
    imageUrl: { type: String, required: false },
    reviews : [
        {
            userID: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            comment: { type: String, required: false },
            rating: { type: Number, required: false },
            default: [] // Added default empty array for reviews
        }
    ],
    restaurantID : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
        index: true // Added index for faster queries
    }
})

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;