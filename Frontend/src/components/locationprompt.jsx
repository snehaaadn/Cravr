import React, { useState, useEffect } from 'react';
import scrollToTop from '../utils/scrollToTop.js';
const LocationPrompt = () => {
    const [textIndex, setTextIndex] = useState(0);
    const words = ["Biryani?", "Pizza?", "Sushi?", "Burgers?", "Desserts?"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-stone-950 border-b border-stone-800 isolate">
            
            {/* --- 1. BACKGROUND: THE "VOID" GRID --- */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div 
                    className="absolute inset-0" 
                    style={{
                        backgroundImage: `linear-gradient(to right, #44403c 1px, transparent 1px), linear-gradient(to bottom, #44403c 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        transform: 'perspective(500px) rotateX(60deg) scale(2)',
                        transformOrigin: 'top center',
                        maskImage: 'linear-gradient(to bottom, transparent, black 40%, transparent)'
                    }}
                ></div>
            </div>
                    
            {/* --- 2. THE SCANNER BEAM --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="w-full h-0.5 bg-amber-500/50 blur-sm shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-[scan_4s_ease-in-out_infinite]"></div>
            </div>

            {/* --- 3. FLOATING "GRAVITY" ELEMENTS --- */}
            
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <FloatingPill text="🍕 Pizza" top="15%" left="10%" delay="0s" />
                <FloatingPill text="🍜 Ramen" top="25%" right="15%" delay="2s" />
                <FloatingPill text="🍔 Burger" bottom="30%" left="20%" delay="1s" />
                <FloatingPill text="🥗 Healthy" bottom="15%" right="10%" delay="3s" />
                <FloatingPill text="🍦 Ice Cream" top="10%" right="30%" delay="4s" />
                <FloatingPill text="🌶️ Spicy" bottom="40%" left="5%" delay="1.5s" />
            </div>

            {/* --- 4. MAIN CONTENT --- */}
            <div className="relative z-10 text-center px-4 max-w-4xl w-full">
                
                {/* The "Brain" Icon */}
                <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full animate-pulse"></div>
                    <div className="relative bg-stone-900 border border-stone-700 p-6 rounded-3xl shadow-2xl shadow-amber-500/10">
                        <svg className="w-16 h-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {/* Little Notification Dot */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-stone-900 animate-bounce">
                            !
                        </div>
                    </div>
                </div>

                {/* Headline with Changing Text */}
                <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight font-merriweather">
                    Hungry for <br className="md:hidden" />
                    <span className="text-amber-500 inline-block min-w-[200px] text-left transition-all duration-300 transform translate-y-0 opacity-100">
                        {words[textIndex]}
                    </span>
                </h1>

                <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    We can't show you the best restaurants until we know where you are. 
                    <span className="text-stone-200 font-medium"> Unlock the map to start your journey.</span>
                </p>

                {/* --- ACTION BAR --- */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
                    
                    <button 
                        onClick={() => scrollToTop()}
                        className="w-full py-4 bg-stone-900/50 backdrop-blur border border-stone-700 text-stone-300 font-bold text-sm tracking-[0.2em] uppercase rounded-xl hover:bg-stone-800 hover:text-white hover:border-stone-500 transition-all"
                    >
                        Enter Manually
                    </button>
                </div>

                {/* Footer Stat */}
                <div className="mt-12 flex items-center justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">500+</div>
                        <div className="text-[10px] uppercase tracking-widest text-stone-500">Restaurants</div>
                    </div>
                    <div className="w-px h-8 bg-stone-800"></div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">24/7</div>
                        <div className="text-[10px] uppercase tracking-widest text-stone-500">Delivery</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FloatingPill = ({ text, top, left, right, bottom, delay }) => (
    <div 
        className="absolute px-4 py-2 bg-stone-900/40 backdrop-blur-md border border-stone-700/50 rounded-full text-stone-400 text-xs font-bold uppercase tracking-wider shadow-xl"
        style={{ 
            top, left, right, bottom, 
            animation: `float 6s ease-in-out infinite ${delay}`
        }}
    >
        {text}
    </div>
);

export default LocationPrompt;