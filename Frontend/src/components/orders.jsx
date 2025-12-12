import react from 'react';
import food from '../assets/food.svg';

function OrderCard({ order }) {
    return (
        <div className='border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300 mb-4'>
            <div className='flex flex-row justify-between items-center mb-4'>
                <div>
                    <h2 className='font-bold text-xl'>{order.restaurant}</h2>
                    <p className='text-gray-500 text-sm'>{order.date}</p>
                </div>
                <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {order.status}
                    </span>
                </div>
            </div>
            <div className='flex flex-row space-x-4 mb-4 overflow-x-auto'>
                {order.items.map((item, index) => (
                    <div key={index} className='flex flex-col items-center min-w-20'>
                        <img src={item.imgURL} alt={item.name} className='w-16 h-16 rounded-full mb-2 object-cover'/>
                        <p className='text-sm text-center'>{item.name} x {item.quantity}</p>
                    </div>
                ))}
            </div>
            <div className='flex flex-row justify-between items-center'>
                <p className='font-bold text-lg'>Total: {order.total}</p>
                <button className='bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-300 ease-in-out'>
                    Reorder
                </button>
            </div>
        </div>
    );
}

function Orders() {

    const userOrders = [
        {
            id: 1,
            restaurant: 'Pizza Palace',
            items:[
                {name: 'Margherita', quantity: 1, imgURL: food},
                {name: 'Pepperoni', quantity: 2, imgURL: food},
                {name: 'Coke', quantity: 3, imgURL: food}
            ],
            status: 'Delivered',
            total: '$20.00',
            date: '2024-06-15'
        },
        {
            id: 2,
            restaurant: 'Sushi World',
            items:[
                {name: 'California Roll', quantity: 1, imgURL: food},
                {name: 'Spicy Tuna Roll', quantity: 1, imgURL: food},
                {name: 'Miso Soup', quantity: 2, imgURL: food}
            ],
            status: 'In Transit',
            total: '$25.00',
            date: '2024-06-10'
        },
        {
            id: 3,
            restaurant: 'Burger Hub',
            items:[
                {name: 'Cheeseburger', quantity: 2, imgURL: food},
                {name: 'Fries', quantity: 2, imgURL: food},
                {name: 'Milkshake', quantity: 1, imgURL: food}
            ],
            status: 'Cancelled',
            total: '$18.00',
            date: '2024-06-05'
        }
    ];

    return (
        <div>
            <div className='border-b-2 border-gray-300 pb-2 mb-4'>
                <p className='font-mono text-2xl '>My Orders</p>
            </div>

            <div>
                {
                    userOrders.length === 0 ? (
                        <p className='text-gray-500'>You have no orders yet.</p>
                    ) : (
                        userOrders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))
                    )
                }
            </div>
            
        </div>
    );
}

export default Orders;