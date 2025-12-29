import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components 
import Loading from '../components/common/loading.jsx';
import Pagination from '../components/common/pagination.jsx';
import RestaurantCard from '../components/card/restaurantCard.jsx';
import DishCard from '../components/card/dishCard.jsx';

// API Functions
import {
    getRestaurantsByName,
    getDishesByName
} from '../services/api';

// Assets
import pizzaImg from '../assets/category/pizza.webp';
import logo from '../assets/logo.png';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const queryName = searchParams.get('q');

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dishes');
    const [results, setResults] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalItems, setTotalItems] = useState(0);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let data = [];

                if (activeTab === 'restaurants') {
                    const searchTerm = queryName || '';
                    const response = await getRestaurantsByName(searchTerm);
                    const rawData = response.data.restaurants || [];
                    setTotalItems(rawData.length);

                    data = rawData.map(item => ({
                        id: item._id,
                        name: item.name,
                        image: logo, 
                        location: item.address?.locality || item.address?.city || "Location Unavailable",
                        rating: item.rating || 4.5
                    }));
                } else {
                    let response;
                    if (queryName) {
                        response = await getDishesByName(queryName, currentPage);
                    } else {
                        response = { data: { count: 0, dishes: [] } };
                    }

                    setTotalItems(response.data.count || 0);

                    const rawData = response.data.dishes || [];

                    data = rawData.map(item => ({
                        id: item._id,
                        name: item.name,
                        restaurant: item.restaurantID?.name || "Cravr Partner",
                        price: item.price,
                        rating: item.rating || 4,
                        ratingCount: item.ratingCount || 100,
                        image: item.imageUrl || pizzaImg,
                        description: item.description || "Delicious and freshly prepared.",
                        category: item.category
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

    }, [queryName, activeTab, currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div id='searchSection' className="min-h-screen bg-stone-950 text-white font-sans selection:bg-amber-500 selection:text-black pb-20 relative">

            {/* --- HEADER --- */}
            <div className="top-20 z-40 bg-stone-950/90 backdrop-blur-md border-b border-white/5 py-6">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">

                    {/* Title */}
                    <div>
                        <span className="text-amber-500 font-mono text-xs tracking-widest uppercase block mb-1">
                            Search Results for "{queryName || 'All'}"
                        </span>
                        <h1 className="text-3xl md:text-4xl font-merriweather font-bold text-white">
                            Explore {activeTab === 'restaurants' ? 'Restaurants' : 'Dishes'}
                        </h1>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-stone-900/50 p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                        <button
                            onClick={() => setActiveTab('dishes')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'dishes'
                                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                                    : 'text-stone-400 hover:text-white'
                                }`}
                        >
                            Dishes
                        </button>
                        <button
                            onClick={() => setActiveTab('restaurants')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'restaurants'
                                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                                    : 'text-stone-400 hover:text-white'
                                }`}
                        >
                            Restaurants
                        </button>
                    </div>
                </div>
            </div>

            {/* --- CONTENT GRID --- */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 relative z-10">
                {loading ? (
                    <div className="min-h-[50vh] flex items-center justify-center">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-stone-500 font-mono text-sm">
                                Found {results.length} {activeTab === 'restaurants' ? 'outlets' : 'items'}
                            </p>
                            <div className="h-px bg-stone-800 flex-1 ml-6"></div>
                        </div>

                        {results.length > 0 ? (
                            <div className={`grid gap-8 ${activeTab === 'restaurants' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>

                                {/* --- DISH CARDS --- */}
                                {activeTab === 'dishes' && results.map((dish) => (
                                    <DishCard key={dish.id} dish={dish} />
                                ))}

                                {/* --- RESTAURANT CARDS --- */}
                                {activeTab === 'restaurants' && results.map((rest) => (
                                    <RestaurantCard key={rest.id} data={rest} />
                                ))}

                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                                <img src={logo} alt="No results" className="w-24 h-24 mb-4 grayscale invert" />
                                <h3 className="text-xl font-bold text-stone-400">No results found</h3>
                                <p className="text-stone-400">We will {activeTab === 'dishes' ? 'add more dishes' : 'contact more restaurants'} soon!</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* PAGINATION */}
            {!loading && results.length > 0 && (
                <div className="mt-12">
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        paginate={paginate}
                        currentPage={currentPage}
                        sectionId="searchSection"
                    />
                </div>
            )}
        </div>
    );
}

export default SearchPage;