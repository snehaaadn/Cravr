import React, { useState } from 'react';
import OrderDetailView from '../components/orderDetailview';
import logo from '../assets/logo.png';


const getStatusTheme = (status) => {
    switch (status?.toLowerCase()) {
        case 'delivered': 
            return 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'; // GREEN
        case 'confirmed': 
        case 'preparing': 
        case 'ready for pickup': 
        case 'out for delivery': 
            return 'border-amber-500/30 bg-amber-500/5 text-amber-400'; // YELLOW
        case 'pending': 
        case 'cancelled': 
            return 'border-rose-500/30 bg-rose-500/5 text-rose-400'; // RED
        default: 
            return 'border-stone-700 bg-stone-800 text-stone-400';
    }
};

function Orders() {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const userOrders = [
        {
            id: 1,
            restaurant: 'Pizza Palace',
            items: [
                { name: 'Margherita', quantity: 1, price: 12.00, imgURL: logo },
                { name: 'Coke', quantity: 3, price: 2.66, imgURL: logo },
                { name: 'Garlic Bread', quantity: 2, price: 3.34, imgURL: logo },
                { name: 'Chocolate Lava Cake', quantity: 1, price: 5.00, imgURL: logo },
                { name: 'Caesar Salad', quantity: 1, price: 4.00, imgURL: logo },
                { name: 'Pasta Alfredo', quantity: 1, price: 8.00, imgURL: logo },
                { name: 'Tiramisu', quantity: 2, price: 6.00, imgURL: logo },
                { name: 'Lemonade', quantity: 2, price: 3.00, imgURL: logo },
            ],
            status: 'Delivered',
            total: '20.00',
            date: '2024-01-15',
            paymentMethod: 'CARD',

        },
        {
            id: 1,
            restaurant: 'Pizza Palace',
            items: [
                { name: 'Margherita', quantity: 1, price: 12.00, imgURL: logo },
                { name: 'Coke', quantity: 3, price: 2.66, imgURL: logo },
                { name: 'Garlic Bread', quantity: 2, price: 3.34, imgURL: logo },
                { name: 'Chocolate Lava Cake', quantity: 1, price: 5.00, imgURL: logo },
                { name: 'Caesar Salad', quantity: 1, price: 4.00, imgURL: logo },
                { name: 'Pasta Alfredo', quantity: 1, price: 8.00, imgURL: logo },
                { name: 'Tiramisu', quantity: 2, price: 6.00, imgURL: logo },
                { name: 'Lemonade', quantity: 2, price: 3.00, imgURL: logo },
            ],
            status: 'Ready for Pickup',
            total: '20.00',
            date: '2024-03-15'
        },
        {
            id: 1,
            restaurant: 'Pizza Palace',
            items: [
                { name: 'Margherita', quantity: 1, price: 12.00, imgURL: logo },
                { name: 'Coke', quantity: 3, price: 2.66, imgURL: logo },
                { name: 'Garlic Bread', quantity: 2, price: 3.34, imgURL: logo },
                { name: 'Chocolate Lava Cake', quantity: 1, price: 5.00, imgURL: logo },
                { name: 'Caesar Salad', quantity: 1, price: 4.00, imgURL: logo },
                { name: 'Pasta Alfredo', quantity: 1, price: 8.00, imgURL: logo },
                { name: 'Tiramisu', quantity: 2, price: 6.00, imgURL: logo },
                { name: 'Lemonade', quantity: 2, price: 3.00, imgURL: logo },
            ],
            status: 'Out for Delivery',
            total: '20.00',
            date: '2024-06-15'
        },
        {
            id: 1,
            restaurant: 'Pizza Palace',
            items: [
                { name: 'Margherita', quantity: 1, price: 12.00, imgURL: logo },
                { name: 'Coke', quantity: 3, price: 2.66, imgURL: logo },
                { name: 'Garlic Bread', quantity: 2, price: 3.34, imgURL: logo },
                { name: 'Chocolate Lava Cake', quantity: 1, price: 5.00, imgURL: logo },
                { name: 'Caesar Salad', quantity: 1, price: 4.00, imgURL: logo },
                { name: 'Pasta Alfredo', quantity: 1, price: 8.00, imgURL: logo },
                { name: 'Tiramisu', quantity: 2, price: 6.00, imgURL: logo },
                { name: 'Lemonade', quantity: 2, price: 3.00, imgURL: logo },
            ],
            status: 'Cancelled',
            total: '20.00',
            date: '2024-06-15'
        },
        // ... other orders
    ];
    // Local sorting for your frontend state
    const sortedOrders = [...userOrders].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (selectedOrder) {
        return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
    }

    return (
        <div className="space-y-6">
            <div className='border-b border-amber-500/10 pb-4 mb-8 flex justify-between items-end'>
                <p className='font-merriweather font-bold text-4xl text-amber-50'>My Orders</p>
                <p className='font-mono text-[10px] text-stone-50 uppercase tracking-widest'>Total: {userOrders.length}</p>
            </div>

            <div className="space-y-3">
                {sortedOrders.map((order) => (
                    <div
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className={`p-6 border rounded-2xl flex justify-between items-center transition-all cursor-pointer hover:translate-x-2 active:scale-95 group ${getStatusTheme(order.status)}`}
                    >
                        <div className="space-y-1">
                            <h2 className="font-merriweather font-bold text-xl text-amber-50 group-hover:text-amber-400 transition-colors">
                                {order.restaurant}
                            </h2>
                            <p className="text-xs font-mono text-stone-300">
                                {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-amber-50">₹{order.total}</p>
                            <p className="text-[10px] uppercase tracking-widest font-bold">{order.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;