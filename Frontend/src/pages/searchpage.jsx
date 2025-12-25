import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/restaurantCard.jsx';
import DishCard from '../components/dishCard.jsx';
import Loading from '../components/common/loading.jsx';

// IMPORT YOUR API FUNCTIONS
import {
    getRestaurantsByName,
    getDishes
} from '../services/api';
import Pagination from '../components/common/pagination.jsx';

// Import Assets (Fallbacks)
import pizzaImg from '../assets/category/pizza.webp';
import logo from '../assets/logo.png';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dishes');
    const [results, setResults] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalItems, setTotalItems] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let data = [];

                
                if (activeTab === 'restaurants') {
                    const searchTerm = query || 'Bengaluru';

                    const response = await getRestaurantsByName(searchTerm);
                    const rawData = response.data.restaurants || [];

                    data = rawData.map(item => ({
                        id: item._id,
                        name: item.name,
                        image: logo,
                        location: item.address?.city || item.address?.locality || "Local Area"
                    }));
                } else {
                    const searchTerm = query || '';
                    const response = await getDishes(searchTerm, null, currentPage);
                    setTotalItems(response.data.count || 0);

                    const rawData = response.data.dishes || [];

                    data = rawData.map(item => ({
                        id: item._id,
                        name: item.name,
                        restaurant: item.restaurantID?.name || "Cravr Partner",
                        price: item.price,
                        rating: item.rating || 4.5,
                        image: item.imageUrl || pizzaImg, 
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

    }, [query, activeTab, currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div id='searchSection' className="min-h-screen bg-stone-950 text-white font-sans selection:bg-amber-500 selection:text-black pb-20 scroll-mt-24">

            {/* HEADER SECTION */}
            <div className="sticky top-20 z-30 bg-stone-950/80 backdrop-blur-lg border-b border-gray-800 py-6 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-merriweather font-bold">
                            Explore {activeTab === 'restaurants' ? 'Restaurants' : 'Dishes'}
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
                    <div className="min-h-[300px] flex items-center justify-center">
                        <Loading />
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
                                <div className="text-6xl mb-4 w-24 h-24">
                                    <img src={logo} alt="No results" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-300">No results found</h3>
                                <p className="text-gray-500">Try searching for something else like "Pizza" or "Biryani"</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* PAGINATION */}
            {!loading && results.length > 0 && (
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    paginate={paginate}
                    currentPage={currentPage}
                    sectionId="searchSection"
                />
            )}
        </div>
    );
}

export default SearchPage;