import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    location: {type: String, required: false},
    city: {type: String, required: true},
    state: {type: String, required: true}
})

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: {type: addressSchema, required: true},
    menu: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
        }
    ]
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;

