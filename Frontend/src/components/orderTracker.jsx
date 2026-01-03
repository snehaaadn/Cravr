import React from 'react';
import WhatsAppButton from './whatsappbutton.jsx';

const OrderTracker = ({ currentStatus }) => {
    const statuses = ['Pending', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered'];
    const currentIndex = statuses.indexOf(currentStatus);
    
    if (currentStatus === 'Cancelled') {
        return (
            <div className="w-full py-3 px-6 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 font-mono text-[10px] uppercase tracking-[0.2em] text-center">
                Mission Terminated: Order Cancelled
            </div>
        );
    }

    return (
        <div className="w-full py-6">
            <div className="relative flex justify-between">
                {/* Background Track */}
                <div className="absolute top-2 left-0 w-full h-px bg-stone-800 z-0"></div>
                
                {/* Active Amber Line */}
                <div 
                    className="absolute top-2 left-0 h-px bg-amber-50 z-0 transition-all duration-1000 shadow-[0_0_8px_#f59e0b]" 
                    style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
                ></div>

                {statuses.map((status, idx) => (
                    <div key={status} className="relative z-10 flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                            idx <= currentIndex ? 'bg-amber-500 border-stone-900' : 'bg-stone-900 border-stone-800'
                        }`}></div>
                        <p className={`mt-3 text-[10px] font-mono uppercase tracking-tighter ${
                            idx <= currentIndex ? 'text-amber-50' : 'text-stone-400'
                        }`}>
                            {status}
                        </p>
                    </div>
                ))}
            </div>

            {/* --- DELIVERY PARTNER DETAILS --- */}
            {currentIndex >= 3 && (
                <div className="mt-8 p-4 bg-stone-800/30 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700 border border-white/5">
                    
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-stone-700 rounded-full flex items-center justify-center text-2xl border border-stone-600">
                            👷
                        </div>
                        <div>
                            <p className="text-amber-50 font-bold text-sm">Ramesh Kumar</p>
                            <p className="text-stone-400 text-[10px] uppercase tracking-wider">Delivery Partner • +91 98765 43210</p>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <WhatsAppButton 
                            label="Chat with Driver" 
                            phoneNumber="919876543210" 
                            message="Hi Ramesh, I am tracking my Cravr order."
                            type="driver"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTracker;