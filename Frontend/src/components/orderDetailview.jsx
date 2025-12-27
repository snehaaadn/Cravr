import React, {useState} from 'react';
import OrderTracker from './orderTracker.jsx';
import ReviewEntry from './reviewEntry.jsx';
import { getRestaurantDetailsByID, getDishDetailsByID } from '../services/api.js';


function OrderDetailView({ order, onBack }) {
    const [reviewTarget, setReviewTarget] = useState(null);

    const handleSaveReview = (reviewData) => {
        console.log("Saving intelligence:", reviewData);
        // Add your API call here
        setReviewTarget(null);
    };

    if (reviewTarget) {
        return <ReviewEntry
            item={reviewTarget}
            onSave={handleSaveReview}
            onCancel={() => setReviewTarget(null)}
        />;
    }
    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <button onClick={onBack} className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-6 hover:text-white transition-colors">
                ← Back to Orders
            </button>

            <div className="bg-stone-900/20 border border-amber-50 rounded-[2.5rem] p-10 backdrop-blur-md">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-5xl font-serif font-bold italic text-amber-50 uppercase tracking-tighter">{getRestaurantDetailsByID(order.restaurantID).then(res => res.data.restaurant.name).catch(() => "Unknown Restaurant")}</h1>
                        <p className="font-mono text-stone-500 text-[10px] mt-2 tracking-[0.3em]">ORDER_ID: {order._id} // {order.createdAt}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-4xl font-black text-amber-500">₹{order.totalAmount}</p>
                    </div>
                </div>

                {/* Tracking Line Section */}
                <div className="mb-16 mt-10 border-y border-white/5 py-4">
                    <p className="font-mono text-[10px] text-amber-50 uppercase tracking-widest mb-4">Live Tracking Status</p>
                    <OrderTracker currentStatus={order.orderStatus} />
                </div>

                {/* Items Briefing */}
                <div className="space-y-4">
                    <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">Order Payload</p>
                    {order.items.map((item, idx) => (
                        <div key={idx} className="bg-stone-950/50 border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <img src={getDishDetailsByID(item.dishID).then(res => res.data.dish.imgURL).catch(() => "")} alt={item.name} className="w-16 h-16 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-4 border-stone-900">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-abmer-50 font-bold text-xl">{item.name}</h3>
                                    <p className="text-amber-400 font-mono text-[10px] uppercase">Unit Price: ₹{item.price}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setReviewTarget(item)}
                                    className="px-6 py-2 bg-stone-800 border border-stone-700 text-white rounded-lg text-[10px] uppercase font-bold hover:bg-amber-500 hover:text-black transition-all"
                                >
                                    Rate
                                </button>
                                <button className="px-6 py-2 bg-amber-500 text-black rounded-lg text-[10px] uppercase font-bold hover:bg-white transition-all shadow-lg">
                                    Add to Cart
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