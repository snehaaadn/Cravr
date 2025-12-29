import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    locality: { type: String } 
}, { _id: false });

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: addressSchema, required: true },
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }]
});

// Index the location field for distance-based search
restaurantSchema.index({ "address.location": "2dsphere" });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;