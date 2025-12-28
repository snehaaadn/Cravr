import React, { useState } from 'react';
import OrderTracker from './orderTracker.jsx';
import ReviewEntry from './reviewEntry.jsx';
import { getRestaurantDetailsByID, getDishDetailsByID } from '../services/api.js';

function OrderDetailView({ order, onBack }) {
    const [reviewTarget, setReviewTarget] = useState(null);

    const handleSaveReview = (reviewData) => {
        console.log("Saving intelligence:", reviewData);
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
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-full overflow-x-hidden">
            <button onClick={onBack} className="text-amber-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-6 hover:text-white transition-colors">
                ← Back to Orders
            </button>

            <div className="bg-stone-900/20 border border-amber-50 rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 backdrop-blur-md">
                {/* Header Section: Stacked on mobile */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold italic text-amber-50 uppercase tracking-tighter leading-tight">
                            Order Briefing
                        </h1>
                        <p className="font-mono text-stone-500 text-[8px] md:text-[10px] mt-2 tracking-widest break-all">
                            ORDER_ID: {order._id} // {order.createdAt}
                        </p>
                    </div>
                    <div className="w-full md:w-auto text-left md:text-right border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                        <p className="text-3xl md:text-4xl font-black text-amber-500">₹{order.totalAmount}</p>
                    </div>
                </div>

                {/* Tracking Section: Added overflow-x for small screens */}
                <div className="mb-10 md:mb-16 mt-6 md:mt-10 border-y border-white/5 py-4 overflow-x-auto no-scrollbar">
                    <p className="font-mono text-[10px] text-amber-50 uppercase tracking-widest mb-4 sticky left-0">Live Tracking Status</p>
                    <div className="min-w-[500px]">
                        <OrderTracker currentStatus={order.orderStatus} />
                    </div>
                </div>

                {/* Items Section: Cards stack buttons on mobile */}
                <div className="space-y-4">
                    <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">Order Payload</p>
                    {order.items.map((item, idx) => (
                        <div key={idx} className="bg-stone-950/50 border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="relative shrink-0">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-stone-800 overflow-hidden">
                                        {/* Image Logic remains same */}
                                    </div>
                                    <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[9px] md:text-[10px] font-bold w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full border-2 md:border-4 border-stone-900">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-amber-50 font-bold text-lg md:text-xl line-clamp-1">{item.name}</h3>
                                    <p className="text-amber-400 font-mono text-[9px] md:text-[10px] uppercase">Unit Price: ₹{item.price}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => setReviewTarget(item)}
                                    className="flex-1 sm:flex-none px-4 md:px-6 py-2 bg-stone-800 border border-stone-700 text-white rounded-lg text-[9px] md:text-[10px] uppercase font-bold hover:bg-amber-500 hover:text-black transition-all"
                                >
                                    Rate
                                </button>
                                <button className="flex-1 sm:flex-none px-4 md:px-6 py-2 bg-amber-500 text-black rounded-lg text-[9px] md:text-[10px] uppercase font-bold hover:bg-white transition-all">
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