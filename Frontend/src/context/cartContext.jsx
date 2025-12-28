import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './authContext.jsx';
import {
    getCart,
    addDishToCart,
    removeDishFromCart,
    updateDishQuantityInCart,
    createOrder
} from '../services/api.js';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);

    // Fetch Cart from Backend
    const fetchCart = async () => {
        if (!user) {
            setCartItems([]);
            return;
        }
        try {
            setLoading(true);
            const response = await getCart();

            setCartItems(response.data.cart || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate Totals whenever cart changes
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            return acc + (item.dishID?.price * item.quantity);
        }, 0);
        setCartTotal(total);
    }, [cartItems]);

    // Fetch cart when user logs in
    useEffect(() => {
        fetchCart();
    }, [user]);

    // Add Item to Cart
    const addToCart = async (dish) => {
        if (!user) {
            return { success: false, message: "Please login to add items to cart" };
        }
        try {
            await addDishToCart(
                dish.id || dish._id,
                dish.name,
                dish.price,
                1
            );
            await fetchCart(); // Refresh cart data
            return { success: true };
        } catch (error) {
            console.error("Add to cart error:", error);
            return { success: false, message: error.response?.data?.message };
        }
    };

    // Remove Item
    const removeFromCart = async (dishID) => {
        try {
            await removeDishFromCart(dishID);
            setCartItems(prev => prev.filter(item =>
                (item.dishID?._id || item.dishID) !== dishID
            ));
        } catch (error) {
            console.error("Remove error:", error);
            fetchCart();
        }
    };

    // Update Quantity
    const updateQuantity = async (dishID, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(dishID);
            return;
        }
        try {
            setCartItems(prev => prev.map(item => {
                const currentId = item.dishID?._id || item.dishID;
                if (currentId === dishID) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }));

            await updateDishQuantityInCart(dishID, newQuantity);
        } catch (error) {
            console.error("Update quantity error:", error);
            fetchCart();
        }
    };

    const placeOrder = async (orderMetadata) => {
        const orderData = {
            restaurantId: cartItems[0]?.dishID?.restaurantID || cartItems[0]?.dishID?.restaurant,
            cartItems: cartItems.map(item => ({
                dishId: item.dishID?._id || item.dishID,
                name: item.dishID?.name || "Dish",
                price: item.dishID?.price || 0,
                quantity: item.quantity
            })),
            ...orderMetadata 
        };

        try {
            const response = await createOrder(orderData); //
            if (response.data.success) {
                setCartItems([]); // Clear local context state
                return { success: true, orderId: response.data.orderId };
            }
        } catch (error) {
            console.error("Place order error:", error);
            return { success: false, message: error.response?.data?.message };
        }
    };
    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            fetchCart,
            placeOrder
        }}>
            {children}
        </CartContext.Provider>
    );
};