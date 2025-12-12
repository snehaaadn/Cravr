import react from 'react';
import { useState } from 'react';
import image from '../assets/food.svg';
function FavouriteItemCard({ item }) {

    // onhandleAddToCart = (item) => {
    //     // Logic to add item to cart
    //     //remove from favourites logic

    // }

    // onhandleDeleteFromFavourites = (item) => {
    //     // Logic to remove item from favourites
    // }

    return (
        <div className='flex flex-col space-x-2border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300'>
            <div className='flex flex-row justify-between items-top mb-2'>
                <div className='flex flex-row'>
                    <img src={image} alt={item.name} className='w-20 h-20 object-cover rounded-lg' />
                    <div className='flex flex-col ml-4'>
                        <p>{item.name}</p>
                        <p>{item.restaurantName}</p>
                        <p>{item.description}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-between space-x-2 items-center'>

                    <button
                        onClick={() => onhandleAddToCart(item)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16" className='hover:text-red-600 cursor-pointer'>
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                    </button>

                    <button
                        onClick={() => onhandleDeleteFromFavourites(item)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" className='hover:text-red-600 cursor-pointer'>
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </button>

                </div>

            </div>

            <div className='flex flex-row justify-end items-center mt-2 mx-2'>
                <p className='font-bold text-lg'>${item.price.toFixed(2)}</p>
            </div>
        </div>
    );
}

function FavItems() {
    const favItems = [
        { restaurantName: 'Pizza Place', image: '/images/margherita-pizza.jpg', name: 'Margherita Pizza', description: 'Classic delight with 100% real mozzarella cheese', price: 12.99 },
        { restaurantName: 'Burger Joint', image: '/images/veggie-burger.jpg', name: 'Veggie Burger', description: 'A delicious burger with fresh veggies and cheese', price: 9.49 },
        { restaurantName: 'Salad Bar', image: '/images/caesar-salad.jpg', name: 'Caesar Salad', description: 'Crisp romaine lettuce with Caesar dressing and croutons', price: 7.99 },
        { restaurantName: 'Pasta House', image: '/images/pasta-alfredo.jpg', name: 'Pasta Alfredo', description: 'Creamy Alfredo sauce with fettuccine pasta', price: 14.29 },
    ]; // From DB
    return (
        <div className='flex flex-col '>
            <div className='border-b-2 border-gray-300 pb-2 mb-4'>
                <p className='font-mono text-2xl '>Favourite Items</p>
            </div>

            <div>
                {/* Favourite items will be listed here */}
                {favItems.length === 0 ? (
                    <p className='text-gray-500 mt-4'>You have no favourite items yet.</p>
                ) : (
                    <div className='flex flex-col space-y-3 mt-4'>
                        {favItems.map((item, index) => (
                            <FavouriteItemCard key={index} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FavItems