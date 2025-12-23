import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import Order from '../models/orderModel.js';
import { setUser } from "../services/auth.js";

// User Signup
async function signup(req, res) {
    const { username, email, phone, password } = req.body;

    // Validate required fields
    if (!phone || !username || !password) {
        return res.status(400).json({ message: "Username, phone and password are required" });
    }

    // Check if user with phone already exists
    const existingUser = await User.findOne({ phone: phone });
    if (existingUser) {
        return res.status(400).json({
            message: "User with given phone number already exists. Please login instead."
        });
    }

    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    await User.create({ username, email, phone, password: hashPass });

    return res.status(201).json({ message: "User created successfully" });
}

// User Login
async function login(req, res) {
    const { phone, password } = req.body;

    // Validate required fields
    if (!phone || !password) {
        return res.status(400).json({ message: "Phone number and password are required" });
    }

    // Check if user with phone exists
    const user = await User.findOne({ phone });
    // If user does not exist, redirect to signup
    if (!user) {
        return res.redirect('/signup');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = setUser(user);
    res.setHeader('Authorization', `Bearer ${token}`);

    // If user exists, return success response
    return res.status(200).json({ message: "Login successful", userID: user._id });

}

async function makeOrder(req, res) { // To make order from cart
    const {
        userId,
        restaurantId,
        cartItems,
        subTotal,
        tax,
        deliveryFee,
        totalAmount,
        paymentMethod,
        orderStatus,
        shippingAddress,
    } = req.body;

    // Basic Input Validation
    if (!userId || !cartItems || cartItems.length === 0 || !subTotal || !totalAmount || !paymentMethod || !shippingAddress || !orderStatus) {
        return res.status(400).json({ success: false, message: "Missing required order details." });
    }

    try {
        // LOGIC: Process the Order

        // Payment (Mock/Integration)
        // In a real app, if paymentMethod is 'Card', you would call a payment gateway (Stripe, Razorpay).

        // if (paymentMethod === 'Card' || paymentMethod === 'UPI' || paymentMethod === 'COD') {
        // const paymentResult = await processPayment(totalAmount);
        // if (paymentResult.status !== 'succeeded') {
        //     return res.status(400).json({ success: false, message: "Payment failed." });
        // }

        // FOR mock, we assume payment is always successful

        // }

        // Create the Order Document
        const newOrder = await Order.create({
            userID: userId,
            restaurantID: restaurantId,
            items: cartItems.map(item => ({
                dish: item.dishId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            subTotal: subTotal,
            tax: tax,
            deliveryFee: deliveryFee,
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
            orderStatus: 'Processing', // Initial status
            shippingAddress: shippingAddress,

        });

        // Clean up the Cart
        // Find the user's cart and clear it or delete it.
        await Cart.deleteOne({ user: userId });

        // RESPONSE
        res.status(201).json({
            success: true,
            message: 'Order placed successfully!',
            orderId: newOrder._id,
            status: newOrder.status
        });

    } catch (error) {
        console.error('Order creation failed:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while processing order.',
            details: error.message
        });
    }
};

async function getCart(req, res) { // Get user cart
    const { userID } = req.params;
    const user = await User.findById(userID).populate('cart.dishID');
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ cart: user.cart });
}

async function removeDishFromCart(req, res) { // Remove dish from cart
    const { userID } = req.params;
    const { dishID } = req.body;

    // Validate required fields
    if (!dishID) {
        return res.status(400).json({ message: "Dish is required" });
    }

    const user = await User.findById(userID);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Remove dish from cart
    await User.updateOne(
        { _id: user._id },
        { $pull: { cart: { dishID: dishID } } }
    );

    return res.status(200).json({ message: "Dish removed from cart successfully" });
}


async function updateDishQuantityInCart(req, res) { // Update dish quantity in cart
    const { userID } = req.params;
    const { dishID, quantity } = req.body;

    // Validate required fields
    if (!dishID || !quantity) {
        return res.status(400).json({ message: "Dish ID and quantity are required" });
    }

    const user = await User.findById(userID);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update dish quantity in cart
    if (quantity > 0) {
        // Update the number
        await User.updateOne(
            { _id: user._id },
            { $set: { "cart.$[elem].quantity": quantity } },
            { arrayFilters: [{ "elem.dishID": dishID }] }
        );
    } else {
        // If quantity is 0 or less, remove the item entirely
        await User.updateOne(
            { _id: user._id },
            { $pull: { cart: { dishID: dishID } } }
        );
    }

    return res.status(200).json({ message: "Dish quantity updated successfully" });
}


export { signup, login, makeOrder, getCart, removeDishFromCart, updateDishQuantityInCart };