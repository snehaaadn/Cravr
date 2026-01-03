import React, { useState, useContext } from "react";
import { CartContext } from '../../context/cartContext.jsx';
import { AuthContext } from "../../context/authContext.jsx";

const DishCard = ({ dish }) => {
    const { user } = useContext(AuthContext);
    const { addToCart, cartItems } = useContext(CartContext);
    const [addingId, setAddingId] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' }); 

    const showNotification = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 3000);
    };

    const getCartItemRestaurant = (cartItem) => {
        const product = cartItem.dishID || {};
        
        if (product.restaurantID?.name) return product.restaurantID.name;
        if (product.restaurant?.name) return product.restaurant.name;
        
        if (typeof product.restaurant === 'string') return product.restaurant;
        
        return null; 
    };

    const handleAddToCart = async (item) => {
        
        if (!user) {
            showNotification("Please login to add to cart", "error");
            return;
        }

        // Check for restaurant consistency
        if (cartItems && cartItems.length > 0) {
            const existingRestaurant = getCartItemRestaurant(cartItems[0]);
            const newRestaurant = item.restaurant; 

            if (existingRestaurant && newRestaurant && existingRestaurant !== newRestaurant) {
                showNotification(`Cart contains items from "${existingRestaurant}". Clear cart to add items from "${newRestaurant}".`, 'error');
                return; 
            }
        }

        const validId = item.id || item._id;
        
        setAddingId(validId);
        const result = await addToCart(item);
        setAddingId(null);
        
        if (result.success) {
            showNotification(`${item.name} added to cart!`, 'success');
        } else {
            showNotification(result.message || "Failed to add item", 'error');
        }
    };

    const validId = dish.id || dish._id;

    return (
        <>
            
            <div className={`fixed bottom-10 right-5 z-9999 transition-all duration-500 ease-in-out transform ${toast.show ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}>
                <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border border-white/10 min-w-[300px]
                    ${toast.type === 'success' ? 'bg-green-900/90 text-green-50' : 'bg-red-900/90 text-red-50'}
                `}>
                    <div className={`p-2 rounded-full ${toast.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
                        {toast.type === 'success' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider">{toast.type === 'success' ? 'Success' : 'Error'}</h4>
                        <p className="text-xs opacity-90 font-mono mt-0.5">{toast.message}</p>
                    </div>
                </div>
            </div>

           
            <div className="group relative bg-stone-800/50 rounded-3xl overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.2)] flex flex-col h-full">

                {/* Image */}
                <div className="h-56 overflow-hidden relative">
                    <img
                        src={dish.image || dish.imageUrl} 
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-20 group-hover:grayscale-0"
                    />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg border ${dish.category === 'Non-Veg' ? 'bg-red-900/80 text-white border-red-500' : 'bg-green-900/80 text-white border-green-500'}`}>
                            {dish.category || 'Veg'}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur text-amber-500 px-4 py-1.5 rounded-lg font-bold text-lg border border-amber-500/30 shadow-xl">
                        ₹{dish.price}
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-white text-xs font-mono font-bold">{(dish.rating || 4) * 2}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 relative">
                    <div className="flex flex-col items-start mb-2">
                        {dish.restaurant && (
                            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                {dish.restaurant}
                            </span>
                        )}
                        <h3 className="text-xl font-bold text-amber-50 group-hover:text-amber-400 transition-colors font-merriweather leading-tight">
                            {dish.name}
                        </h3>
                    </div>

                    <p className="text-stone-400 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        {dish.description}
                    </p>

                    {/* Button */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <button
                            onClick={() => handleAddToCart(dish)}
                            disabled={addingId === validId}
                            className="w-full py-3 rounded-xl bg-amber-600 text-stone-900 hover:bg-stone-200 font-bold tracking-wider uppercase text-xs transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                            {addingId === validId ? (
                                <span className="animate-pulse">Adding...</span>
                            ) : (
                                <>
                                    <span>Add to Cart</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DishCard;