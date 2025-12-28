import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { setUser } from "../services/auth.js";


// User Signup
async function signup(req, res) {
    const data = req.body;
    const { username, phone, email, password } = data;

    // Validate required fields
    if (!phone || !username || !password) {
        return res.status(400).json({ success: false, message: "Username, phone and password are required" });
    }


    // Check if user with phone already exists
    const existingUser = await User.findOne({ phone: phone });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User with given phone number already exists. Please login instead."
        });
    }

    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    await User.create({ username, email, phone, password: hashPass });

    return res.status(201).json({ success: true, message: "User created successfully" });
}

// User Login
async function login(req, res) {
    const { phone, password } = req.body;

    // Validate required fields
    if (!phone || !password) {
        return res.status(400).json({ success: false, message: "Phone number and password are required" });
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
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = setUser(user);
    res.setHeader('Authorization', `Bearer ${token}`);

    // If user exists, return success response
    return res.status(200).json({ success: true, message: "Login successful", user: user, token: token });

}

// Profile
async function getUserProfile(req, res) {
    const userID = req.user._id;
    const user = await User.findById(userID);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user: user });
}

// Address Add
async function addAddressToUser(req, res) {
    const userID = req.user._id;
    const addressData = req.body;

    if (!addressData || Object.keys(addressData).length === 0) {
        return res.status(400).json({ success: false, message: "Address details are required" });
    }

    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.address.push(addressData);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            user: user
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

export { signup, login, getUserProfile, addAddressToUser };