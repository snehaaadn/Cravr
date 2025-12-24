import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Added index for faster queries
    },
    restaurantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
        index: true
    },
    items: [ // Array of ordered items Snapshot
        {
            dishID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dish',
                required: true,
                index: true // Added index for faster queries
            },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 },
            rating: { type: Number, required: false },
            review: { type: String, required: false },
        }
    ],
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: false, default: 0 },
    deliveryFee: { type: Number, required: true, default: 0 },
    totalAmount: { type: Number, required: false },

    paymentMethod: { type: String, enum: ['COD', 'UPI', 'CARD'], required: true },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered', 'Cancelled'],
        required: true, default: "Pending"
    },
    shippingAddress: {
        houseNo: { type: Number, required: false },
        street: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
        // Coordinates are essential for maps/tracking
        location: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;