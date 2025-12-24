import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// 1. IMPORT YOUR API FUNCTIONS
import {
    getRestaurantsByName,
    getDishes
} from '../services/api';

// Import Assets (Fallbacks)
import pizzaImg from '../assets/category/pizza.webp';
import burgerImg from '../assets/category/burger.webp';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const queryLocation = searchParams.get('pincode');
    const queryDish = searchParams.get('q');

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(queryLocation ? 'restaurants' : 'dishes');
    const [results, setResults] = useState([]);

    // --- REAL API CALL ---
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let data = [];

                // Inside useEffect fetchData...
                if (activeTab === 'restaurants') {
                    // We use queryDish as a fallback for location if the user searched from Header
                    const searchTerm = queryDish || queryLocation || 'Bengaluru';

                    const response = await getRestaurantsByName(searchTerm);
                    const rawData = response.data.restaurants || []; // Matches backend key 'restaurants'

                    data = rawData.map(item => ({
                        id: item._id,
                        name: item.name,
                        image: item.image || burgerImg,
                        location: item.address?.city || item.address?.locality || "Local Area"
                    }));
                } else {
                    const searchTerm = queryDish || '';
                    const response = await getDishes(searchTerm);
                    const rawData = response.data.dishes || []; // Matches backend key 'dishes'

                    data = rawData.map(item => ({
                        id: item._id,
                        name: item.name,
                        restaurant: "Cravr Partner",
                        price: item.price,
                        rating: item.rating || 4.5,
                        image: item.imageUrl || pizzaImg, // Note: Use 'imageUrl' as per your Dish model
                        description: item.description || "Delicious and freshly prepared."
                    }));
                }
                setResults(data);

            } catch (error) {
                console.error("Failed to fetch search results:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [queryLocation, queryDish, activeTab]);


    // --- RENDER HELPERS (Unchanged from your design) ---

    const RestaurantCard = ({ data }) => (
        <div className="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
                <img src={data.image} alt={data.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent opacity-90"></div>
                <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center">
                        {data.rating} ★
                    </span>
                    <span className="text-gray-300 text-xs font-medium">{data.time}</span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-white font-merriweather mb-1 group-hover:text-amber-400 transition-colors">{data.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{data.cuisine}</p>
                <div className="flex justify-between items-center border-t border-gray-800 pt-3">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">{data.location}</span>
                    <span className="text-amber-500 font-bold text-sm">{data.price}</span>
                </div>
            </div>
        </div>
    );

    const DishCard = ({ data }) => (
        <div className="flex bg-gray-900 rounded-2xl overflow-hidden shadow-md border border-gray-800 hover:border-gray-700 transition-all duration-300">
            <div className="w-1/3 md:w-40 relative">
                <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                    <div className="w-4 h-4 border border-green-500 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between relative">
                <div>
                    <h3 className="text-lg font-bold text-white font-merriweather">{data.name}</h3>
                    <p className="text-xs text-amber-500 font-bold mb-1">{data.restaurant}</p>
                    <p className="text-gray-400 text-xs line-clamp-2">{data.description}</p>
                </div>
                <div className="flex justify-between items-end mt-4">
                    <span className="text-xl font-bold text-white">₹{data.price}</span>
                    <button className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2 rounded-lg text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all active:scale-95">
                        ADD +
                    </button>
                </div>
            </div>
        </div>
    );

    const SkeletonCard = () => (
        <div className="bg-gray-800/50 rounded-2xl h-64 animate-pulse"></div>
    );

    return (
        <div className="min-h-screen bg-stone-950 text-white font-sans selection:bg-amber-500 selection:text-black pb-20">

            {/* HEADER SECTION */}
            <div className="sticky top-20 z-30 bg-stone-950/80 backdrop-blur-lg border-b border-gray-800 py-6 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                    <div>
                        <p className="text-amber-500 text-sm font-bold tracking-widest uppercase mb-1">
                            {queryLocation ? 'Location Search' : 'Explore'}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-merriweather font-bold">
                            {queryLocation
                                ? <span>Restaurants near <span className="text-amber-400 underline decoration-gray-700">{queryLocation}</span></span>
                                : <span>Results for "<span className="text-amber-400 italic">{queryDish || 'Food'}</span>"</span>
                            }
                        </h1>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex bg-gray-900/80 p-1 rounded-xl border border-gray-800">
                        <button
                            onClick={() => setActiveTab('restaurants')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'restaurants' ? 'bg-amber-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Restaurants
                        </button>
                        <button
                            onClick={() => setActiveTab('dishes')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'dishes' ? 'bg-amber-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Dishes
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : (
                    <>
                        <p className="text-gray-500 mb-6 font-mono text-sm">
                            Found {results.length} {activeTab === 'restaurants' ? 'outlets' : 'items'} for you
                        </p>

                        {results.length > 0 ? (
                            <div className={activeTab === 'restaurants'
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                                : "grid grid-cols-1 md:grid-cols-2 gap-6"
                            }>
                                {activeTab === 'restaurants'
                                    ? results.map(item => <RestaurantCard key={item.id} data={item} />)
                                    : results.map(item => <DishCard key={item.id} data={item} />)
                                }
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 opacity-60">
                                <div className="text-6xl mb-4">🍽️</div>
                                <h3 className="text-2xl font-bold text-gray-300">No results found</h3>
                                <p className="text-gray-500">Try searching for something else like "Pizza" or "Biryani"</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchPage;