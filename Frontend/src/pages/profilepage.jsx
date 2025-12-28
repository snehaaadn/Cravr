import React, { useState, useContext, useEffect } from "react";
import Orders from "./orderpage.jsx";
import Addresses from "./addresspage.jsx";
import LogoutView from "./logoutpage.jsx";
import { AuthContext } from '../context/authContext';
import { getUserProfile } from '../services/api.js';

function ProfilePage() {
    const [activeView, setActiveView] = useState('orders');
    const { user, logout } = useContext(AuthContext);

    const renderView = (view) => {
        switch (view) {
            case 'orders': return <Orders />;
            case 'addresses': return <Addresses />;
            case 'logout': return <LogoutView onConfirmLogout={logout} />;
            default: return <Orders />;
        }
    };

    // Fetch user data on view change
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserProfile();
                if (response.data.success) {
                    const totalOrders = response.data.user.totalOrders || 0;
                    const totalSpent = response.data.user.totalSpent || 0;
                    const points = response.data.user.points || 0;

                    // Logic: Update user context with latest stats
                    user.totalOrders = totalOrders;
                    user.totalSpent = totalSpent;
                    user.points = points;
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserData();
        
    }, []);

    return (
        <div className="min-h-screen bg-stone-950 text-amber-50 flex flex-col lg:flex-row font-sans selection:bg-amber-500 selection:text-black">
            {/* --- LEFT PANE --- */}
            <aside className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-amber-500/10 flex flex-col p-6 md:p-10 justify-between bg-stone-900/30">
                <div className="space-y-8 lg:space-y-12">
                    <div className="space-y-4">
                        <div className="w-12 h-1 bg-amber-500"></div>
                        <h1 className="text-3xl md:text-5xl font-serif font-black italic tracking-tighter wrap-break-words">
                            {`${user?.username}.`.toUpperCase() || "GUEST"}
                        </h1>
                        <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-amber-50">
                            Verified // {user?.phone}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col gap-4 lg:gap-6 font-mono">
                        <div className="flex justify-between items-end border-b border-amber-50 pb-2">
                            <span className="text-[10px] md:text-sm uppercase tracking-widest text-stone-300">Orders</span>
                            <span className="text-xl md:text-2xl font-light">{user?.totalOrders || 0}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-amber-50 pb-2">
                            <span className="text-[10px] md:text-sm uppercase tracking-widest text-stone-300">Spent</span>
                            <span className="text-xl md:text-2xl font-light text-emerald-500/80">₹{user?.totalSpent || 0}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-amber-50 pb-2">
                            <span className="text-[10px] md:text-sm uppercase tracking-widest text-stone-300">Points</span>
                            <span className="text-xl md:text-2xl font-light text-amber-400">{user?.points || 0}</span>
                        </div>
                    </div>

                    <nav className="flex flex-row lg:flex-col gap-4 lg:space-y-4 overflow-x-auto pb-2 no-scrollbar">
                        {['orders', 'addresses', 'logout'].map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveView(item)}
                                className={`text-left font-merriweather uppercase tracking-[0.2em] md:tracking-[0.3em] text-[12px] md:text-[14px] transition-all whitespace-nowrap
                                    ${activeView === item ? 'text-amber-500 font-bold lg:translate-x-2' : 'text-stone-300 hover:text-amber-400'}`}
                            >
                                {item} {activeView === item && "→"}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* --- RIGHT PANE --- */}
            <main className="flex-1 overflow-y-auto bg-stone-900 p-6 md:p-12 custom-scrollbar">
                {renderView(activeView)}
            </main>
        </div>
    );
}

export default ProfilePage;