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
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await getUserOrders();

                if (response.data.success) {
                    setOrders(response.data.orders);
                }
            } catch (err) {
                console.error("There is an error fetching orders:", err);
                setError(err.response?.data?.message || "Unauthorized access.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

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
            <div className='border-b border-amber-500/10 pb-4 mb-8 flex justify-between items-end'>
                <p className='font-merriweather font-bold text-4xl text-amber-50 uppercase tracking-tighter italic'>Orders</p>
                <p className='font-mono text-[10px] text-stone-300 uppercase tracking-widest'>Total: {orders.length}</p>
            </div>

            <div className="space-y-3">
                {sortedOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20 space-y-4">
                        <img src={logo} alt="Cravr Logo" className="w-24 h-24 opacity-40" />
                        <p className="text-stone-300 font-mono text-[10px] uppercase tracking-widest text-center">
                            {user?.username || 'Unknown'}: No Orders on Record.
                        </p>
                    </div>
                ) : (
                    sortedOrders.map((order) => (
                        <div
                            key={order._id || order.id}
                            onClick={() => setSelectedOrder(order)}
                            className={`p-6 border rounded-2xl flex justify-between items-center transition-all cursor-pointer hover:bg-white/5 active:scale-[0.98] group ${getStatusTheme(order.orderStatus)}`}
                        >
                            <div className="space-y-1">
                                <h2 className="font-merriweather font-bold text-xl text-amber-50 group-hover:text-amber-400 transition-colors">
                                    {getRestaurantDetailsByID(order.restaurantID).then(res => res.data.restaurant.name).catch(() => "Unknown Restaurant")}
                                </h2>
                                <p className="text-[10px] font-mono text-stone-500 uppercase">
                                    {order.items.map(i => `${i.name} x${i.quantity}`).join(' // ')}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-amber-50 italic">₹{order.totalAmount}</p>
                                <p className="text-[9px] uppercase tracking-widest font-bold opacity-60 italic">{order.orderStatus}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Orders;