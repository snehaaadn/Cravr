import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

const orderFlow = ['Confirmed', 'Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered'];

const simulateOrderLifecycle = (orderId, userId, totalAmount) => {
    let step = 0;

    const runNextStep = async () => {
        try {
            
            const currentOrder = await Order.findById(orderId);
            
            if (!currentOrder || currentOrder.orderStatus === 'Cancelled') {
                return;
            }

            if (step < orderFlow.length) {
                setTimeout(async () => {
                    const statusUpdate = orderFlow[step];
                    
                    await Order.findByIdAndUpdate(orderId, { orderStatus: statusUpdate });

                    if (statusUpdate === 'Delivered') {
                        const pointsEarned = Math.floor(totalAmount / 100);
                        await User.findByIdAndUpdate(userId, {
                            $inc: { 
                                totalOrders: 1, 
                                totalSpent: totalAmount, 
                                points: pointsEarned 
                            }
                        });
                    }

                    step++;
                    runNextStep(); 
                }, 10 * 1000); // 10 seconds delay
            }
        } catch (err) {
            console.error("Simulation Error:", err.message);
        }
    };

    runNextStep();
};

async function createOrder(req, res) {
    const userId = req.user._id;
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

    try {
        const newOrder = await Order.create({
            userID: userId,
            restaurantID: restaurantId,
            items: cartItems.map(item => ({
                dishID: item.dishId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            subTotal,
            tax,
            deliveryFee,
            totalAmount,
            paymentMethod: paymentMethod === "Cash On Delivery" ? "COD" : paymentMethod,
            orderStatus: 'Pending',
            shippingAddress: {
                houseNo: shippingAddress.houseNo,
                street: shippingAddress.street,
                city: shippingAddress.city,
                pincode: shippingAddress.zipCode,
            },
        });

        // Logic: Clear cart immediately, but wait for 'Delivered' to update stats
        await User.findByIdAndUpdate(userId, { $set: { cart: [] } });
        
        // Pass userId and totalAmount to the simulation
        simulateOrderLifecycle(newOrder._id, userId, totalAmount);

        return res.status(201).json({
            success: true,
            message: 'Order secured. Lifecycle initiated.',
            orderId: newOrder._id
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', details: error.message });
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