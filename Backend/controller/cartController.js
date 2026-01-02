import User from '../models/userModel.js';

async function addDishToCart(req, res) {
    const userID = req.user._id;
    const { dishID, name, price, quantity } = req.body;

    if (!dishID || !name || !price || !quantity) {
        return res.status(400).json({ message: "All dish details are required" });
    }

    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if dish already in cart
    const existingDishIndex = user.cart.findIndex(item => item.dishID.toString() === dishID);
    if (existingDishIndex >= 0) {
        // already in cart
        return res.status(400).json({ status: false, message: "Dish already in cart" });
    } else {
        // Add new dish to cart
        user.cart.push({ dishID, name, price, quantity });
    }

    await user.save();

    res.status(200).json({success: true, message: "Dish added to cart", cart: user.cart });
}

async function getCart(req, res) {
    const userID = req.user._id;
    const user = await User.findById(userID).populate({
        path: 'cart.dishID',
        populate: {
            path: 'restaurantID', 
            model: 'Restaurant',  
            select: 'name address'        
        }
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json({ cart: user.cart });
}

async function removeDishFromCart(req, res) {
    const userID = req.user._id;
    const { dishID } = req.body;

    if (!dishID) return res.status(400).json({ message: "Dish is required" });

    const result = await User.updateOne(
        { _id: userID },
        { $pull: { cart: { dishID: dishID } } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Dish removed successfully" });
}

async function updateDishQuantityInCart(req, res) {
    const userID = req.user._id;
    const { dishID, quantity } = req.body;

    if (!dishID || quantity === undefined) {
        return res.status(400).json({ message: "Dish ID and quantity are required" });
    }

    if (quantity > 0) {
        await User.updateOne(
            { _id: userID },
            { $set: { "cart.$[elem].quantity": quantity } },
            { arrayFilters: [{ "elem.dishID": dishID }] }
        );
    } else {
        await User.updateOne(
            { _id: userID },
            { $pull: { cart: { dishID: dishID } } }
        );
    }

    res.status(200).json({ message: "Cart updated" });
}

export { addDishToCart, getCart, removeDishFromCart, updateDishQuantityInCart };