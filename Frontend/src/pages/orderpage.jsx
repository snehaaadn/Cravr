import React, { useState, useContext, useEffect } from 'react';
import OrderDetailView from '../components/orderDetailview';
import logo from '../assets/logo.png';
import { getUserOrders, getRestaurantDetailsByID } from '../services/api';
import { AuthContext } from '../context/authContext';
import Loading from '../components/common/loading';

const getStatusTheme = (status) => {
    switch (status?.toLowerCase()) {
        case 'delivered':
            return 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400';
        case 'confirmed':
        case 'preparing':
        case 'ready for pickup':
        case 'out for delivery':
            return 'border-amber-500/30 bg-amber-500/5 text-amber-400';
        case 'pending':
        case 'cancelled':
            return 'border-rose-500/30 bg-rose-500/5 text-rose-400';
        default:
            return 'border-stone-700 bg-stone-800 text-stone-400';
    }
};

function Orders() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [restaurantNames, setRestaurantNames] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrdersAndDetails = async () => {
            try {
                setLoading(true);
                const response = await getUserOrders();

                if (response.data.success) {
                    const fetchedOrders = response.data.orders;
                    setOrders(fetchedOrders);

                    // Logic: Get unique restaurant IDs to avoid redundant API calls
                    const uniqueRestaurantIds = [...new Set(fetchedOrders.map(o => o.restaurantID))];
                    const namesMap = {};

                    // Logic: Fetch all names in parallel for performance
                    await Promise.all(
                        uniqueRestaurantIds.map(async (id) => {
                            try {
                                const res = await getRestaurantDetailsByID(id);
                                if (res.data.success) {
                                    namesMap[id] = res.data.restaurant.name;
                                }
                            } catch (err) {
                                namesMap[id] = "Cravr Partner";
                            }
                        })
                    );
                    setRestaurantNames(namesMap);
                }
            } catch (err) {
                console.error("There is an error fetching orders:", err);
                setError(err.response?.data?.message || "Session expired. Log out and log back in.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersAndDetails();
    }, [orders.length, orders[orders.length - 1]?.orderStatus]);

    const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (selectedOrder) {
        return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="p-10 border border-rose-500/20 bg-rose-500/5 rounded-2xl text-center">
                <p className="font-mono text-rose-500 text-[10px] uppercase tracking-widest animate-pulse">
                    ⚠ {error}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className='border-b border-amber-500/10 pb-4 mb-8 flex justify-between items-end gap-2'>
                <p className='font-merriweather font-bold text-2xl md:text-4xl text-amber-50 uppercase tracking-tighter italic'>Orders</p>
                <p className='font-mono text-[9px] md:text-[10px] text-stone-300 uppercase tracking-widest whitespace-nowrap'>Total: {orders.length}</p>
            </div>

            <div className="space-y-3">
                {sortedOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20 space-y-4">
                        <img src={logo} alt="Cravr Logo" className="w-20 h-20 md:w-24 md:h-24 opacity-40" />
                        <p className="text-stone-300 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-center">
                            No Records Found.
                        </p>
                    </div>
                ) : (
                    sortedOrders.map((order) => (
                        <div
                            key={order._id}
                            onClick={() => setSelectedOrder(order)}
                            className={`p-4 md:p-6 border rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all cursor-pointer hover:bg-white/5 group ${getStatusTheme(order.orderStatus)}`}
                        >
                            <div className="space-y-1 w-full sm:w-auto">
                                <h2 className="font-merriweather font-bold text-lg md:text-xl text-amber-50 group-hover:text-amber-400 truncate">
                                    {restaurantNames[order.restaurantID] || "Partner Restaurant"}
                                </h2>
                                <p className="text-[9px] md:text-[10px] font-mono text-stone-500 uppercase line-clamp-1">
                                    {order.items.map(i => i.name).join(' // ')}
                                </p>
                            </div>
                            <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                                <p className="text-xl md:text-2xl font-black text-amber-50 italic">₹{order.totalAmount}</p>
                                <p className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold opacity-60 italic">{order.orderStatus}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Orders;