import React, { useState } from "react";
import foodBg from "../assets/foodbg1.png";
import { useNavigate } from "react-router-dom";
import AdCard from "./card/adCard.jsx";


function HeroSection() {
    const [locationInput, setLocationInput] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if ((e.key === 'Enter' || !e.key) && locationInput.trim() !== '') {
            navigate(`?location=${encodeURIComponent(locationInput.trim())}`);

            const section = document.getElementById('nearByRestaurants');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };


    const ads = [
        { text: "Get 60% Off On Your First Order" },
        { text: "Limited Time Offer: Free Delivery" },
    ];

    return (
        <div className="relative w-full min-h-screen flex flex-col justify-start items-center overflow-hidden bg-stone-900">

            {/* BACKGROUND LAYER */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src={foodBg}
                    alt="Delicious food background"
                    className="w-full h-full object-cover rotate-180 opacity-90"
                />
                <div className="absolute inset-0 bg-linear-to-b from-stone-900/90 via-stone-800/30 to-stone-900/80"></div>
            </div>

            {/* MAIN CONTENT CONTENT */}
            <div className="z-10 w-full flex flex-col items-center pt-20 md:pt-32 px-4 space-y-8">

                {/* Hero Text */}
                <div className="flex flex-col justify-center items-center text-center space-y-4 animate-fade-in-down">
                    <h1 className="text-7xl font-bold font-serif mb-4 text-white drop-shadow-lg">
                        Cravings? <span className="text-amber-400 italic">Cravr.</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-amber-50/90 font-serif font-light max-w-2xl tracking-wide">
                        Your ultimate food delivery companion. Explore a world of flavors at your fingertips!
                    </p>
                </div>

                {/* Search Bar  */}
                <div className="w-full max-w-lg mt-8 relative group">
                    <div className="absolute -inset-1 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex items-center">
                        <input
                            id="location-search-input"
                            type="text"
                            placeholder="Enter your Location..."
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            onKeyDown={handleSearch}
                            className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-50 placeholder-amber-200/50 px-8 py-4 rounded-full text-lg focus:outline-none focus:bg-white/20 focus:border-amber-400/50 transition-all duration-300 shadow-xl cursor-text"
                        />

                        <button
                            type="button"
                            className="h-10 w-10 text-amber-300 absolute right-4 flex items-center justify-center hover:text-amber-500 hover:scale-110 active:scale-90 transition-all duration-200 z-10"
                            onClick={() => handleSearch({ key: 'Enter' })}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Advertisement Cards */}
            <div className="z-20 w-full mt-auto pb-12 md:pb-20 px-4 md:px-20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                    {ads.map((ad, idx) => (
                        <div key={idx} className={idx % 2 === 0 ? "md:self-end" : "md:self-start"}>
                            <AdCard img={ad.img} text={ad.text} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default HeroSection;