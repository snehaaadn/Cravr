import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

import { getRestaurantDetailsByID } from '../services/api.js';
import Pagination from '../components/common/pagination.jsx';
import Loading from '../components/common/loading.jsx';

// Fallback Assets
import foodBg from '../assets/foodbg1.png'; 
import pizzaImg from '../assets/category/pizza.webp';

function MenuPage() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await getRestaurantDetailsByID(id);
                setRestaurant(response.data.restaurant);
            } catch (error) {
                console.error("Failed to load restaurant", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-stone-950 flex items-center justify-center">
            <Loading />
        </div>
    );

    if (!restaurant) return <div className="text-white text-center pt-20">Restaurant not found.</div>;

    const { name = "Restaurant", address, menu = [] } = restaurant || {};
    const locationStr = address ? `${address.locality || ''} ${address.city || ''}` : "Location Unavailable";

    // --- PAGINATION LOGIC ---
    // Get current dishes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    // Safety check: ensure menu exists
    const currentDishes = restaurant?.menu?.slice(indexOfFirstItem, indexOfLastItem) || [];

    // Change page handler
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div id='menuSection' className="min-h-screen bg-stone-950 text-white font-sans pb-20 scroll-mt-24">
            
            {/* IMMERSIVE HERO HEADER */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                {/* Background Image with Parallax-like feel */}
                <div className="absolute inset-0">
                    <img 
                        src={foodBg} 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-50 blur-sm scale-105" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/60 to-transparent"></div>
                </div>

                {/* Floating Info Card */}
                <div className="absolute -bottom-10 left-0 right-0 px-4 md:px-12 flex justify-center md:justify-start">
                    <div className="bg-stone-900/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl max-w-3xl w-full flex flex-col md:flex-row items-center md:items-start gap-6 transform translate-y-0 hover:-translate-y-2 transition-transform duration-500">
                        
                        {/* Restaurant Logo/Icon */}
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                            <span className="font-pacifico text-4xl text-black">{name?.charAt(0) || "R"}</span>
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl md:text-4xl font-merriweather font-bold text-white mb-2">{name}</h1>
                            <p className="text-gray-400 text-sm mb-4 flex items-center justify-center md:justify-start gap-2">
                                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                {locationStr}
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-wider">
                                <span className="px-3 py-1 bg-green-900/50 text-green-400 border border-green-500/30 rounded-full">Open Now</span>
                                <span className="px-3 py-1 bg-stone-800 text-gray-400 border border-stone-700 rounded-full">4.5 ★ Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MENU SECTION */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 mt-24">
                <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                    <h2 className="text-2xl font-bold text-amber-500 font-merriweather">Full Menu</h2>
                    <span className="text-gray-500 text-sm">{menu.length} Items Available</span>
                </div>

                {menu.length > 0 ? (
                    <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentDishes.map((dish) => (
                            <div key={dish._id} className="group flex bg-stone-900 rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] relative">
                                
                                {/* Dish Image */}
                                <div className="w-32 md:w-40 h-full relative shrink-0">
                                    <img 
                                        src={dish.imageUrl || pizzaImg} 
                                        alt={dish.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    {/* Price Tag Overlay */}
                                    <div className="absolute top-0 left-0 bg-black/80 px-2 py-1 text-xs font-bold text-amber-500 rounded-br-lg">
                                        ₹{dish.price}
                                    </div>
                                </div>

                                {/* Dish Content */}
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors mb-1">{dish.name}</h3>
                                            {/* Veg/Non-Veg Dot */}
                                            <div className={`w-3 h-3 rounded-full border ${dish.category === 'Non-Veg' ? 'border-red-500' : 'border-green-500'} flex items-center justify-center p-px`}>
                                                 <div className={`w-full h-full rounded-full ${dish.category === 'Non-Veg' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{dish.description || "Freshly prepared with authentic ingredients."}</p>
                                    </div>
                                    
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="flex text-xs text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < (dish.rating || 4) ? "text-yellow-500" : "text-gray-700"}>★</span>
                                            ))}
                                            <span className="text-gray-500 ml-2">({dish.ratingCount || 10})</span>
                                        </div>
                                        
                                        <button className="bg-stone-800 hover:bg-amber-500 hover:text-black text-white text-xs font-bold px-4 py-2 rounded-lg transition-all transform active:scale-95 border border-stone-700 hover:border-amber-500">
                                            ADD +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                        {/* PAGINATION COMPONENT */}
                        <Pagination 
                            itemsPerPage={itemsPerPage} 
                            totalItems={menu.length} 
                            paginate={paginate} 
                            currentPage={currentPage}
                            sectionId="menuSection"
                        />
                    </>
                ) : (
                    <div className="text-center py-20 bg-stone-900/50 rounded-3xl border border-dashed border-gray-700">
                        <p className="text-gray-500 mb-2 text-4xl">🥘</p>
                        <h3 className="text-xl font-bold text-gray-300">Menu is empty</h3>
                        <p className="text-gray-500 text-sm">This restaurant hasn't listed any dishes yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MenuPage;