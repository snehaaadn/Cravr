import React from 'react';

const CartHeader = ({ onClose }) => {
    return (
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-stone-900/50 backdrop-blur-md z-10">
            <h2 className="text-xl font-bold font-merriweather text-white">Your Cart</h2>
            <button onClick={onClose} className="p-2 text-stone-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default CartHeader;