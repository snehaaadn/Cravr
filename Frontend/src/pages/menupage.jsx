import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantDetailsByID } from '../services/api.js';
import Pagination from '../components/common/pagination.jsx';
import Loading from '../components/common/loading.jsx';

// Assets
import foodBg from '../assets/foodbg1.png';
import pizzaImg from '../assets/category/pizza.webp';
import logo from '../assets/logo.png';

function MenuPage() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [isScrolled, setIsScrolled] = useState(false);

    // Fetch Data
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

    // Handle Scroll Effect for Sticky Header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-stone-900 flex items-center justify-center">
            <Loading />
        </div>
    );

    if (!restaurant) return <div className="min-h-screen bg-stone-950 text-amber-50 flex items-center justify-center font-merriweather text-xl">Restaurant not found.</div>;

    const { name = "Restaurant", address, menu = [] } = restaurant || {};
    const locationStr = address ? `${address.locality || ''}, ${address.city || ''}` : "Location Unavailable";

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDishes = menu.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-stone-950 font-sans pb-20 relative selection:bg-amber-500 selection:text-black">

            {/* --- HERO SECTION --- */}
            <div className="relative w-full h-[60vh] overflow-hidden">

                {/* Background Design */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                </div>

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>


                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 space-y-4">
                    <span className="font-pacifico text-amber-500 text-2xl md:text-3xl drop-shadow-lg tracking-wide">
                        Welcome to
                    </span>
                    <h1 className="text-5xl md:text-7xl font-merriweather font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                        {name}
                    </h1>
                    <div className="flex items-center gap-3 text-gray-300 font-mono text-sm md:text-base bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                        {locationStr}
                    </div>
                </div>
            </div>

            {/* --- STICKY INFO BAR --- */}
            <div className={`sticky top-20 z-40 transition-all duration-500 ease-in-out border-b border-white/5 ${isScrolled ? 'bg-stone-900/90 backdrop-blur-lg py-3 shadow-2xl' : 'bg-transparent -mt-16 py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-4">

                    <div className={`transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 hidden md:block'}`}>
                        <h2 className="text-2xl font-bold text-amber-50 font-merriweather">{name}</h2>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col items-center px-6 py-1 border-r border-white/20">
                            <span className="text-amber-500 font-bold text-lg">4.5 ★</span>
                            <span className="text-[10px] uppercase text-gray-400 tracking-widest">Rating</span>
                        </div>
                        <div className="flex flex-col items-center px-6 py-1">
                            <span className="text-green-400 font-bold text-lg">Open</span>
                            <span className="text-[10px] uppercase text-gray-400 tracking-widest">Status</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MENU GRID --- */}
            <div id='menuSection' className="max-w-7xl mx-auto px-4 md:px-8 mt-12 scroll-mt-32">
                <div className="flex items-end justify-between mb-10 border-b border-stone-800 pb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white font-merriweather">Menu</h2>
                        <p className="text-amber-500/80 font-mono text-sm mt-1">Handpicked dishes for you</p>
                    </div>
                    <span className="text-stone-500 font-mono text-xs uppercase tracking-widest border border-stone-700 px-3 py-1 rounded">
                        {menu.length} Items
                    </span>
                </div>

                {menu.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentDishes.map((dish) => (
                                <div key={dish._id} className="group relative bg-stone-800/50 rounded-3xl overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.2)] flex flex-col">

                                    {/* Image */}
                                    <div className="h-56 overflow-hidden relative">
                                        <img
                                            src={dish.imageUrl || pizzaImg}
                                            alt={dish.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-20 group-hover:grayscale-0"
                                        />

                                        {/* Veg/Non-Veg Badge */}
                                        <div className="absolute top-4 left-4">
                                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg border ${dish.category === 'Non-Veg' ? 'bg-red-900/80 text-white border-red-500' : 'bg-green-900/80 text-white border-green-500'}`}>
                                                {dish.category || 'Veg'}
                                            </div>
                                        </div>

                                        {/* Price Badge */}
                                        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur text-amber-500 px-4 py-1.5 rounded-lg font-bold text-lg border border-amber-500/30 shadow-xl">
                                            ₹{dish.price}
                                        </div>

                                        {/* Rating */}
                                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">
                                            <span className="text-yellow-400 text-xs">★</span>
                                            <span className="text-white text-xs font-mono font-bold">{dish.rating * 2 || 8}</span>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6 flex flex-col flex-1 relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-amber-50 group-hover:text-amber-400 transition-colors font-merriweather leading-tight">
                                                {dish.name}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-stone-400 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                            {dish.description || "A delicious preparation made with fresh ingredients and authentic spices."}
                                        </p>

                                        {/* Action Button */}
                                        <div className="mt-auto pt-4 border-t border-white/5">
                                            <button className="w-full py-3 rounded-xl bg-stone-700 hover:bg-amber-500 text-white hover:text-black font-bold tracking-wider uppercase text-xs transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                                                <span>Add to Cart</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={menu.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            sectionId="menuSection"
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-stone-800 rounded-3xl bg-stone-900/50">
                        <img src={logo} alt="Empty" className="w-24 h-24 opacity-20 mb-4 invert" />
                        <h3 className="text-xl font-bold text-stone-500">Menu is currently empty</h3>
                        <p className="text-stone-600">Check back later for delicious updates.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MenuPage;