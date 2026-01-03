import React, { useState, useEffect, useContext } from 'react';

import OrderTracker from './orderTracker.jsx';
import ReviewEntry from './reviewEntry.jsx';
import { getRestaurantDetailsByID, getDishDetailsByID, addReview, getUserOrders } from '../services/api.js';
import { AuthContext } from '../context/authContext.jsx';
import OrderItemCard from './card/orderItemCard.jsx';

function OrderDetailView({ order, onBack }) {
    const { user } = useContext(AuthContext);
    const [reviewTarget, setReviewTarget] = useState(null);
    const [restaurantName, setRestaurantName] = useState("Loading...");
    const [itemImages, setItemImages] = useState({});

    const [userReviews, setUserReviews] = useState({});
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [reviewError, setReviewError] = useState('');
    const [currentOrder, setCurrentOrder] = useState(order);


    useEffect(() => {
        if (['Delivered', 'Cancelled'].includes(currentOrder.orderStatus)) return;

        const intervalId = setInterval(async () => {
            try {
                const res = await getUserOrders(); 
                
                if (res?.data?.success) {
                    const updatedData = res.data.orders.find(o => o._id === order._id);
                   const oldStatus = currentOrder.orderStatus;
                    const newStatus = updatedData.orderStatus;

                    if (newStatus !== oldStatus) {
                        setCurrentOrder(updatedData);

                        if (newStatus === 'Delivered') {
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000); 
                        }
                    }
                }
            } catch (err) {
                console.error("Polling error:", err);
            }
        }, 4000); 

        return () => clearInterval(intervalId); 
    }, [currentOrder.orderStatus, order._id]);

    
    //  FETCH RESTAURANT & DISH DETAILS 
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await getRestaurantDetailsByID(currentOrder.restaurantID);
                if (res?.data?.success) {
                    setRestaurantName(res.data.restaurant.name);
                }

                const imageMap = {};
                const reviewsMap = {};
                await Promise.all(currentOrder.items.map(async (item) => {
                    try {
                        const dishRes = await getDishDetailsByID(item.dishID);
                        if (dishRes?.data?.success) {
                            const dish = dishRes.data.dish;
                            imageMap[item.dishID] = dish.imageUrl || null;

                            if (dish.reviews && user) {
                                const existingReview = dish.reviews.find(
                                    (rev) => rev.userID === user._id
                                );
                                if (existingReview) reviewsMap[item.dishID] = existingReview;
                            }
                        }
                    } catch (err) {
                        imageMap[item.dishID] = null;
                    }
                }));
                setItemImages(imageMap);
                setUserReviews(reviewsMap);
            } catch (error) {
                setRestaurantName("Cravr Partner");
            }
        };

        fetchDetails();
    }, [order._id, user, refreshTrigger]);

    const handleReviewSave = async (data) => {
        setReviewError('');
        try {
            const res = await addReview(data.itemId, data.rating, data.comment);
            if (res?.data?.success) {
                setReviewTarget(null);
                setRefreshTrigger((prev) => prev + 1);
            }
        } catch (error) {
            console.error("Review submission failed:", error);
            setReviewError("Failed to submit review. Please try again.");
        }
    };

    if (reviewTarget) {
        return <ReviewEntry
            item={reviewTarget}
            existingReview={userReviews[reviewTarget.dishID]}
            onSave={handleReviewSave}
            onCancel={() => setReviewTarget(null)}
            error={reviewError}
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

                {/* Tracking */}
                <div className="mb-10 md:mb-16 mt-6 md:mt-10 border-y border-white/5 py-4 overflow-x-auto no-scrollbar">
                    <div className="min-w-[600px]">
                        <OrderTracker 
                        currentStatus={currentOrder.orderStatus} 
                        userAddress={currentOrder.shippingAddress}
                    />
                    </div>
                </div>

                {/* Items Payload */}
                <div className="space-y-4">
                    {order.items.map((item, idx) => {
                        const hasRated = !!userReviews[item.dishID];

                        return (
                            <OrderItemCard
                            key={idx}
                            item = {item}
                            image = {itemImages[item.dishID]}
                            hasRated={hasRated}
                            onRate={() => {
                                setReviewError('');
                                setReviewTarget(item);
                            }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default OrderDetailView;