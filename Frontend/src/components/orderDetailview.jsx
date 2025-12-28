import React, { useState, useEffect } from 'react';
import OrderTracker from './orderTracker.jsx';
import ReviewEntry from './reviewEntry.jsx';
import { getRestaurantDetailsByID, getDishDetailsByID } from '../services/api.js';

function OrderDetailView({ order, onBack }) {
    const [reviewTarget, setReviewTarget] = useState(null);
    const [restaurantName, setRestaurantName] = useState("Loading...");
    const [itemImages, setItemImages] = useState({});

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await getRestaurantDetailsByID(order.restaurantID);
                if (res?.data?.success) {
                    setRestaurantName(res.data.restaurant.name);
                }

                const imageMap = {};
                await Promise.all(order.items.map(async (item) => {
                    try {
                        const dishRes = await getDishDetailsByID(item.dishID);
                        // Logic: Explicitly use null instead of "" for src safety
                        if (dishRes?.data?.success) {
                            imageMap[item.dishID] = dishRes.data.dish.imageUrl || null; 
                        }
                    } catch (err) {
                        imageMap[item.dishID] = null; 
                    }
                }));
                setItemImages(imageMap);
            } catch (error) {
                console.error("Dossier retrieval failure:", error);
                setRestaurantName("Unknown Restaurant");
            }
        };

        fetchDetails();
    }, [order]);

    if (reviewTarget) {
        return <ReviewEntry
            item={reviewTarget}
            onSave={(data) => { console.log(data); setReviewTarget(null); }}
            onCancel={() => setReviewTarget(null)}
        />;
    }

    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-full overflow-x-hidden">
            <button onClick={onBack} className="text-amber-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-6 hover:text-white transition-colors">
                ← Back to Orders
            </button>

            <div className="bg-stone-900/20 border border-amber-50 rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 backdrop-blur-md">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold italic text-amber-50 uppercase tracking-tighter leading-tight">
                            {restaurantName}
                        </h1>
                        <p className="font-mono text-stone-500 text-[8px] md:text-[10px] mt-2 tracking-[0.2em] break-all uppercase">
                            ID: {order._id} // {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <p className="text-3xl md:text-4xl font-black text-amber-500">₹{order.totalAmount}</p>
                </div>

                {/* Tracking: Responsive Horizontal Scroll */}
                <div className="mb-10 md:mb-16 mt-6 md:mt-10 border-y border-white/5 py-4 overflow-x-auto no-scrollbar">
                    <div className="min-w-[600px]">
                        <OrderTracker currentStatus={order.orderStatus} />
                    </div>
                </div>

                {/* Items Payload */}
                <div className="space-y-4">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="bg-stone-950/50 border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group transition-all hover:border-amber-500/30">
                            <div className="flex items-center gap-4 md:gap-6 w-full">
                                <div className="relative shrink-0">
                                    {/* Fix: Conditional rendering to avoid empty src error */}
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-stone-800 overflow-hidden flex items-center justify-center">
                                        {itemImages[item.dishID] ? (
                                            <img 
                                                src={itemImages[item.dishID]} 
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                                alt={item.name}
                                            />
                                        ) : (
                                            /* Aesthetic Placeholder for missing images */
                                            <span className="font-serif italic text-stone-600 text-[8px] uppercase tracking-tighter">No_Img</span>
                                        )}
                                    </div>
                                    <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-stone-950">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-amber-50 font-bold text-lg md:text-xl truncate">{item.name}</h3>
                                    <p className="text-amber-400 font-mono text-[9px] uppercase tracking-tighter">Unit: ₹{item.price}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => setReviewTarget(item)}
                                    className="flex-1 sm:flex-none px-5 py-2 bg-stone-800 border border-stone-700 text-white rounded-lg text-[9px] uppercase font-bold hover:bg-amber-500 hover:text-black transition-all"
                                >
                                    Rate
                                </button>
                                <button className="flex-1 sm:flex-none px-5 py-2 bg-amber-500 text-black rounded-lg text-[9px] uppercase font-bold hover:bg-white transition-all">
                                    Reorder
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderDetailView;