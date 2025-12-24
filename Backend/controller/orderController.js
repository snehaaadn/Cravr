import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

const orderFlow = ['Confirmed', 'Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered'];

// Helper to update status and log to console
const simulateOrderLifecycle = (orderId) => {
    let step = 0;

    const runNextStep = () => {
        if (step < orderFlow.length) {
            setTimeout(async () => {
                try {
                    await Order.findByIdAndUpdate(orderId, { orderStatus: orderFlow[step] });
                    console.log(`Order ${orderId} status: ${orderFlow[step]}`);
                    
                    step++;
                    runNextStep(); // Recursive call for the next minute
                } catch (err) {
                    console.error("Simulation Error:", err.message);
                }
            }, 60 * 1000); // 1 minute delay
        }
    };

    runNextStep();
};

async function createOrder(req, res) {
    const userId = req.user._id; // Extracted from auth middleware
    const {
        restaurantId,
        cartItems,
        subTotal,
        tax,
        deliveryFee,
        totalAmount,
        paymentMethod,
        shippingAddress,
    } = req.body;

    if (!cartItems?.length || !subTotal || !totalAmount || !paymentMethod || !shippingAddress) {
        return res.status(400).json({ success: false, message: "Missing required order details." });
    }

    // Create new order
    try {
        const newOrder = await Order.create({
            userID: userId,
            restaurantID: restaurantId,
            items: cartItems.map(item => ({
                dish: item.dishId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            subTotal,
            tax,
            deliveryFee,
            totalAmount,
            paymentMethod,
            orderStatus: 'Pending',
            shippingAddress,
        });
        // Update user's total orders and total spent, and clear cart
        await User.findByIdAndUpdate(userId, {
            $inc: { totalOrders: 1, totalSpent: totalAmount },
            $set: { cart: [] } // Clear cart after order is placed
        });

        simulateOrderLifecycle(newOrder._id);

        res.status(201).json({
            success: true,
            message: 'Order placed successfully!',
            orderId: newOrder._id
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', details: error.message });
    }
}

async function getUserOrders(req, res) {
    const userId = req.user._id;

    try {
        const orders = await Order.find({ userID: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', details: error.message });
    }
}



export { createOrder, getUserOrders };