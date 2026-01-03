import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

// Components 
import Loading from '../components/common/loading.jsx';
import Pagination from '../components/common/pagination.jsx';
import RestaurantCard from '../components/card/restaurantCard.jsx';
import DishCard from '../components/card/dishCard.jsx';

// Context
import { AuthContext } from '../context/authContext.jsx';

// API Functions
import {
    getRestaurantsByName,
    getDishesByName,
    getRestaurantsByLocationName
} from '../services/api';

// Assets
import pizzaImg from '../assets/category/pizza.webp';
import logo from '../assets/logo.png';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const queryName = searchParams.get('q');

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dishes');
    const [results, setResults] = useState([]);

    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalItems, setTotalItems] = useState(0);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let data = [];

                // Restaurant Search
                if (activeTab === 'restaurants') {
                    let response;
                    if (queryName) {
                        response = await getRestaurantsByName(queryName);
                    } else if (selectedCity) {
                        response = await getRestaurantsByLocationName(selectedCity);
                    } else {
                        response = { data: { restaurants: [] } };
                    }
                    const rawData = response.data.restaurants || [];
                    setTotalItems(rawData.length);

                    data = rawData.map(item => ({
                        id: item._id,
                        name: item.name,
                        image: logo,
                        city: item.address?.city || "City Unavailable",
                        locality: item.address?.locality || "Locality Unavailable",
                        location: item.address?.locality || item.address?.city || "Location Unavailable",
                        rating: item.rating || 4.5
                    }));

                    //  CLIENT SIDE FILTERING 
                    if (selectedCity) {
                        const filterCity = selectedCity.trim().toLowerCase();

                        data = data.filter(item => {
                            const cityMatch = item.city && item.city.toLowerCase().includes(filterCity);
                            const localityMatch = item.locality && item.locality.toLowerCase().includes(filterCity);

                            return cityMatch || localityMatch;
                        });
                    }

                } 
                else { // Dish Search 
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
                        city: item.restaurantID?.address?.city || "City Unavailable",
                        price: item.price,
                        rating: item.rating || 4,
                        ratingCount: item.ratingCount || 100,
                        image: item.imageUrl || pizzaImg,
                        description: item.description || "Delicious and freshly prepared.",
                        category: item.category
                    }));
                    if (selectedCity) {
                        const originalCount = data.length;
                        data = data.filter(item => {
                            const itemCity = item.city ? item.city.trim().toLowerCase() : "";
                            const filterCity = selectedCity.trim().toLowerCase();
                            return itemCity.includes(filterCity);
                        });
                        if (data.length < originalCount) setTotalItems(data.length);
                    }
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

    }, [queryName, activeTab, currentPage, selectedCity]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const toggleLocation = () => setIsLocationOpen(!isLocationOpen);

    const handleCitySelect = (city) => {
        setSelectedCity(city === selectedCity ? null : city);
        setIsLocationOpen(false);
        setCurrentPage(1);
    };

    return (
        <div id='searchSection' className="min-h-screen bg-stone-950 text-white font-sans selection:bg-amber-500 selection:text-black pb-20 relative">

            {/*  HEADER  */}
            <div className="sticky top-20 z-40 bg-stone-950/90 backdrop-blur-md border-b border-white/5 py-6">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">

                    {/* Title */}
                    <div>
                        <span className="text-amber-500 font-mono text-xs tracking-widest uppercase block mb-1">
                            {selectedCity ? `Exploring ${selectedCity}` : `Search Results`}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-merriweather font-bold text-white">
                            {queryName ? `"${queryName}"` : 'All'} {activeTab === 'restaurants' ? 'Restaurants' : 'Dishes'}
                        </h1>
                    </div>

                    {/* Controls Container */}
                    <div className="flex flex-col-reverse sm:flex-row items-center gap-4">

                        {/*  LOCATION DROPDOWN  */}
                        <div className="relative">
                            <button
                                onClick={toggleLocation}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest border transition-all ${selectedCity
                                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                                    : 'bg-stone-900 border-white/10 text-stone-400 hover:border-amber-500/50 hover:text-amber-500'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                {selectedCity ? selectedCity : "Set Location"}
                                <span className="text-[10px] ml-1">▼</span>
                            </button>

                            {/* Dropdown Menu */}
                            {isLocationOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-stone-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden p-2 z-50">
                                    {!user ? (
                                        <div className="p-4 text-center">
                                            <p className="text-stone-400 text-xs mb-3 leading-relaxed">
                                                Login to see restaurants & dishes in your locality.
                                            </p>
                                            <Link to="/login" className="block w-full py-2 bg-amber-500 text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors">
                                                Login Now
                                            </Link>
                                        </div>
                                    ) : user.address?.length === 0 ? (
                                        <div className="p-4 text-center">
                                            <p className="text-stone-500 text-xs italic mb-2">No addresses added yet.</p>
                                            <Link to="/profile" className="text-amber-500 text-xs font-mono uppercase tracking-widest hover:underline">
                                                + Add Address
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto custom-scrollbar">
                                            <p className="px-2 py-1 text-[10px] text-stone-500 uppercase tracking-widest font-mono">Saved Locations</p>
                                            {selectedCity && (
                                                <button
                                                    onClick={() => handleCitySelect(null)}
                                                    className="text-left px-3 py-2 rounded-lg text-rose-400 hover:bg-white/5 text-xs transition-colors flex items-center gap-2"
                                                >
                                                    <span>×</span> Clear Filter
                                                </button>
                                            )}
                                            {/* Get Unique Cities */}
                                            {[...new Set(user.address.map(a => a.city))].map((city, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleCitySelect(city)}
                                                    className={`text-left px-3 py-2 rounded-lg text-xs transition-colors flex justify-between items-center ${selectedCity === city
                                                        ? 'bg-amber-500 text-stone-950 font-bold'
                                                        : 'text-stone-300 hover:bg-white/5'
                                                        }`}
                                                >
                                                    {city}
                                                    {selectedCity === city && <span>✓</span>}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
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
            </div>

            {/*  CONTENT GRID  */}
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

                                {/*  DISH CARDS  */}
                                {activeTab === 'dishes' && results.map((dish) => (
                                    <DishCard key={dish.id} dish={dish} />
                                ))}

                                {/*  RESTAURANT CARDS  */}
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