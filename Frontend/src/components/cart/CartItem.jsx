import React from 'react';
import logo from '../../assets/logo.png';

const CartItemsList = ({ cartItems, updateQuantity, removeFromCart }) => {
    
    const getItemName = (item) => item.dishID?.name || "Unknown Dish";
    const getItemPrice = (item) => item.dishID?.price || 0;
    const getItemImage = (item) => item.dishID?.imageUrl || logo;
    const getItemId = (item) => item.dishID?._id || item.dishID;
    
    const getItemRestaurant = (item) => {
        if (!item.dishID) return "Loading...";
        if (item.dishID.restaurantID && item.dishID.restaurantID.name) return item.dishID.restaurantID.name;
        if (item.dishID.restaurant && item.dishID.restaurant.name) return item.dishID.restaurant.name;
        return "Cravr Partner";
    };

    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 font-bold text-xs">2</span>
                <h2 className="text-xl font-bold text-stone-200">Order Summary</h2>
            </div>
            <div className="bg-stone-900/30 border border-white/5 rounded-xl overflow-hidden divide-y divide-white/5">
                {cartItems.map((item) => (
                    <div key={getItemId(item)} className="p-4 md:p-6 flex gap-4 md:gap-6 group hover:bg-stone-900/80 transition-colors">
                        <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden rounded-lg bg-stone-800">
                            <img src={getItemImage(item)} alt="Dish" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg text-white leading-tight">{getItemName(item)}</h3>
                                    <span className="text-amber-500 font-bold whitespace-nowrap shrink-0">₹{(getItemPrice(item) * item.quantity).toFixed(2)}</span>
                                </div>
                                <p className="text-xs font-mono text-stone-500 uppercase tracking-wide mt-1">{getItemRestaurant(item)}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center bg-stone-950 border border-stone-700 rounded overflow-hidden">
                                    <button onClick={() => updateQuantity(getItemId(item), item.quantity - 1)} className="w-8 h-7 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors">-</button>
                                    <span className="w-8 h-7 flex items-center justify-center font-mono text-sm font-bold text-white border-x border-stone-800">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(getItemId(item), item.quantity + 1)} className="w-8 h-7 flex items-center justify-center text-amber-500 hover:bg-stone-800 transition-colors">+</button>
                                </div>
                                <button onClick={() => removeFromCart(getItemId(item))} className="text-xs text-red-500/70 hover:text-red-500 underline decoration-dotted">Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CartItemsList;