import React, { useState } from 'react';
import AddressCard from '../card/addressCard.jsx'; 

const CartAddressSection = ({ 
    addressList, 
    selectedAddressId, 
    onSelectAddress, 
    onNavigate, 
    isDeliverable, 
    deliveryWarning, 
    addressError 
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleChangeAddress = () => {
        if (addressList.length === 0) {
            onNavigate('/profile'); 
            return;
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectNewAddress = (id) => {
        onSelectAddress(id);      
        setIsDropdownOpen(false);  
    };

    return (
        <>
            {/* Warning Banner */}
            {!isDeliverable && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                        <h4 className="text-rose-500 font-bold text-sm uppercase tracking-wider">Location is far away</h4>
                        <p className="text-stone-300 text-xs mt-1 leading-relaxed">{deliveryWarning}</p>
                        <p className="text-stone-500 text-[10px] mt-2 italic">Please change your address or clear cart to order from a restaurant in your city.</p>
                    </div>
                </div>
            )}

            {/* Address Section */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-xs">1</span>
                    <h2 className="text-xl font-bold text-stone-200">Delivery Address</h2>
                </div>

                <div className={`bg-stone-900/50 backdrop-blur-sm border ${!isDeliverable ? 'border-rose-500/30' : 'border-white/10'} p-4 rounded-xl transition-all`}>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4 items-start">
                            <div className="mt-1">
                                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>

                            <div className="flex-1">
                                {addressList.length > 0 && selectedAddressId ? (
                                    addressList.filter(addr => addr._id === selectedAddressId).map((addr) => (
                                        <AddressCard key={addr._id} address={addr} isCompact={true} />
                                    ))
                                ) : (
                                    <div className="py-2"><p className="text-stone-400 italic text-sm">No saved locations found.</p></div>
                                )}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="border-t border-white/5 pt-2 mt-1 flex justify-end">
                            <div>
                                {addressError && (
                                    <span className="text-red-500 text-[10px] uppercase font-bold tracking-wider animate-pulse">! {addressError}</span>
                                )}
                            </div>
                            <button onClick={handleChangeAddress} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-500/80 hover:text-amber-400 transition-colors group">
                                {addressList.length === 0 ? "Add New Address" : isDropdownOpen ? "Keep Current" : "Change Location"}
                                <svg className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'translate-x-0 group-hover:translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        {/* Dropdown List */}
                        {isDropdownOpen && (
                            <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                                {addressList.length <= 1 && <p className="text-stone-400 italic text-sm">No other saved locations found.</p>}
                                {addressList.filter(addr => addr._id !== selectedAddressId).map((addr) => (
                                    <div 
                                        key={addr._id} 
                                        onClick={() => selectNewAddress(addr._id)} 
                                        className="cursor-pointer"
                                    >
                                        <AddressCard address={addr} isCompact={true} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartAddressSection;