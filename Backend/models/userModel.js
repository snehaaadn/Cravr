import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    label: {type: String, required: true},
    contact: {type: String, required: true},
    houseNo: {type: Number, required: false},
    street: {type: String, required: true},
    locality: {type: String, required: false},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: String, required: true},
})

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: false, unique: true},
    phone: {type: Number, required:true, unique:true},
    password: {type: String, required: true},
    address:{
        type: [addressSchema],
        default : []
    },
    points: {type: Number, required: false, default: 0},
    totalOrders: {type: Number, required: false, default: 0},
    totalSpent: {type: Number, required: false, default: 0},
    cart: [
        {
            dishID: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dish',
                required: true,
                index: true 
            },
            quantity: { type: Number, required: true, default: 1 },
            default: [] 
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;