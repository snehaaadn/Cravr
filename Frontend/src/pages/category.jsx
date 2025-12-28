import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import scrollToTop from "../utils/scrollToTop";
import { AuthContext } from "../context/authContext";

// Importing images
import choleBhature from "../assets/category/cholebhature.webp";
import pizza from "../assets/category/pizza.webp";
import burger from "../assets/category/burger.webp";
import biryani from "../assets/category/biryani.webp";
import noodles from "../assets/category/noodles.webp";
import pasta from "../assets/category/pasta.webp";
import paratha from "../assets/category/paratha.webp";
import dosa from "../assets/category/dosa.webp";
import cakes from "../assets/category/cake.webp";
import pavbhaji from "../assets/category/pavbhaji.webp";
import chinese from "../assets/category/chinese.webp";
import shake from "../assets/category/shake.webp";
import kebabs from "../assets/category/kebab.webp";

const categories = [
    { name: "Pizza", image: pizza },
    { name: "Burgers", image: burger },
    { name: "Biriyani", image: biryani },
    { name: "Noodles", image: noodles },
    { name: "Pasta", image: pasta },
    { name: "Paratha", image: paratha },
    { name: "Chole Bhature", image: choleBhature },
    { name: "Dosa", image: dosa },
    { name: "Cakes", image: cakes },
    { name: "Pav Bhaji", image: pavbhaji },
    { name: "Chinese", image: chinese },
    { name: "Shake", image: shake },
    { name: "Kebabs", image: kebabs },
];

function CategoryPage() {
    const scrollRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        navigate(`/search?q=${category.name.toLowerCase()}`);
        scrollToTop();
    };


    // PRE-LOADER LOGIC
    useEffect(() => {
        const loadImages = async () => {
            const promises = categories.map((cat) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = cat.image;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });

            await Promise.all(promises);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full flex flex-col border-b border-amber-50 items-center py-12 bg-stone-950 min-h-[400px]">
            {/* Header Section */}
            <div className="w-full max-w-7xl px-6 mb-8 flex items-baseline gap-2">
                <h2 className="text-2xl md:text-3xl font-bold font-merriweather text-amber-50">
                    Hey{" "}
                    <span className="text-amber-500 capitalize">
                        {user?.username || "Craver"}
                    </span>
                    , what are you craving?
                </h2>
                <div className="grow h-px bg-gray-200 ml-4 hidden md:block"></div>
            </div>

            {/* LOADING STATE (Skeleton UI) */}
            {isLoading ? (
                <div className="flex overflow-hidden space-x-8 px-4 py-4 w-full max-w-7xl">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col items-center shrink-0 animate-pulse">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 mb-4"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : (
                /* MAIN CAROUSEL */
                <div className="relative w-full max-w-7xl px-4 group">

                    {/* Left Button */}
                    <button
                        onClick={() => scroll('left')}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-amber-50 text-gray-700 hover:text-amber-600 p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    {/* The Scrollable Area */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto space-x-8 px-4 py-4 scrollbar-hide snap-x snap-mandatory"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center shrink-0 snap-center cursor-pointer group/item"
                            >

                                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md mb-4 
                                    transition-transform duration-300 ease-out will-change-transform
                                    group-hover/item:scale-110 group-hover/item:shadow-xl 
                                    border-4 border-amber-50 group-hover/item:border-amber-500"
                                    onClick={() => {
                                        handleCategorySelect(category);
                                    }}
                                >

                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        loading="eager"
                                        draggable="false"
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-black/5 group-hover/item:bg-transparent transition-colors duration-300"></div>
                                </div>

                                <h3 className="text-lg font-semibold font-merriweather text-amber-50 group-hover/item:text-amber-600 transition-colors duration-300">
                                    {category.name}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Right Button */}
                    <button
                        onClick={() => scroll('right')}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-amber-50 text-gray-700 hover:text-amber-600 p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

export default CategoryPage;