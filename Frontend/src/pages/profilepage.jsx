import React, { useState } from "react";
import FavItems from "../components/favItems.jsx";
import Orders from "./orderpage.jsx";
import Addresses from "./addresspage.jsx";
import LogoutView from "./logoutpage.jsx";

const handleFinalLogout = () => {
        // 1. Clear your Auth Token/Context
        // 2. Redirect to landing page
        console.log("Session Terminated Safely.");
        window.location.href = "/";
    };

function ProfilePage() {
    const [activeView, setActiveView] = useState('orders');

    

    return (
        <div className="h-screen bg-stone-950 text-amber-50 flex overflow-hidden font-sans selection:bg-amber-500 selection:text-black">

            {/* --- LEFT PANE: Identity & Navigation (Fixed) --- */}
            <aside className="w-1/3 border-r border-amber-500/10 flex flex-col p-10 justify-between bg-stone-900/30">
                <div className="space-y-12">
                    {/* Brand & User Profile */}
                    <div className="space-y-4">
                        <div className="w-12 h-1 bg-amber-500"></div>
                        <h1 className="text-5xl font-serif font-black italic tracking-tighter">Tushar.</h1>
                        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-50">Verified Operative // 987969</p>
                    </div>

                    {/* Quick Stats: Stacked for "One View" */}
                    <div className="space-y-6 font-mono">
                        <div className="flex justify-between items-end border-b border-amber-50 pb-2">
                            <span className="text-sm uppercase tracking-widest text-stone-300">Orders</span>
                            <span className="text-2xl font-light">15</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-amber-50 pb-2">
                            <span className="text-sm uppercase tracking-widest text-stone-300">Spent</span>
                            <span className="text-2xl font-light text-emerald-500/80">₹2.5k</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-amber-50 pb-2">
                            <span className="text-sm uppercase tracking-widest text-stone-300">Credits</span>
                            <span className="text-2xl font-light text-amber-400">300</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col space-y-4">
                        {['orders', 'addresses', 'logout'].map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveView(item)}
                                className={`text-left mt-4 font-merriweather uppercase tracking-[0.3em] text-[14px] transition-all
                                    ${activeView === item ? 'text-amber-500 font-bold translate-x-2' : 'text-stone-300 hover:text-amber-400'}`}
                            >
                                {item} {activeView === item && "→"}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* --- RIGHT PANE: Scrollable Content --- */}
            <main className="flex-1 overflow-y-auto bg-stone-900 p-12 custom-scrollbar">
                {renderView(activeView)}
            </main>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 10px; }
            `}</style>
        </div>
    );
}

const renderView = (view) => {
    switch (view) {
        case 'orders': return <Orders />;
        // case 'favourites': return <FavItems />;
        case 'addresses': return <Addresses />;
        case 'logout': return <LogoutView onConfirmLogout={handleFinalLogout} />;
        default: return <Orders />;
    }
};

export default ProfilePage;