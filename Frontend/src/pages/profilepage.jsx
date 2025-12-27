import React, { useState, useContext } from "react";
import FavItems from "../components/favItems.jsx";
import Orders from "./orderpage.jsx";
import Addresses from "./addresspage.jsx";
import LogoutView from "./logoutpage.jsx";
import { AuthContext } from '../context/authContext';

function ProfilePage() {
    const [activeView, setActiveView] = useState('orders');
    const { user, logout } = useContext(AuthContext);

    // 1. Logic to render view moved INSIDE the component to access state/context
    const renderView = (view) => {
        switch (view) {
            case 'orders': return <Orders />;
            case 'addresses': return <Addresses />;
            case 'logout': return <LogoutView onConfirmLogout={logout} />; // Directly use logout from context
            default: return <Orders />;
        }
    };

    return (
        <div className="h-screen bg-stone-950 text-amber-50 flex overflow-hidden font-sans selection:bg-amber-500 selection:text-black">

            {/* --- LEFT PANE --- */}
            <aside className="w-1/3 border-r border-amber-500/10 flex flex-col p-10 justify-between bg-stone-900/30">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <div className="w-12 h-1 bg-amber-500"></div>
                        <h1 className="text-5xl font-serif font-black italic tracking-tighter">{`${user?.username}.`.toUpperCase() || "Guest"}</h1>
                        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-50">Verified // {user?.phone}</p>
                    </div>

                    <div className="space-y-6 font-mono">
                        <div className="flex justify-between items-end border-b border-amber-50 pb-2">
                            <span className="text-sm uppercase tracking-widest text-stone-300">Orders</span>
                            <span className="text-2xl font-light">{user?.totalOrders}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-amber-50 pb-2">
                            <span className="text-sm uppercase tracking-widest text-stone-300">Spent</span>
                            <span className="text-2xl font-light text-emerald-500/80">{user?.totalSpent}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-amber-50 pb-2">
                            <span className="text-sm uppercase tracking-widest text-stone-300">Cravr Points</span>
                            <span className="text-2xl font-light text-amber-400">{user?.points}</span>
                        </div>
                    </div>

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

            {/* --- RIGHT PANE --- */}
            <main className="flex-1 overflow-y-auto bg-stone-900 p-12 custom-scrollbar">
                {/* 2. Call the localized renderView function */}
                {renderView(activeView)}
            </main>

           { <style>{`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 10px; }
`}</style>}
        </div>
    );
}

export default ProfilePage;