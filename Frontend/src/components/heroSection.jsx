import React, { useState } from "react";
import foodBg from "../assets/foodbg1.png";

const AdCard = ({ text }) => {
    return (
        <div className="group relative w-40 h-40 md:w-60 md:h-60 rounded-full shadow-xl hover:shadow-amber-500/50 transition-all duration-500 ease-out transform overflow-hidden animate-float-delay">

            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-amber-50 text-sm md:text-xl font-bold drop-shadow-md group-hover:text-white transition-colors italic font-serif">
                    {text}
                </span>
            </div>
        </div>
    );
};

function HeroSection() {
    const [pincode, setPincode] = useState('');

    const ads = [
        { text: "Get 60% Off On Your First Order" },
        { text: "Limited Time Offer: Free Delivery" },
    ];

    const findRestaurants = (location) => {
        setPincode(location);
        // Logic placeholder
    };

    return (
        <div className="relative w-full min-h-screen flex flex-col justify-start items-center overflow-hidden bg-gray-900">

            {/* BACKGROUND LAYER */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src={foodBg}
                    alt="Delicious food background"
                    className="w-full h-full object-cover rotate-180 opacity-90"
                />
                {/* Main Gradient Overlay: Essential for text visibility over busy images */}
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-black/80"></div>
            </div>

            {/* MAIN CONTENT CONTENT */}
            <div className="z-10 w-full flex flex-col items-center pt-20 md:pt-32 px-4 space-y-8">

                {/* Hero Text */}
                <div className="flex flex-col justify-center items-center text-center space-y-4 animate-fade-in-down">
                    <h1 className="text-7xl font-bold font-serif mb-4 text-white drop-shadow-lg">
                        Cravings? <span className="text-amber-400 italic">Cravr.</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-amber-50/90 font-light max-w-2xl tracking-wide">
                        Your ultimate food delivery companion. Explore a world of flavors at your fingertips!
                    </p>
                </div>

                {/* Search Bar - Glassmorphism Style */}
                <div className="w-full max-w-lg mt-8 relative group">
                    <div className="absolute -inset-1 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Enter your Pincode..."
                            value={pincode}
                            onChange={(e) => findRestaurants(e.target.value)}
                            className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-50 placeholder-amber-200/50 px-8 py-4 rounded-full text-lg focus:outline-none focus:bg-white/20 focus:border-amber-400/50 transition-all duration-300 shadow-xl cursor-pointer"
                        />
                        {/* Optional Search Icon inside input */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-200 absolute right-6 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
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